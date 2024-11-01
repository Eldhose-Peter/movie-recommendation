import { AuthController } from "auth/auth.controller";
import App from "./app";
import UsersController from "users/users.controller";
import MovieController from "movies/movies.controller";
import RatingController from "ratings/ratings.controller";

const app = new App([
  new AuthController(),
  new UsersController(),
  new MovieController(),
  new RatingController()
]);
app.listen();
