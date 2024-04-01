/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Input, Select, Space, Tag, Row } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table, Collapse, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import ability from "@/services/guard/ability";
import Link from "next/link";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { DeviceData } from "@/interfaces/DeviceData";
import { format } from "date-fns";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const deviceTypeList = [
  {
    label: "NAS",
    value: "NAS"
  },
  {
    label: "Switch",
    value: "Switch"
  },
  {
    label: "Router",
    value: "Router"
  },
  {
    label: "ONU",
    value: "ONU"
  },
  {
    label: "OLT",
    value: "OLT"
  }
];

const monitoringTypesList = [
  {
    label: "API",
    value: "API"
  },
  {
    label: "Telnet",
    value: "Telnet"
  },
  {
    label: "SNMP",
    value: "SNMP"
  }
];

const statusList = [
  {
    label: "Active",
    value: "true"
  },
  {
    label: "Inactive",
    value: "false"
  }
];

const DeviceList: React.FC = () => {
  const [data, setData] = useState<DeviceData[]>([]);
  const { Panel } = Collapse;
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [selectedDeviceType, setSelectedDeviceType] = useState<any>(null);

  const [selectedMonitoringType, setSelectedMonitoringType] =
    useState<any>(null);

  const [ip, setIp] = useState<any>(null);

  const [selectedStatus, setSelectedStatus] = useState<any>(null);

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
    deviceTypeParam?: string,
    monitoringTypeParam?: string,
    ipParam?: string,
    statusParam?: string
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
        partnerType: "client",
        deviceType: deviceTypeParam,
        monitoringType: monitoringTypeParam,
        ip: ipParam,
        isActive: statusParam
      }
    };

    const { data } = await axios.post("/api/device/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "device-list",
      page,
      limit,
      order,
      sort,
      selectedDeviceType,
      selectedMonitoringType,
      ip,
      selectedStatus
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedDeviceType,
        selectedMonitoringType,
        ip,
        selectedStatus
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

  const handleDeviceTypeChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedDeviceType(value as any);
  };

  const handleMonuitoringTypeChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedMonitoringType(value as any);
  };

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedStatus(value as any);
  };

  const handleClear = () => {
    setSelectedDeviceType(null);
    setSelectedMonitoringType(null);
    setIp(null);
    setSelectedStatus(null);
  };

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  async function handleDelete(id: number) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const { data } = await axios.delete(`/api/device/delete/${id}`);
        if (data.status == 200) {
          MySwal.fire("Deleted!", data.message, "success").then(() => {
            router.reload();
          });
        } else {
          console.log(data.message);
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error: any) {
      // console.log("error", error);
      if (error.response) {
        MySwal.fire("Error!", error.response.data.message, "error");
      } else {
        MySwal.fire("Error!", "Something went wrong", "error");
      }
    }
  }

  const columns: ColumnsType<DeviceData> = [
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
    // {
    //   title: "Partner",
    //   dataIndex: "partner",
    //   sorter: false,
    //   render: (partner: any) => {
    //     return <>{partner ? partner.name : "N/A"}</>;
    //   },
    //   width: "20%",
    //   align: "center" as AlignType
    // },
    {
      title: "Device Type",
      dataIndex: "deviceType",
      sorter: false,
      render: (deviceType: any) => {
        return <>{deviceType ? deviceType : "N/A"}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Device Name",
      dataIndex: "name",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Zone",
      dataIndex: "distributionZone",
      sorter: false,
      render: (distributionZone: any) => {
        return <>{distributionZone ? distributionZone.name : "N/A"}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Pop",
      dataIndex: "distributionPop",
      sorter: false,
      render: (distributionPop: any) => {
        return <>{distributionPop ? distributionPop.name : "N/A"}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Monitoring Type",
      dataIndex: "monitoringType",
      sorter: false,
      render: (monitoringType: any) => {
        return <>{monitoringType ? monitoringType : "N/A"}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "IP",
      dataIndex: "ip",
      sorter: false,
      render: (ip: any) => {
        return <>{ip ? ip : "N/A"}</>;
      },
      ellipsis: true,
      width: "auto",
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
    {
      title: "Created At",
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
          <div className="flex flex-row">
            <Space size="middle" align="center">
              {ability.can("device.update", "") ? (
                <Tooltip title="Edit" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link href={`/admin/device/device/${record.id}/edit`}>
                      <Button type="primary" icon={<EditOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
              {ability.can("device.view", "") ? (
                <Tooltip title="View" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap className="mx-1">
                    <Link href={`/admin/device/device/${record.id}`}>
                      <Button type="primary" icon={<EyeOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
              {ability.can("device.delete", "") ? (
                <Tooltip title="Delete" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap>
                    <Button
                      type="primary"
                      icon={<DeleteOutlined />}
                      style={{
                        backgroundColor: "#EA1179",
                        color: "#ffffff"
                      }}
                      onClick={() => handleDelete(record.id)}
                    />
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
    sorter: SorterResult<DeviceData> | SorterResult<DeviceData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<DeviceData>).order) {
      // // console.log((sorter as SorterResult<DeviceData>).order)

      SetOrder(
        (sorter as SorterResult<DeviceData>).order === "ascend" ? "asc" : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<DeviceData>).field) {
      // // console.log((sorter as SorterResult<DeviceData>).field)

      SetSort((sorter as SorterResult<DeviceData>).field as string);
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
            title="Devices List"
            hasLink={true}
            addLink="/admin/device/device/create"
            permission="device.create"
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
                    <Panel header="Devices Filters" key="1">
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
                              <b>Device Type</b>
                            </span>
                            <Select
                              showSearch
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleDeviceTypeChange}
                              options={deviceTypeList}
                              value={selectedDeviceType}
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
                              <b>Monitoring Type</b>
                            </span>
                            <Select
                              showSearch
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleMonuitoringTypeChange}
                              options={monitoringTypesList}
                              value={selectedMonitoringType}
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
                              <b>Device Ip</b>
                            </span>
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Contact Number"
                              value={ip}
                              onChange={e => setIp(e.target.value)}
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
                              style={{
                                width: "100%",
                                textAlign: "start"
                              }}
                              placeholder="Please select"
                              onChange={handleChange}
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

export default DeviceList;
