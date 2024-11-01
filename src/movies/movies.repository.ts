import pool from "config/database";
import { Movie } from "./movies.model";
import { MovieFilters } from "common/types";

export class MovieRepository {
  public async getMoviesByFilter({
    director,
    genre,
    minutes,
    yearAfter
  }: MovieFilters = {}): Promise<Movie[]> {
    // Base SQL query
    let query = "SELECT * FROM movies";
    const params: (string | number)[] = [];
    const conditions: string[] = [];

    // Initialize parameter index
    let paramIndex = 1;

    // Add filters based on provided parameters
    if (director) {
      conditions.push(`director ILIKE $${paramIndex}`);
      params.push(`%${director}%`);
      paramIndex++;
    }

    if (genre) {
      conditions.push(`genre ILIKE $${paramIndex}`);
      params.push(`%${genre}%`);
      paramIndex++;
    }

    if (minutes !== undefined) {
      conditions.push(`minutes = $${paramIndex}`);
      params.push(minutes);
      paramIndex++;
    }

    if (yearAfter !== undefined) {
      conditions.push(`year > $${paramIndex}`);
      params.push(yearAfter);
      paramIndex++;
    }

    // Append conditions to the query if there are any
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Execute the query with parameters
    const result = await pool.query<Movie>(query, params);
    return result.rows;
  }
}
