/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Select,
  Space,
  Row,
  DatePicker,
  // Input,
  Tag
} from "antd";
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
import { HotspotOnlinePackagePurchaseData } from "@/interfaces/HotspotOnlinePackagePurchaseData";
// import { HotspotOnlinePackagePurchaseData } from "@/interfaces/HotspotOnlinePackagePurchaseData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { format } from "date-fns";
import { format } from "date-fns";
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

const statuses = [
  {
    label: "Paid",
    value: "Paid"
  },
  {
    label: "Pending",
    value: "Pending"
  },
  {
    label: "Failed",
    value: "Failed"
  }
];

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const HotspotOnlinePackagePurchaseList: React.FC = () => {
  const authUser = useAppSelector(state => state.auth.user);

  const [data, setData] = useState<HotspotOnlinePackagePurchaseData[]>([]);
  console.log("purchaseData", data);
  const { Panel } = Collapse;

  const MySwal = withReactContent(Swal);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("desc");
  const [sort, SetSort] = useState("createdOn");
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const { RangePicker } = DatePicker;
  const downloadRef = useRef<any>(null);
  const [downloadRow, setDownloadRow] = useState<any[]>([]);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  // const [selectedVlan, setSelectedVlan] = useState<any>(null);

  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const [subZones, setSubZones] = useState<any[]>([]);
  const [selectedSubZone, setSelectedSubZone] = useState<any>(null);

  const [retailers, setRetailers] = useState<any[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState<any>(null);

  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const [selectedPricingPlan, setSelectedPricingPlan] = useState<any>(null);

  const [paymentGateways, setPaymentGateways] = useState<any>([]);
  const [selectedPaymentGateway, setSelectedPaymentGateway] =
    useState<any>(null);

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);

  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);

  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

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
    selectedStatusParam?: string,
    // vlanIdParam?: string,
    selectedClientParam?: string,
    selectedZoneParam?: string,
    selectedSubZoneParam?: string,
    selectedRetailerParam?: string,
    selectedPricingPlanParam?: string,
    selectedPaymentGatewayParam?: string,
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
        // SEND FIELD NAME WITH DATA TO SEARCH
        status: selectedStatusParam,
        // vlan_id: vlanIdParam,
        clientId: selectedClientParam,
        zoneManagerId: selectedZoneParam,
        subZoneManagerId: selectedSubZoneParam,
        retailerId: selectedRetailerParam,
        pricingPlanId: selectedPricingPlanParam,
        paymentGatewayId: selectedPaymentGatewayParam,

        // partner: {
        //   id: selectedZoneParam
        // },
        dateRangeFilter: {
          field: "createdOn",
          startDate: startDateParam,
          endDate: endDateParam
        }
      }
    };

    const { data } = await axios.post(
      `/api-hotspot/package-purchase/get-list`,
      body,
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
      "online-package-purchase-list",
      page,
      limit,
      order,
      sort,
      selectedStatus,
      // selectedVlan,
      selectedClient,
      selectedZone,
      selectedSubZone,
      selectedRetailer,
      selectedPricingPlan,
      selectedPaymentGateway,
      selectedStartDate,
      selectedEndDate
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedStatus,
        // selectedVlan,
        selectedClient,
        selectedZone,
        selectedSubZone,
        selectedRetailer,
        selectedPricingPlan,
        selectedPaymentGateway,
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

  // const handleTableChange = (
  //   pagination: TablePaginationConfig,
  //   filters: Record<string, FilterValue | null>,
  //   sorter: SorterResult<HotspotOnlinePackagePurchaseData> | SorterResult<HotspotOnlinePackagePurchaseData>[]
  // ) => {
  //   SetPage(pagination.current as number);
  //   SetLimit(pagination.pageSize as number);

  //   if (sorter && (sorter as SorterResult<HotspotOnlinePackagePurchaseData>).order) {
  //     // // console.log((sorter as SorterResult<ZoneRevenueData>).order)

  //     SetOrder(
  //       (sorter as SorterResult<ZoneTagData>).order === "ascend"
  //         ? "asc"
  //         : "desc"
  //     );
  //   }
  //   if (sorter && (sorter as SorterResult<ZoneTagData>).field) {
  //     // // console.log((sorter as SorterResult<ZoneRevenueData>).field)

  //     SetSort((sorter as SorterResult<ZoneTagData>).field as string);
  //   }
  // };
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<HotspotOnlinePackagePurchaseData>
      | SorterResult<HotspotOnlinePackagePurchaseData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (
      sorter &&
      (sorter as SorterResult<HotspotOnlinePackagePurchaseData>).order
    ) {
      SetOrder(
        (sorter as SorterResult<HotspotOnlinePackagePurchaseData>).order ===
          "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (
      sorter &&
      (sorter as SorterResult<HotspotOnlinePackagePurchaseData>).field
    ) {
      SetSort(
        (sorter as SorterResult<HotspotOnlinePackagePurchaseData>)
          .field as string
      );
    }
  };

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

      setSubZones(list);
    });
  }
  //reatiler function
  function getRetailers(selectedSubZone: any) {
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

        // zoneManager: { id: selectedZoneId },
        subZoneManager: { id: selectedSubZone },
        // client: {
        //   id: selectedClient
        // },

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
  function getPaymentGateway() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "bankName"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        isActive: true
      }
    };

    axios.post("/api/payment-gateway/get-list", body).then(res => {
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
          label: item?.bankName,
          value: item?.id
        };
      });

      setPaymentGateways(list);
    });
  }
  useEffect(() => {
    getClients();
    getPricingPlan();
    getPaymentGateway();
  }, []);

  useEffect(() => {
    // if (selectedClient) {
    getZoneManagers(selectedClient);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClient]);

  useEffect(() => {
    // if (selectedClient || selectedZone) {
    getSubZoneManagers(selectedClient, selectedZone);
    // }
  }, [selectedClient, selectedZone]);

  useEffect(() => {
    if (selectedSubZone) {
      getRetailers(selectedSubZone);
    }
  }, [selectedSubZone]);

  const handleClear = () => {
    setSelectedStatus(null);
    // setSelectedVlan(null);
    setSelectedClient(null);
    setSelectedZone(null);
    setSelectedSubZone(null);
    setSelectedRetailer(null);
    setSelectedPricingPlan(null);
    setSelectedPaymentGateway(null);
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
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
    setSelectedClient(value as any);
  };

  const handleZoneChange = (value: any) => {
    setSelectedZone(value as any);
  };

  const handleZoneManagerChange = (value: any) => {
    setSelectedSubZone(value as any);
  };

  const handleRetailerChange = (value: any) => {
    setSelectedRetailer(value as any);
  };

  const handlePricingPlanChange = (value: any) => {
    setSelectedPricingPlan(value as any);
  };

  const handlePaymentGatewayChange = (value: any) => {
    setSelectedPaymentGateway(value as any);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<HotspotOnlinePackagePurchaseData> = [
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
      title: "Order No",
      dataIndex: "orderNo",
      render: (orderNo?: any) => {
        if (!orderNo) return "-";
        return <>{orderNo}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Requested At",
      dataIndex: "createdOn",
      sorter: false,
      render: (createdOn?: any) => {
        if (!createdOn) return "-";
        const date = new Date(createdOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Client",
      dataIndex: "client",
      render: (client?: any) => {
        if (!client) return "-";
        return <>{client.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Zone Manager",
      dataIndex: "zoneManager",
      render: (zoneManager?: any) => {
        if (!zoneManager) return "-";
        return <>{zoneManager.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Sub Zone Manager",
      dataIndex: "subZoneManager",
      render: (subZoneManager?: any) => {
        if (!subZoneManager) return "-";
        return <>{subZoneManager.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Retailer",
      dataIndex: "retailer",
      render: (retailer?: any) => {
        if (!retailer) return "-";
        return <>{retailer.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      render: (customer?: any) => {
        if (!customer.name) return "-";
        return <>{customer.name}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Mobile No",
      dataIndex: "customer",
      render: (customer?: any) => {
        if (!customer.phone) return "-";
        return <>{customer.phone}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Package",
      dataIndex: "pricingPlan",
      render: (pricingPlan?: any) => {
        if (!pricingPlan.name) return "-";
        return <>{pricingPlan.name}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Package Price",
      dataIndex: "pricingPlan",
      render: (pricingPlan?: any) => {
        if (!pricingPlan.price) return "-";
        return <>{pricingPlan.price}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (totalAmount?: any) => {
        if (totalAmount === 0) return 0;
        if (!totalAmount) return "-";
        return <>{totalAmount}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Payable Amount",
      dataIndex: "payableAmount",
      render: (payableAmount?: any) => {
        if (!payableAmount) return "-";
        return <>{payableAmount}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      render: (status: any) => {
        return (
          <>
            {status === "Paid" ? (
              <Tag color="green">{status}</Tag>
            ) : status === "Failed" ? (
              <Tag color="red">{status}</Tag>
            ) : (
              <Tag color="blue">{status}</Tag>
            )}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Payment Gateway",
      dataIndex: "paymentGateway",
      render: (paymentGateway: any) => {
        if (!paymentGateway.bankName) return "-";
        return <>{paymentGateway?.bankName}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Paid On",
      dataIndex: "updatedOn",
      render: (updatedOn?: any) => {
        if (!updatedOn) return "-";
        const date = new Date(updatedOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    }
  ];
  const handleDownload = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      meta: {
        // limit: 10,
        // page: 1,
        sort: [
          {
            order: "desc",
            field: "clientId"
          }
        ]
      },
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        status: selectedStatus,
        // vlan_id: selectedVlan,
        clientId: selectedClient,
        zoneManagerId: selectedZone,
        subZoneManagerId: selectedSubZone,
        retailerId: selectedRetailer,
        pricingPlanId: selectedPricingPlan,
        paymentGatewayId: selectedPaymentGateway,

        // partner: {
        //   id: selectedZoneParam
        // },
        dateRangeFilter: {
          field: "createdOn",
          startDate: selectedStartDate,
          endDate: selectedEndDate
        }
      }
    };
    await axios
      .post(`/api-hotspot/package-purchase/get-list`, body, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        const { data } = res;

        if (data.status != 200) {
          MySwal.fire({
            title: "Error",
            text: data.message || "Something went wrong",
            icon: "error"
          });
          setDownloadLoading(false);
        }

        if (!data.body) return;

        const list = data.body.map((item: any) => {
          // const requestAt = new Date(item?.createdOn);
          // const paidOn = new Date(item?.updatedOn);
          const requestAt = item?.createdOn ? new Date(item.createdOn) : null;
          const paidOn = item?.updatedOn ? new Date(item.updatedOn) : null;

          return {
            "Order No": item.orderNo,
            // "Requested At": format(requestAt, "yyyy-MM-dd pp"),
            "Requested At": requestAt
              ? format(requestAt, "yyyy-MM-dd pp")
              : "N/A",
            Client: item.client?.username,
            "Zone Manager": item.zoneManager?.username,
            "Sub Zone Manager": item.subZoneManager?.username,
            Retailer: item.retailer?.username,
            "Customer Name": item.customer?.name,
            "Mobile No": item.customer?.phone,
            Package: item.pricingPlan?.name,
            "Package Price": item.pricingPlan?.price,
            "Total Amount": item.totalAmount,
            "Payable Amount": item.payableAmount,
            "Payment Status": item.status,
            "Payment Gateway Name": item.paymentGateway?.bankName,
            // "Paid On": format(paidOn, "yyyy-MM-dd pp")
            "Paid On": paidOn ? format(paidOn, "yyyy-MM-dd pp") : "N/A"
          };
        });

        setDownloadRow([
          // {
          //   Agent: "Agent",
          //   TRXType: "TRX Type",
          //   TrxMode: "Trx Mode",
          //   TransactionId: "Transaction Id",
          //   Amount: "Amount",
          //   Balance: "Balance",
          //   Remarks: "Remarks",
          //   TrxBy: "Trx By",
          //   TrxDate: "Trx Date"
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
            title="Online Package Purchase"
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
                              <b>Status</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleStatusChange}
                              options={statuses}
                              value={selectedStatus}
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
                        {/* <Col
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
                              <b>Vlan ID</b>
                            </span>
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Vlan ID"
                              value={selectedVlan}
                              onChange={e => setSelectedVlan(e.target.value)}
                            />
                          </Space>
                        </Col> */}

                        {authUser &&
                          (authUser.userType === "duronto" ||
                            authUser.userType === "durjoy") && (
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
                        {/*  authUser.userType != "zone" &&
                          authUser.userType != "reseller" && */}
                        {authUser &&
                          (authUser.userType === "duronto" ||
                            authUser.userType === "durjoy" ||
                            (authUser.userType === "client" &&
                              authUser.clientLevel !== "tri_cycle" &&
                              authUser.clientLevel !== "tri_cycle_hotspot" &&
                              authUser.clientLevel !==
                                "tri_cycle_isp_hotspot")) && (
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
                                  style={{ width: "100%", textAlign: "start" }}
                                  placeholder="Please select"
                                  onChange={handleZoneChange}
                                  options={zones}
                                  value={selectedZone}
                                />
                              </Space>
                            </Col>
                          )}

                        {authUser &&
                          (authUser.userType === "duronto" ||
                            authUser.userType === "durjoy" ||
                            authUser.userType === "client" ||
                            authUser.userType === "zone") && (
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
                                  <b>SubZone Manager</b>
                                </span>
                                <Select
                                  allowClear
                                  style={{ width: "100%", textAlign: "start" }}
                                  placeholder="Please select"
                                  onChange={handleZoneManagerChange}
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
                          {/* pricingPlanId */}

                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Pricing Plan</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select Package"
                              onChange={handlePricingPlanChange}
                              options={pricingPlans}
                              value={selectedPricingPlan}
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
                          {/* paymentGatewayId */}

                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Payment Gateway</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handlePaymentGatewayChange}
                              options={paymentGateways}
                              value={selectedPaymentGateway}
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

              {ability.can("onlinePackagePurchase.download", "") && (
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
                      filename={`hotspot-online-purchase-${dayjs().format(
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

export default HotspotOnlinePackagePurchaseList;
