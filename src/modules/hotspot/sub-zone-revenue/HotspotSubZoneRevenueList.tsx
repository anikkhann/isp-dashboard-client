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

const HotspotSubZoneRevenueList: React.FC = () => {
  const [data, setData] = useState<ZoneTagData[]>([]);
  const { Panel } = Collapse;

  const MySwal = withReactContent(Swal);

  const authUser = useAppSelector(state => state.auth.user);
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

  const { RangePicker } = DatePicker;
  const downloadRef = useRef<any>(null);
  const [downloadRow, setDownloadRow] = useState<any[]>([]);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const [subzoneManagers, setSubZoneManagers] = useState<any[]>([]);
  const [selectedSubZoneManager, setSelectedSubZoneManager] =
    useState<any>(null);

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
    selectedClientParam?: string,
    selectedZoneManagerParam?: string,
    selectedSubZoneManagerParam?: string,
    startDateParam?: string,
    endDateParam?: string
  ) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const clientID = selectedClientParam ? selectedClientParam : "";
    const zoneManagerId = selectedZoneManagerParam
      ? selectedZoneManagerParam
      : "";
    const subZoneManagerId = selectedSubZoneManagerParam
      ? selectedSubZoneManagerParam
      : "";

    const startDate = startDateParam ? startDateParam : "";
    const endDate = endDateParam ? endDateParam : "";

    const { data } = await axios.get(
      `/api-hotspot/revenue-report/sub-zone-manager-wise-revenue?clientId=${clientID}&zoneManagerId=${zoneManagerId}&subZoneManagerId=${subZoneManagerId}&startDate=${startDate}&endDate=${endDate}`,
      {
        params: {
          page,
          limit,
          order,
          sort
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "sub-zone-manager-wise-revenue",
      page,
      limit,
      order,
      sort,
      selectedClient,
      selectedZone,
      selectedSubZoneManager,
      selectedStartDate,
      selectedEndDate
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedClient,
        selectedZone,
        selectedSubZoneManager,
        selectedStartDate,
        selectedEndDate
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ZoneTagData> | SorterResult<ZoneTagData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<ZoneTagData>).order) {
      // // console.log((sorter as SorterResult<ZoneRevenueData>).order)

      SetOrder(
        (sorter as SorterResult<ZoneTagData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<ZoneTagData>).field) {
      // // console.log((sorter as SorterResult<ZoneRevenueData>).field)

      SetSort((sorter as SorterResult<ZoneTagData>).field as string);
    }
  };

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  function getClients() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "username"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        partnerType: "client",
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

      setClients(list);
    });
  }

  //functions for getting zone manger list data using POST request
  function getZoneManagers(selectedClient: string) {
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
        client: selectedClient
          ? { id: selectedClient }
          : { id: authUser?.partnerId }
        // client: {
        //   id: authUser?.partnerId
        // }
        // client: {
        //   id: selectedClient
        // }
        // isActive: true
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

  //functions for getting zone manger list data using POST request
  function getSubZoneManagers(selectedClient: any, selectedZoneId: any) {
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
        partnerType: "reseller",
        zoneManager: { id: selectedZoneId },
        client: selectedClient
          ? { id: selectedClient }
          : { id: authUser?.partnerId }
        // client: {
        //   id: authUser?.partnerId
        // }
        // isActive: true
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

      setSubZoneManagers(list);
    });
  }

  useEffect(() => {
    getClients();
    // getZoneManagers();
    // getSubZoneManagers(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if (selectedClient) {
    getZoneManagers(selectedClient);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClient]);

  useEffect(() => {
    // if (selectedZone) {
    getSubZoneManagers(selectedClient, selectedZone);
    // }
  }, [selectedClient, selectedZone]);

  const handleClear = () => {
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedClient(null);
    setSelectedZone(null);
    setSelectedSubZoneManager(null);
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

  const handleClientChange = (value: any) => {
    setSelectedClient(value);
  };

  const handleZoneChange = (value: any) => {
    setSelectedZone(value);
  };

  const handleZoneManagerChange = (value: any) => {
    setSelectedSubZoneManager(value);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<ZoneTagData> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return (
          <>
            {/* <Space>{index + 1}</Space> */}
            {page !== 0 ? index + 1 + (page - 1) * limit : index + 1}
          </>
        );
      },
      sorter: false,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Sub Zone Manager",
      dataIndex: "name",
      render: (name: any) => {
        if (!name) return "-";
        return <>{name}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Total Voucher(Qty)",
      dataIndex: "total_voucher_qty",
      render: (total_voucher_qty: any) => {
        if (total_voucher_qty === 0) return 0;
        if (!total_voucher_qty) return 0;
        return <>{total_voucher_qty}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Unused Voucher Revenue (BDT)",
      dataIndex: "unused_voucher_revenue",
      sorter: false,
      render: (unused_voucher_revenue: any) => {
        if (unused_voucher_revenue === 0) return 0;
        if (!unused_voucher_revenue) return 0;
        return <>{unused_voucher_revenue}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Used Voucher (Qty)",
      dataIndex: "used_voucher_qty",
      render: (used_voucher_qty: any) => {
        if (used_voucher_qty === 0) return 0;
        if (!used_voucher_qty) return 0;
        return <>{used_voucher_qty}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Used Voucher Revenue (BDT)",
      dataIndex: "used_voucher_revenue",
      sorter: false,
      render: (used_voucher_revenue: any) => {
        if (used_voucher_revenue === 0) return 0;
        if (!used_voucher_revenue) return 0;
        return <>{used_voucher_revenue}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Online Purchase (Qty)",
      dataIndex: "online_purchase_qty",
      sorter: false,
      render: (online_purchase_qty: any) => {
        if (online_purchase_qty === 0) return 0;
        if (!online_purchase_qty) return 0;
        return <>{online_purchase_qty}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Online Purchase Revenue (BDT)",
      dataIndex: "online_purchase_revenue",
      sorter: false,
      render: (online_purchase_revenue: any) => {
        if (online_purchase_revenue === 0) return 0;
        if (!online_purchase_revenue) return 0;
        return <>{online_purchase_revenue}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Commission (BDT)",
      dataIndex: "commission",
      render: (commission: any) => {
        if (commission === 0) return 0;
        if (!commission) return 0;
        return <>{commission}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
  ];
  const handleDownload = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const res = await axios.get(
        `/api-hotspot/revenue-report/sub-zone-manager-wise-revenue`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const { data } = res;
      console.log(data.body);

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
        return {
          "Sub Zone Manager": item.name,
          "Total Voucher (Qty)": item.total_voucher_qty,
          "Unused Voucher Revenue (BDT)": item.unused_voucher_revenue,
          "Used Voucher (Qty)": item.used_voucher_qty,
          "Used Voucher Revenue (BDT)": item.used_voucher_revenue,
          "Online Purchase (Qty)": item.online_purchase_qty,
          "Online Purchase Revenue (BDT)": item.online_purchase_revenue,
          "Commission (BDT)": item.commission
        };
      });

      setDownloadRow([...list]);
    } catch (message) {
      MySwal.fire({
        title: "Error",
        text: error.message || "Something went wrong",
        icon: "error"
      });
      setDownloadLoading(false); // Ensure the button state is reset on error
    }
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
            title="Sub Zone Manager Revenue"
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
                      {/* {authUser &&
                        (authUser.userType === "durjoy" ||
                          authUser.userType === "duronto") && ( */}
                      <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        justify="space-between"
                      >
                        {authUser &&
                          authUser.userType != "client" &&
                          authUser.userType != "zone" &&
                          authUser.userType != "reseller" && (
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
                                  <b>Client</b>
                                </span>
                                <Select
                                  allowClear
                                  style={{
                                    width: "100%",
                                    textAlign: "start"
                                  }}
                                  placeholder="Please select"
                                  onChange={handleClientChange}
                                  options={clients}
                                  value={selectedClient}
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
                          )}

                        {authUser &&
                          authUser.userType != "zone" &&
                          authUser.userType != "reseller" &&
                          authUser?.clientLevel != "tri_cycle" &&
                          authUser?.clientLevel != "tri_cycle_hotspot" &&
                          authUser?.clientLevel != "tri_cycle_isp_hotspot" && (
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
                                  <b>Zone Manager</b>
                                </span>
                                <Select
                                  showSearch
                                  allowClear
                                  style={{
                                    width: "100%",
                                    textAlign: "start"
                                  }}
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
                              <b>SubZone Manager</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleZoneManagerChange}
                              options={subzoneManagers}
                              value={selectedSubZoneManager}
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
                      {/* )} */}
                    </Panel>
                  </Collapse>
                </div>
              </Space>

              {ability.can("subzoneRevenue.download", "") && (
                // <Row justify={"end"}>
                //   <Col span={3}>
                //     <CSVLink
                //       data={data}
                //       asyncOnClick={true}
                //       onClick={(event, done) => {
                //         setDownloadLoading(true);
                //         setTimeout(() => {
                //           setDownloadLoading(false);
                //         }, 2000);
                //         done();
                //       }}
                //       className="ant-btn ant-btn-lg"
                //       target="_blank"
                //       style={{
                //         width: "100%",
                //         textAlign: "center",
                //         marginTop: "25px",
                //         backgroundColor: "#F15F22",
                //         color: "#ffffff",
                //         padding: "10px"
                //       }}
                //       filename={`sub-zone-revenue-${dayjs().format(
                //         "YYYY-MM-DD"
                //       )}.csv`}
                //     >
                //       {downloadLoading ? "Loading..." : "Download"}
                //     </CSVLink>
                //   </Col>
                // </Row>
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

export default HotspotSubZoneRevenueList;
