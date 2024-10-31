import { Request, Response, NextFunction } from "express";
import { Controller } from "interfaces/controller.interface";
import { MovieService } from "./movies.service";

class MovieController extends Controller {
  private movieService = new MovieService();

  constructor() {
    super("/movies");
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}/all`, this.getMovies);
  }

  private getMovies = async (_: Request, response: Response, next: NextFunction) => {
    try {
      const result = await this.movieService.getAll();
      response.json({ movies: result });
    } catch (err) {
      next(err);
    }
  };
}
export default MovieController;
