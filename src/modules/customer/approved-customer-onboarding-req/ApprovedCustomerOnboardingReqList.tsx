/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  // Button,
  Card,
  Col,
  Space,
  Tag,
  Tooltip
} from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
// import Link from "next/link";
// import { EditOutlined } from "@ant-design/icons";
// import ability from "@/services/guard/ability";
import { CustomerData } from "@/interfaces/CustomerData";
import { format } from "date-fns";
import Link from "next/link";
import {
  // CheckSquareOutlined,
  CloseSquareOutlined,
  EditOutlined,
  EyeOutlined,
  IssuesCloseOutlined
} from "@ant-design/icons";
import { useAppSelector } from "@/store/hooks";
import ability from "@/services/guard/ability";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const ApprovedCustomerOnboardingReqList: React.FC = () => {
  const authUser = useAppSelector(state => state.auth.user);

  const [data, setData] = useState<CustomerData[]>([]);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

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
    sort: string
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
        clientStatus: "Approved"
      }
    };

    const { data } = await axios.post("/api/customer-request/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["customer-req-list", page, limit, order, sort],
    queryFn: async () => {
      const response = await fetchData(page, limit, order, sort);
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

  // console.log(error, isLoading, isError)

  const columns: ColumnsType<CustomerData> = [
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
      title: "Username",
      dataIndex: "username",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Status",
      dataIndex: "clientStatus",
      sorter: true,
      render: (clientStatus: any) => {
        return (
          <>
            {clientStatus === "Pending" ? (
              <Tag color="green">{clientStatus}</Tag>
            ) : clientStatus === "Rejected" ? (
              <Tag color="red">{clientStatus}</Tag>
            ) : (
              <Tag color="blue">{clientStatus}</Tag>
            )}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // Requested By
    {
      title: "Requested By",
      dataIndex: "partner.username",
      sorter: false,
      render: (_, row: any) => {
        if (!row.partner) return "-";
        return <>{row.partner.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // Requested User Type
    {
      title: "Requested User Type",
      dataIndex: "partner.partnerType",
      sorter: false,
      render: (_, row: any) => {
        if (!row.partner) return "-";
        return <>{row.partner.partnerType}</>;
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
      title: "Request Time",
      dataIndex: "createdOn",
      sorter: false,
      render: (createdOn: any) => {
        if (!createdOn) return "-";
        const date = new Date(createdOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      /* width: "20%", */
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
              {/* edit */}
              {authUser &&
                authUser.partnerId == record.partnerId &&
                record.clientStatus != "Approved" &&
                (ability.can("customerOnboardingReq.update", "") ? (
                  <Tooltip title="Edit" placement="bottomRight" color="magenta">
                    <Space size="middle" align="center" wrap>
                      <Link
                        href={`/admin/customer/customer-onboarding-req/${record.id}/edit`}
                      >
                        <Button type="primary" icon={<EditOutlined />} />
                      </Link>
                    </Space>
                  </Tooltip>
                ) : null)}
              {/* approve */}
              {/* {((authUser &&
                authUser.partnerId != record.partnerId &&
                record.zoneStatus == "Approved") ||
                record.zoneStatus == "Pending") &&
                (ability.can("customerOnboardingReq.approve", "") ? (
                  <Tooltip
                    title="Approve Onboarding Request"
                    placement="bottomRight"
                    color="green"
                  >
                    <Space size="middle" align="center" wrap>
                      <Link
                        href={`/admin/customer/customer-onboarding-req/${record.id}/approve`}
                      >
                        <Button
                          type="primary"
                          icon={<CheckSquareOutlined />}
                          style={{
                            backgroundColor: "#0B666A",
                            color: "#ffffff"
                          }}
                        />
                      </Link>
                    </Space>
                  </Tooltip>
                ) : null)} */}
              {/* reject */}
              {(record.clientStatus == "Pending" ||
                record.zoneStatus == "Pending") &&
                (ability.can("customerOnboardingReq.reject", "") ? (
                  <Tooltip title="Reject" placement="bottomRight" color="red">
                    <Space size="middle" align="center" wrap>
                      <Link
                        href={`/admin/customer/customer-onboarding-req/${record.id}/reject`}
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
                ) : null)}
              {/* reinitiate */}

              {authUser &&
                authUser.partnerId == record.partnerId &&
                (record.clientStatus == "Rejected" ||
                  record.zoneStatus == "Rejected") &&
                (ability.can("customerOnboardingReq.reinitiate", "") ? (
                  <Tooltip
                    title="ReInitiate"
                    placement="bottomRight"
                    color="blue"
                  >
                    <Space size="middle" align="center" wrap>
                      <Link
                        href={`/admin/customer/customer-onboarding-req/${record.id}/reinitiate`}
                      >
                        <Button
                          type="primary"
                          icon={<IssuesCloseOutlined />}
                          style={{
                            backgroundColor: "#241468",
                            color: "#ffffff"
                          }}
                        />
                      </Link>
                    </Space>
                  </Tooltip>
                ) : null)}
              {/* view */}
              {ability.can("customerOnboardingReq.view", "") ? (
                <Tooltip title="View" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap className="mx-1">
                    <Link
                      href={`/admin/customer/customer-onboarding-req/${record.id}`}
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
                  margin: " 10px 5px",
                  backgroundColor: "#ffffff",
                  width: "100%"
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
            title="Approved Customers List"
            hasLink={false}
            addLink="/admin/customer/customer/create"
            permission="approvedCustomerOnboardingReq.create"
            style={{
              // backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto",
              backgroundColor: "#d5dfe6"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* <Space style={{ marginBottom: 16 }}>
                <Button >Sort age</Button>
                <Button >Clear filters</Button>
                <Button >Clear filters and sorters</Button>
              </Space> */}
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

export default ApprovedCustomerOnboardingReqList;
