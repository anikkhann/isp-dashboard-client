/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Collapse, Row, Select, Space } from "antd";
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
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import ability from "@/services/guard/ability";
import { format } from "date-fns";
import { DailyIncomeExpenseListData } from "@/interfaces/DailyIncomeExpenseListData";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const types = [
  {
    label: "Income",
    value: "income"
  },
  {
    label: "Expense",
    value: "expense"
  }
];
const channelList = [
  {
    label: "Cash",
    value: "cash"
  },
  {
    label: "Cheque",
    value: "cheque"
  },
  {
    label: "Online",
    value: "online"
  }
];
const DailyIncomeExpenseList: React.FC = () => {
  const [data, setData] = useState<DailyIncomeExpenseListData[]>([]);
  const { Panel } = Collapse;
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("createdOn");
  const [selectType, setSelectType] = useState<any>("income");
  const [accountHeadIds, setAccountHeadIds] = useState<any>([]);
  const [selectedAccountHeadId, setSelectedAccountHeadId] = useState<any>(null);
  const [selectPaymentChannel, setSelectPaymentChannel] = useState(null);
  const router = useRouter();
  const MySwal = withReactContent(Swal);

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
    sort: string,
    selectTypeParam?: string,
    selectedAccountHeadIdParam?: string | null,
    selectPaymentChannelParam?: string | null
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
      },
      body: {
        type: selectTypeParam, // Dropdown (income, expense)
        accountHeadId: selectedAccountHeadIdParam, //account head list with filter => selected type
        paymentChannel: selectPaymentChannelParam //dropdown (cash, cheque, online)
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
    queryKey: [
      "daily-income-expense-list",
      page,
      limit,
      order,
      sort,
      selectType,
      selectedAccountHeadId,
      selectPaymentChannel
    ],
    queryFn: async () => {
      // , order, sort
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectType,
        selectedAccountHeadId,
        selectPaymentChannel
      );
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

  // delete
  async function handleDelete(id: number) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const { data } = await axios.delete(
          `/api/daily-expenditure/delete/${id}`
        );
        if (data.status == 200) {
          MySwal.fire("Deleted!", data.message, "success").then(() => {
            router.reload();
          });
        } else {
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error: any) {
      // console.log("error", error);
      if (error.response) {
        MySwal.fire("Error!", error.response.data.message, "error");
      } else {
        MySwal.fire("Error!", "Something went wrong", "error");
      }
    }
  }

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

    // {
    //   title: "Client",
    //   dataIndex: "client",
    //   sorter: false,
    //   render: (client: any) => {
    //     if (!client) return "-";

    //     return <>{client?.username}</>;
    //   },
    //   ellipsis: true,
    //   width: "auto",
    //   align: "center" as AlignType
    // },
    // {
    //   title: "Partner",
    //   dataIndex: "partner",
    //   sorter: false,
    //   render: (partner: any) => {
    //     if (!partner) return "-";

    //     return <>{partner?.username}</>;
    //   },
    //   ellipsis: true,
    //   width: "auto",
    //   align: "center" as AlignType
    // },
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
      title: "Amount (BDT)",
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
      title: "Entry At",
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
    // insertedBy
    {
      title: "Entry By",
      dataIndex: "insertedBy",
      sorter: false,
      render: (insertedBy: any) => {
        if (!insertedBy) return "-";
        return <>{insertedBy?.username}</>;
      },
      width: "20%",
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
      title: "Event Date",
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
          <div className="flex flex-row">
            <Space size="middle" align="center">
              {ability.can("daily_income_expense.update", "") && (
                <Tooltip title="Edit" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link
                      href={`/admin/accounting/daily-income-expense/${record.id}/edit`}
                    >
                      <Button type="primary" icon={<EditOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              )}
            </Space>
            <Space size="middle" align="center" className="mx-1">
              {ability.can("daily_income_expense.delete", "") && (
                <Tooltip title="Delete" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Button
                      type="primary"
                      icon={<CloseOutlined />}
                      style={{
                        backgroundColor: "#FF407D",
                        borderColor: "#FF407D",
                        color: "#ffffff"
                      }}
                      onClick={() => handleDelete(record.id)}
                    />
                  </Space>
                </Tooltip>
              )}
            </Space>
          </div>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
  ];

  const getAccountHeadList = (selectType: string) => {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "id"
          }
        ]
      },
      body: {
        // isActive: true
        type: selectType, // Assuming the API can filter based on type
        isActive: true
      }
    };
    axios.post("/api/account-head/get-list", body).then(res => {
      const { data } = res;

      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const accountHeadIds = data.body.map((item: any) => {
        return {
          label: item.title,
          value: item.id
        };
      });
      setAccountHeadIds(accountHeadIds);
    });
  };

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectType(value as any);
  };
  const handleAccountHeadIDChange = (value: any) => {
    setSelectedAccountHeadId(value as any);
  };
  const handlePaymentChannelChange = (value: any) => {
    // console.log("checked = ", value);

    setSelectPaymentChannel(value as any);
  };
  const handleClear = () => {
    setSelectType(null);
    setSelectedAccountHeadId(null);
    setSelectPaymentChannel(null);
  };

  useEffect(() => {
    if (selectType) {
      getAccountHeadList(selectType);
    }
  }, [selectType]);
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
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space style={{ marginBottom: 16 }}>
                  <div style={{ padding: "20px", backgroundColor: "white" }}>
                    <Collapse
                      accordion
                      style={{
                        backgroundColor: "#FFC857",
                        color: "white",
                        borderRadius: 4,
                        // marginBottom: 24,
                        // border: 0,
                        overflow: "hidden",
                        fontWeight: "bold",
                        font: "1rem"
                      }}
                    >
                      <Panel header="Filters" key="1">
                        <Row
                          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                          justify="space-between"
                        >
                          <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            xxl={8}
                            className="gutter-row"
                          >
                            {/* type */}

                            <Space
                              style={{ width: "100%" }}
                              direction="vertical"
                            >
                              <span>
                                <b>Type</b>
                              </span>
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select Type"
                                onChange={handleChange}
                                options={types}
                                value={selectType}
                              />
                            </Space>
                          </Col>
                          <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            xxl={8}
                            className="gutter-row"
                          >
                            <Space
                              style={{ width: "100%" }}
                              direction="vertical"
                            >
                              <span>
                                <b>Account Head</b>
                              </span>
                              <Select
                                allowClear
                                style={{
                                  width: "100%",
                                  textAlign: "start"
                                }}
                                placeholder="Please select"
                                onChange={handleAccountHeadIDChange}
                                options={accountHeadIds}
                                value={selectedAccountHeadId}
                                showSearch
                                filterOption={(input, option) => {
                                  if (typeof option?.label === "string") {
                                    return (
                                      option.label
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    );
                                  }
                                  return false;
                                }}
                              />
                            </Space>
                          </Col>

                          <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            xxl={8}
                            className="gutter-row"
                          >
                            {/* type */}

                            <Space
                              style={{ width: "100%" }}
                              direction="vertical"
                            >
                              <span>
                                <b>Payment Channel</b>
                              </span>
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select Payment"
                                onChange={handlePaymentChannelChange}
                                options={channelList}
                                value={selectPaymentChannel}
                              />
                            </Space>
                          </Col>

                          <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            xxl={8}
                            className="gutter-row"
                          >
                            <Button
                              style={{
                                width: "100%",
                                textAlign: "center",
                                marginTop: "25px",
                                backgroundColor: "#F15F22",
                                color: "#ffffff"
                              }}
                              onClick={() => {
                                handleClear();
                              }}
                              className="ant-btn  ant-btn-lg"
                            >
                              Clear filters
                            </Button>
                          </Col>
                          <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            xxl={8}
                            className="gutter-row"
                          ></Col>
                          <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            xxl={8}
                            className="gutter-row"
                          ></Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </div>
                </Space>

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
            </Space>
          </TableCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default DailyIncomeExpenseList;
