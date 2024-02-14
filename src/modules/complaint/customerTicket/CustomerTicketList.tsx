/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Input, Select, Space, Tag, Row } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useRef, useState } from "react";
import { Table, Collapse } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import ability from "@/services/guard/ability";
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
import { differenceInDays, format } from "date-fns";
import { TicketData } from "@/interfaces/TicketData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { CSVLink } from "react-csv";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

// const dateFormat = "YYYY-MM-DD";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const CustomerTicketList: React.FC = () => {
  const [data, setData] = useState<TicketData[]>([]);

  const { Panel } = Collapse;
  const MySwal = withReactContent(Swal);
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [downloadRow, setDownloadRow] = useState<any[]>([]);
  const [complainTypeList, setComplainTypes] = useState<any>([]);
  const [selectedComplainType, setSelectedComplainType] = useState<any>(null);
  const downloadRef = useRef<any>(null);
  const [statusList, setStatusList] = useState<any>([]);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const [closedByList, setClosedByList] = useState<any>([]);
  const [selectedClosedBy, setSelectedClosedBy] = useState<any>(null);

  const [createdByList, setCreatedByList] = useState<any>([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState<any>(null);

  const [assignToList, setAssignToList] = useState<any>([]);
  const [selectedAssignTo, setSelectedAssignTo] = useState<any>(null);

  const [selectedTicketNumber, setSelectedTicketNumber] = useState<any>(null);

  const handleComplainTypeChange = (value: any) => {
    setSelectedComplainType(value);
  };

  const handleStateChange = (value: any) => {
    setSelectedStatus(value);
  };

  const handleClosedByChange = (value: any) => {
    setSelectedClosedBy(value);
  };

  const handleCreatedByChange = (value: any) => {
    setSelectedCreatedBy(value);
  };

  const handleAssignToChange = (value: any) => {
    setSelectedAssignTo(value);
  };

  const handleClear = () => {
    setSelectedComplainType(null);
    setSelectedStatus(null);
    setSelectedClosedBy(null);
    setSelectedCreatedBy(null);
    setSelectedAssignTo(null);
    setSelectedTicketNumber(null);
  };

  function getStatusList() {
    const list = [
      {
        label: "Open",
        value: "open"
      },
      {
        label: "Closed",
        value: "closed"
      },
      {
        label: "Pending",
        value: "pending"
      },
      {
        label: "In Progress",
        value: "on_progress"
      }
    ];

    setStatusList(list);
  }

  async function getComplainTypes() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        complainCategory: "customer",
        isActive: true
      }
    };
    const res = await axios.post("/api/complain-type/get-list", body);
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setComplainTypes(items);
    }
  }

  async function getUsers() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        isActive: true
      }
    };
    const res = await axios.post("/api/users/get-list", body);
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setClosedByList(items);
      setCreatedByList(items);
      setAssignToList(items);
    }
  }

  useEffect(() => {
    getComplainTypes();
    getStatusList();
    getUsers();
  }, []);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    }
  });

  const fetchData = async (
    page: number,
    limit: number,
    order: string,
    sort: string,
    complainTypeParams?: string,
    statusParams?: string,
    closedByParams?: string,
    createdByParams?: string,
    assignToParams?: string,
    ticketNumberParams?: string
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
        // SEND FIELD NAME WITH DATA TO SEARCH
        ticketCategory: "customer",
        rootCauseCategory: "customer",

        complainType: {
          id: complainTypeParams
        },
        status: statusParams,
        ticketNo: ticketNumberParams,
        closedBy: {
          id: closedByParams
        },
        insertedBy: {
          id: createdByParams
        },
        assignTo: {
          id: assignToParams
        }
      }
    };

    const { data } = await axios.post("/api/ticket/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "customer-ticket-list",
      page,
      limit,
      order,
      sort,
      selectedComplainType,
      selectedStatus,
      selectedClosedBy,
      selectedCreatedBy,
      selectedAssignTo,
      selectedTicketNumber
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedComplainType,
        selectedStatus,
        selectedClosedBy,
        selectedCreatedBy,
        selectedAssignTo,
        selectedTicketNumber
      );
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);

        if (data.body) {
          setData(data.body);
          setTableParams({
            pagination: {
              total: data.meta.totalRecords,
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
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const columns: ColumnsType<TicketData> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return (
          <>
            <Space>
              {page !== 0 ? index + 1 + (page - 1) * limit : index + 1}
            </Space>
          </>
        );
      },
      sorter: true,
      width: 140,
      align: "center" as AlignType
    },
    {
      title: "Ticket Number",
      dataIndex: "ticketNo",
      sorter: true,
      width: 200,
      align: "center" as AlignType
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (customer, row) => {
        return <>{row.customer.username}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },
    {
      title: "Complain Type",
      dataIndex: "complainType",
      render: (complainType, row) => {
        return <>{row.complainType.name}</>;
      },
      sorter: false,
      width: 400,
      align: "center" as AlignType
    },

    {
      title: "Ticket State",
      dataIndex: "status",
      sorter: true,
      render: (status: any) => {
        return (
          <>
            {status === "open" ? (
              <Tag color="green">{status}</Tag>
            ) : status === "closed" ? (
              <Tag color="red">{status}</Tag>
            ) : (
              <Tag color="blue">{status}</Tag>
            )}
          </>
        );
      },
      width: 150,
      align: "center" as AlignType
    },
    // assignedTo
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      sorter: false,
      render: (assignedTo: any) => {
        if (!assignedTo) return "-";
        return <>{assignedTo.name}</>;
      },
      width: 200,
      align: "center" as AlignType
    },

    // insertedBy
    {
      title: "Created By",
      dataIndex: "insertedBy",
      sorter: false,
      render: (insertedBy: any) => {
        if (!insertedBy) return "-";
        return <>{insertedBy.name}</>;
      },
      width: 200,
      align: "center" as AlignType
    },

    // createdOn
    {
      title: "Created At",
      dataIndex: "createdOn",
      sorter: true,
      render: (createdOn: any) => {
        if (!createdOn) return "-";
        const date = new Date(createdOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      width: 200,
      align: "center" as AlignType
    },

    // age
    {
      title: "Age",
      dataIndex: "age",
      sorter: false,
      render: (_, row) => {
        if (!row.createdOn) return "-";
        const createdTime = new Date(row.createdOn);
        const currentTime = new Date();
        return (
          <>
            {differenceInDays(currentTime, createdTime).toLocaleString()} days
          </>
        );
      },
      width: 200,
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

    //   width: 200,
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
    //   width: 150,
    //   align: "center" as AlignType
    // },
    {
      title: "Action",
      dataIndex: "action",
      sorter: false,
      render: (text: any, record: any) => {
        return (
          <div className="flex flex-row">
            <Space
              size="middle"
              align="center"
              style={{
                marginLeft: "10px"
              }}
            >
              {ability.can("customerTicket.view", "") ? (
                <Space size="middle" align="center" wrap className="mx-1">
                  <Link href={`/admin/complaint/customer-ticket/${record.id}`}>
                    <Button type="primary" icon={<EyeOutlined />} />
                  </Link>
                </Space>
              ) : null}
            </Space>
          </div>
        );
      },
      align: "center" as AlignType,
      width: 200
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<TicketData> | SorterResult<TicketData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<TicketData>).order) {
      SetOrder(
        (sorter as SorterResult<TicketData>).order === "ascend" ? "asc" : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<TicketData>).field) {
      SetSort((sorter as SorterResult<TicketData>).field as string);
    }
  };

  const handleDownload = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      meta: {
        // limit: 10,
        // page: 1,
        sort: [
          {
            order: "asc",
            field: "id"
          }
        ]
      },
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        ticketCategory: "customer",
        rootCauseCategory: "customer",

        complainType: {
          id: selectedComplainType
        },
        status: selectedStatus,
        ticketNo: selectedTicketNumber,
        closedBy: {
          id: selectedClosedBy
        },
        insertedBy: {
          id: selectedCreatedBy
        },
        assignTo: {
          id: selectedAssignTo
        }
      }
    };

    await axios
      .post(`/api/ticket/get-list`, body, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        // console.log(res);
        const { data } = res;
        console.log(data.body);
        if (data.status != 200) {
          MySwal.fire({
            title: "Error",
            text: data.message || "Something went wrong",
            icon: "error"
          });
        }

        if (!data.body) return;

        const list = data.body.map((item: any) => {
          const date = new Date(item.createdOn);
          const dateTwo = new Date(item.updatedOn);
          return {
            "Ticket No": item.ticketNo,
            Customer: item.customer.username,
            "Complaint Type": item.complainType.name,
            "Complaint Details": item.complainDetails,
            "Assigned To": item.assignedTo.username,
            "Ticket Status": item.status,
            "Root Cause": item.rootCause.title,
            "Created By": item.openedBy.username,
            "Created At": format(date, "yyyy-MM-dd pp"),
            "Last Updated By": item.editedBy.username,
            "Last Updated At": format(dateTwo, "yyyy-MM-dd pp")
            // TrxDate: format(date, "yyyy-MM-dd pp")
          };
        });

        setDownloadRow([
          // {
          //   TicketNo: "Ticket No",
          //   Customer: "Customer",
          //   ComplaintType: "Complain Type",
          //   ComplaintDetails: "Complain Details",
          //   AssignedTo: "Assigned To",
          //   TicketStatus: "Ticket Status",
          //   RootCause: "Root Cause",
          //   CreatedBy: "Created By",
          //   CreatedAt: "Created At",
          //   LastUpdatedBy: "Last Updated By",
          //   LastUpdatedAt: "Last Updated At"
          // },
          ...list
        ]);
      });
  };

  useEffect(() => {
    if (downloadRow && downloadRow.length > 0) {
      setDownloadRow(downloadRow);

      if (downloadRef.current) {
        downloadRef.current.link.click();
      }
      setDownloadLoading(false);
    }
  }, [downloadRow]);

  return (
    <>
      <AppRowContainer>
        <Col span={24} key="data-f">
          {isError && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: " 10px 5px"
                }}
              >
                <Card
                  title="Error"
                  style={{
                    width: 300,
                    color: "#FF5630",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <p>
                    {error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                      ? error.response.data.message
                      : error.message
                        ? error.message
                        : "Something went wrong"}
                  </p>
                </Card>
              </div>
            </>
          )}

          <TableCard
            title="Customer Tickets"
            hasLink={true}
            addLink="/admin/complaint/customer-ticket/create"
            permission="customerTicket.create"
            btnText="Create Ticket"
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto",
              backgroundColor: "#d5dfe6"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* search */}
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
                    <Panel header="Customer Tickets Filters" key="1">
                      <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        justify="space-between"
                      >
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          xxl={8}
                          className="gutter-row"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Complain Type</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleComplainTypeChange}
                              options={complainTypeList}
                              value={selectedComplainType}
                              showSearch
                              filterOption={(input, option) => {
                                if (typeof option?.label === "string") {
                                  return (
                                    option.label
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }
                                return false;
                              }}
                            />
                          </Space>
                        </Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          xxl={8}
                          className="gutter-row"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Ticket Number</b>
                            </span>
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Ticket Number"
                              value={selectedTicketNumber}
                              onChange={e =>
                                setSelectedTicketNumber(e.target.value)
                              }
                            />
                          </Space>
                        </Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          xxl={8}
                          className="gutter-row"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Ticket State</b>
                            </span>
                            <Select
                              allowClear
                              style={{
                                width: "100%",
                                textAlign: "start"
                              }}
                              placeholder="Please select"
                              onChange={handleStateChange}
                              options={statusList}
                              value={selectedStatus}
                              showSearch
                              filterOption={(input, option) => {
                                if (typeof option?.label === "string") {
                                  return (
                                    option.label
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }
                                return false;
                              }}
                            />
                          </Space>
                        </Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          xxl={8}
                          className="gutter-row"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Closed By</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleClosedByChange}
                              options={closedByList}
                              value={selectedClosedBy}
                              showSearch
                              filterOption={(input, option) => {
                                if (typeof option?.label === "string") {
                                  return (
                                    option.label
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }
                                return false;
                              }}
                            />
                          </Space>
                        </Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          xxl={8}
                          className="gutter-row"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Created By</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleCreatedByChange}
                              options={createdByList}
                              value={selectedCreatedBy}
                              showSearch
                              filterOption={(input, option) => {
                                if (typeof option?.label === "string") {
                                  return (
                                    option.label
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }
                                return false;
                              }}
                            />
                          </Space>
                        </Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          xxl={8}
                          className="gutter-row"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Assign To</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleAssignToChange}
                              options={assignToList}
                              value={selectedAssignTo}
                              showSearch
                              filterOption={(input, option) => {
                                if (typeof option?.label === "string") {
                                  return (
                                    option.label
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }
                                return false;
                              }}
                            />
                          </Space>
                        </Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          xxl={8}
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

              {ability.can("customerTicket.download", "") && (
                <Row justify={"end"}>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        setDownloadLoading(true);
                        handleDownload();
                      }}
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "25px",
                        backgroundColor: "#F15F22",
                        color: "#ffffff"
                      }}
                    >
                      {downloadLoading ? "Loading..." : "Download"}
                    </Button>

                    <CSVLink
                      data={downloadRow}
                      ref={downloadRef}
                      target="_blank"
                      filename={`customer-ticket-${dayjs().format(
                        "YYYY-MM-DD"
                      )}.csv`}
                      style={{
                        display: "none"
                      }}
                    ></CSVLink>
                  </Col>
                </Row>
              )}

              <Table
                className={"table-striped-rows"}
                tableLayout="fixed"
                scroll={{ x: 1000 }}
                columns={columns}
                rowKey={record => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={isLoading || isFetching}
                onChange={handleTableChange}
              />
            </Space>
          </TableCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default CustomerTicketList;
