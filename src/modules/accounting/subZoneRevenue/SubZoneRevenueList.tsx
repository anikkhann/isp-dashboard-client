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

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { SubZoneRevenueData } from "@/interfaces/ZoneRevenueData";
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

const months = [
  {
    label: "Current Month",
    value: "current_month"
  },
  {
    label: "Last Month",
    value: "last_month"
  }
];

const SubZoneRevenueList: React.FC = () => {
  const [data, setData] = useState<SubZoneRevenueData[]>([]);
  const { Panel } = Collapse;
  const MySwal = withReactContent(Swal);

  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const downloadRef = useRef<any>(null);
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [users, setUsers] = useState<any>([]);
  const [selectUser, setSelectUser] = useState<any>(null);

  const [selectedMonth, setSelectedMonth] = useState<any>("current_month");

  const [downloadRow, setDownloadRow] = useState<any[]>([]);

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
    monthParam?: string,
    startDateParam?: string,
    endDateParam?: string,
    subZoneParam?: string
  ) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    let date = null;
    if (startDateParam && endDateParam) {
      date = `${startDateParam} to ${endDateParam}`;
    }

    const { data } = await axios.get(
      `/api/revenue/get-sub-zone-commission-list?filterType=${monthParam}&dateRange=${date}&subZoneId=${subZoneParam}`,
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
      "subzone-revenue-list",
      page,
      limit,
      order,
      sort,
      selectedMonth,
      selectedStartDate,
      selectedEndDate,
      selectUser
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedMonth,
        selectedStartDate,
        selectedEndDate,
        selectUser
      );
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);

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

  const handleMonthChange = (value: any) => {
    // console.log(value);
    if (value) {
      setSelectedMonth(value);
    } else {
      setSelectedMonth(null);
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
    setSelectedMonth("current_month");
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectUser(null);
  };

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
        partnerType: "reseller",
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

  const handleUserChange = (value: any) => {
    // console.log("checked = ", value);
    if (value) {
      setSelectUser(value);
    } else {
      setSelectUser(null);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const columns: ColumnsType<SubZoneRevenueData> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return (
          <>
            <Space>{page !== 1 ? index + 1 + page * limit : index + 1}</Space>
          </>
        );
      },
      sorter: true,
      width: "10%",
      align: "center" as AlignType
    },
    {
      title: "Sub Zone Manager",
      dataIndex: "sub_zone_manager",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Total",
      dataIndex: "total_commission",
      render: (text, record) => {
        return (
          <>
            <Space>{record.total_commission}</Space>
          </>
        );
      },
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Online",
      dataIndex: "online_commission",
      render: (text, record) => {
        return (
          <>
            <Space>{record.online_commission}</Space>
          </>
        );
      },
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Offline",
      dataIndex: "offline_commission",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<SubZoneRevenueData>
      | SorterResult<SubZoneRevenueData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<SubZoneRevenueData>).order) {
      // // console.log((sorter as SorterResult<SubZoneRevenueData>).order)

      SetOrder(
        (sorter as SorterResult<SubZoneRevenueData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<SubZoneRevenueData>).field) {
      // // console.log((sorter as SorterResult<SubZoneRevenueData>).field)

      SetSort((sorter as SorterResult<SubZoneRevenueData>).field as string);
    }
  };

  const handleDownload = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // const body = {
    //   meta: {

    //     sort: [
    //       {
    //         order: "desc",
    //         field: "trxDate"
    //       }
    //     ]
    //   },
    //   body: {
    //     // SEND FIELD NAME WITH DATA TO SEARCH
    //     userType: "agent",
    //     userId: selectUser,
    //     transactionId: transactionId,
    //     trxMode: selectedTransactionMode,
    //     trxType: selectedTransactionType,
    //     trxBy: selectedTransactionBy,
    //     dateRangeFilter: {
    //       field: "trxDate",
    //       startDate: selectedStartDate,
    //       endDate: selectedEndDate
    //     }
    //   }
    // };
    let date = null;
    if (selectedStartDate && selectedEndDate) {
      date = `${selectedStartDate} to ${selectedEndDate}`;
    }

    await axios
      .get(
        `/api/revenue/get-sub-zone-commission-list?filterType=${selectedMonth}&dateRange=${date}&subZoneId=${selectUser}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
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
          return {
            "SubZone Manager": item.sub_zone_manager,
            Total: item.total_commission,
            Offline: item.offline_commission,
            Online: item.online_commission
          };
        });

        setDownloadRow([
          // {
          //   SubZoneManager: "Sub Zone Manager",
          //   Total: "Total",
          //   Offline: "Offline",
          //   Online: "Online"
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
            title="SubZone Revenue List"
            hasLink={false}
            addLink="/admin/package/package/create"
            permission="package.create"
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
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Sub Zone</b>
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
                              <b>Month</b>
                            </span>
                            <Select
                              showSearch
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleMonthChange}
                              options={months}
                              value={selectedMonth}
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

              {ability.can("accountingSubZoneRevenue.download", "") && (
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
                      data={downloadRow}
                      ref={downloadRef}
                      target="_blank"
                      filename={`sub-zone-revenue-${dayjs().format(
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
                className={"table-striped-rows"}
                columns={columns}
                rowKey={record => record.sub_zone_manager_id}
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

export default SubZoneRevenueList;
