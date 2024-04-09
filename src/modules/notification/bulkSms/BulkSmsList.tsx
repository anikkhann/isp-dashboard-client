/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Collapse,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Tooltip
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import ability from "@/services/guard/ability";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
interface DataType {
  id: number;
  name: string;
  slug: string;
  group: string;
}
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const customerStatuses = [
  {
    label: "active",
    value: "active"
  },
  {
    label: "inactive",
    value: "inactive"
  },
  {
    label: "all",
    value: "all"
  }
];

const subscriptionStatuses = [
  {
    label: "registered",
    value: "registered"
  },
  {
    label: "expired",
    value: "expired"
  },
  {
    label: "all",
    value: "all"
  }
];

const BulkSmsList: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  const authUser = useAppSelector(state => state.auth.user);

  const { Panel } = Collapse;
  const router = useRouter();
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [selectedCustomerStatus, setSelectedCustomerStatus] =
    useState<any>(null);

  const [selectedSubscriptionStatus, setSelectedSubscriptionStatus] =
    useState<any>(null);

  const [distributionZones, setDistributionZones] = useState([]);
  const [distributionPops, setDistributionPops] = useState([]);

  const [selectedDistributionZone, setSelectedDistributionZone] =
    useState<any>(null);
  const [selectedDistributionPop, setSelectedDistributionPop] =
    useState<any>(null);

  const [customerPackages, setCustomerPackages] = useState([]);
  const [selectedCustomerPackage, setSelectedCustomerPackage] =
    useState<any>(null);

  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const [subZones, setSubZones] = useState<any[]>([]);
  const [selectedSubZone, setSelectedSubZone] = useState<any>(null);

  const [retailers, setRetailers] = useState<any[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState<any>(null);

  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  const MySwal = withReactContent(Swal);

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
    distributionZoneParam?: string,
    distributionPopParam?: string,
    zoneManagerParam?: string,
    subZoneManagerParam?: string,
    retailerParam?: string,
    customerPackageParam?: string,
    customerStatusParam?: string,
    subjectParam?: string,
    subscriptionStatusParam?: string
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
        distributionZoneId: distributionZoneParam,
        distributionPopId: distributionPopParam,
        zoneManagerId: zoneManagerParam,
        subZoneManagerId: subZoneManagerParam,
        retailerId: retailerParam,
        customerPackageId: customerPackageParam,
        customerStatus: customerStatusParam,
        subject: subjectParam,
        subscriptionStatus: subscriptionStatusParam
      }
    };

    const { data } = await axios.post("/api/bulk-sms/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "bulk-sms-list",
      page,
      limit,
      order,
      sort,
      selectedDistributionZone,
      selectedDistributionPop,
      selectedZone,
      selectedSubZone,
      selectedRetailer,
      selectedCustomerPackage,
      selectedCustomerStatus,
      selectedSubject,
      selectedSubscriptionStatus
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedDistributionZone,
        selectedDistributionPop,
        selectedZone,
        selectedSubZone,
        selectedRetailer,
        selectedCustomerPackage,
        selectedCustomerStatus,
        selectedSubject,
        selectedSubscriptionStatus
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

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const handleCustomerStatusChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedCustomerStatus(value as any);
  };

  const handleSubscriptionStatusChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedSubscriptionStatus(value as any);
  };

  const handleDistributionZoneChange = (value: any) => {
    // console.log("checked = ", value);

    setSelectedDistributionZone(value as any);

    if (!value) {
      setSelectedDistributionPop(null);
      setDistributionPops([]);
    }
  };

  const handleDistributionPopChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedDistributionPop(value as any);
  };

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedZone(value as any);
  };

  const handleSubZoneChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedSubZone(value as any);
  };

  const handleRetailerChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedRetailer(value as any);
  };

  const handleCustomerPackageChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedCustomerPackage(value as any);
  };

  function getDistributionZones() {
    const body = {
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

    axios.post("/api/distribution-zone/get-list", body).then(res => {
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
      setDistributionZones(list);
    });
  }

  function getDistributionPops(selectedDistributionZone: string) {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        zone: { id: selectedDistributionZone }
        // isActive: true
      }
    };

    axios.post("/api/distribution-pop/get-list", body).then(res => {
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
      setDistributionPops(list);
    });
  }

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

  function getSubZoneManagers(selectedZoneId: any) {
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

      setSubZones(list);
    });
  }

  function getRetailers() {
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
        partnerType: "retailer"
        // subZoneManager: { id: selectedSubZone },
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

  const getCustomerPackages = () => {
    const body = {
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
    axios.post("/api/customer-package/get-list", body).then(res => {
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
      setCustomerPackages(list);
    });
  };
  // process
  async function handleProcess(id: string) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, Proceed"
      });

      if (result.isConfirmed) {
        const { data } = await axios.get(`/api/bulk-sms/process/${id}`);
        if (data.status == 200) {
          MySwal.fire("Success!", data.message, "success").then(() => {
            router.reload();
          });
        } else {
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error: any) {
      if (error.response) {
        MySwal.fire("Error!", error.response.data.message, "error");
      } else {
        MySwal.fire("Error!", "Something Went Wrong", "error");
      }
    }
  }
  // delete
  async function handleDelete(id: number) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const { data } = await axios.delete(`/api/bulk-sms/delete/${id}`);
        if (data.status == 200) {
          MySwal.fire("Deleted!", data.message, "success").then(() => {
            router.reload();
          });
        } else {
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error: any) {
      // console.log("error", error);
      if (error.response) {
        MySwal.fire("Error!", error.response.data.message, "error");
      } else {
        MySwal.fire("Error!", "Something went wrong", "error");
      }
    }
  }

  // call on page load
  useEffect(() => {
    getDistributionZones();
    getCustomerPackages();
    getZoneManagers();

    getSubZoneManagers(null);
    getRetailers();
  }, []);
  // getSubZoneManagers();
  useEffect(() => {
    if (selectedDistributionZone) {
      getDistributionPops(selectedDistributionZone);
    } else {
      setSelectedDistributionPop(null);
      setDistributionPops([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistributionZone]);

  useEffect(() => {
    if (selectedZone) {
      getSubZoneManagers(selectedZone);
    }
  }, [selectedZone]);

  const handleClear = () => {
    setSelectedDistributionZone(null);
    setSelectedDistributionPop(null);
    setSelectedCustomerPackage(null);
    setSelectedCustomerStatus(null);
    setSelectedSubscriptionStatus(null);
    setSelectedZone(null);
    setSelectedSubZone(null);
    setSelectedRetailer(null);
    setSelectedSubject(null);
  };

  const columns: ColumnsType<DataType> = [
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
      title: "Zone",
      dataIndex: "distributionZone",
      sorter: true,
      render: distributionZone => {
        return (
          <>
            {distributionZone && distributionZone.name
              ? distributionZone.name
              : "-"}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "POP",
      dataIndex: "distributionPop",
      sorter: true,
      render: distributionPop => {
        return (
          <>
            {distributionPop && distributionPop.name
              ? distributionPop.name
              : "-"}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "ZM",
      dataIndex: "zoneManager",
      sorter: true,
      render: zoneManager => {
        return <>{zoneManager && zoneManager.name ? zoneManager.name : "-"}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "SZM",
      dataIndex: "subZoneManager",
      sorter: true,
      render: subZoneManager => {
        return (
          <>
            {subZoneManager && subZoneManager.name ? subZoneManager.name : "-"}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Customer Package",
      dataIndex: "customerPackage",
      sorter: true,
      render: customerPackage => {
        return (
          <>
            {customerPackage && customerPackage.name
              ? customerPackage.name
              : "-"}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Customer Status",
      dataIndex: "customerStatus",
      sorter: true,
      render: (customerStatus: any) => {
        if (customerStatus == 0) return <>{customerStatus}</>;
        if (!customerStatus) return "-";
        return <>{customerStatus}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Subscription Status",
      dataIndex: "subscriptionStatus",
      sorter: true,
      render: (subscriptionStatus: any) => {
        if (subscriptionStatus == 0) return <>{subscriptionStatus}</>;
        if (!subscriptionStatus) return "-";
        return <>{subscriptionStatus}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Subject",
      dataIndex: "subject",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Message",
      dataIndex: "message",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (status: any) => {
        return (
          <>
            {status && status == "Pending" ? (
              <Tag color="blue">Pending</Tag>
            ) : status && status == "In Progress" ? (
              <Tag color="purple">In Progress</Tag>
            ) : status && status == "Processed" ? (
              <Tag color="green">Processed</Tag>
            ) : (
              <Tag color="red">Failed</Tag>
            )}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Action Date",
      dataIndex: "createdOn",
      sorter: false,
      render: (createdOn: any) => {
        if (createdOn == 0) return <>{createdOn}</>;
        if (!createdOn) return "-";
        const date = new Date(createdOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Action",
      dataIndex: "action",
      sorter: false,
      render: (_, record: any) => {
        return (
          <div className="flex flex-row">
            <Space size="middle" align="center">
              {/* process */}
              {ability.can("smsBulk.process", "") &&
              record.status == "Pending" ? (
                <Tooltip
                  title="Process"
                  placement="bottomRight"
                  color="magenta"
                >
                  <Space size="middle" align="center" wrap>
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      style={{
                        backgroundColor: "#9195F6",
                        borderColor: "#9195F6",
                        color: "#ffffff"
                      }}
                      onClick={() => handleProcess(record.id)}
                    />
                  </Space>
                </Tooltip>
              ) : null}

              {ability.can("smsBulk.delete", "") &&
              record.status == "Pending" ? (
                <Tooltip title="Delete" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Button
                      type="primary"
                      icon={<CloseOutlined />}
                      style={{
                        backgroundColor: "#FF407D",
                        borderColor: "#FF407D",
                        color: "#ffffff"
                      }}
                      onClick={() => handleDelete(record.id)}
                    />
                  </Space>
                </Tooltip>
              ) : null}
              {/* process */}
            </Space>
          </div>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<DataType>).order) {
      // // console.log((sorter as SorterResult<DataType>).order)

      SetOrder(
        (sorter as SorterResult<DataType>).order === "ascend" ? "asc" : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<DataType>).field) {
      // // console.log((sorter as SorterResult<DataType>).field)

      SetSort((sorter as SorterResult<DataType>).field as string);
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
            title="Bulk SMS List"
            hasLink={true}
            addLink="/admin/notification/sms/send-sms-bulk/create"
            permission="smsBulk.create"
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
                              <b>Distribution Zone</b>
                            </span>
                            <Space
                              style={{ width: "100%" }}
                              direction="vertical"
                            >
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select Distribution Zone"
                                onChange={handleDistributionZoneChange}
                                options={distributionZones}
                                value={selectedDistributionZone}
                              />
                            </Space>
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
                              <b>Distribution Pop</b>
                            </span>

                            <Space
                              style={{ width: "100%" }}
                              direction="vertical"
                            >
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select Distribution Pop"
                                onChange={handleDistributionPopChange}
                                options={distributionPops}
                                value={selectedDistributionPop}
                              />
                            </Space>
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
                              <b>Customer Package</b>
                            </span>

                            <Space
                              style={{ width: "100%" }}
                              direction="vertical"
                            >
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select Customer Package"
                                onChange={handleCustomerPackageChange}
                                options={customerPackages}
                                value={selectedCustomerPackage}
                              />
                            </Space>
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
                              <b>Customer Status</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select Customer Status"
                              onChange={handleCustomerStatusChange}
                              options={customerStatuses}
                              value={selectedCustomerStatus}
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
                              <b>Subscription Status</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select Customer Status"
                              onChange={handleSubscriptionStatusChange}
                              options={subscriptionStatuses}
                              value={selectedSubscriptionStatus}
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

                        {authUser &&
                          authUser?.clientLevel != "tri_cycle" &&
                          authUser?.clientLevel != "tri_cycle_hotspot" &&
                          authUser?.clientLevel != "tri_cycle_isp_hotspot" &&
                          authUser.userType == "client" && (
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
                          )}

                        {authUser &&
                          (authUser.userType == "client" ||
                            authUser.userType == "zone") && (
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
                                  <b>Sub Zone</b>
                                </span>
                                <Select
                                  allowClear
                                  style={{ width: "100%", textAlign: "start" }}
                                  placeholder="Please select"
                                  onChange={handleSubZoneChange}
                                  options={subZones}
                                  value={selectedSubZone}
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

                        {authUser && authUser.userType == "subZone" && (
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
                              <b>Subject</b>
                            </span>
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Subject"
                              value={selectedSubject}
                              onChange={e => setSelectedSubject(e.target.value)}
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

export default BulkSmsList;
