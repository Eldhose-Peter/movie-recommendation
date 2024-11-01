import pool from "config/database";
import { Rating } from "./movies.model";

export class RatingRepository {
  public async getAllRatings() {
    const result = await pool.query<Rating>("SELECT * FROM ratings");
    return result.rows;
  }

  public async getRatingsByUser(rater_id: number) {
    const result = await pool.query<Rating>("SELECT * FROM ratings WHERE rater_id = $1", [
      rater_id
    ]);
    return result.rows;
  }

  public async getRatingsForMovie(movie_id: number) {
    const result = await pool.query<Rating>("SELECT * FROM ratings WHERE movie_id = $1", [
      movie_id
    ]);
    return result.rows;
  }

  public async getRatingsForMovieByUser(movie_id: number, rater_id: number) {
    const result = await pool.query<Rating>(
      "SELECT * FROM ratings WHERE movie_id = $1 AND rater_id =$2",
      [movie_id, rater_id]
    );
    return result.rows;
  }

  public async getRaterIds() {
    const result = await pool.query<Rating>("SELECT DISTINCT rater_id FROM ratings");
    return result.rows.map((row) => row.rater_id);
  }

  public async getCommonlyRatedMovies(user1: number, user2: number) {
    const result = await pool.query<Rating>(
      "SELECT r1.*, r2.* FROM ratings AS r1 JOIN ratings AS r2 ON r1.movie_id = r2.movie_id AND r1.rater_id = $1 AND r2.rater_id = $2",
      [user1, user2]
    );
    return result.rows;
  }
}
