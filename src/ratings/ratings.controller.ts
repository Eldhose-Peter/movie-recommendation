import { Request, Response, NextFunction } from "express";
import { Controller } from "interfaces/controller.interface";
import { RatingService } from "./ratings.service";

class RatingController extends Controller {
  private ratingService = new RatingService();

  constructor() {
    super("/ratings");
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}/all`, this.getMovies);
  }

  private getMovies = async (_: Request, response: Response, next: NextFunction) => {
    try {
      const result = await this.ratingService.getAll();
      response.json({ movies: result });
    } catch (err) {
      next(err);
    }
  };
}
export default RatingController;
