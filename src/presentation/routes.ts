import { Router } from "express";
import { UserRoutes } from "./users/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/users", UserRoutes.routes);

    //router.use("/tasks", TaskRoutes.routes);

    return router;
  }
}
