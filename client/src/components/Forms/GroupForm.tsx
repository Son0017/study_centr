import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { selectDraw, setClose } from "../../context/drawerSlicde";
import axiosFetch from "../../utils/axiosFetch";
import { editTableData, pushTableData } from "../../context/appSlice";
import useFetchHook from "../../hooks/useFetchHook";
import { weeks } from "../../constant/constant";

const FormDisabledDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const draw = useAppSelector(selectDraw);
  const [form] = Form.useForm();
  // let id = draw.method === "PATCH" ? "/" + draw.initialValues?.teacher.id : "";

  const { data } = useFetchHook("teacher");
  const [room, setRoom] = useState<any>();
  const fetchData = async () => {
    try {
      const data = await axiosFetch("room");

      if (data.data.succes) {
        setRoom(data.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let option = data?.map((item: any) => {
    return {
      value: item.id,
      label: item.last_name.charAt() + "." + item.first_name,
    };
  });
  let roomOprion = room?.map((item: any) => {
    return { value: item.id, label: item.name };
  });

  useEffect(() => {
    if (draw.open) {
      form.resetFields();
    }
    fetchData();
  }, [draw]);

  const onFinish = async (value: any) => {
    try {
      const id = draw.initialValues ? "/" + draw.initialValues.id : "";
      let sendValue: any = {};
      let x = "";
      console.log(value);

      if (draw.method === "POST") {
        sendValue.started_data = null;
        sendValue.status = false;
        value.week_days.map((item: any, i: number) => {
          if (i === 0) {
            x += item;
          } else {
            x += "," + item;
          }
          return x;
        });

        value.week_days = x;
      } else {
        sendValue.started_data = new Date();
      }

      const data = await axiosFetch("course" + id, {
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
      style={{ textTransform: "capitalize" }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Iltimos Nomni kiriting" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Narxi" name="price">
        <Input />
      </Form.Item>

      <Form.Item
        label="Time"
        name="time"
        rules={[{ required: true, message: "Iltimos vaqt kiriting" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Fan"
        name="subject"
        rules={[{ required: true, message: "Iltimos Fan kiriting" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Davomiyligi"
        name="duration"
        rules={[{ required: true, message: "Iltimos Davomiyligi kiriting" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Hafta Kuni"
        name="week_days"
        rules={[{ required: true, message: "Iltimos telefon raqam kiriting" }]}
      >
        <Checkbox.Group style={{ width: "100%" }} name="week_days">
          <Row>
            {weeks.map((item, i) => {
              return (
                <Col span={8}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        name="room_id"
        label="Hona"
        rules={[{ required: true, message: "Hona biriktiring" }]}
      >
        <Select
          placeholder="select teacher"
          allowClear
          options={roomOprion}
        ></Select>
      </Form.Item>
      <Form.Item
        name="teacher_id"
        label="Teacher"
        rules={[{ required: true, message: "Ustoz biriktiring" }]}
      >
        <Select
          placeholder="select teacher"
          allowClear
          options={option}
        ></Select>
      </Form.Item>
      <Form.Item label="Status" name="status" valuePropName="checked">
        <Checkbox disabled={draw.method === "POST" ? true : false}>
          Checkbox
        </Checkbox>
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
