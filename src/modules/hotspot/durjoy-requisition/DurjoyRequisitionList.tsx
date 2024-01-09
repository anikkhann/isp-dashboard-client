/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Select,
  Space,
  Row,
  Tooltip,
  DatePicker,
  Input
} from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table, Collapse, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import ability from "@/services/guard/ability";
import Link from "next/link";
import {
  // AlertOutlined,
  // CheckOutlined,
  CloseOutlined,
  DownloadOutlined,
  EyeOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined
} from "@ant-design/icons";
import { DurjoyRequisitionData } from "@/interfaces/DurjoyRequisitionData";
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
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { CSVLink } from "react-csv";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";

const statuses = [
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

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const DurjoyRequisitionList: React.FC = () => {
  const [data, setData] = useState<DurjoyRequisitionData[]>([]);
  console.log(data);
  const { Panel } = Collapse;

  const [usedVoucherData, setUsedVoucherData] = useState<any[]>([]);
  const [unusedVoucherData, setUnusedVoucherData] = useState<any[]>([]);

  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const [selectedRequisitionNo, setSelectedRequisitionNo] = useState<any>(null);

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const authUser = useAppSelector(state => state.auth.user);

  const { RangePicker } = DatePicker;
  const MySwal = withReactContent(Swal);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const router = useRouter();

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
    selectedStatusParam?: string,
    startDateParam?: string,
    endDateParam?: string,
    reqNoParam?: string,
    clientParam?: string
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
        requisitionNo: reqNoParam,
        client: {
          id: clientParam
        },
        isActive: selectedStatusParam,
        dateRangeFilter: {
          field: "createdOn",
          startDate: startDateParam,
          endDate: endDateParam
        }
      }
    };

    const { data } = await axios.post(
      `/api-hotspot/client-card-requisition/get-list`,
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
      "client-card-requisition-list",
      page,
      limit,
      order,
      sort,
      selectedStatus,
      selectedStartDate,
      selectedEndDate,
      selectedRequisitionNo,
      selectedClient
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedStatus,
        selectedStartDate,
        selectedEndDate,
        selectedRequisitionNo,
        selectedClient
      );
      return response;
    },
    onSuccess(data: any) {
      if (data) {
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
          id: id
        };

        const { data } = await axios.put(
          `/api-hotspot/client-card-requisition/cancel`,
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
        const { data } = await axios.get(
          `/api-hotspot/client-card-requisition/approve/${id}`
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

  const handleClear = () => {
    setSelectedStatus(null);
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedRequisitionNo(null);
    setSelectedClient(null);
  };
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

  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
  };

  function getClients() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        partnerType: "client",
        isActive: true
      }
    };

    axios.post("/api/partner/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

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
          label: item.name,
          value: item.id
        };
      });

      setClients(list);
    });
  }

  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClientChange = (value: any) => {
    setSelectedClient(value);
  };

  const columns: ColumnsType<DurjoyRequisitionData> = [
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
    {
      title: "Requisition No",
      dataIndex: "requisitionNo",
      sorter: true,
      width: 500,
      align: "center" as AlignType
    },
    {
      title: "Request For",
      dataIndex: "client",
      sorter: true,
      render: (client: any) => {
        return <>{client.username}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      sorter: true,
      render: (paymentType: any) => {
        return (
          <>
            {paymentType === "offline" ? (
              <Tag color="red">{paymentType}</Tag>
            ) : (
              <Tag color="green">{paymentType}</Tag>
            )}
          </>
        );
      },
      width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      sorter: true,
      render: (paymentStatus: any) => {
        return (
          <>
            {paymentStatus === "Due" ? (
              <Tag color="red">{paymentStatus}</Tag>
            ) : (
              <Tag color="green">{paymentStatus}</Tag>
            )}
          </>
        );
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Delivery Type",
      dataIndex: "deliveryType",
      sorter: true,
      render: (deliveryType: any) => {
        return <>{deliveryType}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Total Amount (BDT)",
      dataIndex: "totalAmount",
      sorter: true,
      render: (totalAmount: any) => {
        return <>{totalAmount}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Payable Amount (BDT)",
      dataIndex: "payableAmount",
      sorter: true,
      render: (payableAmount: any) => {
        return <>{payableAmount}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
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
      width: "20%",
      align: "center" as AlignType
    },
    // insertedBy
    {
      title: "Requested By",
      dataIndex: "insertedBy",
      sorter: false,
      render: (insertedBy: any) => {
        if (!insertedBy) return "-";
        return <>{insertedBy.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    // createdOn
    {
      title: "Requested At",
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
          <div className="flex flex-row">
            <Space size="middle" align="center">
              {ability.can("durjoyRequisition.approve", "") ? (
                <Tooltip title="Approve" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap>
                    <Button
                      type="primary"
                      icon={<CheckSquareOutlined />}
                      style={{
                        backgroundColor: "#0B666A",
                        color: "#ffffff"
                      }}
                      onClick={() => handleApprove(record.id)}
                    />
                  </Space>
                </Tooltip>
              ) : null}

              {ability.can("durjoyRequisition.cancel", "") ? (
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
              {ability.can("durjoyRequisition.reject", "") ? (
                <Tooltip title="Reject" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link
                      href={`/admin/hotspot/durjoy-requisition/${record.id}/reject`}
                    >
                      <Button
                        type="primary"
                        icon={<CloseSquareOutlined />}
                        style={{
                          backgroundColor: "#EA1179",
                          color: "#ffffff"
                        }}
                      />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
            </Space>
            <Space size="middle" align="center" className="mx-1">
              {ability.can("durjoyRequisition.view", "") ? (
                <Tooltip title="View" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap>
                    <Link
                      href={`/admin/hotspot/durjoy-requisition/${record.id}`}
                    >
                      <Button type="primary" icon={<EyeOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
            </Space>

            {authUser?.userType === "durjoy" ||
            authUser?.userType === "duronto" ? (
              record.status === "Approved" ? (
                <>
                  <Space size="middle" align="center" className="mx-1">
                    {ability.can("durjoyRequisition.view", "") ? (
                      <Tooltip
                        title="used Voucher Download"
                        placement="bottomRight"
                        color="green"
                      >
                        <Space size="middle" align="center" wrap>
                          <CSVLink
                            data={usedVoucherData}
                            asyncOnClick={true}
                            onClick={(event, done) => {
                              const token = Cookies.get("token");
                              axios.defaults.headers.common[
                                "Authorization"
                              ] = `Bearer ${token}`;

                              const body = {
                                meta: {
                                  sort: [
                                    {
                                      order: "asc",
                                      field: "serialNo"
                                    }
                                  ]
                                },
                                body: {
                                  // SEND FIELD NAME WITH DATA TO SEARCH
                                  clientCardRequisition: {
                                    id: record.id
                                  }
                                }
                              };

                              axios
                                .post(
                                  `/api-hotspot/voucher-archive/get-list`,
                                  body,
                                  {
                                    headers: {
                                      "Content-Type": "application/json"
                                    }
                                  }
                                )
                                .then(res => {
                                  // console.log(res);
                                  const { data } = res;

                                  if (data.status != 200) {
                                    MySwal.fire({
                                      title: "Error",
                                      text:
                                        data.message || "Something went wrong",
                                      icon: "error"
                                    });
                                  }

                                  if (!data.body) return;
                                  setUsedVoucherData(data.body);
                                  done();
                                });
                            }}
                            className="ant-btn ant-btn-lg"
                            target="_blank"
                            style={{
                              width: "100%",
                              textAlign: "center",
                              marginTop: "25px",
                              backgroundColor: "#F15F22",
                              color: "#ffffff",
                              padding: "10px"
                            }}
                            filename={`used-voucher-${dayjs().format(
                              "YYYY-MM-DD"
                            )}.csv`}
                          >
                            <DownloadOutlined />
                          </CSVLink>
                        </Space>
                      </Tooltip>
                    ) : null}
                  </Space>
                  <Space size="middle" align="center" className="mx-1">
                    {ability.can("durjoyRequisition.view", "") ? (
                      <Tooltip
                        title="unused Voucher Download"
                        placement="bottomRight"
                        color="blue"
                      >
                        <Space size="middle" align="center" wrap>
                          <CSVLink
                            data={unusedVoucherData}
                            asyncOnClick={true}
                            onClick={(event, done) => {
                              const token = Cookies.get("token");
                              axios.defaults.headers.common[
                                "Authorization"
                              ] = `Bearer ${token}`;

                              const body = {
                                meta: {
                                  sort: [
                                    {
                                      order: "asc",
                                      field: "serialNo"
                                    }
                                  ]
                                },
                                body: {
                                  // SEND FIELD NAME WITH DATA TO SEARCH
                                  clientCardRequisition: {
                                    id: record.id
                                  }
                                }
                              };

                              axios
                                .post(`/api-hotspot/voucher/get-list`, body, {
                                  headers: {
                                    "Content-Type": "application/json"
                                  }
                                })
                                .then(res => {
                                  // console.log(res);
                                  const { data } = res;

                                  if (data.status != 200) {
                                    MySwal.fire({
                                      title: "Error",
                                      text:
                                        data.message || "Something went wrong",
                                      icon: "error"
                                    });
                                  }

                                  if (!data.body) return;
                                  setUnusedVoucherData(data.body);
                                  done();
                                });
                            }}
                            className="ant-btn ant-btn-lg"
                            target="_blank"
                            style={{
                              width: "100%",
                              textAlign: "center",
                              marginTop: "25px",
                              backgroundColor: "#570DF8",
                              color: "#ffffff",
                              padding: "10px"
                            }}
                            filename={`used-voucher-${dayjs().format(
                              "YYYY-MM-DD"
                            )}.csv`}
                          >
                            <DownloadOutlined />
                          </CSVLink>
                        </Space>
                      </Tooltip>
                    ) : null}
                  </Space>
                </>
              ) : null
            ) : null}
          </div>
        );
      },
      align: "center" as AlignType
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<DurjoyRequisitionData>
      | SorterResult<DurjoyRequisitionData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<DurjoyRequisitionData>).order) {
      // // console.log((sorter as SorterResult<DurjoyRequisitionData>).order)

      SetOrder(
        (sorter as SorterResult<DurjoyRequisitionData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<DurjoyRequisitionData>).field) {
      // // console.log((sorter as SorterResult<DurjoyRequisitionData>).field)

      SetSort((sorter as SorterResult<DurjoyRequisitionData>).field as string);
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
            title="Client to Durjoy Requisition List"
            hasLink={true}
            addLink="/admin/hotspot/durjoy-requisition/create"
            permission="durjoyRequisition.create"
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto",
              backgroundColor: "#d5dfe6"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
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
                        {authUser?.userType === "durjoy" ||
                        authUser?.userType === "duronto" ? (
                          <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            xxl={8}
                            className="gutter-row"
                          >
                            <Space
                              style={{ width: "100%" }}
                              direction="vertical"
                            >
                              <span>
                                <b>Client</b>
                              </span>
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select"
                                onChange={handleClientChange}
                                options={clients}
                                value={selectedClient}
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
                        ) : null}
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
                              <b>Requisition No</b>
                            </span>
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Requisition No"
                              value={selectedRequisitionNo}
                              onChange={e =>
                                setSelectedRequisitionNo(e.target.value)
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
                              <b>Status</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleStatusChange}
                              options={statuses}
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
                              <b>Date Range </b>
                            </span>
                            <RangePicker
                              style={{ width: "100%" }}
                              onChange={handleDateChange}
                              value={selectedDateRange}
                              placeholder={["Start Date", "End Date"]}
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

export default DurjoyRequisitionList;
