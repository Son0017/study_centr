import prisma from "../connection/prisma";
import { ICourse } from "../interface/allInterface";
import { findDay } from "../utils/finfOutDay";

export const statusChaker = (body: ICourse) => {
  let result = { ...body };
  if (body.status) {
    if (!body.price && body.price > 0) {
      throw new Error("you must provide a price");
    }
    if (!body.started_data) {
      throw new Error("you must provide a started data");
    }
  } else {
    result.status = false;
    result.started_data = body.started_data || null;
    result.price = body.price || 0;
  }
  return result;
};

export const startCourses = async (body: ICourse) => {
  let started_data = new Date(body.started_data as any);
  let findDays = findDay(started_data as any);
  const students = await prisma.studentsCourses.findMany({
    where: {
      course_id: body.id,
    },
  });
  let newPrice = Math.ceil((body.price / 30000) * findDays) * 1000;

  const datas = await prisma.$transaction(async (prisma) => {
    try {
      for (let i = 0; i < students.length; i++) {
        await prisma.studentsCourses.update({
          where: {
            student_id_course_id: {
              student_id: students[i].student_id,
              course_id: students[i].course_id,
            },
          },
          data: {
            student_acsept_date: started_data,
            debt_summa: newPrice,
          },
        });
      }
      await prisma.course.update({
        where: {
          id: body.id,
        },
        data: {
          status: body.status,
          started_data: started_data,
          price: body.price,
        },
      });
    } catch (error) {
      throw error;
    }
  });
  return datas;
};
