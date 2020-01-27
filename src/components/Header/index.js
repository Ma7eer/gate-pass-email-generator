import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const HeaderComponent = () => (
  <Header className="header">
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["0"]}
      style={{ lineHeight: "64px" }}
    >
      {window.netlifyIdentity && window.netlifyIdentity.currentUser() ? (
        <Menu.Item key="0">
          <Link to="/Home">Home</Link>
        </Menu.Item>
      ) : null}
    </Menu>
  </Header>
);

export default HeaderComponent;
