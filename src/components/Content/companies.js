import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button } from "antd";
import axios from "axios";

import { Layout, Table } from "antd";

import { url } from "../../data/api";

let path = `${url}/companies`;

const { Content } = Layout;

const ContentComponent = ({ columns, data, rowSelection, addRow }) => {
  const [companyName, setCompanyName] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    await setCompanyName("");
    await axios.post(path, { company_name: companyName }).then(res => {
      if (res.status === 201) {
        // console.log(res);
        addRow(companyName);
      }
    });
  };
  const [showInput, setShowInput] = useState("HIDDEN");
  const handleClick = () => {
    let status;
    switch (showInput) {
      case "HIDDEN":
        status = "SHOW";
        break;
      case "SHOW":
        status = "HIDDEN";
        break;
      default:
        status = "";
    }
    setShowInput(status);
  };
  return (
    <Content style={{ padding: "0 50px", marginTop: "2%" }}>
      <Button type="primary" onClick={handleClick}>
        {showInput === "HIDDEN" ? "Add Company" : "Hide Input"}
      </Button>
      {showInput === "SHOW" ? (
        <Form
          className="login-form"
          // style={{ margin: "0 auto", marginTop: "16%", marginBottom: "17%" }}
          onSubmit={handleSubmit}
        >
          <Form.Item>
            <label>Enter Company Name: </label>
            <Input
              prefix={
                <Icon
                  type="usergroup-add"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              placeholder="Company Name"
              required
              // value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              value={companyName}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : null}

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        bordered
      />
    </Content>
  );
};

ContentComponent.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

export default ContentComponent;
