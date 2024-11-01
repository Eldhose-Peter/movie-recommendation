import { Request, Response, NextFunction } from "express";
import { Controller } from "interfaces/controller.interface";
import { MovieService } from "./movies.service";
import validationMiddleware from "middleware/validation.middleware";
import { averageSchema, filterSchema, similaritySchema } from "./movie.validation";

class MovieController extends Controller {
  private movieService = new MovieService();

  constructor() {
    super("/movies");
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}/all`, validationMiddleware(filterSchema), this.getMovies);
    this.router.get(
      `${this.path}/average`,
      validationMiddleware(averageSchema),
      this.getAverageRatings
    );
    this.router.get(
      `${this.path}/similar`,
      validationMiddleware(similaritySchema),
      this.getSimilarRatings
    );
  }

  private getMovies = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { director, genre, minutes, yearAfter } = request.query;

      // Convert numeric query parameters to appropriate types
      const filters = {
        director: director ? String(director) : undefined,
        genre: genre ? String(genre) : undefined,
        minutes: minutes ? Number(minutes) : undefined,
        yearAfter: yearAfter ? Number(yearAfter) : undefined
      };

      const result = await this.movieService.getMoviesByFilter(filters);
      response.json({ movies: result });
    } catch (err) {
      next(err);
    }
  };

  private getAverageRatings = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { director, genre, minutes, yearAfter } = request.query;

      // Convert numeric query parameters to appropriate types
      const filters = {
        director: director ? String(director) : undefined,
        genre: genre ? String(genre) : undefined,
        minutes: minutes ? Number(minutes) : undefined,
        yearAfter: yearAfter ? Number(yearAfter) : undefined
      };

      const result = await this.movieService.getAverageRatingsOfMovies(
        parseInt(request.query.minimalRatings as string),
        filters
      );
      response.json({ movies: result });
    } catch (err) {
      next(err);
    }
  };

  private getSimilarRatings = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = 5;

      const { director, genre, minutes, yearAfter } = request.query;

      // Convert numeric query parameters to appropriate types
      const filters = {
        director: director ? String(director) : undefined,
        genre: genre ? String(genre) : undefined,
        minutes: minutes ? Number(minutes) : undefined,
        yearAfter: yearAfter ? Number(yearAfter) : undefined
      };

      const result = await this.movieService.getSimilarRatings(
        userId,
        parseInt(request.query.numSimilarRaters as string),
        parseInt(request.query.minimalRatings as string),
        filters
      );
      response.json({ movies: result });
    } catch (err) {
      next(err);
    }
  };
}
export default MovieController;
