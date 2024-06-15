/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Select, Space, Row } from "antd";
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
import { NASWiseSummaryData } from "@/interfaces/NASWiseSummaryData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { format } from "date-fns";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const NASWiseSummary: React.FC = () => {
  const [data, setData] = useState<NASWiseSummaryData[]>([]);
  const { Panel } = Collapse;

  const MySwal = withReactContent(Swal);
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  //   const [order, SetOrder] = useState("asc");
  //   const [sort, SetSort] = useState("id");
  const [sortField, SetSortField] = useState<string | undefined>(undefined);
  const [sortOrder, SetSortOrder] = useState<string | undefined>(undefined);
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [nasDevices, setNasDevices] = useState<any[]>([]);
  const [selectedNasDevice, setSelectedNasDevice] = useState<any>(null);

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
    sortField?: string,
    sortOrder?: string,
    // order: string,
    // sort: string,
    selectedClientParam?: string,
    selectedNasDeviceParam?: string
  ) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const clientID = selectedClientParam ? selectedClientParam : "";
    const nasDeviceId = selectedNasDeviceParam ? selectedNasDeviceParam : "";

    const { data } = await axios.get(
      `/api/dashboard/monitoring/client-nas-wise-summary?clientId=${clientID}&nasDeviceId=${nasDeviceId}`,
      {
        params: {
          page,
          limit,
          sortField,
          sortOrder
          // order,
          // sort
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    // , page, limit, order, sort,
    queryKey: [
      "NASWise-summary",
      page,
      limit,
      sortField,
      sortOrder,
      selectedClient,
      selectedNasDevice
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        sortField,
        sortOrder,
        // order,
        // sort,
        selectedClient,
        selectedNasDevice
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
      console.log("list", data.body);
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
  // nasDevices
  function getNasDevices(selectedClient: string) {
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
        // partnerType: "zone",
        client: { id: selectedClient },
        deviceType: "ONU",
        isActive: true
      }
    };
    axios.post("/api-hotspot/nas-device/get-list", body).then(res => {
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

      setNasDevices(list);
    });
  }
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<NASWiseSummaryData>
      | SorterResult<NASWiseSummaryData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<NASWiseSummaryData>).order) {
      // // console.log((sorter as SorterResult<ZoneRevenueData>).order)
      // SetOrder(
      //   (sorter as SorterResult<NASWiseSummaryData>).order === "ascend"
      //     ? "asc"
      //     : "desc"
      // );
      SetSortOrder(
        (sorter as SorterResult<NASWiseSummaryData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    } else {
      SetSortOrder(undefined);
    }
    if (sorter && (sorter as SorterResult<NASWiseSummaryData>).field) {
      SetSortField(
        (sorter as SorterResult<NASWiseSummaryData>).field as string
      );
    } else {
      SetSortField(undefined);
    }
    // if (sorter && (sorter as SorterResult<NASWiseSummaryData>).field) {
    //   // // console.log((sorter as SorterResult<ZoneRevenueData>).field)
    //    SetSort((sorter as SorterResult<ZoneTagData>).field as string);
    // }
  };

  useEffect(() => {
    getClients();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (selectedClient) getNasDevices(selectedClient);
  }, [selectedClient]);

  const handleClear = () => {
    setSelectedClient(null);
    setSelectedNasDevice(null);
  };

  const handleClientChange = (value: any) => {
    setSelectedClient(value as any);
  };
  const handleNasDeviceChange = (value: any) => {
    setSelectedNasDevice(value as any);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<NASWiseSummaryData> = [
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
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Client",
      dataIndex: "client",
      sorter: true,
      render: (client: any) => {
        if (!client) return "-";
        return <>{client}</>;
      },
      ellipsis: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "NAS Name",
      dataIndex: "nasname",
      sorter: true,
      render: (nasname: any) => {
        if (!nasname) return "-";
        return <>{nasname}</>;
      },
      ellipsis: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "NAS IP",
      dataIndex: "nasip",
      sorter: true,
      render: (nasip: any) => {
        if (!nasip) return "-";
        return <>{nasip}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Total Online",

      dataIndex: "total_online",
      sorter: true,
      render: (total_online: any) => {
        if (!total_online) return "-";
        return <>{total_online}</>;
      },
      ellipsis: true,
      width: "auto",
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
            title="NAS Wise Summary"
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
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Client</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
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
                              <b>NAS Device</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleNasDeviceChange}
                              options={nasDevices}
                              value={selectedNasDevice}
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
          </TableCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default NASWiseSummary;
