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

const DeviceTableData = () => {
  const [data, setData] = useState<any[]>([]);
  console.log(data);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/dashboard/get-ip-stat-network-wise`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["dashboard-get-network-wise-ip-stat-list"],
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
                  className={"table-striped-rows"}
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

export default DeviceTableData;
