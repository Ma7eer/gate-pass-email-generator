import React, { useState, useRef, useEffect } from "react";
import { Layout, Menu, Button, Table, Input, Icon } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import "./App.css";

const { Header, Content, Footer } = Layout;

// TODO:
// ant design font sizes
// pick router
// when click on nav bar we navigate
// create form for adding new company
// plug it in to add new company
// give notification when new company added

/*
 * Code on this page is a modified version of the example on ant design page: https://ant.design/components/layout/
 * This is a combination of `Customized filter panel` & `Custom selection`
 * The code was refactored to use react hooks
 */

const App = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const nodeRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3001/companies").then(res => {
      let d = [];
      for (let i = 0; i < res.data.length; i++) {
        d.push({
          key: res.data[i].id,
          id: res.data[i].id,
          company: res.data[i].name,
          action: "select, edit, delete"
        });
      }
      setData(d);
    });
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={nodeRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => nodeRef.current.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      ...getColumnSearchProps("company")
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action"
    }
  ];

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Add Company</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "2%" }}>
        <Table columns={columns} dataSource={data} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
