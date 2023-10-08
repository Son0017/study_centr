// import React from 'react'

import React from "react";
import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { selectDraw, setClose } from "../../context/drawerSlicde";
import axiosFetch from "../../utils/axiosFetch";
import { setMessage } from "../../context/appSlice";

const FormDisabledDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const draw = useAppSelector(selectDraw);
  const onFinish = async () => {
    try {
      const data = await axiosFetch("studentDebt/" + draw.initialValues.id, {
        method: "PATCH",
        data: {
          debt_summa: false,
        },
      });
      if (data.data) {
        dispatch(setClose());
        dispatch(
          setMessage({
            type: "success",
            content: "tolandi",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        layout="horizontal"
        initialValues={draw.initialValues}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Summa" name={"summa"}>
          <Input width={draw.width ? draw.width : 400} disabled />
        </Form.Item>
        <Form.Item label="Button">
          <Button type="primary" htmlType="submit">
            To`lov
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default () => <FormDisabledDemo />;
