/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Select, Space, Row, DatePicker } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useRef, useState } from "react";
import { Table, Collapse } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import ability from "@/services/guard/ability";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { format } from "date-fns";

import { CSVLink } from "react-csv";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { IncomeExpenseReportData } from "@/interfaces/IncomeExpenseReportData";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";
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

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const IncomeExpenseReportList: React.FC = () => {
  const [data, setData] = useState<IncomeExpenseReportData[]>([]);
  const { Panel } = Collapse;
  // const authUser = useAppSelector(state => state.auth.user);
  const MySwal = withReactContent(Swal);
  const downloadRef = useRef<any>(null);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [downloadRow, setDownloadRow] = useState<any[]>([]);

  const [selectType, setSelectType] = useState<any>("income");
  const [accountHeadIds, setAccountHeadIds] = useState<any>([]);
  const [selectedAccountHeadId, setSelectedAccountHeadId] = useState<any>(null);

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("desc");
  const [sort, SetSort] = useState("trxDate");
  const { RangePicker } = DatePicker;
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
    selectedAccountHeadIdParam?: string,
    selectedStartDateParam?: string,
    selectedEndDateParam?: string
  ) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/daily-expenditure/report?type=${selectTypeParam}&startDate=${selectedStartDateParam}&endDate=${selectedEndDateParam}`,

      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "income-expense-report-details",
      page,
      limit,
      order,
      sort,
      selectType,
      selectedAccountHeadId,
      selectedStartDate,
      selectedEndDate
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectType,
        selectedAccountHeadId,
        selectedStartDate,
        selectedEndDate
      );
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        if (data.status == 500) {
          MySwal.fire({
            title: "Error!",
            text: data.message ? data.message : "Something went wrong",
            icon: "error",
            confirmButtonText: "Ok"
          });
        }

        if (data.body) {
          setData(data.body);
          setTableParams({
            pagination: {
              total: data.body.length,
              // total: data.meta.totalRecords,
              // pageSize: data.meta.limit,
              // current: (data.meta.page as number) + 1,
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
  const handleDateChange = (value: any) => {
    // console.log(value);

    if (value) {
      setSelectedDateRange(value);

      const startDate = dayjs(value[0]).format(dateFormat);
      const endDate = dayjs(value[1]).format(dateFormat);

      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);

      // console.log(startDate, endDate);
    } else {
      setSelectedDateRange(null);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  };
  const handleAccountHeadIDChange = (value: any) => {
    setSelectedAccountHeadId(value as any);
  };

  useEffect(() => {
    if (selectType) {
      getAccountHeadList(selectType);
    }
  }, [selectType]);

  const handleClear = () => {
    setSelectType(null);
    setSelectedAccountHeadId(null);
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const columns: ColumnsType<IncomeExpenseReportData> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return (
          <>
            {/* <Space>
              {page !== 0 ? index + 1 + (page - 1) * limit : index + 1}
            </Space> */}
            {page !== 0 ? index + 1 + (page - 1) * limit : index + 1}
          </>
        );
      },
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Account Head",
      dataIndex: "account_head",
      sorter: false,
      render: (account_head: any) => {
        if (!account_head) return "-";
        return <>{account_head}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Action By",
      dataIndex: "action_by",
      sorter: false,
      render: (action_by: any) => {
        if (!action_by) return "-";
        return <>{action_by}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Income Amount",
      dataIndex: "income_amount",
      sorter: false,
      render: (income_amount: any) => {
        if (!income_amount) return "-";
        return <>{income_amount}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Expense Amount",
      dataIndex: "expense_amount",
      sorter: false,
      render: (expense_amount: any) => {
        if (!expense_amount) return "-";
        return <>{expense_amount}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      sorter: false,
      render: (remarks: any) => {
        if (!remarks) return "-";
        return <>{remarks}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Trx Date",
      dataIndex: "trx_date",
      sorter: false,
      render: (trx_date: any) => {
        if (!trx_date) return "-";
        const date = new Date(trx_date);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
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
      | SorterResult<IncomeExpenseReportData>
      | SorterResult<IncomeExpenseReportData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<IncomeExpenseReportData>).order) {
      // // console.log((sorter as SorterResult<ZoneTagData>).order)

      SetOrder(
        (sorter as SorterResult<IncomeExpenseReportData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<IncomeExpenseReportData>).field) {
      // // console.log((sorter as SorterResult<ZoneTagData>).field)

      SetSort(
        (sorter as SorterResult<IncomeExpenseReportData>).field as string
      );
    }
  };
  const handleDownload = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const res = await axios.get(
        `/api/daily-expenditure/report?type=${selectType}&startDate=${selectedStartDate}&endDate=${selectedEndDate}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const { data } = res;

      if (data.status !== 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
        setDownloadLoading(false); // Ensure the button state is reset on error
        return;
      }

      if (!data.body) {
        setDownloadLoading(false); // Reset button if no data
        return;
      }

      const list = data.body.map((item: any) => {
        const trxDate = new Date(item.trx_date);

        return {
          "Account Head": item.account_head,
          "Action By": item.action_by,
          "Income Amount": item.income_amount,
          "Expense Amount": item.expense_amount,
          Remarks: item.remarks,
          "Trx Date": format(trxDate, "yyyy-MM-dd pp")
        };
      });

      setDownloadRow([...list]);
      setDownloadLoading(false); // Reset button after download is successful
    } catch (error: any) {
      MySwal.fire({
        title: "Error",
        text: error.message || "Something went wrong",
        icon: "error"
      });
      setDownloadLoading(false); // Ensure the button state is reset on error
    }
  };

  // const handleDownload = async () => {
  //   const token = Cookies.get("token");
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //   try {
  //     const res = await axios.get(`/api/daily-expenditure/report`, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });

  //     const { data } = res;

  //     if (data.status !== 200) {
  //       MySwal.fire({
  //         title: "Error",
  //         text: data.message || "Something went wrong",
  //         icon: "error"
  //       });
  //       setDownloadLoading(false); // Ensure the button state is reset on error
  //       return;
  //     }

  //     if (!data.body) {
  //       setDownloadLoading(false); // Reset button if no data
  //       return;
  //     }

  //     const list = data.body.map((item: any) => {
  //       const trxDate = new Date(item.trx_date);

  //       return {
  //         "Account Head": item.account_head,
  //         "Action By": item.action_by,
  //         "Income Amount": item.income_amount,
  //         "Expense Amount": item.expense_amount,
  //         Remarks: item.remarks,
  //         "Trx Date": format(trxDate, "yyyy-MM-dd pp")
  //       };
  //     });

  //     setDownloadRow([...list]);
  //   } catch (message) {
  //     MySwal.fire({
  //       title: "Error",
  //       text: error.message || "Something went wrong",
  //       icon: "error"
  //     });
  //     setDownloadLoading(false); // Ensure the button state is reset on error
  //   }
  // };
  useEffect(() => {
    if (downloadRow && downloadRow.length > 0) {
      setDownloadRow(downloadRow);

      if (downloadRef.current) {
        downloadRef.current.link.click();
      }
      setDownloadLoading(false);
    }
  }, [downloadRow]);
  // useEffect(() => {
  //   if (downloadRow.length > 0) {
  //     downloadRef.current.link.click();
  //     setDownloadLoading(false); // Ensure the button is reset after the CSV is generated
  //   }
  // }, [downloadRow]);

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
            title=""
            hasLink={false}
            addLink=""
            permission=""
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto",
              backgroundColor: "#d5dfe6"
            }}
          >
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

                          <Space style={{ width: "100%" }} direction="vertical">
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
                          <Space style={{ width: "100%" }} direction="vertical">
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
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Date</b>
                            </span>
                            <RangePicker
                              style={{ width: "100%" }}
                              onChange={handleDateChange}
                              value={selectedDateRange}
                              placeholder={["Start Date", "End Date"]}
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

              {ability.can("income_expense_report.download", "") && (
                <Row justify={"end"}>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => {
                        setDownloadLoading(true);
                        handleDownload();
                      }}
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "25px",
                        backgroundColor: "#F15F22",
                        color: "#ffffff"
                      }}
                    >
                      {downloadLoading ? "Loading..." : "Download"}
                    </Button>

                    <CSVLink
                      data={downloadRow}
                      ref={downloadRef}
                      target="_blank"
                      filename={`income-expense-report-${dayjs().format(
                        "YYYY-MM-DD"
                      )}.csv`}
                      style={{
                        display: "none"
                      }}
                    ></CSVLink>
                  </Col>
                </Row>
              )}

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

export default IncomeExpenseReportList;
