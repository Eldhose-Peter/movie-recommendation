import { RatingRepository } from "./ratings.repository";

export class RatingService {
  private ratingRepository = new RatingRepository();

  public async getAll() {
    return this.ratingRepository.getAllRatings();
  }
}
