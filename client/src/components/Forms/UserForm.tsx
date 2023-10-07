// import React from 'react'

import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { selectDraw, setClose } from "../../context/drawerSlicde";
import axiosFetch from "../../utils/axiosFetch";
import { editTableData, pushTableData } from "../../context/appSlice";

const FormDisabledDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const draw = useAppSelector(selectDraw);
  const [form] = Form.useForm();
  useEffect(() => {
    if (draw.open) {
      form.resetFields();
    }
  }, [draw]);
  const onFinish = async (value: any) => {
    try {
      const id = draw.initialValues ? "/" + draw.initialValues.id : "";
      const data = await axiosFetch("teacher" + id, {
        method: draw.method,
        data: {
          first_name: value.first_name,
          last_name: value.last_name,
          phone_number: value.phone_number,
          password: value.password,
          payout_percentage: Number(value.payout_percentage) / 100,
          type: "ADMIN",
        },
      });
      if (data.data) {
        if (draw.method === "POST") {
          dispatch(pushTableData(data.data.data));
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
      form={form}
      initialValues={draw.initialValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Familiya ism"
        name="first_name"
        rules={[{ required: true, message: "Iltimos ism kiriting" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ism"
        name="last_name"
        rules={[{ required: true, message: "Iltimos familia kiriting" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Telefon raqam"
        name="phone_number"
        rules={[{ required: true, message: "Iltimos telefon raqam kiriting" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Iltimos telefon raqam kiriting" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Oylik Foizi"
        name="payout_percentage"
        rules={[{ required: true, message: "Iltimos telefon raqam kiriting" }]}
      >
        <InputNumber placeholder="Foizda" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Saqlash
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
