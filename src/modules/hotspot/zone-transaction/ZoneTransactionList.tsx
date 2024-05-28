/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Select, Space, Row, DatePicker, Input } from "antd";
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
import { ZoneTagData } from "@/interfaces/ZoneTagData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { format } from "date-fns";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { useAppSelector } from "@/store/hooks";
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

const ZoneTransactionList: React.FC = () => {
  const [data, setData] = useState<ZoneTagData[]>([]);
  console.log("zonedata", data);
  const { Panel } = Collapse;

  const MySwal = withReactContent(Swal);

  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const downloadRef = useRef<any>(null);
  const [downloadRow, setDownloadRow] = useState<any[]>([]);
  const authUser = useAppSelector(state => state.auth.user);

  const [selectedTransactionType, setSelectedTransactionType] =
    useState<any>(null);

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

  const { RangePicker } = DatePicker;

  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);

  const [transactionByList, setTransactionByList] = useState<any[]>([]);
  const [selectedTransactionBy, setSelectedTransactionBy] = useState<any>(null);

  const [transactionId, setTransactionId] = useState<any>(null);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

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
    selectedZoneParam?: any,
    selectedTransactionTypeParam?: any,
    selectedStartDateParam?: any,
    selectedEndDateParam?: any,
    selectedTransactionByParam?: any,
    transactionIdParam?: any
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
        userType: "zone",
        zoneManagerId: selectedZoneParam,
        transactionId: transactionIdParam,
        trxType: selectedTransactionTypeParam,
        trxBy: selectedTransactionByParam,
        dateRangeFilter: {
          field: "trxDate",
          startDate: selectedStartDateParam,
          endDate: selectedEndDateParam
        }
      }
    };

    const { data } = await axios.post(
      `/api-hotspot/transaction/get-list`,
      body,
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
      "transaction-list",
      page,
      limit,
      order,
      sort,
      selectedZone,
      selectedTransactionType,
      selectedStartDate,
      selectedEndDate,
      selectedTransactionBy,
      transactionId
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedZone,
        selectedTransactionType,
        selectedStartDate,
        selectedEndDate,
        selectedTransactionBy,
        transactionId
      );
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        if (data.body) {
          setData(data.body);
          setTableParams({
            pagination: {
              total: data.body.length,
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

  function getZoneManagers() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "username"
          }
        ]
      },
      body: {
        partnerType: "zone",
        client: {
          id: authUser?.partnerId
        },
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

      setZones(list);
    });
  }

  function getTransactionByList() {
    axios
      .get(
        "/api-hotspot/transaction/get-transaction-user-wise-filter?userType=client"
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
  useEffect(() => {
    getZoneManagers();
    getTransactionByList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = () => {
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedZone(null);
    setSelectedTransactionType(null);
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

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedZone(value as any);
  };

  const handleTransactionTypeChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedTransactionType(value);
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<ZoneTagData> = [
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
      title: "Trx For",
      dataIndex: "trxFor",

      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Trx Type",
      dataIndex: "trxType",

      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Amount (BDT)",
      dataIndex: "amount",

      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Trx By",
      dataIndex: "trxBy",

      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Transaction ID",
      dataIndex: "transactionId",

      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
    // {
    //   title: "ZM Commission",
    //   dataIndex: "zoneCommission",

    //   ellipsis: true,
    //   width: "auto",
    //   align: "center" as AlignType
    // }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ZoneTagData> | SorterResult<ZoneTagData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<ZoneTagData>).order) {
      // // console.log((sorter as SorterResult<ZoneTagData>).order)

      SetOrder(
        (sorter as SorterResult<ZoneTagData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<ZoneTagData>).field) {
      // // console.log((sorter as SorterResult<ZoneTagData>).field)

      SetSort((sorter as SorterResult<ZoneTagData>).field as string);
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
            order: "asc",
            field: "id"
          }
        ]
      }
      // body: {
      //   // SEND FIELD NAME WITH DATA TO SEARCH

      //   zoneManagerId: selectedZoneParam,
      //   transactionId: transactionIdParam,
      //   trxType: selectedTransactionTypeParam,
      //   trxBy: selectedTransactionByParam,
      //   dateRangeFilter: {
      //     field: "trxDate",
      //     startDate: selectedStartDateParam,
      //     endDate: selectedEndDateParam
      //   }
      // }
    };

    await axios
      .post(`/api-hotspot/transaction/get-list`, body, {
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
          console.log("zone", item);
          // const date = new Date(item.expireDate);
          return {};
        });
        setDownloadRow([
          // {
          //   UsedBy: "Used By",
          //   UsedFrom: "Used From",
          //   UsedIP: "Used IP",
          //   UsedMAC: "Used MAC",
          //   Voucher: "Voucher",
          //   Reference: "Reference",
          //   SerialNo: "Serial No",
          //   ExpirationDate: "Expiration Date",
          //   Client: "Client",
          //   Package: "Package",
          //   PackagePrice: "Package Price",
          //   PackageCategory: "Package Category",
          //   OTPLimit: "OTP Limit",
          //   StartTime: "Start Time",
          //   EndTime: "End Time",
          //   CreatedAt: "Created At"
          // },
          ...list
        ]);
        // if (downloadRef.current) {
        //   downloadRef.current.link.click();
        // }
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
            title="Zone Manager Transactions"
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
                        {authUser &&
                          authUser.userType == "client" &&
                          authUser?.clientLevel != "tri_cycle" &&
                          authUser?.clientLevel != "tri_cycle_hotspot" &&
                          authUser?.clientLevel != "tri_cycle_isp_hotspot" && (
                            <Col
                              xs={24}
                              sm={8}
                              md={8}
                              lg={8}
                              xl={8}
                              xxl={8}
                              className="gutter-row"
                            >
                              {/* zoneManagerId */}
                              <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                              >
                                <span>
                                  <b>Zone Manager</b>
                                </span>
                                <Select
                                  showSearch
                                  allowClear
                                  style={{ width: "100%", textAlign: "start" }}
                                  placeholder="Please select"
                                  onChange={handleZoneChange}
                                  options={zones}
                                  value={selectedZone}
                                />
                              </Space>
                            </Col>
                          )}

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
                              <b>Date Range </b>
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
                      </Row>
                    </Panel>
                  </Collapse>
                </div>
              </Space>

              {ability.can("zoneTransaction.download", "") && (
                <Row justify={"end"}>
                  <Col span={3}>
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
                      // data={data}
                      data={downloadRow}
                      ref={downloadRef}
                      asyncOnClick={true}
                      className="ant-btn ant-btn-lg"
                      target="_blank"
                      style={{
                        display: "none"
                      }}
                      filename={`zone-transaction-list-${dayjs().format(
                        "YYYY-MM-DD"
                      )}.csv`}
                    >
                      {downloadLoading ? "Loading..." : "Download"}
                    </CSVLink>
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

export default ZoneTransactionList;
