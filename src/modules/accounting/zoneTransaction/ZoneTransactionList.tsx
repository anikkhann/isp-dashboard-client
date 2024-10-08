/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Select, Space, Row, Input, DatePicker } from "antd";
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
import { TopUpTransactionData } from "@/interfaces/TopUpTransactionData";
import { format } from "date-fns";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { CSVLink } from "react-csv";
import ability from "@/services/guard/ability";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const transactionModes = [
  {
    label: "Debit",
    value: "debit"
  },
  {
    label: "Credit",
    value: "credit"
  }
];

const transactionTypes = [
  {
    label: "Online",
    value: "online"
  },
  {
    label: "Offline",
    value: "offline"
  }
];

const PackageList: React.FC = () => {
  const [data, setData] = useState<TopUpTransactionData[]>([]);
  const { Panel } = Collapse;
  const MySwal = withReactContent(Swal);

  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const downloadRef = useRef<any>(null);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("desc");
  const [sort, SetSort] = useState("trxDate");

  const [users, setUsers] = useState<any[]>([]);

  const [selectUser, setSelectUser] = useState<any>(null);

  const [transactionId, setTransactionId] = useState<any>(null);
  const [downloadRow, setDownloadRow] = useState<any[]>([]);
  const [selectedTransactionMode, setSelectedTransactionMode] =
    useState<any>(null);
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<any>(null);

  const [transactionByList, setTransactionByList] = useState<any[]>([]);
  const [selectedTransactionBy, setSelectedTransactionBy] = useState<any>(null);

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

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
    userParam?: string,
    transactionModeParam?: string,
    transactionTypeParam?: string,
    transactionByParam?: string,
    transactionIdParam?: string,
    startDateParam?: string,
    endDateParam?: string
  ) => {
    const token = Cookies.get("token");
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
        // SEND FIELD NAME WITH DATA TO SEARCH
        // "userId": "f5e50c82-a6a0-41df-a56f-03c93aad6218", //dropdown - Customer List API
        // "transaction_id": null,
        // "trx_mode": null, //dropdown (debit, credit)
        // "trx_type": null, //dropdown (Online, Offline)
        // "trx_by": null, //dropdown Transaction By API
        // "dateRangeFilter": {"field": "trxDate", "startDate": null, "endDate": null}
        userType: "zone",
        userId: userParam,
        transactionId: transactionIdParam,
        trxMode: transactionModeParam,
        trxType: transactionTypeParam,
        trxBy: transactionByParam,
        dateRangeFilter: {
          field: "trxDate",
          startDate: startDateParam,
          endDate: endDateParam
        }
      }
    };

    const { data } = await axios.post("/api/topup-transaction/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "customer-transactions-list",
      page,
      limit,
      order,
      sort,
      selectUser,
      selectedTransactionMode,
      selectedTransactionType,
      selectedTransactionBy,
      transactionId,
      selectedStartDate,
      selectedEndDate
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectUser,
        selectedTransactionMode,
        selectedTransactionType,
        selectedTransactionBy,
        transactionId,
        selectedStartDate,
        selectedEndDate
      );
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);

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

  function getUsers() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        partnerType: "zone",
        isActive: true
      }
    };

    axios.post("/api/partner/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const list = data.body.map((item: any) => {
        return {
          label: item.username,
          value: item.id
        };
      });

      setUsers(list);
    });
  }

  function getTransactionByList() {
    axios
      .get(
        "/api/topup-transaction/get-transaction-user-wise-filter?userType=customer"
      )
      .then(res => {
        // console.log(res);
        const { data } = res;

        if (data.status != 200) {
          MySwal.fire({
            title: "Error",
            text: data.message || "Something went wrong",
            icon: "error"
          });
        }

        if (!data.body) return;

        const list = data.body.map((item: any) => {
          return {
            label: item.trx_by,
            value: item.trx_by
          };
        });

        setTransactionByList(list);
      });
  }

  const handleUserChange = (value: any) => {
    // console.log("checked = ", value);
    if (value) {
      setSelectUser(value);
    } else {
      setSelectUser(null);
    }
  };

  const handleTransactionModeChange = (value: any) => {
    // console.log("checked = ", value);
    if (value) {
      setSelectedTransactionMode(value);
    } else {
      setSelectedTransactionMode(null);
    }
  };

  const handleTransactionTypeChange = (value: any) => {
    // console.log("checked = ", value);
    // setSelectedTransactionType(value);
    if (value) {
      setSelectedTransactionType(value);
    } else {
      setSelectedTransactionType(null);
    }
  };

  const handleTransactionByChange = (value: any) => {
    // console.log("checked = ", value);
    // setSelectedTransactionBy(value);
    if (value) {
      setSelectedTransactionBy(value);
    } else {
      setSelectedTransactionBy(null);
    }
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

  const handleClear = () => {
    setSelectUser(null);
    setSelectedTransactionMode(null);
    setSelectedTransactionType(null);
    setSelectedTransactionBy(null);
    setTransactionId(null);
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  useEffect(() => {
    getUsers();
    getTransactionByList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const columns: ColumnsType<TopUpTransactionData> = [
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
      title: "Zone",
      dataIndex: "trxFor",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Trx Type",
      dataIndex: "trxType",
      render: (text, record) => {
        return (
          <>
            <Space>{record.trxType}</Space>
          </>
        );
      },
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Trx Mode",
      dataIndex: "trxMode",
      render: (text, record) => {
        return (
          <>
            <Space>{record.trxMode}</Space>
          </>
        );
      },
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => {
        return (
          <>
            <Space>{record.amount} BDT</Space>
          </>
        );
      },
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Balance (BDT)",
      dataIndex: "balance",
      render: (text, record) => {
        return (
          <>
            <Space>{record.balance} BDT</Space>
          </>
        );
      },
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Remarks",
      dataIndex: "remarks",
      sorter: true,
      render: (remarks: any) => {
        return (
          <>
            <Space>{remarks}</Space>
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // insertedBy
    {
      title: "Trx By",
      dataIndex: "trxBy",
      sorter: false,
      render: (trxBy: any) => {
        if (!trxBy) return "-";
        return <>{trxBy}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // createdOn
    {
      title: "Trx Date",
      dataIndex: "trxDate",
      sorter: false,
      render: (trxDate: any) => {
        if (!trxDate) return "-";
        const date = new Date(trxDate);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
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
    // {
    //   title: "Updated At",
    //   dataIndex: "updatedOn",
    //   sorter: false,
    //   render: (updatedOn: any) => {
    //     if (!updatedOn) return "-";
    //     const date = new Date(updatedOn);
    //     return <>{format(date, "yyyy-MM-dd pp")}</>;
    //   },
    //   width: "20%",
    //   align: "center" as AlignType
    // },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<TopUpTransactionData>
      | SorterResult<TopUpTransactionData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<TopUpTransactionData>).order) {
      // // console.log((sorter as SorterResult<TopUpTransactionData>).order)

      SetOrder(
        (sorter as SorterResult<TopUpTransactionData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<TopUpTransactionData>).field) {
      // // console.log((sorter as SorterResult<TopUpTransactionData>).field)

      SetSort((sorter as SorterResult<TopUpTransactionData>).field as string);
    }
  };

  const handleDownload = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      meta: {
        // limit: 10,
        // page: 1,
        sort: [
          {
            order: "desc",
            field: "trxDate"
          }
        ]
      },
      body: {
        userType: "zone",
        userId: selectUser,
        transactionId: transactionId,
        trxMode: selectedTransactionMode,
        trxType: selectedTransactionType,
        trxBy: selectedTransactionBy,
        dateRangeFilter: {
          field: "trxDate",
          startDate: selectedStartDate,
          endDate: selectedEndDate
        }
      }
    };

    await axios
      .post(`/api/topup-transaction/get-list`, body, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        // console.log(res);
        const { data } = res;
        console.log(data.body);
        if (data.status != 200) {
          MySwal.fire({
            title: "Error",
            text: data.message || "Something went wrong",
            icon: "error"
          });
        }

        if (!data.body) return;

        const list = data.body.map((item: any) => {
          const date = new Date(item.trxDate);
          return {
            "Zone Manager": item.trxFor,
            "Trx Type": item.trxType,
            "Trx Mode": item.trxMode,
            "Transaction Id": item.transactionId,
            Amount: item.amount,
            Balance: item.balance,
            Remarks: item.remarks,
            "Trx By": item.trxBy,
            "Trx Date": format(date, "yyyy-MM-dd pp")
          };
        });

        setDownloadRow([
          // {
          //   ZoneManager: "Zone Manager",
          //   TRXType: "TRX Type",
          //   TrxMode: "Trx Mode",
          //   TransactionId: "Transaction Id",
          //   Amount: "Amount",
          //   Balance: "Balance",
          //   Remarks: "Remarks",
          //   TrxBy: "Trx By",
          //   TrxDate: "Trx Date"
          // },
          ...list
        ]);
      });
  };

  useEffect(() => {
    if (downloadRow && downloadRow.length > 0) {
      setDownloadRow(downloadRow);

      if (downloadRef.current) {
        downloadRef.current.link.click();
      }
      setDownloadLoading(false);
    }
  }, [downloadRow]);

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
            title="Zone Transactions List"
            hasLink={false}
            addLink="/admin/package/package/create"
            permission="package.create"
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflow: "hidden",
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
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Zone</b>
                            </span>
                            <Select
                              showSearch
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleUserChange}
                              options={users}
                              value={selectUser}
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
                              <b>Transaction Mode</b>
                            </span>
                            <Select
                              showSearch
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleTransactionModeChange}
                              options={transactionModes}
                              value={selectedTransactionMode}
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
                              <b>Transaction Type</b>
                            </span>
                            <Select
                              showSearch
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleTransactionTypeChange}
                              options={transactionTypes}
                              value={selectedTransactionType}
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
                              <b>Transaction By</b>
                            </span>
                            <Select
                              showSearch
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleTransactionByChange}
                              options={transactionByList}
                              value={selectedTransactionBy}
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
                              <b>Transaction Id</b>
                            </span>
                            <Input
                              placeholder="Transaction Id"
                              value={transactionId}
                              onChange={e => setTransactionId(e.target.value)}
                              type="text"
                              allowClear
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
                              <b>Date Range By (Transaction Date)</b>
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
                      </Row>
                    </Panel>
                  </Collapse>
                </div>
              </Space>

              {/* {ability.can("accountingMyRevenue.download", "") && ( */}
              {ability.can("zoneTransaction.download", "") && (
                <Row justify={"end"}>
                  <Col>
                    {/* <CSVLink
                      data={downloadRow}
                      asyncOnClick={true}
                      onClick={(event, done) => {
                        setDownloadLoading(true);
                        setTimeout(() => {
                          setDownloadLoading(false);
                        }, 2000);
                        const token = Cookies.get("token");
                        axios.defaults.headers.common["Authorization"] =
                          `Bearer ${token}`;

                        const body = {
                          meta: {
                            sort: [
                              {
                                order: "desc",
                                field: "trxDate"
                              }
                            ]
                          },
                          body: {
                            userType: "zone",
                            userId: selectUser,
                            transactionId: transactionId,
                            trxMode: selectedTransactionMode,
                            trxType: selectedTransactionType,
                            trxBy: selectedTransactionBy,
                            dateRangeFilter: {
                              field: "trxDate",
                              startDate: selectedStartDate,
                              endDate: selectedEndDate
                            }
                          }
                        };

                        axios
                          .post(`/api/topup-transaction/get-list`, body, {
                            headers: {
                              "Content-Type": "application/json"
                            }
                          })
                          .then(res => {
                            const { data } = res;
                            console.log(data.body);
                            if (data.status != 200) {
                              MySwal.fire({
                                title: "Error",
                                text: data.message || "Something went wrong",
                                icon: "error"
                              });
                            }

                            if (!data.body) return;

                            const list = data.body.map((item: any) => {
                              const date = new Date(item.trxDate);
                              return {
                                ZoneManager: item.trxFor,
                                TRXType: item.trxType,
                                TrxMode: item.trxMode,
                                TransactionId: item.transactionId,
                                Amount: item.amount,
                                Balance: item.balance,
                                Remarks: item.remarks,
                                TrxBy: item.trxBy,
                                TrxDate: format(date, "yyyy-MM-dd pp")
                              };
                            });
                            setDownloadRow(list);
                            console.log(list);
                            done();
                          });
                      }}
                      className="ant-btn ant-btn-lg"
                      target="_blank"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "25px",
                        backgroundColor: "#F15F22",
                        color: "#ffffff",
                        padding: "10px"
                      }}
                      filename={`zone-transaction-${dayjs().format(
                        "YYYY-MM-DD"
                      )}.csv`}
                    >
                      {downloadLoading ? "Loading..." : "Download"}
                    </CSVLink> */}
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
                      filename={`zone-transaction-${dayjs().format(
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

export default PackageList;
