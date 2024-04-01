/* eslint-disable @typescript-eslint/no-explicit-any */
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Space, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

interface Data {
  id: number;
  customer_type: string;
  total_customer: number;
  active_customer: number;
  registered_customer: number;
  expired_customer: number;
}

const CustomerStatisticData = () => {
  const [data, setData] = useState<Data[]>([]);

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

    const { data } = await axios.get(
      `/api/dashboard/get-total-customer-type-wise`,
      {
        params: {
          page,
          limit,
          order,
          sort
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "dashboard-get-total-customer-type-wise",
      page,
      limit,
      order,
      sort
    ],
    queryFn: async () => {
      const response = await fetchData(page, limit, order, sort);
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        console.log("data.data", data);

        if (data.body) {
          setData(data.body);
          setTableParams({
            pagination: {
              total: data.body.length,
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

  const columns: ColumnsType<Data> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return (
          <>
            {/* <Space>{index + 1}</Space> */}
            {page !== 0 ? index + 1 + (page - 1) * limit : index + 1}
          </>
        );
      },
      sorter: false,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Customer Type",
      dataIndex: "customer_type",
      sorter: false,
      render: (customer_type: any) => {
        if (customer_type == 0) return <>{customer_type}</>;
        if (!customer_type) return "-";
        return <>{customer_type}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Total Cutomer",
      dataIndex: "total_customer",
      sorter: false,
      render: (total_customer: any) => {
        if (total_customer == 0) return <>{total_customer}</>;
        if (!total_customer) return "-";
        return <>{total_customer}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Active Customer",
      dataIndex: "active_customer",
      sorter: false,
      render: (active_customer: any) => {
        if (active_customer == 0) return <>{active_customer}</>;
        if (!active_customer) return "-";
        return <>{active_customer}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Registered Customer",
      dataIndex: "registered_customer",
      sorter: false,
      render: (registered_customer: any) => {
        if (registered_customer == 0) return <>{registered_customer}</>;
        if (!registered_customer) return "-";
        return <>{registered_customer}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Expired Customer",
      dataIndex: "expired_customer",
      sorter: false,
      render: (expired_customer: any) => {
        if (expired_customer == 0) return <>{expired_customer}</>;
        if (!expired_customer) return "-";
        return <>{expired_customer}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Data> | SorterResult<Data>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<Data>).order) {
      SetOrder(
        (sorter as SorterResult<Data>).order === "ascend" ? "asc" : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<Data>).field) {
      SetSort((sorter as SorterResult<Data>).field as string);
    }
  };
  return (
    <>
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
              title="Customer Statistic (Type Wise)"
              hasLink={false}
              addLink=""
              permission=""
              style={{
                borderRadius: "10px",
                padding: "10px",
                width: "100%",
                overflowX: "auto",
                backgroundColor: "#ffffff"
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                {/* {data && data.length != 0 && ( */}
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
                {/* )} */}
              </Space>
            </TableCard>
          </Col>
        </AppRowContainer>
      </>
    </>
  );
};

export default CustomerStatisticData;
