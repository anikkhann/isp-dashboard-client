/* eslint-disable @typescript-eslint/no-explicit-any */
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Space, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import Link from "next/link";
import ability from "@/services/guard/ability";
import { format } from "date-fns";
// import dayjs from "dayjs";
// import advancedFormat from "dayjs/plugin/advancedFormat";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import localeData from "dayjs/plugin/localeData";
// import weekday from "dayjs/plugin/weekday";
// import weekOfYear from "dayjs/plugin/weekOfYear";
// import weekYear from "dayjs/plugin/weekYear";
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
  ticket_no: string;
  complain_type: string;
  customer: string;
  created_on: number;
}

const LatestComplainData = () => {
  const [data, setData] = useState<any[]>([]);

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
      `/api/dashboard/get-latest-open-complain-list`,
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
      "dashboard-get-latest-open-complain-list-cm",
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
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   sorter: false,
    //   render: (id: any) => {
    //     if (id == 0) return <>{id}</>;
    //     if (!id) return "-";
    //     return <>{id}</>;
    //   },
    //    width: "20%",
    //   align: "center" as AlignType
    // },

    {
      title: "Ticket No",
      dataIndex: "ticket_no",
      sorter: false,
      render: (ticket_no: any, record) => {
        if (ticket_no == 0) return <>{ticket_no}</>;
        if (!ticket_no) return "-";
        return (
          <>
            {/* {ticket_no} */}{" "}
            {ability.can("customerTicket.view", "") ? (
              <Space size="middle" align="center" wrap className="mx-1">
                <Link href={`/admin/complaint/customer-ticket/${record.id}`}>
                  {ticket_no}
                  {/* <Button type="primary" icon={<EyeOutlined />} /> */}
                </Link>
              </Space>
            ) : null}
          </>
        );
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Complaint Type",
      dataIndex: "complain_type",
      sorter: false,
      render: (complain_type: any) => {
        if (complain_type == 0) return <>{complain_type}</>;
        if (!complain_type) return "-";
        return <>{complain_type}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Customer",
      dataIndex: "customer",
      sorter: false,
      render: (customer: any) => {
        if (customer == 0) return <>{customer}</>;
        if (!customer) return "-";
        return <>{customer}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Created On",
      dataIndex: "created_on",
      sorter: false,
      render: (created_on: any) => {
        // if (created_on == 0) return <>{created_on}</>;
        // if (!created_on) return "-";
        // return <>{created_on}</>;
        if (!created_on) return "-";
        const date = new Date(created_on);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
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
              title="Latest Open Complaint List"
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
                  columns={columns}
                  className={"table-striped-rows"}
                  rowKey={record => record.id}
                  pagination={tableParams.pagination}
                  dataSource={data}
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

export default LatestComplainData;
