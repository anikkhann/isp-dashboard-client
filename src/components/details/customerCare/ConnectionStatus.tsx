/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomerData } from "@/interfaces/CustomerData";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Space, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import type { ColumnsType } from "antd/es/table";

interface PropData {
  item: CustomerData;
}

const ConnectionStatus = ({ item }: PropData) => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/customer/connection-status/${item.username}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["connection-list", item],
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
    // assigned_ip
    {
      title: "Assigned Ip",
      dataIndex: "assigned_ip",
      sorter: false,
      render: (assigned_ip: any) => {
        if (!assigned_ip) return "-";
        return <>{assigned_ip}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // connection_status
    {
      title: "Connection Status",
      dataIndex: "connection_status",
      sorter: false,
      render: (connection_status: any) => {
        if (!connection_status) return "-";
        return <>{connection_status}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // nasipaddress
    {
      title: "Nas Ip Address",
      dataIndex: "nasipaddress",
      sorter: false,
      render: (nasipaddress: any) => {
        if (!nasipaddress) return "-";
        return <>{nasipaddress}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // router_mac
    {
      title: "Router Mac",
      dataIndex: "router_mac",
      sorter: false,
      render: (router_mac: any) => {
        if (!router_mac) return "-";
        return <>{router_mac}</>;
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
              title="Connection List"
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
                  rowKey={record => record.connection_status}
                  dataSource={data}
                  loading={isLoading || isFetching}
                />
              </Space>
            </TableCard>
          </Col>
        </AppRowContainer>
      </>
    </>
  );
};

export default ConnectionStatus;
