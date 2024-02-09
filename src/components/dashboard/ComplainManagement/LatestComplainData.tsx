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
import Link from "next/link";
import ability from "@/services/guard/ability";

const LatestComplainData = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/dashboard/get-latest-open-complain-list`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["dashboard-get-latest-open-complain-list-cm"],
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
      align: "center" as AlignType
    },
    {
      title: "Complain Type",
      dataIndex: "complain_type",
      sorter: false,
      render: (complain_type: any) => {
        if (complain_type == 0) return <>{complain_type}</>;
        if (!complain_type) return "-";
        return <>{complain_type}</>;
      },
      /* width: "20%", */
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
      align: "center" as AlignType
    },
    {
      title: "Created On",
      dataIndex: "created_on",
      sorter: false,
      render: (created_on: any) => {
        if (created_on == 0) return <>{created_on}</>;
        if (!created_on) return "-";
        return <>{created_on}</>;
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
              title="Latest Open Complain List"
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

export default LatestComplainData;
