import pool from "config/database";
import { Rating } from "./ratings.model";

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
}
