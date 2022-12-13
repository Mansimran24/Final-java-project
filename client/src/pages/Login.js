import { Button, Checkbox, Form, Input,Row,Col} from 'antd';
import React from 'react'
import {useNavigate} from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

    const onFinish = (values) => {
       if (values.username === "admin" && values.password === "password123") {
      console.log("Login Successfull...!!");
      props.auth();
      navigate("/home");
      }else{
        alert("Invalid credentials");
      }
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <Row style={{ marginTop: "20vh" }}>
      <Col span={12} offset={4}>
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" block htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
     </Col>
    </Row>
  );
};

export default Login
