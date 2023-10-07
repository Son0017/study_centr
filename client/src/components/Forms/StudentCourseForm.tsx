// import React from 'react'

import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { selectDraw, setClose } from "../../context/drawerSlicde";
import axiosFetch from "../../utils/axiosFetch";
import { editTableData, pushTableData } from "../../context/appSlice";
import useFetchHook from "../../hooks/useFetchHook";

const FormDisabledDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const draw = useAppSelector(selectDraw);
  const [form] = Form.useForm();
  const [student, setStudents] = useState<any>([]);
  const [myData, setMydata] = useState<any>();
  let id = draw.initialValues.id;
  const { data } = useFetchHook("student?course_id=" + id);
  const onSearch = async (e: string) => {
    try {
      const data = await axiosFetch(
        "student?course_id=" + id + "&" + "search=" + e
      );
      const res = data.data;

      if (res) {
        setMydata(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const option = myData?.map((value: any) => {
    return {
      value:
        value.id +
        "," +
        value.first_name.toLowerCase() +
        " " +
        value.last_name.toLowerCase(),
      label: value.first_name + " " + value.last_name,
    };
  });
  useEffect(() => {
    setMydata(data);
  }, [data, id]);

  useEffect(() => {
    if (draw.open) {
      form.resetFields();
    }
  }, [draw]);
  const onFinish = async (value: any) => {
    try {
      value.id = value.id.map((item: any) => {
        return item.split(",")[0];
      });

      const data = value.id.map((i: any) => {
        console.log(id, i);
        return axiosFetch("studentsCourses", {
          method: draw.method,
          data: {
            id: Number(i),
            courseId: Number(id),
          },
        });
      });

      const allData = await Promise.all(data as any);

      if (allData) {
        if (draw.method === "POST") {
          allData.map((item: any) => {
            if (item.data.data) {
              dispatch(pushTableData(item.data.data));
            }
          });
        } else {
          dispatch(editTableData(data.data.data));
        }
        dispatch(setClose());
        form.resetFields();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      name="basic"
      initialValues={student}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item name="id" label="Student">
        <Select
          placeholder="select student"
          allowClear
          mode="tags"
          onSearch={onSearch}
          options={option}
          value={myData}
          onChange={(i) => {
            setStudents(i);
          }}
        ></Select>
      </Form.Item>
      <Form.Item
        label=" Ism"
        name="first_name"
        rules={[
          {
            required: student.length > 0 ? false : true,
            message: "Iltimos ism kiriting",
          },
        ]}
      >
        <Input disabled={student.length > 0 ? true : false} />
      </Form.Item>
      <Form.Item
        label="Familiya"
        name="last_name"
        rules={[
          {
            required: student.length > 0 ? false : true,
            message: "Iltimos familia kiriting",
          },
        ]}
      >
        <Input disabled={student.length > 0 ? true : false} />
      </Form.Item>
      <Form.Item
        label="Telefon raqam"
        name="phone_number"
        rules={[
          {
            required: student.length > 0 ? false : true,
            message: "Iltimos telefon raqam kiriting",
          },
        ]}
      >
        <Input disabled={student.length > 0 ? true : false} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Qo'shish
        </Button>
      </Form.Item>
    </Form>
  );
};

export default () => <FormDisabledDemo />;

// first_name
// last_name
// phone_number
// password
// type
// payout_percentage

// export default StudentCourseForm;
