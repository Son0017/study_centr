import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
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
      let sendValue: any = {};
      if (draw.method === "POST") {
        sendValue.visited_date = draw.method === "POST" && new Date();
        sendValue.status = draw.method === "POST" && false;
      }

      const data = await axiosFetch("student" + id, {
        method: draw.method,
        data: {
          ...value,
          ...sendValue,
        },
      });
      if (data.data?.succes) {
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
      initialValues={draw.initialValues}
      onFinish={onFinish}
      form={form}
      autoComplete="off"
    >
      <Form.Item
        label=" Ism"
        name="first_name"
        rules={[{ required: true, message: "Iltimos ism kiriting" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Familiya"
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Form.Item>
    </Form>
  );
};

export default () => <FormDisabledDemo />;
