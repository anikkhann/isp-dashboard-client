/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Input,
  Select,
  Space,
  Tag,
  Row,
  DatePicker,
  Tooltip
} from "antd";
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
import Link from "next/link";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { CustomerData } from "@/interfaces/CustomerData";
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

const CustomerList: React.FC = () => {
  const authUser = useAppSelector(state => state.auth.user);
  // const [form] = Form.useForm();
  const { Panel } = Collapse;
  const [data, setData] = useState<CustomerData[]>([]);

  const MySwal = withReactContent(Swal);

  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [customerIds, setCustomerIds] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<any>(null);

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [distributionZones, setDistributionZones] = useState<any[]>([]);
  const [selectedDistributionZone, setSelectedDistributionZone] =
    useState<any>(null);

  const [distributionPops, setDistributionPops] = useState<any[]>([]);
  const [selectedDistributionPop, setSelectedDistributionPop] =
    useState<any>(null);
  const [downloadRow, setDownloadRow] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [selectedMobile, setSelectedMobile] = useState<any>(null);

  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const [subZones, setSubZones] = useState<any[]>([]);
  const [selectedSubZone, setSelectedSubZone] = useState<any>(null);

  const [retailers, setRetailers] = useState<any[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState<any>(null);

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

  function subOneDay(date = new Date()) {
    date.setDate(date.getDate() - 1);

    return date;
  }

  const fetchData = async (
    page: number,
    limit: number,
    order: string,
    sort: string,
    customerIdParam?: string,
    usernameParam?: string,
    distributionZoneParam?: string,
    distributionPopParam?: string,
    packageParam?: string,
    zoneParam?: string,
    subZoneParam?: string,
    retailerParam?: string,
    emailParam?: string,
    mobileParam?: string,
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
        customerId: customerIdParam,
        username: usernameParam,
        email: emailParam,
        mobile: mobileParam,
        distributionZone: {
          id: distributionZoneParam
        },
        distributionPop: {
          id: distributionPopParam
        },
        customerPackage: {
          id: packageParam
        },
        zoneManager: {
          id: zoneParam
        },
        subZoneManager: {
          id: subZoneParam
        },
        retailer: {
          id: retailerParam
        },
        dateRangeFilter: {
          field: "expirationTime",
          startDate: startDateParam,
          endDate: endDateParam
        }
      }
    };

    const { data } = await axios.post("/api/customer/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "customer-list",
      page,
      limit,
      order,
      sort,
      selectedCustomerId,
      selectedCustomer,
      selectedDistributionZone,
      selectedDistributionPop,
      selectedPackage,
      selectedZone,
      selectedSubZone,
      selectedRetailer,
      selectedEmail,
      selectedMobile,
      selectedStartDate,
      selectedEndDate
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedCustomerId,
        selectedCustomer,
        selectedDistributionZone,
        selectedDistributionPop,
        selectedPackage,
        selectedZone,
        selectedSubZone,
        selectedRetailer,
        selectedEmail,
        selectedMobile,
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
            field: "name"
          }
        ]
      },
      body: {
        partnerType: "reseller",

        zoneManager: { id: selectedZoneId },
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
          label: item.name,
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
        partnerType: "retailer",
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

      setRetailers(list);
    });
  }

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
        isActive: true
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

  function getDistributionPops(selectedDistributionZone: any) {
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
        zone: {
          id: selectedDistributionZone
        },
        isActive: true
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
        isActive: true
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
      setPackages(list);
    });
  };

  const getCustomers = () => {
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
    axios.post("/api/customer/get-list", body).then(res => {
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
          value: item.username
        };
      });
      setCustomers(list);

      const customerIds = data.body.map((item: any) => {
        return {
          label: item.customerId,
          value: item.customerId
        };
      });
      setCustomerIds(customerIds);
    });
  };

  const handleCustomerIDChange = (value: any) => {
    setSelectedCustomerId(value);
  };

  const handleUsernameChange = (value: any) => {
    setSelectedCustomer(value);
  };

  const handleDistributionZoneChange = (value: any) => {
    setSelectedDistributionZone(value);
  };

  const handleDistributionPopChange = (value: any) => {
    setSelectedDistributionPop(value);
  };

  const handlePackageChange = (value: any) => {
    setSelectedPackage(value);
  };

  const handleZoneChange = (value: any) => {
    // setSelectedZone(value);
    // form.setFieldsValue({ zoneManagerId: value });
    setSelectedZone(value as any);
  };

  const handleSubZoneChange = (value: any) => {
    // setSelectedSubZone(value);
    // form.setFieldsValue({ subZoneManagerId: value });
    setSelectedSubZone(value as any);
  };

  const handleRetailerChange = (value: any) => {
    setSelectedRetailer(value);
  };

  const handleClear = () => {
    setSelectedCustomerId(null);
    setSelectedCustomer(null);
    setSelectedDistributionZone(null);
    setSelectedDistributionPop(null);
    setSelectedPackage(null);
    setSelectedZone(null);
    setSelectedSubZone(null);
    setSelectedRetailer(null);
    setSelectedEmail(null);
    setSelectedMobile(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedDateRange(null);
  };

  useEffect(() => {
    getZoneManagers();
    // getSubZoneManagers();
    getRetailers();
    getDistributionZones();
    // getDistributionPops();
    // getDistributionPops(selectedDistributionZone);

    getCustomerPackages();
    getCustomers();
    getSubZoneManagers(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (selectedZone) {
      getSubZoneManagers(selectedZone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedZone]);

  useEffect(() => {
    if (selectedDistributionZone) {
      getDistributionPops(selectedDistributionZone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistributionZone]);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  // console.log(error, isLoading, isError)

  const columns: ColumnsType<CustomerData> = [
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
      width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Customer ID",
      dataIndex: "customerId",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Zone",
      dataIndex: "distributionZone",
      sorter: false,
      render: (distributionZone: any) => {
        if (!distributionZone) return "-";
        return <>{distributionZone.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Pop",
      dataIndex: "distributionPop",
      sorter: false,
      render: (distributionPop: any) => {
        if (!distributionPop) return "-";
        return <>{distributionPop.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Connection Address",
      dataIndex: "connectionAddress",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Credits",
      dataIndex: "credits",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Package",
      dataIndex: "customerPackage",
      sorter: false,
      render: (customerPackage: any) => {
        if (!customerPackage) return "-";
        return <>{customerPackage.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationTime",
      sorter: false,
      render: (expirationTime: any) => {
        if (!expirationTime) return "-";
        const date = new Date(expirationTime);
        const result2 = subOneDay(date);
        const today = new Date();

        const isDateGreen = result2 >= today;
        const color = isDateGreen ? "green" : "red";

        return <span style={{ color }}>{format(result2, "yyyy-MM-dd")}</span>;

        // return <>{format(result2, "yyyy-MM-dd")}</>;
      },
      // return <>{result2}</>;
      // pp
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Status",
      dataIndex: "isActive",
      sorter: true,
      render: (isActive: any) => {
        return (
          <>
            {isActive ? (
              <Tag color="blue">Active</Tag>
            ) : (
              <Tag color="red">Inactive</Tag>
            )}
          </>
        );
      },
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
    {
      title: "Creation/Onboard Date",
      dataIndex: "createdOn",
      sorter: false,
      render: (createdOn: any) => {
        if (!createdOn) return "-";
        const date = new Date(createdOn);

        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
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
            <Space size="middle" align="center">
              {ability.can("customer.update", "") ? (
                <Tooltip title="Edit" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link href={`/admin/customer/customer/${record.id}/edit`}>
                      <Button type="primary" icon={<EditOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
              {ability.can("customer.view", "") ? (
                <Tooltip title="View" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap className="mx-1">
                    <Link href={`/admin/customer/customer/${record.id}`}>
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
    sorter: SorterResult<CustomerData> | SorterResult<CustomerData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<CustomerData>).order) {
      // // console.log((sorter as SorterResult<CustomerData>).order)

      SetOrder(
        (sorter as SorterResult<CustomerData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<CustomerData>).field) {
      // // console.log((sorter as SorterResult<CustomerData>).field)

      SetSort((sorter as SorterResult<CustomerData>).field as string);
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
                  margin: " 10px 5px",
                  backgroundColor: "#ffffff",
                  width: "100%"
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
            title="Customers List"
            hasLink={true}
            addLink="/admin/customer/customer/create"
            permission="customer.create"
            style={{
              // backgroundColor: "#FFFFFF",
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
                    <Panel header="Customers Filters" key="1">
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
                              <b>Customer Id</b>
                            </span>
                            <Select
                              allowClear
                              style={{
                                width: "100%",
                                textAlign: "start"
                              }}
                              placeholder="Please select"
                              onChange={handleCustomerIDChange}
                              options={customerIds}
                              value={selectedCustomerId}
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
                              <b>Username</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleUsernameChange}
                              options={customers}
                              value={selectedCustomer}
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
                        {authUser?.userType == "client" &&
                          ability.can(
                            "CustomerSearch.distributionZone",
                            ""
                          ) && (
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
                                  <b>Distribution Zone</b>
                                </span>
                                <Select
                                  allowClear
                                  style={{ width: "100%", textAlign: "start" }}
                                  placeholder="Please select"
                                  onChange={handleDistributionZoneChange}
                                  options={distributionZones}
                                  value={selectedDistributionZone}
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
                        {authUser?.userType == "client" &&
                          ability.can("CustomerSearch.distributionPop", "") && (
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
                                  <b>Distribution Pop</b>
                                </span>

                                <Select
                                  allowClear
                                  style={{ width: "100%", textAlign: "start" }}
                                  placeholder="Please select"
                                  onChange={handleDistributionPopChange}
                                  options={distributionPops}
                                  value={selectedDistributionPop}
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

                        {ability.can("CustomerSearch.package", "") && (
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
                                <b>Package</b>
                              </span>

                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select"
                                onChange={handlePackageChange}
                                options={packages}
                                value={selectedPackage}
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
                        {authUser?.userType == "client" &&
                          ability.can("CustomerSearch.zone", "") && (
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
                        {ability.can("CustomerSearch.subZone", "") && (
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

                        {ability.can("CustomerSearch.retailer", "") && (
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
                        {ability.can("CustomerSearch.email", "") && (
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
                                <b>Email</b>
                              </span>
                              <Input
                                type="text"
                                className="ant-input"
                                placeholder="Email"
                                value={selectedEmail}
                                onChange={e => setSelectedEmail(e.target.value)}
                              />
                            </Space>
                          </Col>
                        )}
                        {ability.can("CustomerSearch.mobile", "") && (
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
                                <b>Mobile</b>
                              </span>
                              <Input
                                type="text"
                                className="ant-input"
                                placeholder="Mobile"
                                value={selectedMobile}
                                onChange={e =>
                                  setSelectedMobile(e.target.value)
                                }
                              />
                            </Space>
                          </Col>
                        )}
                        {ability.can("CustomerSearch.dateRange", "") && (
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
                                <b>Date Range By (Expiration Date)</b>
                              </span>
                              <RangePicker
                                style={{ width: "100%" }}
                                onChange={handleDateChange}
                                value={selectedDateRange}
                                placeholder={["Start Date", "End Date"]}
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

              {/* customer */}
              {ability.can("customer.download", "") && (
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
                      filename={`customer-${dayjs().format("YYYY-MM-DD")}.csv`}
                    >
                      {downloadLoading ? "Loading..." : "Download"}
                    </CSVLink> */}
                    <CSVLink
                      data={downloadRow}
                      asyncOnClick={true}
                      onClick={(event, done) => {
                        setDownloadLoading(true);
                        setTimeout(() => {
                          setDownloadLoading(false);
                        }, 2000);
                        const token = Cookies.get("token");
                        axios.defaults.headers.common[
                          "Authorization"
                        ] = `Bearer ${token}`;

                        const body = {
                          meta: {
                            sort: [
                              {
                                order: "asc",
                                field: "id"
                              }
                            ]
                          },
                          body: {
                            customerId: selectedCustomerId,
                            username: selectedCustomer,
                            email: selectedEmail,
                            mobile: selectedMobile,
                            distributionZone: {
                              id: selectedDistributionZone
                            },
                            distributionPop: {
                              id: selectedDistributionPop
                            },
                            customerPackage: {
                              id: selectedPackage
                            },
                            zoneManager: {
                              id: selectedZone
                            },
                            subZoneManager: {
                              id: selectedSubZone
                            },
                            retailer: {
                              id: selectedRetailer
                            },
                            dateRangeFilter: {
                              field: "expirationTime",
                              startDate: selectedStartDate,
                              endDate: selectedEndDate
                            }
                          }
                        };

                        axios
                          .post(`/api/customer/get-list`, body, {
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
                              const date = new Date(item.expirationTime);
                              return {
                                CustomerID: item.customerId,
                                UserName: item.username,
                                MobileNo: item.mobileNo,
                                Email: item.email,
                                ContactPerson: item.contactPerson,
                                ContactNumber: item.contactNumber,
                                ConnectionAddress: item.connectionAddress,
                                HouseNo: item.houseNo,
                                Area: item.area,
                                IdentityType: item.identityType,
                                IdentityNo: item.identityNo,
                                IsMacBound: item.isMacBound,
                                MAC: item.mac,
                                SimultaneousUser: item.simultaneousUser,
                                IPMode: item.ipMode,
                                StaticIP: item.staticIp,
                                ExpirationTime: format(date, "yyyy-MM-dd pp"),
                                Credits: item.simultaneousUser,
                                AutoRenew: item.autoRenew,
                                Discount: item.discount,
                                SMSAlert: item.smsAlert,
                                EmailAlert: item.emailAlert,
                                ClientId: item.clientId,
                                isActive: item.isActive,
                                isSafOtpSend: item.isSafOtpSend,
                                isSafVerified: item.isSafVerified,
                                isSafOtpVerified: item.isSafOtpVerified,
                                adjustmentDay: item.adjustmentDay,
                                altMobileNo: item.altMobileNo,
                                flatNo: item.flatNo,
                                roadNo: item.roadNo,
                                remarks: item.remarks,
                                referrerName: item.referrerName,
                                connectionType: item.connectionType
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
                      filename={`customer-list-${dayjs().format(
                        "YYYY-MM-DD"
                      )}.csv`}
                    >
                      {downloadLoading ? "Loading..." : "Download"}
                      {/* <DownloadOutlined /> */}
                    </CSVLink>
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

export default CustomerList;
