import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      localStorage.setItem("cms-auth", response.user.accessToken);
      localStorage.setItem("cmsUser", response?.user.email);
      navigate("/");
    } catch (error) {
      openNotification();
      setLoading(false);
      setError(error.message);
    }
  };

  const openNotification = () => {
    notification.error({
      message: "Authentication failed",
    });
  };

  return (
    <div className="flex flex-col items-center  mx-auto justify-center h-screen">
      <div className=" w-3/12 p-4">
        <Form form={form} className=" w-full " name="basic" onFinish={onFinish}>
          <label className="fieldLabel" htmlFor="email">
            Email
          </label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              type="email"
              className="customAntInput"
              size="large"
            />
          </Form.Item>

          <label className="fieldLabel" htmlFor="password">
            Password
          </label>
          <Form.Item
            className="mbZero"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              style={{ borderRadius: 7 }}
              placeholder="Enter your password"
              className="customAntInput"
              size="large"
            />
          </Form.Item>
          <p style={{ color: "red" }}>{error}</p>
        </Form>
        <div className={styles.submitBtn}>
          <Button
            loading={loading}
            onClick={() => form.submit()}
            className="custom-ant-button"
            shape="round"
            style={{ width: "85%" }}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
