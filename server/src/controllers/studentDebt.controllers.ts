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

    const debt = await prisma.$transaction(async (tx) => {
      const status = await tx.studentDebt.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          course: true,
        },
      });

      const studentDebt = await tx.studentDebt.update({
        where: {
          id: Number(id),
        },
        data: {
          ...body,
        },
      });
      const user = await tx.user.update({
        where: {
          id: status?.course.teacher_id,
        },
        data: {
          summa: {
            increment: (status?.summa as any) * 0.5,
          },
        },
      });

      return { studentDebt, status, user };
    });
    console.log(debt);

    updateSend(res, debt.studentDebt);
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
    const { id } = req.params;

    let query: any = {};
    if (id) {
      query.student_id = Number(id);
    }
    const data = await prisma.studentDebt.findMany({
      where: {
        AND: {
          debt_summa: true,
          ...query,
        },
      },
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
