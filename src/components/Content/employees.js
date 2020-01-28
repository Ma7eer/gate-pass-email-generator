import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button } from "antd";
import axios from "axios";

import { Layout, Table } from "antd";

import { url } from "../../data/api";

let path = `${url}/employees`;

const { Content } = Layout;

const ContentComponent = ({
  columns,
  data,
  rowSelection,
  addRow,
  companyId
}) => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeCivilId, setEmployeeCivilId] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    await setEmployeeName("");
    await setEmployeeCivilId("");
    try {
      let res = await axios.post(path, {
        employee_name: employeeName,
        employee_civilId: employeeCivilId,
        company_id: companyId
      });

      if (res.status === 201) {
        // console.log(res);
        addRow({ employeeName, employeeCivilId });
      }
    } catch (e) {
      console.log(e);
    }
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
        {showInput === "HIDDEN" ? "Add Employee" : "Hide Input"}
      </Button>
      {showInput === "SHOW" ? (
        <Form
          className="login-form"
          // style={{ margin: "0 auto", marginTop: "16%", marginBottom: "17%" }}
          onSubmit={handleSubmit}
        >
          <Form.Item>
            <label>Enter Employee Name: </label>
            <Input
              prefix={
                <Icon type="user-add" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Company Name"
              required
              // value={companyName}
              onChange={e => setEmployeeName(e.target.value)}
              value={employeeName}
            />
          </Form.Item>
          <Form.Item>
            <label>Enter Employee Civil Id: </label>
            <Input
              prefix={
                <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Employee Civil Id"
              required
              // value={companyName}
              onChange={e => setEmployeeCivilId(e.target.value)}
              value={employeeCivilId}
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
