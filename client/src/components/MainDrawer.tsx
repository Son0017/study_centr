import React from "react";
import { Drawer } from "antd";
import Payment from "../components/Forms/PaymentForm";
import StudentForm from "../components/Forms/StudentForm";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { selectDraw, setClose } from "../context/drawerSlicde";
import {
  GROUP_FORM,
  PAYMENT_FORM,
  STUDENT_COURSE_FORM,
  STUDENT_FORM,
  TEACHER_FORM,
} from "../constant/constant";
import TeacherForm from "./Forms/TeacherForm";
import GroupForm from "./Forms/GroupForm";
import StudentCourseForm from "./Forms/StudentCourseForm";

const MainDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectDraw);
  const onClose = () => {
    dispatch(setClose());
  };
  return (
    <>
      <Drawer
        title={state.title}
        placement="right"
        onClose={onClose}
        open={state.open}
      >
        {state.component === PAYMENT_FORM && <Payment></Payment>}
        {state.component === STUDENT_FORM && <StudentForm></StudentForm>}
        {state.component === TEACHER_FORM && <TeacherForm></TeacherForm>}
        {state.component === GROUP_FORM && <GroupForm></GroupForm>}
        {state.component === STUDENT_COURSE_FORM && (
          <StudentCourseForm></StudentCourseForm>
        )}
      </Drawer>
    </>
  );
};

export default MainDrawer;
