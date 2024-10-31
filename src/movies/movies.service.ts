import { MovieRepository } from "./movies.repository";

export class MovieService {
  private movieRepository = new MovieRepository();

  public async getAll() {
    return this.movieRepository.getAllMovies();
  }
}
