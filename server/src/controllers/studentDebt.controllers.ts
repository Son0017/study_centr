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

export const createStudentDebt = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    body.teacher_payout = 0.5;
    const studentDebt = await prisma.studentDebt.create({
      data: body,
    });
    createSend(res, studentDebt);
  } catch (error) {
    errorCreate(res, error);
  }
};

export const updateStudentDebt = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const studentDebt = await prisma.studentDebt.update({
      where: {
        id: Number(id),
      },
      data: {
        ...body,
      },
    });
    updateSend(res, studentDebt);
  } catch (error) {
    errorCreate(res, error);
  }
};

export const deleteStudentDebt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as custumRequest).user;
    if (user.type === "ADMIN") {
      const deletedstudentDebt = await prisma.studentDebt.delete({
        where: { id: Number(id) },
      });
      return deleteSend(res, deletedstudentDebt.id);
    } else {
      throw new Error("studentDebt is not admin");
    }
  } catch (error) {
    errorDelete(res, error);
  }
};

export const getStudentDebt = async (req: Request, res: Response) => {
  try {
    let { limit, offset } = req.query;
    const { id } = req.params;
    let take = limit ? Number(limit) : 10;
    let skip = offset ? Number(offset) : 0;
    let query: any = {};
    if (id) {
      query.student_id = Number(id);
    }
    console.log(query);

    const data = await prisma.studentDebt.findMany({
      where: {
        AND: {
          debt_summa: true,
          ...query,
        },
      },
      take: take,
      skip: skip,
      include: {
        student: true,
        course: true,
      },
    });

    return getSend(res, data);
  } catch (error) {
    errorGet(res, error);
  }
};
