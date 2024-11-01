import { Request, Response, NextFunction } from "express";
import { Controller } from "interfaces/controller.interface";
import { MovieService } from "./movies.service";
import validationMiddleware from "middleware/validation.middleware";
import { averageSchema } from "./movie.validation";

class MovieController extends Controller {
  private movieService = new MovieService();

  constructor() {
    super("/movies");
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}/all`, this.getMovies);
    this.router.get(
      `${this.path}/average`,
      validationMiddleware(averageSchema),
      this.getAverageRatings
    );
  }

  private getMovies = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await this.movieService.getAll();
      response.json({ movies: result });
    } catch (err) {
      next(err);
    }
  };

  private getAverageRatings = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await this.movieService.getAverageRatingsOfMovies(
        request.query.minimalRatings as string
      );
      response.json({ movies: result });
    } catch (err) {
      next(err);
    }
  };
}
export default MovieController;
