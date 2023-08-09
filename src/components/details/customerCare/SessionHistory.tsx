/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Space } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";

interface PropData {
  item: any | null;
}

const SessionHistory = ({ item }: PropData) => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/customer/session-history/${item.username}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["session-list", item],
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
    // username
    {
      title: "Username",
      dataIndex: "username",
      sorter: false,
      render: (_, row) => {
        if (!row.username) return "-";
        return <>{row.username}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // start_time
    {
      title: "Start time",
      dataIndex: "start_time",
      sorter: false,
      render: (_, row) => {
        if (!row.start_time) return "-";
        return <>{row.start_time}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // end_time
    {
      title: "End time",
      dataIndex: "end_time",
      sorter: false,
      render: (_, row) => {
        if (!row.end_time) return "-";
        return <>{row.end_time}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // onlinetime
    {
      title: "Online Time",
      dataIndex: "onlinetime",
      sorter: false,
      render: (_, row) => {
        if (!row.onlinetime) return "-";
        return <>{row.onlinetime}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // upload
    {
      title: "Upload",
      dataIndex: "upload",
      sorter: false,
      render: (_, row) => {
        if (!row.upload) return "-";
        return <>{row.upload}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // download
    {
      title: "download",
      dataIndex: "download",
      sorter: false,
      render: (_, row) => {
        if (!row.download) return "-";
        return <>{row.download}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // total
    {
      title: "total",
      dataIndex: "total",
      sorter: false,
      render: (_, row) => {
        if (!row.total) return "-";
        return <>{row.total}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // IP
    {
      title: "IP",
      dataIndex: "IP",
      sorter: false,
      render: (_, row) => {
        if (!row.IP) return "-";
        return <>{row.IP}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // device_mac
    {
      title: "Device Mac",
      dataIndex: "device_mac",
      sorter: false,
      render: (_, row) => {
        if (!row.device_mac) return "-";
        return <>{row.device_mac}</>;
      },
      /* width: "20%", */
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
            title="Session List"
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
              <Table
                columns={columns}
                rowKey={record => record.username}
                dataSource={data}
                loading={isLoading || isFetching}
              />
            </Space>
          </TableCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default SessionHistory;
