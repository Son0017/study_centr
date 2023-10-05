import { NextFunction, Request, Response } from "express";
import { custumRequest, errorCreate } from "../providers/helperForSend";

export const cheakAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const admin = (req as custumRequest).user.type;

    if (admin === "ADMIN") {
      next();
    } else {
      throw new Error(`Invalid admin`);
    }
  } catch (error) {
    errorCreate(res, error);
  }
};
