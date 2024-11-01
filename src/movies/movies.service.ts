import { Movie, RatedMovie, Rating } from "./movies.model";
import { MovieRepository } from "./movies.repository";
import { RatingRepository } from "./ratings.repository";

export class MovieService {
  private movieRepository = new MovieRepository();
  private ratingRepository = new RatingRepository();

  public async getAll() {
    return this.movieRepository.getAllMovies();
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

  public async getAverageRatingsOfMovies(minimalRatings: string) {
    const movies: Movie[] = await this.movieRepository.getAllMovies();

    const ratedMovies = await Promise.all(
      movies.map(async (movie) => {
        const avgRating = await this.getAverageForMovie(movie.id, parseInt(minimalRatings));
        return avgRating > 0.0 ? { ...movie, rating: avgRating } : null;
      })
    );

    // Filter out any null values (movies that didn't meet the rating criteria)
    return ratedMovies.filter((movie): movie is RatedMovie => movie !== null);
  }
}
