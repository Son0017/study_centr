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

export const createCourse = async (req: Request, res: Response) => {
  try {
    let body: ICourse = req.body;
    body = statusChaker(body);
    const course = await prisma.course.create({
      data: body,
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
    const course = await prisma.course.findFirst({
      where: { id },
    });
    if (body.status && !course?.status) {
      let started_data = body.started_data
        ? body.started_data
        : course?.started_data;
      let price = body.price ? body.price : course?.price;
      if (started_data && price && price > 0) {
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
            students: {
              where: {
                debt_summa: {
                  gt: 1000,
                },
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
