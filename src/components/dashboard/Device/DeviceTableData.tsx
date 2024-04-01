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
  network_name: string;
  network_address: string;
  subnet_mask: string;
  total_ip: number;
  used_ip: number;
  free_ip: number;
}

const DeviceTableData = () => {
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
      `/api/dashboard/get-ip-stat-network-wise`,
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
      "dashboard-get-network-wise-ip-stat-list",
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
        // console.log("data.data", data);

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
    // client
    {
      title: "Network Name",
      dataIndex: "network_name",
      sorter: false,
      render: (network_name: any) => {
        if (network_name == 0) return <>{network_name}</>;
        if (!network_name) return "-";
        return <>{network_name}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // total_customer
    {
      title: "Network Address",
      dataIndex: "network_address",
      sorter: false,
      render: (network_address: any) => {
        if (network_address == 0) return <>{network_address}</>;
        if (!network_address) return "-";
        return <>{network_address}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // active_customer
    {
      title: "Subnet Mask",
      dataIndex: "subnet_mask",
      sorter: false,
      render: (subnet_mask: any) => {
        if (subnet_mask == 0) return <>{subnet_mask}</>;
        if (!subnet_mask) return "-";
        return <>{subnet_mask}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // registered_customer
    {
      title: "Total IP",
      dataIndex: "total_ip",
      sorter: false,
      render: (total_ip: any) => {
        if (total_ip == 0) return <>{total_ip}</>;
        if (!total_ip) return "-";
        return <>{total_ip}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // expired_customer
    {
      title: "Used IP",
      dataIndex: "used_ip",
      sorter: false,
      render: (used_ip: any) => {
        if (used_ip == 0) return <>{used_ip}</>;
        if (!used_ip) return "-";
        return <>{used_ip}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Free IP",
      dataIndex: "free_ip",
      sorter: false,
      render: (free_ip: any) => {
        if (free_ip == 0) return <>{free_ip}</>;
        if (!free_ip) return "-";
        return <>{free_ip}</>;
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
              title="IP Statistic(Network Wise)"
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

export default DeviceTableData;
