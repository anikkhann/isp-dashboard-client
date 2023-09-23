/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Space } from "antd";
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
import ability from "@/services/guard/ability";
import Link from "next/link";
import { AlertOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ZoneRevenueDisbursement } from "@/interfaces/ZoneRevenueDisbursement";
import { format } from "date-fns";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const ZoneRevenueDisbursementList: React.FC = () => {
  const [data, setData] = useState<ZoneRevenueDisbursement[]>([]);

  const MySwal = withReactContent(Swal);

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
          `/api/zone-revenue-disbursement/update`,
          body
        );
        if (data.status === 200) {
          MySwal.fire("Success!", data.message, "success").then(() => {
            // router.reload();
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
          `/api/zone-revenue-disbursement/update`,
          body
        );
        if (data.status === 200) {
          MySwal.fire("Success!", data.message, "success").then(() => {
            // router.reload();
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
    sort: string
  ) => {
    const token = Cookies.get("token");
    // // console.log('token', token)
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
      }
    };

    const { data } = await axios.post(
      "/api/zone-revenue-disbursement/get-list",
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
    queryKey: ["zone-revenue-disbursement-list", page, limit, order, sort],
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

  // // console.log(error, isLoading, isError)
  const columns: ColumnsType<ZoneRevenueDisbursement> = [
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
      width: "10%",
      align: "center" as AlignType
    },

    {
      title: "amount",
      dataIndex: "amount",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "note",
      dataIndex: "note",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Child Note",
      dataIndex: "childNote",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (status: any) => {
        return <>{status}</>;
      },
      width: "20%",
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
      width: "20%",
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
      /* width: "20%", */
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
            {/* <Space size="middle" align="center">
             
            {/* approve */}
            <Space size="middle" align="center" className="mx-1">
              {ability.can("zoneRevenueDisbursement.reject", "") ? (
                <Space size="middle" align="center" wrap>
                  <Link
                    href={`/admin/accounting/zone-revenue-disbursement/${record.id}/reject`}
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
              ) : null}

              {ability.can("zoneRevenueDisbursement.approve", "") ? (
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
              ) : null}

              {/* cancel */}
              {ability.can("zoneRevenueDisbursement.cancel", "") ? (
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
              ) : null}

              {/* {ability.can("zoneRevenueDisbursement.view", "") ? (
                <Space size="middle" align="center" wrap>
                  <Link href={`/admin/accounting/zone-revenue-disbursement/${record.id}`}>
                    <Button type="primary" icon={<EyeOutlined />} />
                  </Link>
                </Space>
              ) : null} */}
            </Space>
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
      | SorterResult<ZoneRevenueDisbursement>
      | SorterResult<ZoneRevenueDisbursement>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<ZoneRevenueDisbursement>).order) {
      // // console.log((sorter as SorterResult<ZoneRevenueDisbursement>).order)

      SetOrder(
        (sorter as SorterResult<ZoneRevenueDisbursement>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<ZoneRevenueDisbursement>).field) {
      // // console.log((sorter as SorterResult<ZoneRevenueDisbursement>).field)

      SetSort(
        (sorter as SorterResult<ZoneRevenueDisbursement>).field as string
      );
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
            title="Zone Revenue Disbursement List"
            hasLink={true}
            addLink="/admin/accounting/zone-revenue-disbursement/create"
            permission="zoneRevenueDisbursement.create"
            style={{
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

export default ZoneRevenueDisbursementList;
