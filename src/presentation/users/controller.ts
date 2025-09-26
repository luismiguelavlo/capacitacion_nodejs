import { Request, Response } from "express";
import { CreatorUserService } from "./services/creator-user.service";
import { FinderAllUserService } from "./services/finder-all-user.service";

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly finderAllUserService: FinderAllUserService
  ) {}

  register = (req: Request, res: Response) => {
    this.creatorUserService
      .execute(req.body)
      .then((msg) => {
        return res.status(200).json(msg);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "internal server error",
        });
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
}
