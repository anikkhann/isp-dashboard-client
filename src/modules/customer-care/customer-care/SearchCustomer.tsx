/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomerData } from "@/interfaces/CustomerData";
import AppRowContainer from "@/lib/AppRowContainer";
import {
  Breadcrumb,
  Button,
  Card,
  Input,
  Select,
  Space,
  Table,
  Tag
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ability from "@/services/guard/ability";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { AlignType } from "rc-table/lib/interface";
import { EyeOutlined } from "@ant-design/icons";
import { format } from "date-fns";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const SearchCustomer = () => {
  const [data, setData] = useState<CustomerData[]>([]);

  const MySwal = withReactContent(Swal);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);

  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });

  const [customerIds, setCustomerIds] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<any>(null);

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [selectedMobile, setSelectedMobile] = useState<any>(null);

  const getCustomers = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        // isActive: true
      }
    };
    const { data } = await axios.post("/api/customer/get-list", body);

    // console.log("data.body", data);
    if (data.status != 200) {
      MySwal.fire({
        title: "Error",
        text: data.message || "Something went wrong",
        icon: "error"
      });
    }

    if (!data.body) return;

    const list = data.body.map((item: any) => {
      return {
        label: item.username,
        value: item.username
      };
    });
    setCustomers(list);

    const customerIds = data.body.map((item: any) => {
      return {
        label: item.customerId,
        value: item.customerId
      };
    });
    setCustomerIds(customerIds);
  };

  const handleCustomerIDChange = (value: any) => {
    setSelectedCustomerId(value);
  };

  const handleUsernameChange = (value: any) => {
    setSelectedCustomer(value);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleClear = () => {
    setSelectedCustomerId(null);
    setSelectedCustomer(null);
    setSelectedEmail(null);
    setSelectedMobile(null);
    setData([]);
  };

  const handleSubmit = async (
    page: number,
    limit: number,
    order: string,
    sort: string,
    customerIdParam?: string,
    usernameParam?: string,
    emailParam?: string,
    mobileParam?: string
  ) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      meta: {
        limit: limit,
        page: page === 0 ? 0 : page - 1,
        sort: [
          {
            order: order,
            field: sort
          }
        ]
      },
      body: {
        customerId: customerIdParam,
        username: usernameParam,
        email: emailParam,
        mobile: mobileParam
      }
    };

    const { data } = await axios.post("/api/customer/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (data) {
      // console.log("data.data", data);

      if (data.body) {
        setData(data.body);
        setTableParams({
          pagination: {
            pageSize: data.meta.limit,
            current: (data.meta.page as number) + 1,
            pageSizeOptions: ["10", "20", "30", "40", "50"]
          }
        });
      } else {
        setData([]);
        setTableParams({
          pagination: {
            total: 0,
            pageSize: 10,
            current: 1,
            pageSizeOptions: ["10", "20", "30", "40", "50"]
          }
        });
      }
    }
  };
  function subOneDay(date = new Date()) {
    date.setDate(date.getDate() - 1);

    return date;
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CustomerData> | SorterResult<CustomerData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<CustomerData>).order) {
      // // console.log((sorter as SorterResult<CustomerData>).order)

      SetOrder(
        (sorter as SorterResult<CustomerData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<CustomerData>).field) {
      // // console.log((sorter as SorterResult<CustomerData>).field)

      SetSort((sorter as SorterResult<CustomerData>).field as string);
    }
  };

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  // console.log(error, isLoading, isError)

  const columns: ColumnsType<CustomerData> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return (
          <>
            <Space>{page !== 1 ? index + 1 + page * limit : index + 1}</Space>
          </>
        );
      },
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Zone",
      dataIndex: "distributionZone",
      sorter: false,
      render: (distributionZone: any) => {
        if (!distributionZone) return "-";
        return <>{distributionZone.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Pop",
      dataIndex: "distributionPop",
      sorter: false,
      render: (distributionPop: any) => {
        if (!distributionPop) return "-";
        return <>{distributionPop.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Connection Address",
      dataIndex: "connectionAddress",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Credits",
      dataIndex: "credits",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Package",
      dataIndex: "customerPackage",
      sorter: false,
      render: (customerPackage: any) => {
        if (!customerPackage) return "-";
        return <>{customerPackage.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationTime",
      sorter: false,
      render: (expirationTime: any) => {
        if (!expirationTime) return "-";
        const date = new Date(expirationTime);
        const result2 = subOneDay(date);
        const today = new Date();

        const isDateGreen = result2 >= today;
        const color = isDateGreen ? "green" : "red";

        return <span style={{ color }}>{format(result2, "yyyy-MM-dd")}</span>;
        // return <>{format(result2, "yyyy-MM-dd pp")}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Status",
      dataIndex: "isActive",
      sorter: true,
      render: (isActive: any) => {
        return (
          <>
            {isActive ? (
              <Tag color="blue">Active</Tag>
            ) : (
              <Tag color="red">Inactive</Tag>
            )}
          </>
        );
      },
      width: "20%",
      align: "center" as AlignType
    },
    // insertedBy
    // {
    //   title: "Created By",
    //   dataIndex: "insertedBy",
    //   sorter: false,
    //   render: (insertedBy: any) => {
    //     if (!insertedBy) return "-";
    //     return <>{insertedBy.name}</>;
    //   },
    //   width: "20%",
    //   align: "center" as AlignType
    // },
    // createdOn
    {
      title: "Creation/Onboard Date",
      dataIndex: "createdOn",
      sorter: false,
      render: (createdOn: any) => {
        if (!createdOn) return "-";
        const date = new Date(createdOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    // editedBy
    // {
    //   title: "Updated By",
    //   dataIndex: "editedBy",
    //   sorter: false,
    //   render: (editedBy: any) => {
    //     if (!editedBy) return "-";
    //     return <>{editedBy.name}</>;
    //   },

    //   width: "20%",
    //   align: "center" as AlignType
    // },
    // updatedOn
    // {
    //   title: "Updated At",
    //   dataIndex: "updatedOn",
    //   sorter: false,
    //   render: (updatedOn: any) => {
    //     if (!updatedOn) return "-";
    //     const date = new Date(updatedOn);
    //     return <>{format(date, "yyyy-MM-dd pp")}</>;
    //   },
    //   width: "20%",
    //   align: "center" as AlignType
    // },
    {
      title: "Action",
      dataIndex: "action",
      sorter: false,
      render: (text: any, record: any) => {
        return (
          <>
            <Space size="middle" align="center">
              {ability.can("customer.view", "") ? (
                <Space size="middle" align="center" wrap>
                  <Link href={`/admin/customer-care/${record.id}`}>
                    <Button type="primary" icon={<EyeOutlined />} />
                  </Link>
                </Space>
              ) : null}
            </Space>
          </>
        );
      },
      align: "center" as AlignType
    }
  ];

  return (
    <>
      <AppRowContainer>
        <Breadcrumb
          style={{
            margin: "10px 30px",
            textAlign: "left"
          }}
          items={[
            {
              title: <Link href="/admin">Home</Link>
            },
            {
              title: (
                <Link href="/admin/customer-care">Customer Care Dashboard</Link>
              )
            },
            {
              title: "Customer Care"
            }
          ]}
        />
        <div
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",

            textAlign: "center"
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              color: "#F15F22"
            }}
          >
            Customer Care
          </h1>
        </div>

        <Card
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            overflow: "scroll",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
            border: "1px solid #F15F22"
          }}
        >
          <>
            <Space style={{ marginBottom: 16 }}>
              <Space style={{ width: "100%" }} direction="vertical">
                <span>
                  <b>Customer Id</b>
                </span>
                <Select
                  allowClear
                  style={{
                    width: "100%",
                    textAlign: "start"
                  }}
                  placeholder="Please select"
                  onChange={handleCustomerIDChange}
                  options={customerIds}
                  value={selectedCustomerId}
                  showSearch
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                />
              </Space>

              <Space style={{ width: "100%" }} direction="vertical">
                <span>
                  <b>Username</b>
                </span>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%", textAlign: "start" }}
                  placeholder="Please select"
                  onChange={handleUsernameChange}
                  options={customers}
                  value={selectedCustomer}
                />
              </Space>

              <Space style={{ width: "100%" }} direction="vertical">
                <span>
                  <b>Email</b>
                </span>
                <Input
                  type="text"
                  className="ant-input"
                  placeholder="Email"
                  value={selectedEmail}
                  onChange={e => setSelectedEmail(e.target.value)}
                />
              </Space>

              <Space style={{ width: "100%" }} direction="vertical">
                <span>
                  <b>Mobile</b>
                </span>
                <Input
                  type="text"
                  className="ant-input"
                  placeholder="Mobile"
                  value={selectedMobile}
                  onChange={e => setSelectedMobile(e.target.value)}
                />
              </Space>

              <Button
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "25px",
                  backgroundColor: "#0e8fdc",
                  color: "#ffffff"
                }}
                onClick={() => {
                  handleSubmit(
                    page,
                    limit,
                    order,
                    sort,
                    selectedCustomerId,
                    selectedCustomer,
                    selectedEmail,
                    selectedMobile
                  );
                }}
                className="ant-btn  ant-btn-lg"
              >
                Submit
              </Button>

              <Button
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "25px",
                  backgroundColor: "#F15F22",
                  color: "#ffffff"
                }}
                onClick={() => {
                  handleClear();
                }}
                className="ant-btn  ant-btn-lg"
              >
                Clear filters
              </Button>
            </Space>
          </>

          {data && data.length > 0 ? (
            <Table
              style={{ overflow: "scroll" }}
              columns={columns}
              rowKey={record => record.id}
              dataSource={data}
              pagination={tableParams.pagination}
              onChange={handleTableChange}
            />
          ) : null}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default SearchCustomer;
