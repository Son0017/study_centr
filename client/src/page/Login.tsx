import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axiosFetch from "../utils/axiosFetch";
import { useAppDispatch } from "../context/store";
import { setUser } from "../context/userSlice";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log(values);

    try {
      setLoading(true);
      const res = await axiosFetch({
        url: "/teacher/login",
        method: "post",
        data: values,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/admin");
      dispatch(setUser(res.data));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h3 style={{ textAlign: "center", color: "var(--main-color)" }}>
          Study Center
        </h3>
        <Form
          style={{ maxWidth: 300 }}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="login"
            rules={[{ required: true, message: "Please input your Login!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Login"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Parol"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
