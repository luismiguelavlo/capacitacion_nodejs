import { Router } from "express";
import { UserController } from "./controller";
import { CreatorUserService } from "./services/creator-user.service";
import { FinderAllUserService } from "./services/finder-all-user.service";
import { ConsumePaService } from "./services/consume-pa.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userController = new UserController(
      new CreatorUserService(),
      new FinderAllUserService(),
      new ConsumePaService()
    );

    router.post("/register", userController.register);
    router.get("/consume_pa", userController.consumePa);
    router.get("/", userController.findAll);

    http: return router;
  }
}
