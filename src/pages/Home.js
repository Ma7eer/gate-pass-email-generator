import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Icon } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

import { url } from "../data/api";

import Content from "../components/Content";

const path = `${url}/companies`;

/*
 * Code on this page is a modified version of the example on ant design page: https://ant.design/components/layout/
 * This is a combination of `Customized filter panel` & `Custom selection`
 * The code was refactored to use react hooks
 */

const HomePage = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const nodeRef = useRef(null);

  useEffect(() => {
    axios
      .get(path, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") }
      })
      .then(res => {
        let d = [];
        for (let i = 0; i < res.data.length; i++) {
          d.push({
            key: res.data[i].company_id,
            id: res.data[i].company_id,
            company: res.data[i].company_name.toUpperCase(),
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
      key: "action",
      render: (col, row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" style={{ margin: "2px" }}>
            <Link to={`/employeesList/${row.id}`}>Select</Link>
          </Button>
          <Button type="default" style={{ margin: "2px" }}>
            Edit
          </Button>
          <Button type="danger" style={{ margin: "2px" }}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return <Content columns={columns} data={data} />;
};

export default HomePage;
