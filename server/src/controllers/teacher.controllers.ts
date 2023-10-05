import { Request, Response } from "express";
import prisma from "../connection/prisma";
import {
  createSend,
  custumRequest,
  deleteSend,
  errorCreate,
  errorDelete,
  errorGet,
  getSend,
  updateSend,
} from "../providers/helperForSend";

import jwt from "jsonwebtoken";

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const teacher = await prisma.user.create({
      data: body,
    });
    createSend(res, teacher);
  } catch (error) {
    errorCreate(res, error);
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = (req as custumRequest).user;

    if (!body.oldPassword) {
      const teacher = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          first_name: body.first_name,
          last_name: body.last_name,
          phone_number: body.phone_number,
          payout_percentage: body.payout_percentage,
        },
      });
      return updateSend(res, teacher);
    } else {
      const teacher = await prisma.user.findFirst({
        where: {
          id: user.id,
        },
      });
      if (teacher?.password === body.oldPassword) {
        const teachers = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            first_name: body.first_name,
            last_name: body.last_name,
            phone_number: body.phone_number,
            password: body.password,
            payout_percentage: body.payout_percentage,
          },
        });
        return updateSend(res, teachers);
      }
    }
  } catch (error) {
    errorCreate(res, error);
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as custumRequest).user;

    if (user.type === "ADMIN") {
      const deletedTeacher = await prisma.user.delete({
        where: { id: Number(id) },
      });
      return deleteSend(res, deletedTeacher.id);
    } else {
      throw new Error("Teacher is not admin");
    }
  } catch (error) {
    errorDelete(res, error);
  }
};

export const getTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let query: any = {};
    if (id) {
      query = { id: Number(id) };
    }
    const student = await prisma.user.findMany({
      where: {
        type: "TEACHER",
      },
    });
    getSend(res, student);
  } catch (error) {
    errorGet(res, error);
  }
};
export const getAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let query: any = {};
    if (id) {
      query = { id: Number(id) };
    }
    const student = await prisma.user.findMany({
      where: {
        type: "ADMIN",
      },
    });
    getSend(res, student);
  } catch (error) {
    errorGet(res, error);
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { phone_number, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        AND: {
          phone_number,
          password,
        },
      },
    });
    const token = jwt.sign(
      { id: user?.id, type: user?.type },
      process.env.SECRET_KEY as string,
      { expiresIn: "30d" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 900000),
      })
      .send({ ...user, token });
  } catch (error: any) {
    res.status(505).send({
      message: error.message,
    });
  }
};
