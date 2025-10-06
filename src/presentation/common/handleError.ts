import { Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";

export const handleError = (error: any, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "fail",
    message: "internal server error",
  });
};
