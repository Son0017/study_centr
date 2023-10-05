import prisma from "../connection/prisma";
import { ICourse, IStudent } from "../interface/allInterface";
import { findDay } from "../utils/finfOutDay";

interface IStudentNew extends IStudent {
  course: ICourse;
}

// qoralama qurs uchun qilingan kunliklar hisoblanilmagan

export const studentConnection = async (body: IconStu) => {
  let debt_summa = 0;
  let newDate = null;
  if (body.course.status) {
    newDate = new Date();
    let findDays = findDay(newDate as any);
    debt_summa = Math.ceil((body.course.price / 30000) * findDays) * -1000;
  }
  const studentCourse = await prisma.studentsCourses.create({
    data: {
      student_id: body.id,
      course_id: body.course.id,
      debt_summa,
      student_acsept_date: newDate,
    },
  });
  return studentCourse;
};

export const notStudentConnection = async (body: IStudentNew) => {
  const student_id = await prisma.student.create({
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
      visited_date: body.visited_date,
      status: body.course.status ? true : false,
    },
    select: {
      id: true,
    },
  });
  const studentCourse = await studentConnection({ ...body, id: student_id.id });
  return studentCourse;
};

interface IconStu {
  id: number;
  course: ICourse;
}
