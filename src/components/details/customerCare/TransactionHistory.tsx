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
import { format } from "date-fns";

interface PropData {
  item: any | null;
}

const TransactionHistory = ({ item }: PropData) => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/topup-transaction/get-transaction-by-id/${item.id}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["transaction-list", item],
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
      title: "Trx Date",
      dataIndex: "trx_date",
      sorter: false,
      render: (trx_date: any) => {
        if (!trx_date) return "-";
        const date = new Date(trx_date);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // trx_by
    {
      title: "Trx By",
      dataIndex: "trx_by",
      sorter: false,
      render: (trx_by: any) => {
        return <>{trx_by}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },

    // transaction_id
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      sorter: false,
      render: (transaction_id: any) => {
        return <>{transaction_id}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // trx_mode
    {
      title: "Trx Mode",
      dataIndex: "trx_mode",
      sorter: false,
      render: (trx_mode: any) => {
        return <>{trx_mode}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // trx_type
    {
      title: "Trx Type",
      dataIndex: "trx_type",
      sorter: false,
      render: (trx_type: any) => {
        return <>{trx_type}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },

    // amount
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: false,
      render: (amount: any) => {
        return <>{amount}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    // balance
    {
      title: "Balance",
      dataIndex: "balance",
      sorter: false,
      render: (balance: any) => {
        return <>{balance}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },

    // remarks
    {
      title: "Remarks",
      dataIndex: "remarks",
      sorter: false,
      render: (remarks: any) => {
        return <>{remarks}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },

    // transction_by
    {
      title: "Transaction By",
      dataIndex: "transction_by",
      sorter: false,
      render: (transction_by: any) => {
        return <>{transction_by}</>;
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
                rowKey={record => record.trx_date}
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

export default TransactionHistory;
