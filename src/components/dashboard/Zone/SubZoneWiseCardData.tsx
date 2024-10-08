/* eslint-disable @typescript-eslint/no-explicit-any */
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Space, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import { Collapse, Row, Select, Button } from "antd";
import { useAppSelector } from "@/store/hooks";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const ZoneWiseCardData = () => {
  const [data, setData] = useState<any[]>([]);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);

  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const MySwal = withReactContent(Swal);
  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const authUser = useAppSelector(state => state.auth.user);
  const { Panel } = Collapse;

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    }
  });

  const fetchData = async (
    zoneManagerParam: string | null,
    page: number,
    limit: number,
    order: string,
    sort: string
  ) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/dashboard/get-total-active-customer-sub-zone-inCharge?zoneManagerId=${zoneManagerParam}`,
      {
        params: {
          page,
          limit,
          order,
          sort
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "dashboard-active-customer-sub-zone-wise-list",
      selectedZone,
      page,
      limit,
      order,
      sort
    ],
    queryFn: async () => {
      const response = await fetchData(selectedZone, page, limit, order, sort);
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);

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

  const columns: ColumnsType<any> = [
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
    // client
    // {
    //   title: "Client",
    //   dataIndex: "client",
    //   sorter: false,
    //   render: (client: any) => {
    //     if (!client) return "-";
    //     return <>{client}</>;
    //   },
    //   width: "20%",
    //   align: "center" as AlignType
    // },
    // total_customer
    {
      title: "Zone In Charge",
      dataIndex: "zone_incharge",
      sorter: false,
      render: (zone_incharge: any) => {
        if (zone_incharge == 0) return <>{zone_incharge}</>;
        if (!zone_incharge) return "-";
        return <>{zone_incharge}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Sub Zone In Charge",
      dataIndex: "sub_zone_incharge",
      sorter: false,
      render: (sub_zone_incharge: any) => {
        if (sub_zone_incharge == 0) return <>{sub_zone_incharge}</>;
        if (!sub_zone_incharge) return "-";
        return <>{sub_zone_incharge}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // active_customer
    {
      title: "Total Customer",
      dataIndex: "total_customer",
      sorter: false,
      render: (total_customer: any) => {
        if (total_customer == 0) return <>{total_customer}</>;
        if (!total_customer) return "-";
        return <>{total_customer}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // registered_customer
    {
      title: "Active Customer",
      dataIndex: "active_customer",
      sorter: false,
      render: (active_customer: any) => {
        if (active_customer == 0) return <>{active_customer}</>;
        if (!active_customer) return "-";
        return <>{active_customer}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // expired_customer
    {
      title: "Registered Customer",
      dataIndex: "registered_customer",
      sorter: false,
      render: (registered_customer: any) => {
        if (registered_customer == 0) return <>{registered_customer}</>;
        if (!registered_customer) return "-";
        return <>{registered_customer}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Expired Customer",
      dataIndex: "expired_customer",
      sorter: false,
      render: (expired_customer: any) => {
        if (expired_customer == 0) return <>{expired_customer}</>;
        if (!expired_customer) return "-";
        return <>{expired_customer}</>;
      },
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
  ];
  //functions for getting zone manger list data using POST request
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
        }
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

  const handleClear = () => {
    setSelectedZone(null);
  };

  useEffect(() => {
    getZoneManagers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleZoneChange = (value: any) => {
    setSelectedZone(value);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<any>).order) {
      SetOrder(
        (sorter as SorterResult<any>).order === "ascend" ? "asc" : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<any>).field) {
      SetSort((sorter as SorterResult<any>).field as string);
    }
  };
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
              title="Active Customer List(Sub Zone Wise)"
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
                            sm={24}
                            md={24}
                            lg={24}
                            xl={24}
                            xxl={24}
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
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select"
                                onChange={handleZoneChange}
                                options={zones}
                                value={selectedZone}
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
                            sm={24}
                            md={24}
                            lg={24}
                            xl={24}
                            xxl={24}
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
                  style={{
                    width: "100%",
                    overflowX: "auto"
                  }}
                  scroll={{ x: true }}
                  className={"table-striped-rows"}
                  columns={columns}
                  rowKey={record => record.client}
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
    </>
  );
};

export default ZoneWiseCardData;
