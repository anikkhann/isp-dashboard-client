/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Select, Space, Row, Tooltip, Input } from "antd";
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
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
import { ZoneTagData } from "@/interfaces/ZoneTagData";
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
import { CSVLink } from "react-csv";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

// const dateFormat = "YYYY-MM-DD";
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const UnusedVoucherList: React.FC = () => {
  const [data, setData] = useState<ZoneTagData[]>([]);
  const { Panel } = Collapse;

  const MySwal = withReactContent(Swal);

  const downloadRef = useRef<any>(null);

  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const [selectedPricingPlan, setSelectedPricingPlan] = useState<any>(null);

  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const [subzoneManagers, setSubZoneManagers] = useState<any[]>([]);
  const [selectedSubZoneManager, setSelectedSubZoneManager] =
    useState<any>(null);

  const [downloadRow, setDownloadRow] = useState<any[]>([]);

  const [retailers, setRetailers] = useState<any[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState<any>(null);

  const [selectedVoucherNumber, setSelectedVoucherNumber] = useState<any>(null);
  const [selectedSerialNo, setSelectedSerialNo] = useState<any>(null);
  const [selectedReferenceNumber, setSelectedReferenceNumber] =
    useState<any>(null);

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
    selectedPricingPlanParam?: string,
    selectedClientParam?: string,
    selectedZoneParam?: string,
    selectedSubZoneManagerParam?: string,
    selectedRetailerParam?: string,
    selectedVoucherNumberParam?: string,
    selectedSerialNoParam?: string,
    selectedReferenceNumberParam?: string
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
        voucherNumber: selectedVoucherNumberParam,
        serialNo: selectedSerialNoParam,
        referenceNumber: selectedReferenceNumberParam,
        pricingPlan: {
          id: selectedPricingPlanParam
        },
        subZoneManagerId: selectedSubZoneManagerParam,
        zoneManagerId: selectedZoneParam,
        retailerId: selectedRetailerParam,
        clientId: selectedClientParam
      }
    };
    const { data } = await axios.post(`/api-hotspot/voucher/get-list`, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching, refetch } = useQuery<
    boolean,
    any
  >({
    queryKey: ["voucher-list", page, limit, order, sort],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedPricingPlan,
        selectedClient,
        selectedZone,
        selectedSubZoneManager,
        selectedRetailer,
        selectedVoucherNumber,
        selectedSerialNo,
        selectedReferenceNumber
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

  function getClients() {
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
          label: item.name,
          value: item.id
        };
      });

      setClients(list);
    });
  }

  function getZoneManagers(selectedClient: any) {
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
          id: selectedClient
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

  function getRetailers(selectedSubZone: any) {
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
        partnerType: "retailer",
        subZoneManager: { id: selectedSubZone }
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

      setRetailers(list);
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
            field: "name"
          }
        ]
      },
      body: {
        partnerType: "reseller",
        zoneManager: { id: selectedZoneId },
        client: {
          id: selectedClient
        }
        // isActive: true
      }
    };

    axios.post("/api/partner/get-list", body).then(res => {
      const { data } = res;
      console.log(res.data);
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

      setSubZoneManagers(list);
    });
  }

  //functions for getting zone manger list data using POST request
  function getPricingPlan() {
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
        // isActive: true
      }
    };
    axios.post("/api-hotspot/pricing-plan/get-list", body).then(res => {
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

      setPricingPlans(list);
    });
  }

  useEffect(() => {
    getPricingPlan();
    getClients();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedClient) {
      getSubZoneManagers(selectedClient, selectedZone);
      getZoneManagers(selectedClient);
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedZone) {
      getSubZoneManagers(selectedClient, selectedZone);
    }
  }, [selectedZone]);

  useEffect(() => {
    if (selectedSubZoneManager) {
      getRetailers(selectedSubZoneManager);
    }
  }, [selectedSubZoneManager]);

  const handleClear = () => {
    setSelectedSubZoneManager(null);
    setSelectedPricingPlan(null);
    setSelectedClient(null);
    setSelectedZone(null);
    setSelectedRetailer(null);
    setSelectedVoucherNumber(null);
    setSelectedSerialNo(null);
    setSelectedReferenceNumber(null);
  };

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedZone(value as any);
  };

  const handleSubZoneManagerChange = (value: any) => {
    setSelectedSubZoneManager(value);
  };

  const handleRetailerChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedRetailer(value as any);
  };

  const handlePricingPlanChange = (value: any) => {
    setSelectedPricingPlan(value);
  };
  const handleClientChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedClient(value as any);
  };

  const handleSubmit = () => {
    refetch();
  };

  const columns: ColumnsType<ZoneTagData> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return (
          <>
            <Space>
              {page !== 0 ? index + 1 + (page - 1) * limit : index + 1}
            </Space>
          </>
        );
      },
      sorter: true,
      width: 140,
      align: "center" as AlignType
    },
    {
      title: "Client",
      dataIndex: "client",
      sorter: false,
      render: (client: any) => {
        if (!client) return "-";
        return <>{client.username}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Zone Manager",
      dataIndex: "zoneManager",
      sorter: false,
      render: (zoneManager: any) => {
        if (!zoneManager) return "-";
        return <>{zoneManager.username}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "SubZone Manager",
      dataIndex: "subZoneManager",
      sorter: false,
      render: (subZoneManager: any) => {
        if (!subZoneManager) return "-";
        return <>{subZoneManager.username}</>;
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
    {
      title: "Serial No",
      dataIndex: "serialNo",
      sorter: true,
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
    {
      title: "Reference",
      dataIndex: "referenceNumber",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    // pricingPlan
    {
      title: "Package",
      dataIndex: "pricingPlan",
      sorter: false,
      render: (pricingPlan: any) => {
        if (!pricingPlan) return "-";
        return <>{pricingPlan.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Price",
      dataIndex: "packagePrice",
      sorter: true,
      width: "20%",
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
    // {
    //   title: "Created At",
    //   dataIndex: "createdOn",
    //   sorter: false,
    //   render: (createdOn: any) => {
    //     if (!createdOn) return "-";
    //     const date = new Date(createdOn);
    //     return <>{format(date, "yyyy-MM-dd pp")}</>;
    //   },
    //   width: "20%",
    //   align: "center" as AlignType
    // },
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

    {
      title: "Action",
      dataIndex: "action",
      sorter: false,
      render: (text: any, record: any) => {
        return (
          <div className="flex flex-row">
            <Space size="middle" align="center" className="mx-1">
              {ability.can("usedVoucher.view", "") ? (
                <Tooltip title="View" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap>
                    <Link href={`/admin/hotspot/unused-voucher/${record.id}`}>
                      <Button type="primary" icon={<EyeOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
            </Space>
          </div>
        );
      },
      align: "center" as AlignType
    }
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
        limit: 10,
        page: 1,
        sort: [
          {
            order: "asc",
            field: "id"
          }
        ]
      },
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        voucherNumber: selectedVoucherNumber,
        serialNo: selectedSerialNo,
        referenceNumber: selectedReferenceNumber,
        pricingPlan: {
          id: selectedPricingPlan
        },
        subZoneManagerId: selectedSubZoneManager,
        zoneManagerId: selectedZone,
        retailerId: selectedRetailer,
        clientId: selectedClient
      }
    };

    await axios
      .post(`/api-hotspot/voucher/get-list`, body, {
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
          const date = new Date(item.expireDate);
          return {
            Voucher: item.voucherNumber,
            Reference: item.referenceNumber,
            "Serial No": item.serialNo,
            "Expiration Date": format(date, "yyyy-MM-dd pp"),
            Client: item.client.username,
            Package: item.pricingPlan.name,
            "Package Price": item.pricingPlan.price,
            "Package Category": item.pricingPlan.packageCategory,
            "OTP Limit": item.pricingPlan.otpLimit,
            "Start Time": item.pricingPlan.startTime,
            "End Time": item.pricingPlan.endTime,
            "Created At": item.createdOn

            // TrxDate: format(date, "yyyy-MM-dd pp")
          };
        });

        setDownloadRow([
          // {
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
            title="Unused Voucher  List"
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
                              <b>Client Name</b>
                            </span>
                            <Select
                              showSearch
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleClientChange}
                              options={clients}
                              value={selectedClient}
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
                              <b>Zone Manager</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleZoneChange}
                              options={zones}
                              value={selectedZone}
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
                              <b>SubZone Manager</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleSubZoneManagerChange}
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
                              <b>Retailer</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleRetailerChange}
                              options={retailers}
                              value={selectedRetailer}
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
                              <b>Pricing Plan</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handlePricingPlanChange}
                              options={pricingPlans}
                              value={selectedPricingPlan}
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
                              <b>Voucher Number</b>
                            </span>
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Voucher Number"
                              value={selectedVoucherNumber}
                              onChange={e =>
                                setSelectedVoucherNumber(e.target.value)
                              }
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
                              <b>Serial No</b>
                            </span>
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Serial No"
                              value={selectedSerialNo}
                              onChange={e =>
                                setSelectedSerialNo(e.target.value)
                              }
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
                              <b>Reference Number</b>
                            </span>
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Reference Number"
                              value={selectedReferenceNumber}
                              onChange={e =>
                                setSelectedReferenceNumber(e.target.value)
                              }
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
                              handleSubmit();
                            }}
                            className="ant-btn  ant-btn-lg"
                          >
                            Submit filters
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
              {ability.can("unusedVoucher.download", "") && (
                <Row justify={"end"}>
                  <Col span={3}>
                    {/* <CSVLink
                      data={data}
                      asyncOnClick={true}
                      onClick={(event, done) => {
                        setDownloadLoading(true);
                        setTimeout(() => {
                          setDownloadLoading(false);
                        }, 2000);
                        done();
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
                      filename={`unused-voucher-${dayjs().format(
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
                      filename={`unused-voucher-${dayjs().format(
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

export default UnusedVoucherList;
