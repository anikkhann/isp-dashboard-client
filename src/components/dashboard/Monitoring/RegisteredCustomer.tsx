/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Space } from "antd";
// import { Button, Card, Col, Select, Space, Row } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
// import { Table, Collapse } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import { RegisteredCustomerData } from "@/interfaces/RegisteredCustomerData";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { format } from "date-fns";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const RegisteredCustomer: React.FC = () => {
  const [data, setData] = useState<RegisteredCustomerData[]>([]);

  // const MySwal = withReactContent(Swal);
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  //   const [order, SetOrder] = useState("asc");
  //   const [sort, SetSort] = useState("id");
  const [order, SetOrder] = useState<string | undefined>("asc");
  const [sort, SetSort] = useState<string | undefined>("id");
  // const [sortField, SetSortField] = useState<string | undefined>(undefined);
  // const [sortOrder, SetSortOrder] = useState<string | undefined>(undefined);

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
    order?: string,
    sort?: string
  ) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/dashboard/monitoring/top-ten-client-wise/registered-customer`,
      {
        params: {
          page,
          limit,

          order,
          sort
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    // , page, limit, order, sort,
    queryKey: ["top-10-registered-customer", page, limit, sort, sort],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,

        order,
        sort
      );
      return response;
    },
    onSuccess(data: any) {
      if (data) {
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<RegisteredCustomerData>
      | SorterResult<RegisteredCustomerData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<RegisteredCustomerData>).order) {
      // // console.log((sorter as SorterResult<ZoneRevenueData>).order)
      // SetOrder(
      //   (sorter as SorterResult<RegisteredCustomerData>).order === "ascend"
      //     ? "asc"
      //     : "desc"
      // );
      SetOrder(
        (sorter as SorterResult<RegisteredCustomerData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    } else {
      SetOrder(undefined);
    }
    if (sorter && (sorter as SorterResult<RegisteredCustomerData>).field) {
      SetSort((sorter as SorterResult<RegisteredCustomerData>).field as string);
    }
    // if (sorter && (sorter as SorterResult<RegisteredCustomerData>).field) {
    //   // // console.log((sorter as SorterResult<ZoneRevenueData>).field)
    //    SetSort((sorter as SorterResult<ZoneTagData>).field as string);
    // }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<RegisteredCustomerData> = [
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
      sorter: true,
      ellipsis: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Client",
      dataIndex: "client_name",
      sorter: true,
      render: (client_name: any) => {
        if (!client_name) return "-";
        return <>{client_name}</>;
      },
      ellipsis: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Total Registered",
      dataIndex: "total_registered",
      sorter: true,
      render: (total_registered: any) => {
        if (!total_registered) return "-";
        return <>{total_registered}</>;
      },
      ellipsis: true,
      width: "20%",
      align: "center" as AlignType
    }
  ];

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
            title=""
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

export default RegisteredCustomer;
