/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Row, Select, Col, Space, Tooltip } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table, Tag, Collapse } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import ability from "@/services/guard/ability";
import Link from "next/link";
import {
  AlertOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { format } from "date-fns";
import { ZoneTopUpRequestData } from "@/interfaces/ZoneTopUpRequestData";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const ZoneTopUpRequestList: React.FC = () => {
  const [data, setData] = useState<ZoneTopUpRequestData[]>([]);
  const authUser = useAppSelector(state => state.auth.user);
  const MySwal = withReactContent(Swal);
  const { Panel } = Collapse;
  const router = useRouter();

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const [status, setStatus] = useState<any>([]);
  const [statusChanged, setStatusChanged] = useState<any>(null);

  const [paymentStatus, setPaymentStatus] = useState<any>([]);
  const [paymentStatusChanged, setPaymentStatusChanged] = useState<any>(null);

  const [paymentTypeStatus, setPaymentTypeStatus] = useState<any>([]);
  const [paymentTypeChanged, setPaymentTypeChanged] = useState<any>(null);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    }
  });

  async function handleCancel(id: string) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, Cancel!"
      });

      if (result.isConfirmed) {
        const body = {
          id: id,
          action: "cancel"
        };

        const { data } = await axios.put(
          `/api/zone-topup-request/update`,
          body
        );
        if (data.status === 200) {
          MySwal.fire("Success!", data.message, "success").then(() => {
            router.reload();
          });
        } else {
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error: any) {
      // console.log(error);
      if (error.response) {
        MySwal.fire("Error!", error.response.data.message, "error");
      } else {
        MySwal.fire("Error!", "Something went wrong", "error");
      }
    }
  }

  async function handleApprove(id: string) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, Approve!"
      });

      if (result.isConfirmed) {
        const body = {
          id: id,
          action: "approve"
        };

        const { data } = await axios.put(
          `/api/zone-topup-request/update`,
          body
        );
        if (data.status === 200) {
          MySwal.fire("Success!", data.message, "success").then(() => {
            router.reload();
          });
        } else {
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error: any) {
      // console.log(error);
      if (error.response) {
        MySwal.fire("Error!", error.response.data.message, "error");
      } else {
        MySwal.fire("Error!", "Something went wrong", "error");
      }
    }
  }

  const fetchData = async (
    page: number,
    limit: number,
    order: string,
    sort: string,
    agentId?: string | null,
    statusParam?: string | null,
    paymentStatusParam?: string | null,
    paymentTypeParam?: string | null
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
        partner: {
          id: agentId
        },
        status: statusParam,
        paymentStatus: paymentStatusParam,
        paymentType: paymentTypeParam
      }
    };

    const { data } = await axios.post(
      "/api/zone-topup-request/get-list",
      body,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "zone-topup-request-list",
      page,
      limit,
      order,
      sort,
      selectedZone,
      statusChanged,
      paymentStatusChanged,
      paymentTypeChanged
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedZone,
        statusChanged,
        paymentStatusChanged,
        paymentTypeChanged
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

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedZone(value as any);
  };

  const handleStatusChange = (value: any) => {
    setStatusChanged(value);
  };

  const handlePaymentStatusChange = (value: any) => {
    setPaymentStatusChanged(value);
  };
  const handlePaymentTypeChange = (value: any) => {
    setPaymentTypeChanged(value);
  };

  const handleClear = () => {
    setSelectedZone(null);
    setStatusChanged(null);
    setPaymentStatusChanged(null);
    setPaymentTypeChanged(null);
  };

  async function getZones() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "username"
          }
        ]
      },
      body: {
        partnerType: "zone"
      }
    };
    const res = await axios.post("/api/partner/get-list", body);
    console.log(res);
    if (res.data.status == 200) {
      const items = res.data.body?.map((item: any) => {
        return {
          label: item.username,
          value: item.id
        };
      });

      setZones(items);
    }
  }

  function getStatus() {
    const status = [
      {
        label: "Pending",
        value: "Pending"
      },
      {
        label: "Approved",
        value: "Approved"
      },
      {
        label: "Rejected",
        value: "Rejected"
      },
      {
        label: "Cancelled",
        value: "Cancelled"
      }
    ];
    setStatus(status);
  }

  function getPaymentStatus() {
    const status = [
      {
        label: "Paid",
        value: "Paid"
      },
      {
        label: "Due",
        value: "Due"
      }
    ];
    setPaymentStatus(status);
  }

  function getPaymentTypeStatus() {
    const status = [
      {
        label: "Online",
        value: "online"
      },
      {
        label: "Offline",
        value: "offline"
      }
    ];
    setPaymentTypeStatus(status);
  }

  useEffect(() => {
    getZones();
    getStatus();
    getPaymentStatus();
    getPaymentTypeStatus();
    // setStatusChanged(null);
  }, []);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const columns: ColumnsType<ZoneTopUpRequestData> = [
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
      title: "Request No",
      dataIndex: "requestNo",
      sorter: false,
      render: (requestNo: any) => {
        return <>{requestNo ? requestNo : "N/A"}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Zone Manager",
      dataIndex: "partner",
      sorter: false,
      render: (partner: any) => {
        return <>{partner ? partner.username : "-"}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Requested By",
      dataIndex: "requestedBy",
      sorter: false,
      render: (requestedBy: any) => {
        if (!requestedBy) return "-";
        return <>{requestedBy.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      sorter: false,
      render: (paidAmount: any) => {
        return <>{paidAmount}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Credit Amount",
      dataIndex: "creditAmount",
      sorter: true,
      render: (creditAmount: any) => {
        return <>{creditAmount}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Payment Type",
      dataIndex: "paymentType",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      sorter: false,
      render: (paymentStatus: any) => {
        return <>{paymentStatus}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: false,
      render: (status: any) => {
        return (
          <>
            {status === "Rejected" ? (
              <Tag color="red">{status}</Tag>
            ) : status === "Approved" ? (
              <Tag color="green">{status}</Tag>
            ) : (
              <Tag color="blue">{status}</Tag>
            )}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    // requestedBy

    {
      title: "Requested At",
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
    // {
    //   title: "Created At",
    //   dataIndex: "createdOn",
    //   sorter: false,
    //   render: (createdOn: any) => {
    //     if (!createdOn) return "-";
    //     const date = new Date(createdOn);
    //     return <>{format(date, "yyyy-MM-dd pp")}</>;
    //   },
    //   width: "20%",
    //   align: "center" as AlignType
    // },
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
      render: (_, record: any) => {
        return (
          <div className="flex flex-row">
            <Space size="middle" align="center" className="mx-1">
              {/* reject */}
              {ability.can("zoneTopUpRequest.reject", "") &&
              record.status === "Pending" ? (
                <Tooltip title="Reject" placement="bottomRight" color="red">
                  <Space size="middle" align="center" wrap>
                    <Link
                      href={`/admin/top-up/zone-top-up-request/${record.id}/reject`}
                    >
                      <Button
                        type="primary"
                        icon={<AlertOutlined />}
                        style={{
                          color: "#FFFFFF",
                          backgroundColor: "#FF5630",
                          borderColor: "#FF5630"
                        }}
                      />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}

              {ability.can("zoneTopUpRequest.approve", "") &&
              record.status === "Pending" ? (
                <Tooltip title="Approve" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap>
                    <Button
                      icon={<CheckOutlined />}
                      style={{
                        color: "#FFFFFF",
                        backgroundColor: "#570DF8",
                        borderColor: "#570DF8"
                      }}
                      onClick={() => handleApprove(record.id)}
                    />
                  </Space>
                </Tooltip>
              ) : null}

              {/* cancel */}
              {ability.can("zoneTopUpRequest.cancel", "") &&
              record.status === "Pending" ? (
                <Tooltip title="Cancel" placement="bottomRight" color="red">
                  <Space size="middle" align="center" wrap>
                    <Button
                      icon={<CloseOutlined />}
                      style={{
                        color: "#FFFFFF",
                        backgroundColor: "#FF5630",
                        borderColor: "#FF5630"
                      }}
                      onClick={() => handleCancel(record.id)}
                    />
                  </Space>
                </Tooltip>
              ) : null}

              {/* cancel */}
              {ability.can("zoneTopUpRequest.view", "") ? (
                <Tooltip title="View" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap className="mx-1">
                    <Link
                      href={`/admin/top-up/zone-top-up-request/${record.id}`}
                    >
                      <Button type="primary" icon={<EyeOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
            </Space>
          </div>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<ZoneTopUpRequestData>
      | SorterResult<ZoneTopUpRequestData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<ZoneTopUpRequestData>).order) {
      // // console.log((sorter as SorterResult<ZoneTopUpRequestData>).order)

      SetOrder(
        (sorter as SorterResult<ZoneTopUpRequestData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<ZoneTopUpRequestData>).field) {
      // // console.log((sorter as SorterResult<ZoneTopUpRequestData>).field)

      SetSort((sorter as SorterResult<ZoneTopUpRequestData>).field as string);
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
            title="Zone Top Up Request List"
            hasLink={true}
            addLink="/admin/top-up/zone-top-up-request/create"
            permission="zoneTopUpRequest.create"
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
                    <Panel header="Filters" key="1">
                      <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        justify="space-between"
                      >
                        {authUser && authUser.userType == "client" && (
                          <Col
                            xs={24}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            xxl={12}
                            className="gutter-row"
                          >
                            <Space
                              style={{ width: "100%" }}
                              direction="vertical"
                            >
                              <span>
                                <b>Zone Manager</b>
                              </span>
                              <Select
                                allowClear
                                style={{
                                  width: "100%",
                                  textAlign: "start"
                                }}
                                placeholder="Please select"
                                onChange={handleChange}
                                options={zones}
                                value={selectedZone}
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
                        )}

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
                              <b>Status</b>
                            </span>
                            <Select
                              allowClear
                              style={{
                                width: "100%",
                                textAlign: "start"
                              }}
                              placeholder="Please select"
                              onChange={handleStatusChange}
                              options={status}
                              value={statusChanged}
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
                          md={12}
                          lg={12}
                          xl={12}
                          xxl={12}
                          className="gutter-row"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Payment Status</b>
                            </span>
                            <Select
                              allowClear
                              style={{
                                width: "100%",
                                textAlign: "start"
                              }}
                              placeholder="Please select"
                              onChange={handlePaymentStatusChange}
                              options={paymentStatus}
                              value={paymentStatusChanged}
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
                          md={12}
                          lg={12}
                          xl={12}
                          xxl={12}
                          className="gutter-row"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Payment Type</b>
                            </span>
                            <Select
                              allowClear
                              style={{
                                width: "100%",
                                textAlign: "start"
                              }}
                              placeholder="Please select"
                              onChange={handlePaymentTypeChange}
                              options={paymentTypeStatus}
                              value={paymentTypeChanged}
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
                          md={12}
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
                        <Col
                          xs={24}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          xxl={12}
                          className="gutter-row"
                        ></Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          xxl={12}
                          className="gutter-row"
                        ></Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </div>
              </Space>

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

export default ZoneTopUpRequestList;
