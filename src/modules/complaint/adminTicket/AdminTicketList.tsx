/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Input, Select, Space, Tag, Row } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
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

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const AdminTicketList: React.FC = () => {
  const [data, setData] = useState<TicketData[]>([]);
  const { Panel } = Collapse;
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [complainTypeList, setComplainTypes] = useState<any>([]);
  const [selectedComplainType, setSelectedComplainType] = useState<any>(null);

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
        complainCategory: "parent",
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
        ticketCategory: "parent",
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
      "admin-ticket-list",
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
            <Space>{page !== 1 ? index + 1 + page * limit : index + 1}</Space>
          </>
        );
      },
      sorter: true,
      width: 140,
      align: "center" as AlignType
    },
    // {
    //   title: "Ticket Created By",
    //   dataIndex: "insertedBy",
    //   sorter: false,
    //   render: (insertedBy: any) => {
    //     if (!insertedBy) return "-";
    //     return <>{insertedBy.name}</>;
    //   },
    //   width: 200,
    //   align: "center" as AlignType
    // },
    {
      title: "Ticket User Type",
      dataIndex: "insertedBy",
      sorter: false,
      render: (insertedBy: any) => {
        if (!insertedBy) return "-";
        return <>{insertedBy.userType}</>;
      },
      width: 200,
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
      title: "complainType",
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
      sorter: false,
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
          <>{differenceInDays(currentTime, createdTime).toLocaleString()}</>
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
              {ability.can("adminTicket.view", "") ? (
                <Space size="middle" align="center" wrap className="mx-1">
                  <Link href={`/admin/complaint/admin-ticket/${record.id}`}>
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
            title="Admin Tickets List"
            hasLink={true}
            addLink="/admin/complaint/admin-ticket/create"
            permission="adminTicket.create"
            btnText="Create Ticket"
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto"
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
                    <Panel header="Admin Tickets Filters" key="1">
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
                              showSearch
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleComplainTypeChange}
                              options={complainTypeList}
                              value={selectedComplainType}
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
                              showSearch
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleClosedByChange}
                              options={closedByList}
                              value={selectedClosedBy}
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
                              showSearch
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleCreatedByChange}
                              options={createdByList}
                              value={selectedCreatedBy}
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
                              showSearch
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleAssignToChange}
                              options={assignToList}
                              value={selectedAssignTo}
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
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          xxl={8}
                          className="gutter-row"
                        ></Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          xxl={8}
                          className="gutter-row"
                        ></Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </div>
              </Space>

              <Table
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

export default AdminTicketList;
