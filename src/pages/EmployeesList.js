import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Input, Icon } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { url } from "../data/api";

import Content from "../components/Content/employees";

const path = `${url}/employees`;

/*
 * Code on this page is a modified version of the example on ant design page: https://ant.design/components/layout/
 * This is a combination of `Customized filter panel` & `Custom selection`
 * The code was refactored to use react hooks
 */

const EmployeesListPage = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [urlDataString, setUrlDataString] = useState("");
  let { company_id } = useParams();

  const nodeRef = useRef(null);

  useEffect(() => {
    axios.get(path + `/${company_id}`).then(res => {
      let d = [];
      for (let i = 0; i < res.data.rows.length; i++) {
        d.push({
          key: i,
          id: res.data.rows[i].employee_id,
          name: res.data.rows[i].employee_name.toUpperCase(),
          civilId: res.data.rows[i].employee_civilid,
          action: "select, edit, delete"
        });
      }
      setData(d);
    });
  }, [company_id]);

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

  const onSelectChange = (selectedRowKeys, row) => {
    // console.log(row);
    setSelectedRowKeys(selectedRowKeys);
    setRowData(row);
  };

  const handleDelete = async rowData => {
    try {
      // console.log(rowData);
      if (
        // eslint-disable-next-line no-restricted-globals
        confirm(`Are you sure you want to delete ${rowData.name}?`)
      ) {
        await axios.delete(path, { data: { id: rowData.id } });
        await setData(prevState => {
          let arr = [...prevState];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === rowData.id) {
              arr.splice(i, 1);
            }
          }
          console.log(arr);
          return arr;
        });
        toastr.success("Deleted employee successfully");
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
      toastr.error("Failed to delete employee");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name")
    },
    {
      title: "Civil ID",
      dataIndex: "civilId",
      key: "civilId",
      ...getColumnSearchProps("civilId")
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (col, row) => {
        let name = "";
        let civilId = "";
        let dataString = "";
        for (let i = 0; i < rowData.length; i++) {
          if (name.length > 0) {
            name = name + "," + rowData[i].name;
          } else {
            name = rowData[i].name;
          }
          if (civilId.length > 0) {
            civilId = civilId + "," + rowData[i].civilId;
          } else {
            civilId = rowData[i].civilId;
          }
        }
        if (dataString.length > 0) {
        }
        if (name.length > 0 && civilId.length > 0) {
          dataString = `${name}/${civilId}`;
          setUrlDataString(dataString);
        } else {
          dataString = "";
          setUrlDataString(dataString);
        }
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="default" style={{ margin: "2px" }}>
              Edit
            </Button>
            <Button
              type="danger"
              style={{ margin: "2px" }}
              onClick={() => handleDelete(row)}
            >
              Delete
            </Button>
          </div>
        );
      }
    }
  ];

  const addRow = items => {
    setData(prevState => {
      let d = [...prevState];
      // console.log(data.length);
      d.push({
        key: data.length + 1,
        id: data.length + 1,
        name: items.employeeName.toUpperCase(),
        civilId: items.employeeCivilId,
        action: "select, edit, delete"
      });
      return d;
    });
    toastr.success(`Added company data successfully`);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ margin: "2px" }}
        onClick={() =>
          rowData.length > 0 ? null : toastr.info(`Please select employee`)
        }
      >
        {rowData.length > 0 ? (
          <Link to={`/generatedEmail/${urlDataString}`}>Select</Link>
        ) : (
          "Select"
        )}
      </Button>
      <Content
        rowSelection={rowSelection}
        columns={columns}
        data={data}
        companyId={company_id}
        addRow={addRow}
      />
    </>
  );
};

export default EmployeesListPage;
