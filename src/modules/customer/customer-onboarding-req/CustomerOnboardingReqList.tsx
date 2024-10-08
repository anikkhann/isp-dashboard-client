/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  DatePicker,
  // Form,
  Input,
  Select,
  Space,
  Tag,
  Tooltip
} from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table, Collapse, Row } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import Link from "next/link";
import {
  CheckSquareOutlined,
  CloseSquareOutlined,
  EditOutlined,
  EyeOutlined,
  IssuesCloseOutlined,
  CloseOutlined
} from "@ant-design/icons";
import ability from "@/services/guard/ability";
import { CustomerData } from "@/interfaces/CustomerData";
import { format } from "date-fns";
import { useAppSelector } from "@/store/hooks";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
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

const CustomerOnboardingReqList: React.FC = () => {
  const authUser = useAppSelector(state => state.auth.user);
  // const [form] = Form.useForm();
  const { Panel } = Collapse;
  const { RangePicker } = DatePicker;
  // const [form] = Form.useForm();
  const MySwal = withReactContent(Swal);

  const [data, setData] = useState<CustomerData[]>([]);

  const router = useRouter();
  // const { id } = router.query;

  const [customerTypes, setCustomerTypes] = useState<any[]>([]);
  const [customerPackages, setCustomerPackages] = useState<any[]>([]);

  const [selectedCustomerType, setSelectedCustomerType] = useState<any>(null);
  const [selectedCustomerPackage, setSelectedCustomerPackage] =
    useState<any>(null);

  const [selectedUsername, setSelectedUsername] = useState<any>(null);

  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);

  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

  const [zoneStatus, setZoneStatus] = useState<any>([]);
  const [zoneStatusChanged, setZoneStatusChanged] = useState<any>(null);

  const [clientStatus, setClientStatus] = useState<any>([]);
  const [clientStatusChanged, setClientStatusChanged] = useState<any>(null);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  // const [showError, setShowError] = useState(false);
  // const [errorMessages, setErrorMessages] = useState(null);

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
    customerTypeParam: string,
    customerPackageParam: string,
    usernameParam: string,
    startDateParam: string,
    endDateParam: string,
    zoneStatusParam: string,
    clientStatusParam: string
  ) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // const zoneStatus =
    //   authUser && authUser.userType == "client" ? `Approved` : null;

    // const clientStatus =
    //   authUser && authUser.userType == "client" ? `Pending` : null;

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
        // clientStatus: "Pending"
        // zoneStatus : "Pending"
        zoneStatus: zoneStatusParam,
        clientStatus: clientStatusParam,

        customerType: {
          id: customerTypeParam
        },
        customerPackage: {
          id: customerPackageParam
        },
        username: usernameParam,
        dateRangeFilter: {
          field: "createdOn",
          startDate: startDateParam,
          endDate: endDateParam
        }
      }
    };

    const { data } = await axios.post("/api/customer-request/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "customer-req-list",
      page,
      limit,
      order,
      sort,
      selectedCustomerType,
      selectedCustomerPackage,
      selectedUsername,
      selectedStartDate,
      selectedEndDate,
      zoneStatusChanged,
      clientStatusChanged
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        selectedCustomerType,
        selectedCustomerPackage,
        selectedUsername,
        selectedStartDate,
        selectedEndDate,
        zoneStatusChanged,
        clientStatusChanged
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

  async function handleApprove(id: string) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, Approve!"
      });

      if (result.isConfirmed) {
        const body = {
          id: id,
          action: "approve"
        };

        const { data } = await axios.put(`/api/customer-request/approve`, body);
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
    }
  }
  async function handleDelete(id: string) {
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
        const body = {
          id: id
          // action: "cancel"
        };
        const { data } = await axios.put(`/api/customer-request/delete`, body);
        if (data.status === 200) {
          MySwal.fire("Success!", data.message, "success").then(() => {
            router.reload();
          });
        } else {
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire("Deleted", "Your Data is deleted :)", "error");
      }
    } catch (error: any) {
      // console.log(error);
      if (error.response) {
        MySwal.fire("Error!", error.response.data.message, "error");
      } else {
        MySwal.fire("Error!", "Something went wrong", "error");
      }
    }
  }

  async function handleReinitiate(id: string) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, Reinitiate!"
      });

      if (result.isConfirmed) {
        const body = {
          id: id
          // action: "approve"
        };

        const { data } = await axios.put(
          `/api/customer-request/re-initiate`,
          body
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
    }
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

  function getCustomerTypes() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "title"
          }
        ]
      },
      body: {
        // isActive: true
      }
    };
    axios.post("/api/customer-type/get-list", body).then(res => {
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
          label: item.title,
          value: item.id
        };
      });

      setCustomerTypes(list);
    });
  }

  useEffect(() => {
    getCustomerPackages();
    getCustomerTypes();
    getZoneStatus();
    getClientStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCustomerTypeChange = (value: any) => {
    setSelectedCustomerType(value);
  };

  const handleCustomerPackageChange = (value: any) => {
    setSelectedCustomerPackage(value);
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

  function getZoneStatus() {
    const zoneStatus = [
      {
        label: "Pending",
        value: "Pending"
      },
      {
        label: "Approved",
        value: "Approved"
      },
      {
        label: "Rejected",
        value: "Rejected"
      },
      {
        label: "Cancelled",
        value: "Cancelled"
      }
    ];
    setZoneStatus(zoneStatus);
  }
  function getClientStatus() {
    const clientStatus = [
      {
        label: "Pending",
        value: "Pending"
      },
      {
        label: "Approved",
        value: "Approved"
      },
      {
        label: "Rejected",
        value: "Rejected"
      },
      {
        label: "Cancelled",
        value: "Cancelled"
      }
    ];
    setClientStatus(clientStatus);
  }
  const handleZoneStatusChange = (value: any) => {
    setZoneStatusChanged(value);
  };
  const handleClientStatusChange = (value: any) => {
    setClientStatusChanged(value);
  };
  const handleClear = () => {
    setSelectedCustomerType(null);
    setSelectedCustomerPackage(null);
    setSelectedUsername(null);
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setZoneStatusChanged(null);
    setClientStatusChanged(null);
  };
  // console.log(error, isLoading, isError)

  const columns: ColumnsType<CustomerData> = [
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
      title: "Username",
      dataIndex: "username",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Client Status",
      dataIndex: "clientStatus",
      sorter: true,
      render: (clientStatus: any) => {
        return (
          <>
            {clientStatus === "Pending" ? (
              <Tag color="green">{clientStatus}</Tag>
            ) : clientStatus === "Rejected" ? (
              <Tag color="red">{clientStatus}</Tag>
            ) : (
              <Tag color="blue">{clientStatus}</Tag>
            )}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Zone Status",
      dataIndex: "zoneStatus",
      sorter: true,
      render: (zoneStatus: any) => {
        return (
          <>
            {zoneStatus === "Pending" ? (
              <Tag color="green">{zoneStatus}</Tag>
            ) : zoneStatus === "Rejected" ? (
              <Tag color="red">{zoneStatus}</Tag>
            ) : (
              <Tag color="blue">{zoneStatus}</Tag>
            )}
          </>
        );
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // Requested By
    {
      title: "Requested By",
      dataIndex: "partner.username",
      sorter: false,
      render: (_, row: any) => {
        if (!row.partner) return "-";
        return <>{row.partner.username}</>;
      },
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    // Requested User Type
    {
      title: "Requested User Type",
      dataIndex: "partner.partnerType",
      sorter: false,
      render: (_, row: any) => {
        if (!row.partner) return "-";
        return <>{row.partner.partnerType}</>;
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
      title: "Request Time",
      dataIndex: "createdOn",
      sorter: false,
      render: (createdOn: any) => {
        if (!createdOn) return "-";
        const date = new Date(createdOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      /* width: "20%", */
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
              {/* edit */}
              {authUser &&
                authUser.partnerId == record.partnerId &&
                record.clientStatus != "Approved" &&
                (ability.can("customerOnboardingReq.update", "") ? (
                  <Tooltip title="Edit" placement="bottomRight" color="magenta">
                    <Space size="middle" align="center" wrap>
                      <Link
                        href={`/admin/customer/customer-onboarding-req/${record.id}/edit`}
                      >
                        <Button type="primary" icon={<EditOutlined />} />
                      </Link>
                    </Space>
                  </Tooltip>
                ) : null)}
              {/* approve */}
              {authUser &&
                authUser.partnerId != record.partnerId &&
                ((record.zoneStatus == "Approved" &&
                  authUser.userType == "client" &&
                  record.clientStatus != "Rejected") ||
                  (record.zoneStatus == "Pending" &&
                    authUser.userType == "zone")) &&
                (ability.can("customerOnboardingReq.approve", "") ? (
                  <Tooltip
                    title="Approve"
                    placement="bottomRight"
                    color="green"
                  >
                    {authUser && authUser.userType == "zone" ? (
                      <Space size="middle" align="center" wrap>
                        <Button
                          type="primary"
                          icon={<CheckSquareOutlined />}
                          style={{
                            backgroundColor: "#0B666A",
                            color: "#ffffff"
                          }}
                          onClick={() => {
                            handleApprove(record.id);
                          }}
                        />
                      </Space>
                    ) : (
                      <Space size="middle" align="center" wrap>
                        <Link
                          href={`/admin/customer/customer-onboarding-req/${record.id}/approve`}
                        >
                          <Button
                            type="primary"
                            icon={<CheckSquareOutlined />}
                            style={{
                              backgroundColor: "#0B666A",
                              color: "#ffffff"
                            }}
                          />
                        </Link>
                      </Space>
                    )}
                  </Tooltip>
                ) : null)}
              {/* reject */}
              {authUser &&
                ((record.clientStatus == "Pending" &&
                  authUser.userType == "client") ||
                  (record.zoneStatus == "Pending" &&
                    authUser.userType == "zone")) &&
                (ability.can("customerOnboardingReq.reject", "") ? (
                  <Tooltip title="Reject" placement="bottomRight" color="red">
                    <Space size="middle" align="center" wrap>
                      <Link
                        href={`/admin/customer/customer-onboarding-req/${record.id}/reject`}
                      >
                        <Button
                          type="primary"
                          icon={<CloseSquareOutlined />}
                          style={{
                            backgroundColor: "#EA1179",
                            color: "#ffffff"
                          }}
                        />
                      </Link>
                    </Space>
                  </Tooltip>
                ) : null)}
              {/* reinitiate */}

              {authUser &&
                authUser.partnerId == record.partnerId &&
                (record.clientStatus == "Rejected" ||
                  record.zoneStatus == "Rejected") &&
                (ability.can("customerOnboardingReq.reinitiate", "") ? (
                  <Tooltip
                    title="ReInitiate"
                    placement="bottomRight"
                    color="blue"
                  >
                    {/* <Form
                      layout="vertical"
                      autoComplete="off"
                      onFinish={onSubmit}
                      form={form}
                      initialValues={{}}
                      style={{ maxWidth: "100%" }}
                      name="wrap"
                      colon={false}
                      scrollToFirstError
                    > */}
                    {/* <Form.Item> */}
                    <Space size="middle" align="center" wrap>
                      {/* <Link
                        href={`/admin/customer/customer-onboarding-req/${record.id}/reinitiate`}
                      > */}
                      <Button
                        // htmlType="submit"
                        type="primary"
                        icon={<IssuesCloseOutlined />}
                        style={{
                          backgroundColor: "#241468",
                          color: "#ffffff"
                        }}
                        onClick={() => {
                          handleReinitiate(record.id);
                        }}
                      />
                      {/* </Link> */}
                    </Space>
                    {/* </Form.Item> */}
                    {/* </Form> */}
                  </Tooltip>
                ) : null)}
              {/* view */}
              {ability.can("customerOnboardingReq.view", "") ? (
                <Tooltip title="Details" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap className="mx-1">
                    <Link
                      href={`/admin/customer/customer-onboarding-req/${record.id}`}
                    >
                      <Button type="primary" icon={<EyeOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}

              {/* cancel */}
              {authUser &&
                authUser.partnerId == record.partnerId &&
                record.clientStatus != "Approved" &&
                (ability.can("customerOnboardingReq.delete", "") ? (
                  <Tooltip
                    title="Delete"
                    placement="bottomRight"
                    color="magenta"
                  >
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
                ) : null)}
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
  // const onSubmit = async (values: any) => {
  //   const { id } = values;

  //   try {
  //     const response = await axios.put("/api/customer-request/re-initiate", { id });

  //     if (response.data.status === 200) {
  //       Swal.fire({
  //         title: "Success",
  //         text: response.data.message || "Added successfully",
  //         icon: "success"
  //       }).then(() => {

  //       });
  //     } else {
  //       Swal.fire({
  //         title: "Error",
  //         text: response.data.message || "Something went wrong",
  //         icon: "error"
  //       });
  //     }
  //   } catch (err: any) {
  //     const errorMessage = err.response?.data?.message || "Something went wrong";
  //     Swal.fire({
  //       title: "Error",
  //       text: errorMessage,
  //       icon: "error"
  //     });
  //     setShowError(true);
  //     setErrorMessages(errorMessage);
  //   }
  // };
  // const onSubmit = async (data: any) => {
  //   const formData = {
  //     id: d
  //   };

  //   try {
  //     await axios
  //       .put("/api/customer-request/re-initiate", formData)
  //       .then(res => {
  //         const { data } = res;

  //         if (data.status != 200) {
  //           MySwal.fire({
  //             title: "Error",
  //             text: data.message || "Something went wrong",
  //             icon: "error"
  //           });
  //         }

  //         if (data.status == 200) {
  //           MySwal.fire({
  //             title: "Success",
  //             text: data.message || "Reinitiated successfully",
  //             icon: "success"
  //           }).then(() => {
  //             router.replace(`/admin/customer/customer-onboarding-req`);
  //           });
  //         }
  //       })
  //       .catch(err => {
  //         MySwal.fire({
  //           title: "Error",
  //           text: err.response.data.message || "Something went wrong",
  //           icon: "error"
  //         });
  //         // setShowError(true);
  //         // setErrorMessages(err.response.data.message);
  //       });
  //   } catch (err: any) {
  //     // setShowError(true);
  //     // setErrorMessages(err.message);
  //   }
  // };

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
            title="Customers Request List"
            hasLink={true}
            addLink="/admin/customer/customer-onboarding-req/create"
            permission="customerOnboardingReq.create"
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
                    <Panel header="Customers Request Filters" key="1">
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
                              <b>Customer Types</b>
                            </span>
                            <Select
                              allowClear
                              style={{
                                width: "100%",
                                textAlign: "start"
                              }}
                              placeholder="Please select"
                              onChange={handleCustomerTypeChange}
                              options={customerTypes}
                              value={selectedCustomerType}
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
                              <b>Customer Package</b>
                            </span>
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={handleCustomerPackageChange}
                              options={customerPackages}
                              value={selectedCustomerPackage}
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
                            <Input
                              type="text"
                              className="ant-input"
                              placeholder="Username"
                              value={selectedUsername}
                              onChange={e => {
                                setSelectedUsername(e.target.value);
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
                              <b>Date Range</b>
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
                          <Space style={{ width: "100%" }} direction="vertical">
                            <span>
                              <b>Zone Status</b>
                            </span>
                            <Select
                              allowClear
                              style={{
                                width: "100%",
                                textAlign: "start"
                              }}
                              placeholder="Please select"
                              onChange={handleZoneStatusChange}
                              options={zoneStatus}
                              value={zoneStatusChanged}
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
                              <b>Client Status</b>
                            </span>
                            <Select
                              allowClear
                              style={{
                                width: "100%",
                                textAlign: "start"
                              }}
                              placeholder="Please select"
                              onChange={handleClientStatusChange}
                              options={clientStatus}
                              value={clientStatusChanged}
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

export default CustomerOnboardingReqList;
