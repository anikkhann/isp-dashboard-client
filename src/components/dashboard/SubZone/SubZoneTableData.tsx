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

const SubZoneTableData = () => {
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/dashboard/get-total-active-customer-sub-zone-inCharge-sub-zone-wise`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["dashboard-active-customer-sub-zone-table-list"],
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
      title: "Sub Zone In Charge",
      dataIndex: "sub_zone_incharge",
      sorter: false,
      render: (sub_zone_incharge: any) => {
        if (sub_zone_incharge == 0) return <>{sub_zone_incharge}</>;
        if (!sub_zone_incharge) return "-";
        return <>{sub_zone_incharge}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // total_customer
    {
      title: "Total Customer",
      dataIndex: "total_customer",
      sorter: false,
      render: (total_customer: any) => {
        if (total_customer == 0) return <>{total_customer}</>;
        if (!total_customer) return "-";
        return <>{total_customer}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // active_customer
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
      align: "center" as AlignType
    },
    // expired_customer
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
              title="Active Customer List(Sub Zone Wise)"
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
                <Table
                  className={"table-striped-rows"}
                  columns={columns}
                  rowKey={record => record.client}
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

export default SubZoneTableData;
