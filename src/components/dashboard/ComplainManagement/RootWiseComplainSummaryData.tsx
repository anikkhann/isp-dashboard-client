/* eslint-disable @typescript-eslint/no-explicit-any */
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Space, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import type { ColumnsType } from "antd/es/table";

const RootWiseComplainSummaryData = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/dashboard/get-customer-complain-root-cause-wise`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["dashboard-get-customer-complain-root-cause-wise-complain"],
    queryFn: async () => {
      const response = await fetchData();
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);

        if (data.body) {
          setData(data.body);
        } else {
          setData([]);
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

  const columns: ColumnsType<any> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return (
          <>
            <Space>{index + 1}</Space>
          </>
        );
      },
      sorter: false,
      width: "10%",
      align: "center" as AlignType
    },
    {
      title: "Root Cause",
      dataIndex: "root_cause",
      sorter: false,
      render: (root_cause: any) => {
        if (root_cause == 0) return <>{root_cause}</>;
        if (!root_cause) return "-";
        return <>{root_cause}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },

    {
      title: "Total Ticket",
      dataIndex: "total_ticket",
      sorter: false,
      render: (total_ticket: any) => {
        if (total_ticket == 0) return <>{total_ticket}</>;
        if (!total_ticket) return "-";
        return <>{total_ticket}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Total Closed By Me",
      dataIndex: "total_closed_by_me",
      sorter: false,
      render: (total_closed_by_me: any) => {
        if (total_closed_by_me == 0) return <>{total_closed_by_me}</>;
        if (!total_closed_by_me) return "-";
        return <>{total_closed_by_me}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Total Closed In Last 7 Days",
      dataIndex: "total_closed_in_last_7_days",
      sorter: false,
      render: (total_closed_in_last_7_days: any) => {
        if (total_closed_in_last_7_days == 0)
          return <>{total_closed_in_last_7_days}</>;
        if (!total_closed_in_last_7_days) return "-";
        return <>{total_closed_in_last_7_days}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    }
  ];

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
              title="Customer Complaint (Root Cause Wise)"
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
                  columns={columns}
                  rowKey={record => record.client}
                  dataSource={data}
                  loading={isLoading || isFetching}
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

export default RootWiseComplainSummaryData;
