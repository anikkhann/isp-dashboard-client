/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActivityLogData } from "@/interfaces/ActivityLogData";
import AppRowContainer from "@/lib/AppRowContainer";
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  List,
  Select,
  Space,
  Table,
  Collapse
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { AlignType } from "rc-table/lib/interface";
import { format } from "date-fns";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { Can } from "@/services/guard/Can";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const SearchRetailerList = () => {
  const [data, setData] = useState<ActivityLogData[]>([]);
  const { Panel } = Collapse;
  const { RangePicker } = DatePicker;

  const MySwal = withReactContent(Swal);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);

  const [order, SetOrder] = useState("desc");
  const [sort, SetSort] = useState("createdOn");

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    }
  });

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);

  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

  const getCustomers = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "username"
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
        value: item.id
      };
    });
    setCustomers(list);
  };

  const handleUsernameChange = (value: any) => {
    setSelectedCustomer(value);
  };

  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = () => {
    setSelectedCustomer(null);
    setData([]);
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleSubmit = async (
    page: number,
    limit: number,
    order: string,
    sort: string,
    customerIdParam?: string,
    startDateParam?: string,
    endDateParam?: string
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
        customer: {
          id: customerIdParam
        },
        subject: "Retailer Update",
        dateRangeFilter: {
          field: "createdOn",
          startDate: startDateParam,
          endDate: endDateParam
        }
      }
    };

    const { data } = await axios.post("/api/activity-log/get-list", body, {
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

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const handleDateChange = (value: any) => {
    // console.log(value);

    if (value) {
      setSelectedDateRange(value);

      const startDate = dayjs(value[0]).format(dateFormat);
      const endDate = dayjs(value[1]).format(dateFormat);

      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);

      // console.log(startDate, endDate);
    } else {
      setSelectedDateRange(null);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  };

  // console.log(error, isLoading, isError)

  const columns: ColumnsType<ActivityLogData> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return <>{page !== 0 ? index + 1 + (page - 1) * limit : index + 1}</>;
      },
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Customer",
      dataIndex: "customer",
      sorter: false,
      render: (customer: any) => {
        if (!customer) return "-";
        return <>{customer?.username}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // subject
    {
      title: "Subject",
      dataIndex: "subject",
      sorter: false,
      render: (subject: any) => {
        if (!subject) return "-";
        return <>{subject}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // remarks
    {
      title: "Remarks",
      dataIndex: "remarks",
      sorter: false,
      render: (remarks: any) => {
        if (!remarks) return "-";
        return <>{remarks}</>;
      },

      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // changedData
    {
      title: "Changed Data",
      dataIndex: "changedData",
      sorter: false,
      render: (changedData: any) => {
        if (!changedData) return "-";

        if (changedData == "{}") return "-";

        if (changedData) {
          const jsonObject = JSON.parse(changedData) as Array<any>;

          const array = [];

          for (const object of jsonObject) {
            array.push(object);
          }

          return (
            <>
              <List>
                {array.map((checklist: any, index: number) => {
                  return (
                    <List.Item key={index}>
                      {checklist.key} : {checklist.oldValue} {"-> "}
                      {checklist.currentValue},
                    </List.Item>
                  );
                })}
              </List>
            </>
          );
        }

        return <>{changedData}</>;
      },

      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // actionBy
    {
      title: "Action By",
      dataIndex: "insertedBy",
      sorter: false,
      render: (insertedBy: any) => {
        if (!insertedBy) return "-";
        return <>{insertedBy.username}</>;
      },
      //   width: "20%",
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Action Date",
      dataIndex: "createdOn",
      sorter: false,
      render: (createdOn: any) => {
        if (!createdOn) return "-";
        const date = new Date(createdOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<any>).order) {
      SetOrder(
        (sorter as SorterResult<any>).order === "ascend" ? "asc" : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<any>).field) {
      SetSort((sorter as SorterResult<any>).field as string);
    }
  };

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
              title: "Retailer Update"
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
            Retailer Update
          </h1>
        </div>

        <Card
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            // overflow: "scroll",
            borderRadius: "10px",
            margin: "0 auto",
            // textAlign: "center",
            marginTop: "2rem",
            marginBottom: "1rem",
            border: "1px solid #F15F22"
          }}
          extra={
            <>
              <Can I="customerCare.list">
                <Link href="/admin/retailer-tag-or-remove/create">
                  <Button
                    type="primary"
                    icon={<PlusSquareOutlined />}
                    size={"middle"}
                    style={{ marginLeft: "1rem" }}
                  >
                    Retailer Update
                  </Button>
                </Link>
              </Can>
            </>
          }
        >
          <>
            <Space style={{ marginBottom: 16 }}>
              <div style={{ padding: "20px", backgroundColor: "white" }}>
                <Collapse
                  accordion
                  style={{
                    backgroundColor: "#FFC857",
                    color: "white",
                    borderRadius: 4,
                    // marginBottom: 24,
                    // border: 0,
                    overflow: "hidden",
                    fontWeight: "bold",
                    font: "1rem"
                  }}
                >
                  <Panel header="Retailer Update Filters" key="1">
                    <Row
                      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                      justify="space-between"
                    >
                      <Col
                        xs={24}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        xxl={12}
                        className="gutter-row"
                      >
                        <Space style={{ width: "100%" }} direction="vertical">
                          <span>
                            <b>
                              Username<span style={{ color: "red" }}>*</span>
                            </b>
                          </span>
                          <Select
                            showSearch
                            allowClear
                            style={{ width: "100%", textAlign: "start" }}
                            placeholder="Please select"
                            onChange={handleUsernameChange}
                            options={customers}
                            value={selectedCustomer}
                            filterOption={(input, option) =>
                              option?.label
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          />
                        </Space>
                      </Col>
                      <Col
                        xs={24}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        xxl={12}
                        className="gutter-row"
                      >
                        <Space style={{ width: "100%" }} direction="vertical">
                          <span>
                            <b>Date Range</b>
                          </span>
                          <RangePicker
                            style={{ width: "100%" }}
                            onChange={handleDateChange}
                            value={selectedDateRange}
                            placeholder={["Start Date", "End Date"]}
                          />
                        </Space>
                      </Col>
                    </Row>
                    <Row
                      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                      justify="space-between"
                    >
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={12}
                        xl={12}
                        xxl={12}
                        className="gutter-row"
                      >
                        <Button
                          style={{
                            width: "100%",
                            textAlign: "center",
                            marginTop: "25px",
                            backgroundColor: "#0e8fdc",
                            color: "#ffffff"
                          }}
                          onClick={() => {
                            if (!selectedCustomer) {
                              MySwal.fire({
                                title: "Error",
                                text: "Select Username",
                                icon: "error"
                              });
                              return;
                            }
                            handleSubmit(
                              page,
                              limit,
                              order,
                              sort,
                              selectedCustomer,
                              selectedStartDate,
                              selectedEndDate
                            );
                          }}
                          className="ant-btn  ant-btn-lg"
                        >
                          Submit
                        </Button>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={12}
                        xl={12}
                        xxl={12}
                        className="gutter-row"
                      >
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
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </div>
            </Space>
          </>

          {data && data.length > 0 ? (
            <Table
              style={{
                width: "100%",
                overflowX: "auto"
              }}
              scroll={{ x: true }}
              className={"table-striped-rows"}
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

export default SearchRetailerList;
