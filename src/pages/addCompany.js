import React from "react";
import { Form, Icon, Input, Button } from "antd";

const AddCompanyPage = () => {
  return (
    <>
      <Form
        className="login-form"
        style={{ margin: "0 auto", marginTop: "16%", marginBottom: "17%" }}
      >
        <Form.Item>
          <label>Enter Company Name: </label>
          <Input
            prefix={
              <Icon type="usergroup-add" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Company Name"
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCompanyPage;
