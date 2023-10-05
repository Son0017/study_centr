import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { custumRequest } from "../providers/helperForSend";
export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("token is required");
    }
    const user = jwt.verify(token, process.env.SECRET_KEY as string);

    (req as custumRequest).user = user;

    next();
  } catch (error: any) {
    res.status(505).send(error.message);
  }
};
