/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Space, Tag } from "antd";
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
import { TicketData } from "@/interfaces/TicketData";
import { format } from "date-fns";
import Link from "next/link";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

interface PropData {
  item: any | null;
}

const TicketHistory = ({ item }: PropData) => {
  const [data, setData] = useState<TicketData[]>([]);

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
        // SEND FIELD NAME WITH DATA TO SEARCH
        customer: {
          id: item.id,
          status: "open"
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
    queryKey: ["ticket-list", page, limit, order, sort],
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
      width: "10%",
      align: "center" as AlignType
    },

    {
      title: "Ticket Number",
      dataIndex: "ticketNo",
      sorter: true,
      render: (ticketNo, row) => {
        return (
          <Space size="middle" align="center" wrap className="mx-1">
            <Link href={`/admin/complaint/customer-ticket/${row.id}`}>
              {ticketNo}
            </Link>
          </Space>
        );
      },
      width: 200,
      align: "center" as AlignType
    },
    {
      title: "Customer ID",
      dataIndex: "customer.customerId",
      sorter: false,
      render: (customer, row) => {
        return <>{row.customer.customerId}</>;
      },

      width: 200,
      align: "center" as AlignType
    },
    {
      title: "Username",
      dataIndex: "customer.username",
      sorter: false,
      render: (customer, row) => {
        return <>{row.customer.username}</>;
      },
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

    // insertedBy
    {
      title: "Created By",
      dataIndex: "insertedBy",
      sorter: false,
      render: (insertedBy: any) => {
        if (!insertedBy) return "-";
        return <>{insertedBy.name}</>;
      },
      /* width: "20%", */
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
    {
      title: "Updated By",
      dataIndex: "editedBy",
      sorter: false,
      render: (editedBy: any) => {
        if (!editedBy) return "-";
        return <>{editedBy.name}</>;
      },

      /* width: "20%", */
      align: "center" as AlignType
    },
    // updatedOn
    {
      title: "Updated At",
      dataIndex: "updatedOn",
      sorter: false,
      render: (updatedOn: any) => {
        if (!updatedOn) return "-";
        const date = new Date(updatedOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
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
            title="Ticket List"
            hasLink={false}
            addLink="/admin/device/ip-management/create"
            permission="ip.create"
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* <Space style={{ marginBottom: 16 }}>
                <Button >Sort age</Button>
                <Button >Clear filters</Button>
                <Button >Clear filters and sorters</Button>
              </Space> */}
              <Table
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

export default TicketHistory;
