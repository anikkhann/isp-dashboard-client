/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row, Space } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import ability from "@/services/guard/ability";
import { format } from "date-fns";
import { DailyIncomeExpenseListData } from "@/interfaces/DailyIncomeExpenseListData";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const DailyIncomeExpenseList: React.FC = () => {
  const [data, setData] = useState<DailyIncomeExpenseListData[]>([]);
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("createdOn");

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
    // // console.log('token', token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      meta: {
        limit: limit,
        page: page === 0 ? 0 : page - 1,
        sort: [
          {
            order: order,
            field: sort
          }
        ]
      }
    };

    const { data } = await axios.post("/api/daily-expenditure/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    // console.log("data", data);
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    // order, sort
    queryKey: ["daily-income-expense-list", page, limit, order, sort],
    queryFn: async () => {
      // , order, sort
      const response = await fetchData(page, limit, order, sort);
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        if (data.body) {
          setData(data.body);
          setTableParams({
            pagination: {
              total: data.meta.totalRecords,
              pageSize: data.meta.limit,
              current: (data.meta.page as number) + 1,
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
      console.log("data", data);
      setData(data);
    }
  }, [data]);

  // console.log(error, isLoading, isError)

  const columns: ColumnsType<DailyIncomeExpenseListData> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return <>{page !== 0 ? index + 1 + (page - 1) * limit : index + 1}</>;
      },
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Client",
      dataIndex: "client",
      sorter: false,
      render: (client: any) => {
        if (!client) return "-";

        return <>{client?.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Partner",
      dataIndex: "partner",
      sorter: false,
      render: (partner: any) => {
        if (!partner) return "-";

        return <>{partner?.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: false,
      render: (type: any) => {
        if (!type) return "-";

        return <>{type}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: false,
      render: (amount: any) => {
        if (!amount) return "-";

        return <>{amount}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Payment Channel",
      dataIndex: "paymentChannel",
      sorter: false,
      render: (paymentChannel: any) => {
        if (!paymentChannel) return "-";

        return <>{paymentChannel}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // insertedBy
    // {
    //   title: "Created By",
    //   dataIndex: "insertedBy",
    //   sorter: false,
    //   render: (insertedBy: any) => {
    //     if (!insertedBy) return "-";
    //     return <>{insertedBy.name}</>;
    //   },
    //   width: "20%",
    //   align: "center" as AlignType
    // },
    // createdOn
    {
      title: "Created At",
      dataIndex: "createdOn",
      sorter: false,
      render: (createdOn: any) => {
        if (!createdOn) return "-";
        const date = new Date(createdOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // editedBy
    // {
    //   title: "Updated By",
    //   dataIndex: "editedBy",
    //   sorter: false,
    //   render: (editedBy: any) => {
    //     if (!editedBy) return "-";
    //     return <>{editedBy.name}</>;
    //   },

    //   width: "20%",
    //   align: "center" as AlignType
    // },
    // updatedOn
    {
      title: "Date",
      dataIndex: "date",
      sorter: false,
      render: (date: any) => {
        if (!date) return "-";
        const datee = new Date(date);
        return <>{format(datee, "yyyy-MM-dd pp")}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Action",
      dataIndex: "action",
      sorter: false,
      render: (text: any, record: any) => {
        return (
          <>
            <Space size="middle" align="center">
              {ability.can("accountHead.update", "") ? (
                <Tooltip title="Edit" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link
                      href={`/admin/accounting/account-head/${record.id}/edit`}
                    >
                      <Button type="primary" icon={<EditOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
            </Space>
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<DailyIncomeExpenseListData>
      | SorterResult<DailyIncomeExpenseListData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<DailyIncomeExpenseListData>).order) {
      // // console.log((sorter as SorterResult<BwNttnProviderData>).order)

      SetOrder(
        (sorter as SorterResult<DailyIncomeExpenseListData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<DailyIncomeExpenseListData>).field) {
      // // console.log((sorter as SorterResult<BwNttnProviderData>).field)

      SetSort(
        (sorter as SorterResult<DailyIncomeExpenseListData>).field as string
      );
    }
  };

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
                  margin: " 10px 5px",
                  backgroundColor: "#ffffff",
                  width: "100%"
                }}
              >
                <Card
                  title="Error"
                  hoverable
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
            title="Daily Income/Expense List"
            hasLink={true}
            addLink="/admin/accounting/daily-income-expense/create"
            permission="daily_income_expense.create"
            style={{
              // backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto",
              backgroundColor: "#d5dfe6"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {ability.can("bulkCreate.create", "") && (
                <Link
                  href={`/admin/accounting/daily-income-expense/bulkCreate`}
                >
                  <Row justify={"end"}>
                    <Col>
                      <Button>Bulk Create</Button>
                    </Col>
                  </Row>
                </Link>
              )}

              {/* <Space
                style={{ marginBottom: 16 }}
                className="w-full flex justify-end mb-4"
              >
                <Button>Bulk Create</Button>
              </Space> */}
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

export default DailyIncomeExpenseList;
