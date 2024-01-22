/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Select, Space, Row, DatePicker } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table, Collapse } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import { TsoRetailerTagData } from "@/interfaces/TsoRetailerTagData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { format } from "date-fns";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { useAppSelector } from "@/store/hooks";

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

const TsoVisitList: React.FC = () => {
  const [data, setData] = useState<TsoRetailerTagData[]>([]);
  const { Panel } = Collapse;

  const { RangePicker } = DatePicker;

  const MySwal = withReactContent(Swal);

  const authUser = useAppSelector(state => state.auth.user);

  const [areaManagers, setAreaManagers] = useState<any[]>([]);
  const [selectedAreaManager, setSelectedAreaManager] = useState<any>(null);

  const [tsos, setTsos] = useState<any>([]);
  const [selectedTsoid, setSelectedTsoId] = useState<any>(null);

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

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
    sort: string,
    areaManagerId?: string,
    tsoId?: string,
    selectedStartDateParam?: any,
    selectedEndDateParam?: any
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
        areaManagerId: areaManagerId,
        tsoId: tsoId,
        dateRangeFilter: {
          field: "createdOn",
          startDate: selectedStartDateParam,
          endDate: selectedEndDateParam
        }
      }
    };

    const { data } = await axios.post(`/api-hotspot/tso-visit/get-list`, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "tso-visit-list",
      page,
      limit,
      order,
      sort,
      selectedAreaManager,
      selectedTsoid,
      selectedStartDate,
      selectedEndDate
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedAreaManager,
        selectedTsoid,
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
      setData(data);
    }
  }, [data]);

  const getAreaManagersList = async () => {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        userCategory: "area_manager",

        isActive: true
      }
    };
    axios.post("/api/users/get-list", body).then(res => {
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
      setAreaManagers(list);
    });
  };

  function getTsoList() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        userCategory: "area_manager"
      }
    };
    axios.post("/api/users/get-list", body).then(res => {
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
          label: item.name,
          value: item.id
        };
      });

      setTsos(list);
    });
  }

  useEffect(() => {
    getTsoList();
    getAreaManagersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = () => {
    setSelectedAreaManager(null);
    setSelectedTsoId(null);
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleDateChange = (value: any) => {
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

  const handleAreaManagerChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedAreaManager(value);
  };

  const handleTsoChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedTsoId(value);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<TsoRetailerTagData> = [
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
      width: 140,
      align: "center" as AlignType
    },

    {
      title: "Zone Manager",
      dataIndex: "zoneManagerName",
      sorter: false,
      render: (zoneManagerName: any) => {
        if (!zoneManagerName) return "-";
        return <>{zoneManagerName}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "TSO",
      dataIndex: "tso",
      sorter: false,
      render: (tso: any) => {
        if (!tso) return "-";
        return <>{tso.username}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Area Manager",
      dataIndex: "areaManager",
      sorter: false,
      render: (areaManager: any) => {
        if (!areaManager) return "-";
        return <>{areaManager.username}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Retailer",
      dataIndex: "retailer",
      sorter: false,
      render: (retailer: any) => {
        if (!retailer) return "-";
        return <>{retailer.username}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    // {
    //   title: "Reseller",
    //   dataIndex: "reseller",
    //   sorter: false,
    //   render: (reseller: any) => {
    //     if (!reseller) return "-";
    //     return <>{reseller.username}</>;
    //   },
    //   width: "20%",
    //   align: "center" as AlignType
    // },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      sorter: false,
      render: (shopName: any) => {
        if (!shopName) return "-";
        return <>{shopName}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "GPS Location",
      dataIndex: "gpsLocation",
      sorter: false,
      render: (gpsLocation: any) => {
        if (!gpsLocation) return "-";
        return <>{gpsLocation}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Is Competitor Availabe",
      dataIndex: "isCompetitionPresent",
      sorter: false,
      render: (isCompetitionPresent: any) => {
        if (!isCompetitionPresent) return "-";
        return (
          <>{isCompetitionPresent === true ? "Availabe" : "Not Available"}</>
        );
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Hotspot Frequency",
      dataIndex: "hotspotFrequency",
      sorter: false,
      render: (hotspotFrequency: any) => {
        if (!hotspotFrequency) return "-";
        return <>{hotspotFrequency}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Internet Speed",
      dataIndex: "internetSpeed",
      sorter: false,
      render: (internetSpeed: any) => {
        if (!internetSpeed) return "-";
        return <>{internetSpeed}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Frequent Complains",
      dataIndex: "frequentComplains",
      sorter: false,
      render: (frequentComplains: any) => {
        if (!frequentComplains) return "-";
        return <>{frequentComplains}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Fiber Cut",
      dataIndex: "fiberCut",
      sorter: false,
      render: (fiberCut: any) => {
        if (!fiberCut) return "-";
        return <>{fiberCut}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Laser Issues",
      dataIndex: "laserIssues",
      sorter: false,
      render: (laserIssues: any) => {
        if (!laserIssues) return "-";
        return <>{laserIssues}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Power Issues",
      dataIndex: "powerIssues",
      sorter: false,
      render: (powerIssues: any) => {
        if (!powerIssues) return "-";
        return <>{powerIssues}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Sun Shed Banner Present",
      dataIndex: "sunShedBannerPresent",
      sorter: false,
      render: (sunShedBannerPresent: any) => {
        if (!sunShedBannerPresent) return "-";
        return <>{sunShedBannerPresent === true ? "Yes" : "No"}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Total Sales Amount",
      dataIndex: "totalSalesAmount",
      sorter: false,
      render: (totalSalesAmount: any) => {
        if (!totalSalesAmount) return "-";
        return <>{totalSalesAmount}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },

    // insertedBy
    {
      title: "Created By",
      dataIndex: "insertedBy",
      sorter: false,
      render: (insertedBy: any) => {
        if (!insertedBy) return "-";
        return <>{insertedBy.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
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
      width: "20%",
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
      | SorterResult<TsoRetailerTagData>
      | SorterResult<TsoRetailerTagData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<TsoRetailerTagData>).order) {
      // // console.log((sorter as SorterResult<TsoRetailerTagData>).order)

      SetOrder(
        (sorter as SorterResult<TsoRetailerTagData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<TsoRetailerTagData>).field) {
      // // console.log((sorter as SorterResult<TsoRetailerTagData>).field)

      SetSort((sorter as SorterResult<TsoRetailerTagData>).field as string);
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
            title="TSO Visit List"
            hasLink={true}
            addLink="/admin/hotspot/tso-visit/create"
            permission="tsoVisit.create"
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
                          authUser.userCategory === "sales_manager" && (
                            <Col
                              xs={24}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                              className="gutter-row"
                            >
                              <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                              >
                                <span>
                                  <b>Area Manager</b>
                                </span>
                                <Select
                                  showSearch
                                  allowClear
                                  style={{ width: "100%", textAlign: "start" }}
                                  placeholder="Please select"
                                  onChange={handleAreaManagerChange}
                                  options={areaManagers}
                                  value={selectedAreaManager}
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
                          authUser.userCategory === "area_manager" && (
                            <Col
                              xs={24}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                              className="gutter-row"
                            >
                              <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                              >
                                <span>
                                  <b>Tso</b>
                                </span>
                                <Select
                                  showSearch
                                  allowClear
                                  style={{ width: "100%", textAlign: "start" }}
                                  placeholder="Please select"
                                  onChange={handleTsoChange}
                                  options={tsos}
                                  value={selectedTsoid}
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

                        <Col
                          xs={24}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          xxl={12}
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
                      </Row>
                    </Panel>
                  </Collapse>
                </div>
              </Space>
              <Table
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

export default TsoVisitList;
