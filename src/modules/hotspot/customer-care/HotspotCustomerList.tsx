/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Space, Row, Tooltip, Input } from "antd";
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
import { EyeOutlined, MacCommandFilled } from "@ant-design/icons";
import { format } from "date-fns";

import { ClientRequisitionData } from "@/interfaces/ClientRequisitionData";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const HotspotCustomerList: React.FC = () => {
  const [data, setData] = useState<ClientRequisitionData[]>([]);
  const { Panel } = Collapse;

  const [selectedRadiusUsername, setSelectedRadiusUsername] =
    useState<any>(null);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("DESC");
  const [sort, SetSort] = useState("createdOn");

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
    selectedRadiusUsernameParam: string
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
        radiusUsername: selectedRadiusUsernameParam
      }
    };

    const { data } = await axios.post(
      `/api-hotspot/partner-customer/get-list`,
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
      "partner-customer-list",
      page,
      limit,
      order,
      sort,
      selectedRadiusUsername
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedRadiusUsername
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

  const handleClear = () => {
    setSelectedRadiusUsername(null);
  };

  const columns: ColumnsType<ClientRequisitionData> = [
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
      title: "Client/ISP",
      dataIndex: "client",
      sorter: false,
      render: (client: any) => {
        if (!client) return "-";
        return <>{client.name}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Mobile",
      dataIndex: "customer",
      sorter: false,
      render: (customer: any) => {
        if (!customer) return "-";
        return <>{customer.phone}</>;
      },
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
        return <>{customer.name}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Active Pricing Plan",
      dataIndex: "activePricingPlan",
      sorter: false,
      render: (activePricingPlan: any) => {
        if (!activePricingPlan) return "-";
        return <>{activePricingPlan.name}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Last Activated By",
      dataIndex: "lastActivatedBy",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Last Ip Address",
      dataIndex: "lastIpAddress",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "OTP",
      dataIndex: "otp",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "MAC",
      dataIndex: "mac",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Expiration Time",
      dataIndex: "expirationTime",
      sorter: false,
      render: (expirationTime: any) => {
        if (!expirationTime) return "-";
        const date = new Date(expirationTime);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    // insertedBy
    {
      title: "Created By",
      dataIndex: "insertedBy",
      sorter: false,
      render: (insertedBy: any) => {
        if (!insertedBy) return "-";
        return <>{insertedBy.username}</>;
      },
      ellipsis: true,
      width: "auto",
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
            <Space size="middle" align="center" className="mx-1">
              {ability.can("clientRequisition.view", "") ? (
                <Tooltip title="View" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap>
                    <Link href={`/admin/hotspot/customer-care/${record.id}`}>
                      <Button type="primary" icon={<EyeOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
            </Space>
            <Space size="middle" align="center" className="mx-1">
              {ability.can("HotspotCustomerCare.macBinding", "") ? (
                <Tooltip
                  title="Mac Binding"
                  placement="bottomRight"
                  color="purple"
                >
                  <Space size="middle" align="center" wrap>
                    <Link
                      href={`/admin/hotspot/customer-care/${record.id}/mac-binding`}
                    >
                      <Button
                        type="primary"
                        icon={<MacCommandFilled />}
                        style={{
                          marginLeft: "auto",
                          marginRight: "20px",
                          backgroundColor: "#35A29F",
                          color: "#ffffff"
                        }}
                      />
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
      | SorterResult<ClientRequisitionData>
      | SorterResult<ClientRequisitionData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<ClientRequisitionData>).order) {
      // // console.log((sorter as SorterResult<ClientRequisitionData>).order)

      SetOrder(
        (sorter as SorterResult<ClientRequisitionData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<ClientRequisitionData>).field) {
      // // console.log((sorter as SorterResult<ClientRequisitionData>).field)

      SetSort((sorter as SorterResult<ClientRequisitionData>).field as string);
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
            title="Customer List"
            hasLink={false}
            addLink=""
            permission=""
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
                              <b>Customer Mobile No</b>
                            </span>
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Customer Mobile No"
                              value={selectedRadiusUsername}
                              onChange={e =>
                                setSelectedRadiusUsername(e.target.value)
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

export default HotspotCustomerList;
