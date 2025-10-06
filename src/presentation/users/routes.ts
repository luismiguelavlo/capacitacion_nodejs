import { Router } from "express";
import { UserController } from "./controller";
import { CreatorUserService } from "./services/creator-user.service";
import { FinderAllUserService } from "./services/finder-all-user.service";
import { ExamplePa1Service } from "./services/examplePa1.service";
import { ExamplePa2Service } from "./services/examplePa2.service";
import { UserValidatorService } from "./services/user-validator.service";
import { PasswordHasherService } from "./services/password-hasher.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    // Create service instances with dependency injection
    const userValidator = new UserValidatorService();
    const passwordHasher = new PasswordHasherService();
    const creatorUserService = new CreatorUserService(
      userValidator,
      passwordHasher
    );
    const finderAllUserService = new FinderAllUserService();
    const examplePa1Service = new ExamplePa1Service();
    const examplePa2Service = new ExamplePa2Service();

    const userController = new UserController(
      creatorUserService,
      finderAllUserService,
      examplePa1Service,
      examplePa2Service
    );

    router.post("/register", userController.register);
    router.get("/example-pa-1", userController.examplePa1);
    router.get("/example-pa-2", userController.examplePa2);
    router.get("/", userController.findAll);

    return router;
  }
}
