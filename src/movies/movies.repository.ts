import pool from "config/database";
import { Movie } from "./movies.model";

export class MovieRepository {
  public async getAllMovies() {
    const result = await pool.query<Movie>("SELECT * FROM movies");
    return result.rows;
  }
}
