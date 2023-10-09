/* eslint-disable @typescript-eslint/no-explicit-any */
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Space, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import type { ColumnsType } from "antd/es/table";
import { Collapse, Row, Select, Button } from "antd";
import { useAppSelector } from "@/store/hooks";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const ZoneWiseCardData = () => {
  const [data, setData] = useState<any[]>([]);
  console.log(data);
  const MySwal = withReactContent(Swal);
  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const authUser = useAppSelector(state => state.auth.user);
  const { Panel } = Collapse;
  const fetchData = async (zoneManagerParam: string | null) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/dashboard/get-total-active-customer-sub-zone-inCharge?zoneManagerId=${zoneManagerParam}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["dashboard-active-customer-sub-zone-wise-list", selectedZone],
    queryFn: async () => {
      const response = await fetchData(selectedZone);
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);

        if (data.body) {
          setData(data.body);
        } else {
          setData([]);
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
            <Space>{index + 1}</Space>
          </>
        );
      },
      sorter: false,
      width: "10%",
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
      align: "center" as AlignType
    },
    {
      title: "Sub Zone In Charge",
      dataIndex: "sub_zone_manager",
      sorter: false,
      render: (sub_zone_manager: any) => {
        if (sub_zone_manager == 0) return <>{sub_zone_manager}</>;
        if (!sub_zone_manager) return "-";
        return <>{sub_zone_manager}</>;
      },
      /* width: "20%", */
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
      /* width: "20%", */
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
            field: "name"
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
          label: item.name,
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
                          <Col
                            xs={24}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            xxl={12}
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
                            md={12}
                            lg={12}
                            xl={12}
                            xxl={12}
                            className="gutter-row"
                          ></Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </div>
                </Space>
                <Table
                  className={"table-striped-rows"}
                  columns={columns}
                  rowKey={record => record.client}
                  dataSource={data}
                  loading={isLoading || isFetching}
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
