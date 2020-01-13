import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const HeaderComponent = ({ navigationMenuItems }) => (
  <Header className="header">
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["0"]}
      style={{ lineHeight: "64px" }}
    >
      {navigationMenuItems.map((item, index) => (
        <Menu.Item key={index}>
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  </Header>
);

HeaderComponent.propTypes = {
  navigationMenuItems: PropTypes.array
};

export default HeaderComponent;
