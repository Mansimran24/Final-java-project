import React, { useState } from "react";
import axios from "axios";
import Navbar from "./../components/Navbar"
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Typography,
  Cascader,
} from "antd";
const { Title} = Typography;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
};

const names = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "John",
    label: "John",
  },
  {
    value: "Rose",
    label: "Rose",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
    const authorname = values.authorname;
    const title = values.title;
    const blog = values.blog;

    axios
      .post("http://localhost:9000/api/blogs-create", {
        title: title,
        blog: blog,
        authorname: authorname,
      })
      .then(() => {
        console.log("added successfully");
        navigate("/home");
      })
      .catch((res) => console.log("Failed to add", res));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
     <>
     <Navbar />
    <Row style={{ marginTop: "20vh" }}>
      <Col span={12} offset={4}>
        <Title className="title">Create Blog</Title>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          initialValues={{
            names: ["Admin"],
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="authorname"
            label="Author"
            rules={[{ required: true, message: "Please select author!" }]}
          >
            <Cascader options={names} />
          </Form.Item>
          <Form.Item
            name="blog"
            label="Content"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
     </>
  );
};

export default Dashboard;
