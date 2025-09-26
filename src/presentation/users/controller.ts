import { Request, Response } from "express";
import { CreatorUserService } from "./services/creator-user.service";
import { FinderAllUserService } from "./services/finder-all-user.service";
import { ConsumePaService } from "./services/consume-pa.service";

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly finderAllUserService: FinderAllUserService,
    private readonly consumePaService: ConsumePaService
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

  consumePa = (req: Request, res: Response) => {
    try {
      // Obtener el parámetro desde query string: /consume_pa?estadoPag=2
      const payStatus = parseInt(req.query.payStatus as string);

      if (isNaN(payStatus)) {
        return res.status(400).json({
          error: "El parámetro 'payStatus' es requerido y debe ser un número",
          example: "/consume_pa?payStatus=2",
        });
      }

      this.consumePaService
        .execute(payStatus)
        .then((msg) => {
          return res.status(200).json(msg);
        })
        .catch((err) => {
          return res.status(500).json({
            message: "internal server error",
          });
        });
    } catch (error) {
      return res.status(400).json({
        error: "Error en los parámetros de entrada",
        message: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };
}
