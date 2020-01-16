import React from "react";
import PropTypes from "prop-types";

import { Layout, Table } from "antd";

const { Content } = Layout;

const ContentComponent = ({ columns, data, rowSelection }) => (
  <Content style={{ padding: "0 50px", marginTop: "2%" }}>
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      bordered
    />
  </Content>
);

ContentComponent.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

export default ContentComponent;
