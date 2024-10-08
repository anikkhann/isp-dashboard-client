/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Select,
  Space,
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
import { TopUpTransactionData } from "@/interfaces/TopUpTransactionData";
import { format } from "date-fns";
import ability from "@/services/guard/ability";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { useAppSelector } from "@/store/hooks";
// import Link from "next/link";
import {
  VerticalAlignBottomOutlined,
  DoubleRightOutlined
} from "@ant-design/icons";
// import ability from "@/services/guard/ability";
import { useRouter } from "next/router";
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
interface LoadingState {
  [key: string]: boolean;
}
const InvoiceList: React.FC = () => {
  const authUser = useAppSelector(state => state.auth.user);
  // const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState<LoadingState>({});
  const [loadingDownload, setLoadingDownload] = useState<LoadingState>({});
  const [data, setData] = useState<TopUpTransactionData[]>([]);
  const { Panel } = Collapse;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("desc");
  const [sort, SetSort] = useState("createdOn");

  const [customerIds, setCustomerIds] = useState<any>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<any>(null);

  const [customers, setCustomers] = useState<any>([]);
  const [selectedCustomername, setSelectedCustomername] = useState<any>(null);

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
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { RangePicker } = DatePicker;

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    }
  });
  // useEffect(() => {
  //   setLoading(loading);
  // }, [loading]);
  // handle resend
  async function handleResend(id: string) {
    // setLoading(true);
    setLoadingResend(loadingResend => ({ ...loadingResend, [id]: true }));
    setTimeout(async () => {
      try {
        const result = await MySwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#570DF8",
          cancelButtonColor: "#EB0808",
          confirmButtonText: "Yes, Resend!"
        });

        if (result.isConfirmed) {
          const { data } = await axios.get(
            `/api/customer-invoice/resend-invoice/${id}`
          );
          if (data.status === 200) {
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
        // console.log(error);
        if (error.response) {
          MySwal.fire("Error!", error.response.data.message, "error");
        } else {
          MySwal.fire("Error!", "Something went wrong", "error");
        }
      } finally {
        setLoadingResend(loadingResend => ({ ...loadingResend, [id]: false })); // Set loading state for this specific button to false after download action is handled
      }
    }, 1000);
  }

  // download invoice
  const downloadInvoice = async (id: string) => {
    setLoadingDownload(loadingDownload => ({ ...loadingDownload, [id]: true }));
    setTimeout(async () => {
      try {
        // Make a GET request to the backend API endpoint
        const response = await axios.get(
          `/api/customer-invoice/download-invoice/${id}`,
          {
            responseType: "blob" // Set responseType to 'blob' to handle binary data
          }
        );

        // Create a blob object from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a temporary URL for the blob object
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element
        const link = document.createElement("a");
        link.href = url;

        // Set the filename for the downloaded file
        link.setAttribute("download", `invoice_${id}.pdf`);

        // Append the anchor element to the document body
        document.body.appendChild(link);

        // Trigger the click event on the anchor element to start the download
        link.click();

        // Remove the anchor element from the document body
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading invoice:", error);
      } finally {
        setLoadingDownload(loadingDownload => ({
          ...loadingDownload,
          [id]: false
        })); // Set loading state for this specific button to false after download action is handled
      }
    }, 1000);
  };

  const fetchData = async (
    page: number,
    limit: number,
    order: string,
    sort: string,
    customerIdParam: string,
    customerNameParam: string,
    customerPackageParam: string,
    zoneManagerParam: string,
    subZoneManagerParam: string,
    retailerParam: string,
    startDateParam: string,
    endDateParam: string
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
        // "customerId": "23934007", // Customer List API
        // "username": "babul", // customer user name
        // "customerPackageId": "62baaea0-9d5e-4390-a3e8-9641ddfcaa15", // (dropdown) Customer Package Get List API
        // "zoneManagerId": "679cd29a-ece1-42c1-a62c-56effcaff985", // (dropdown) Zone Manager Get List API
        // "subZoneManagerId":"c2060e52-f473-4b70-8cc5-7e95f512c8e6", // (dropdown)  Sub Zone Manager Get List API
        // "retailerId":"fc061bb8-08a6-4eb8-bb31-4536a3e8d32f", // (dropdown) Retailer Get List API
        // "dateRangeFilter": {"field": "createdOn", "startDate": null, "endDate": null}
        customerId: customerIdParam,
        username: customerNameParam,
        customerPackageId: customerPackageParam,
        zoneManagerId: zoneManagerParam,
        subZoneManagerId: subZoneManagerParam,
        retailerId: retailerParam,
        dateRangeFilter: {
          field: "createdOn",
          startDate: startDateParam,
          endDate: endDateParam
        }
      }
    };

    const { data } = await axios.post("/api/customer-invoice/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "customer-invoice-list",
      page,
      limit,
      order,
      sort,
      selectedCustomerId,
      selectedCustomername,
      selectedPackage,
      selectedZone,
      selectedSubZone,
      selectedRetailer,
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
        selectedCustomername,
        selectedPackage,
        selectedZone,
        selectedSubZone,
        selectedRetailer,
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

      setSubZones(list);
    });
  }

  function getRetailers(selectedSubZoneId: any) {
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
        partnerType: "retailer",
        subZoneManager: { id: selectedSubZoneId },
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
            field: "username"
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
          value: item.id
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
    setSelectedCustomername(value);
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
    setSelectedCustomerId(null);
    setSelectedCustomername(null);
    setSelectedPackage(null);
    setSelectedZone(null);
    setSelectedSubZone(null);
    setSelectedRetailer(null);
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  useEffect(() => {
    getCustomerPackages();
    getCustomers();
    getZoneManagers();
    getSubZoneManagers(null);
    getRetailers(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedZone) {
      getSubZoneManagers(selectedZone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedZone]);
  useEffect(() => {
    if (selectedSubZone) {
      getRetailers(selectedSubZone);
    }
  }, [selectedSubZone]);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);
  // TopUpTransactionData

  const columns: ColumnsType<TopUpTransactionData> = [
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
      title: "Customer",
      dataIndex: "customer",
      sorter: false,
      render: (customer: any) => {
        if (!customer) return "-";
        return <>{customer.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Package",
      dataIndex: "displayName",
      sorter: false,
      render: (displayName: any) => {
        if (!displayName) return "-";
        return <>{displayName}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: false,
      render: (email: any) => {
        if (!email) return "-";
        return <>{email}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Invoice Id",
      dataIndex: "invoiceId",
      sorter: false,
      render: (invoiceId: any) => {
        if (!invoiceId) return "-";
        return <>{invoiceId}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Invoice Month",
      dataIndex: "invoiceMonth",
      sorter: false,
      render: (invoiceMonth: any) => {
        if (!invoiceMonth) return "-";
        return <>{invoiceMonth}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Invoice Year",
      dataIndex: "invoiceYear",
      sorter: false,
      render: (invoiceYear: any) => {
        if (!invoiceYear) return "-";
        return <>{invoiceYear}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Is Sent?",
      dataIndex: "isSend",
      sorter: false,
      render: (isSend: any) => {
        // if (!isSend) return "-";
        return (
          <>
            {isSend == true ? (
              <span style={{ color: "#00ff00" }}>Yes</span>
            ) : (
              <span style={{ color: "#ff0000" }}>No</span>
            )}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Billing Period",
      dataIndex: "billingPeriod",
      sorter: false,
      render: (billingPeriod: any) => {
        if (!billingPeriod) return "-";
        return <>{billingPeriod}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      sorter: true,
      render: (totalPrice: any) => {
        return (
          <>
            <Space>{totalPrice}</Space>
          </>
        );
      },
      ellipsis: true,
      width: "auto",
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
      title: "Created Date",
      dataIndex: "createdOn",
      sorter: false,
      render: (createdOn: any) => {
        if (!createdOn) return "-";
        const date = new Date(createdOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      ellipsis: true,
      width: "auto",
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
              {ability.can("invoice.resend", "") ? (
                <Tooltip title="Resend" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    {/* <Link href={`/admin/client/client/${record.customerId}/edit`}> */}
                    <Button
                      type="primary"
                      icon={<DoubleRightOutlined />}
                      // disabled={loading}
                      disabled={loadingResend[record.id]}
                      onClick={() => handleResend(record.id)}
                    >
                      {loadingResend[record.id] ? "Resending..." : "Resend"}
                      {/* {loading ? "Resending..." : "Resend"} */}
                    </Button>
                    {/* </Link> */}
                  </Space>
                </Tooltip>
              ) : null}
            </Space>
            <Space size="middle" align="center" className="mx-1">
              {ability.can("invoice.download", "") ? (
                <Tooltip title="Download" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap>
                    {/* <Link href={`/admin/client/client/${record.customerId}`}> */}
                    <Button
                      style={{
                        color: "#FFFFFF",
                        backgroundColor: "#FF5630",
                        borderColor: "#FF5630"
                      }}
                      icon={<VerticalAlignBottomOutlined />}
                      // disabled={loading}
                      disabled={loadingDownload[record.id]} // Use the loading state for this specific button
                      onClick={() => downloadInvoice(record.id)}
                    >
                      {/* {loading ? "Downloading..." : "Download"} */}
                      {loadingDownload[record.id]
                        ? "Downloading..."
                        : "Download"}
                    </Button>
                    {/* </Link> */}
                  </Space>
                </Tooltip>
              ) : null}
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
    sorter:
      | SorterResult<TopUpTransactionData>
      | SorterResult<TopUpTransactionData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<TopUpTransactionData>).order) {
      // // console.log((sorter as SorterResult<TopUpTransactionData>).order)

      SetOrder(
        (sorter as SorterResult<TopUpTransactionData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<TopUpTransactionData>).field) {
      // // console.log((sorter as SorterResult<TopUpTransactionData>).field)

      SetSort((sorter as SorterResult<TopUpTransactionData>).field as string);
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
            title="Invoice List"
            hasLink={false}
            addLink="/admin/accounting/invoice/create"
            permission="invoice.create"
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
                              <b>Username</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleUsernameChange}
                              options={customers}
                              value={selectedCustomername}
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
                          // style={{
                          //   display: "flex",
                          //   justifyContent: "center",
                          //   alignItems: "center"
                          // }}
                        >
                          <Space direction="vertical">
                            <span>
                              <b>Date Range</b>
                            </span>
                            <div style={{ marginBottom: "1rem" }}>
                              <RangePicker
                                style={{ width: "100%" }}
                                onChange={handleDateChange}
                                value={selectedDateRange}
                                // onClick={showModal}
                                placeholder={["Start Date", "End Date"]}
                              />
                            </div>

                            {/* <Modal
                              title="Basic Modal"
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}
                            >
                              <RangePicker
                                style={{ width: "100%" }}
                                onChange={handleDateChange}
                                value={selectedDateRange}
                                placeholder={["Start Date", "End Date"]}
                              />
                            </Modal> */}
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
                        {authUser?.userType == "client" &&
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

export default InvoiceList;
