import { Request, Response } from "express";
import prisma from "../connection/prisma";
import {
  createSend,
  custumRequest,
  deleteSend,
  errorCreate,
  errorDelete,
  errorGet,
  errorUpdate,
  getSend,
  updateSend,
} from "../providers/helperForSend";
import { ICourse } from "../interface/allInterface";
import { startCourses, statusChaker } from "../providers/courseProvide";
import { myF } from "../server";

export const createCourse = async (req: Request, res: Response) => {
  try {
    let body: ICourse = req.body;
    body = statusChaker(body);
    const course = await prisma.course.create({
      data: {
        ...body,
        price: Number(body.price),
      },
      include: {
        teacher: true,
        _count: {
          select: {
            students: true,
          },
        },
      },
    });
    return createSend(res, course);
  } catch (error) {
    console.log(error);

    errorCreate(res, error);
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    let body: ICourse = req.body;
    const id = Number(req.params.id);
    let query: any = {};
    console.log(body);

    if (body.status) {
      let started_data = body.started_data;
      let price = Number(body.price);
      console.log(33);

      if (started_data && price && price > 0) {
        console.log(22);

        await startCourses({ ...body, id: id });
        return res.status(201).send({
          message: "Course updated successfully",
        });
      } else {
        throw new Error(`You must provide price and started_data`);
      }
    } else {
      Object.keys(body).map((key) => {
        if (key !== "started_data") {
          query[key] = (body as any)[key];
        }
      });
    }

    const courseel = await prisma.course.update({
      where: { id },
      data: { ...query },
      include: {
        teacher: true,
      },
    });
    return updateSend(res, courseel);
  } catch (error) {
    errorUpdate(res, error);
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return deleteSend(res, deletedTeacher.id);
  } catch (error) {
    errorDelete(res, error);
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findMany({
      include: {
        _count: {
          select: {
            studentDebt: {
              where: {
                debt_summa: true,
              },
            },
          },
        },
      },
    });

    return getSend(res, course);
  } catch (error) {
    return errorGet(res, error);
  }
};
export const getCourses = async (req: Request, res: Response) => {
  try {
    const { status, students } = req.query;
    let query: any = {};
    const user = (req as custumRequest).user;
    if (status === "group") {
      query.status = true;
    } else if (status === "black") {
      query.status = false;
    }
    let include: any = {};

    if (user.type === "TEACHER") {
      query.teacher_id = user.id;
    }

    if (students) {
      include.students = students;
    }

    myF();

    const course = await prisma.course.findMany({
      where: {
        AND: {
          ...query,
        },
      },
      include: {
        teacher: true,
        room: true,
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

    return getSend(res, course);
  } catch (error) {
    return errorGet(res, error);
  }
};
