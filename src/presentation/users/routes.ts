import { Router } from "express";
import { UserController } from "./controller";
import { CreatorUserService } from "./services/creator-user.service";
import { FinderAllUserService } from "./services/finder-all-user.service";
import { ConsumePaService } from "./services/consume-pa.service";
import { ExamplePa2Service } from "./services/example-pa-2.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userController = new UserController(
      new CreatorUserService(),
      new FinderAllUserService(),
      new ConsumePaService(),
      new ExamplePa2Service()
    );

    router.post("/register", userController.register);
    router.get("/consume_pa", userController.consumePa);
    router.get("/example_pa_2", userController.examplePa2);
    router.get("/", userController.findAll);

    http: return router;
  }
}
