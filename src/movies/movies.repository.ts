import pool from "config/database";
import { Movie } from "./movies.model";
import { MovieFilters } from "common/types";

export class MovieRepository {
  public async getMoviesByFilter({ genre, yearAfter, minimalVoters }: MovieFilters = {}): Promise<
    Movie[]
  > {
    // Base SQL query
    let query = "SELECT m.* FROM movies m JOIN movie_genres mg ON m.id = mg.movie_id";
    const params: (string | number)[] = [];
    const conditions: string[] = [];

    // Initialize parameter index
    let paramIndex = 1;

    // Add filters based on provided parameters
    if (genre) {
      conditions.push(`mg.genre_id = $${paramIndex}`);
      params.push(genre);
      paramIndex++;
    }

    if (yearAfter !== undefined) {
      conditions.push(`EXTRACT(YEAR FROM m.release_date::timestamp) > $${paramIndex}`);
      params.push(yearAfter);
      paramIndex++;
    }

    if (minimalVoters) {
      conditions.push(`m.vote_count > $${paramIndex}`);
      params.push(minimalVoters);
      paramIndex++;
    }

    // Append conditions to the query if there are any
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Add sorting by average rating
    query += " ORDER BY m.vote_average DESC";

    // Execute the query with parameters
    const result = await pool.query<Movie>(query, params);
    return result.rows;
  }

  public async getMoviesById(movie_ids: number[]) {
    const query = "SELECT * FROM movies WHERE id = ANY($1)";
    const result = await pool.query<Movie>(query, [movie_ids]);
    return result.rows;
  }
}
