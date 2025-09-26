import { Router } from "express";
import { UserController } from "./controller";
import { CreatorUserService } from "./services/creator-user.service";
import { FinderAllUserService } from "./services/finder-all-user.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userController = new UserController(
      new CreatorUserService(),
      new FinderAllUserService()
    );

    router.post("/register", userController.register);
    router.get("/", userController.findAll);

    http: return router;
  }
}
