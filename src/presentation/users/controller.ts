import { Request, Response } from "express";
import { CreatorUserService } from "./services/creator-user.service";
import { FinderAllUserService } from "./services/finder-all-user.service";
import { ExamplePa1Service } from "./services/examplePa1.service";
import { ExamplePa2Service } from "./services/examplePa2.service";
import { handleError } from "../common/handleError";

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly finderAllUserService: FinderAllUserService,
    private readonly examplePa1Service: ExamplePa1Service,
    private readonly examplePa2Service: ExamplePa2Service
  ) {}

  register = (req: Request, res: Response) => {
    this.creatorUserService
      .execute(req.body)
      .then((user) => {
        return res.status(201).json({
          status: "success",
          message: "User created successfully",
          data: user,
        });
      })
      .catch((err) => {
        return handleError(err, res);
      });
  };

  findAll = (req: Request, res: Response) => {
    this.finderAllUserService
      .execute()
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "internal server error",
        });
      });
  };

  examplePa1 = (req: Request, res: Response) => {
    const payStatus = parseInt(req.query.payStatus as string) || 888;

    if (payStatus && isNaN(payStatus)) {
      return res.status(400).json({
        error: "El parametro payStatus es requerido y debe ser un numero",
        example: "?payStatus=1",
      });
    }

    this.examplePa1Service
      .execute(payStatus)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return handleError(err, res);
      });
  };

  examplePa2 = (req: Request, res: Response) => {
    const payStatus = parseInt(req.query.payStatus as string) || 888;
    const searcherParameter = req.query.searcherParameter as string;

    if (payStatus && isNaN(payStatus)) {
      return res.status(400).json({
        error: "El parametro payStatus es requerido y debe ser un numero",
        example: "?payStatus=1",
      });
    }

    this.examplePa2Service
      .execute(payStatus, searcherParameter)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return handleError(err, res);
      });
  };
}
