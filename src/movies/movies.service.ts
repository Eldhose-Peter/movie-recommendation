import { MovieFilters } from "common/types";
import { Similarity } from "./classes/similarity";
import { Movie, RatedMovie, Rating } from "./movies.model";
import { MovieRepository } from "./movies.repository";
import { RatingRepository } from "./ratings.repository";

export class MovieService {
  private movieRepository = new MovieRepository();
  private ratingRepository = new RatingRepository();

  public async getMoviesByFilter(filters: MovieFilters) {
    return this.movieRepository.getMoviesByFilter(filters);
  }

  //gets the average rating for a movieId
  public async getAverageForMovie(movieId: number, minimalRaters: number) {
    const movieRatings: Rating[] = await this.ratingRepository.getRatingsForMovie(movieId);

    let sum = 0;
    //only take the average if there is atleast minimum number of Raters
    if (movieRatings.length >= minimalRaters) {
      movieRatings.forEach((ratingItem) => {
        sum += ratingItem.rating;
      });
      return sum / movieRatings.length;
    }
    return 0;
  }

  public async getAverageRatingsOfMovies(minimalRatings: number, filters: MovieFilters) {
    const movies: Movie[] = await this.movieRepository.getMoviesByFilter(filters);

    const ratedMovies = await Promise.all(
      movies.map(async (movie) => {
        const avgRating = await this.getAverageForMovie(movie.id, minimalRatings);
        return avgRating > 0.0 ? { ...movie, rating: avgRating } : null;
      })
    );

    // Filter out any null values (movies that didn't meet the rating criteria)
    return ratedMovies.filter((movie): movie is RatedMovie => movie !== null);
  }

  private async dotProduct(curRater: number, otherRater: number) {
    const curUserRatings: Rating[] = await this.ratingRepository.getRatingsByUser(curRater);
    const otherUserRatings: Rating[] = await this.ratingRepository.getRatingsByUser(otherRater);

    // Create a Map for efficient lookup of the other user's ratings by movie ID
    const otherRatingsMap = new Map(
      otherUserRatings.map((rating) => [rating.movie_id, rating.rating])
    );

    // Calculate the dot product
    let dotProduct = 0;
    for (const rating of curUserRatings) {
      let curRating = rating.rating;
      let otherRating = otherRatingsMap.get(rating.movie_id);
      if (otherRating !== undefined) {
        //translate a rating from the scale 0 to 10 to the scale ­-5 to 5

        curRating -= 5;
        otherRating -= 5;
        dotProduct += curRating * otherRating;
      }
    }

    return dotProduct;
  }

  // generates a sorted list of users (raters) similar to the specified raterId.
  private async getSimilarities(raterId: number): Promise<Similarity[]> {
    const similarities: Similarity[] = [];
    const raters: number[] = await this.ratingRepository.getRaterIds();

    const similarityPromises = raters
      .filter((rater) => rater !== raterId) // Exclude the current rater
      .map(async (rater) => {
        const dotProduct = await this.dotProduct(raterId, rater);
        return new Similarity(rater, dotProduct);
      });

    const resolvedSimilarities = await Promise.all(similarityPromises);
    similarities.push(...resolvedSimilarities);

    similarities.sort(Similarity.compareTo);

    return similarities;
  }

  private async getWeightedRatings(
    movieId: number,
    similarRaters: Similarity[],
    numSimilarRaters: number
  ): Promise<number[]> {
    const weightedRatingsList: number[] = [];

    for (let i = 0; i < numSimilarRaters; i++) {
      const similarRater = similarRaters[i];
      const raterId: number = similarRater.getItem();
      const raterCloseness: number = similarRater.getValue();

      if (raterCloseness <= 0) break;

      const movieRating: Rating[] = await this.ratingRepository.getRatingsForMovieByUser(
        movieId,
        raterId
      );

      if (movieRating.length === 1) {
        // Take the weighted rating
        weightedRatingsList.push(raterCloseness * movieRating[0].rating);
      }
    }

    return weightedRatingsList;
  }

  // Gets recommended movies from raters with similar ratings
  // It uses collaborative filtering, specifically a dot product for rating comparison,
  // to determine the closeness between raters and recommend movies that similar users have rated highly.
  public async getSimilarRatings(
    curRaterId: number,
    numSimilarRaters: number,
    minimalRaters: number,
    filters: MovieFilters
  ): Promise<Similarity[]> {
    const similarRaters: Similarity[] = await this.getSimilarities(curRaterId);
    const movies: Movie[] = await this.movieRepository.getMoviesByFilter(filters);
    const movieIDList = movies.map((movie) => movie.id);

    const similarMovies: Similarity[] = [];

    for (const movieId of movieIDList) {
      const weightedRatingsList = await this.getWeightedRatings(
        movieId,
        similarRaters,
        numSimilarRaters
      );

      // Calculate weighted average rating
      if (weightedRatingsList.length >= minimalRaters) {
        const sum = weightedRatingsList.reduce((acc, rating) => acc + rating, 0);
        const movieSimilarity = new Similarity(movieId, sum / weightedRatingsList.length);
        similarMovies.push(movieSimilarity);
      }
    }

    similarMovies.sort(Similarity.compareTo);
    return similarMovies;
  }

  public async addratingForMovie(rater_id: number, movie_id: number, rating: number) {
    await this.ratingRepository.addRatingForMovie(rater_id, movie_id, rating);
  }

  public async getMoviesRatedByUser(rater_id: number) {
    const ratings: Rating[] = await this.ratingRepository.getRatingsByUser(rater_id);
    const ratingMap = new Map<number, number>();
    ratings.forEach((rating) => {
      ratingMap.set(rating.movie_id, rating.rating);
    });

    const movieIdsWithRatings = Array.from(ratingMap.keys());

    const movies: Movie[] = await this.movieRepository.getMoviesById(movieIdsWithRatings);
    const ratedMovies: RatedMovie[] = movies.map((movie) => ({
      ...movie,
      rating: ratingMap.get(movie.id) ?? 0
    }));

    return ratedMovies;
  }
}
