/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Input, Select, Space, Tag } from "antd";
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
import Link from "next/link";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import ability from "@/services/guard/ability";
import { CustomerData } from "@/interfaces/CustomerData";
import { format } from "date-fns";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const CustomerList: React.FC = () => {
  const [data, setData] = useState<CustomerData[]>([]);

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

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });

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
    mobileParam?: string
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
      selectedMobile
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
        selectedMobile
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

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setZones(list);
    });
  }

  function getSubZoneManagers() {
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
        partnerType: "sub_zone",
        isActive: true
      }
    };

    axios.post("/api/partner/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

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
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setDistributionZones(list);
    });
  }

  function getDistributionPops() {
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

    axios.post("/api/distribution-pop/get-list", body).then(res => {
      const { data } = res;

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
        isActive: true
      }
    };
    axios.post("/api/customer/get-list", body).then(res => {
      const { data } = res;
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
    setSelectedZone(value);
  };

  const handleSubZoneChange = (value: any) => {
    setSelectedSubZone(value);
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
  };

  useEffect(() => {
    getZoneManagers();
    getSubZoneManagers();
    getRetailers();
    getDistributionZones();
    getDistributionPops();
    getCustomerPackages();
    getCustomers();
  }, []);

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
      title: "Name",
      dataIndex: "name",
      sorter: true,
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
                <Space size="middle" align="center" wrap>
                  <Link href={`/admin/customer/customer/${record.id}/edit`}>
                    <Button type="primary" icon={<EditOutlined />} />
                  </Link>
                </Space>
              ) : null}
              {ability.can("customer.view", "") ? (
                <Space size="middle" align="center" wrap className="mx-1">
                  <Link href={`/admin/customer/customer/${record.id}`}>
                    <Button type="primary" icon={<EyeOutlined />} />
                  </Link>
                </Space>
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
              overflowX: "auto"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Space style={{ marginBottom: 16 }}>
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
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Username</b>
                  </span>
                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleUsernameChange}
                    options={customers}
                    value={selectedCustomer}
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Distribution Zone</b>
                  </span>
                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleDistributionZoneChange}
                    options={distributionZones}
                    value={selectedDistributionZone}
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Distribution Pop</b>
                  </span>

                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleDistributionPopChange}
                    options={distributionPops}
                    value={selectedDistributionPop}
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Package</b>
                  </span>

                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handlePackageChange}
                    options={packages}
                    value={selectedPackage}
                  />
                </Space>
                <Space style={{ width: "100%" }} direction="vertical">
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

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Sub Zone</b>
                  </span>
                  <Select
                    allowClear
                    showSearch
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleSubZoneChange}
                    options={subZones}
                    value={selectedSubZone}
                  />
                </Space>
                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Retailer</b>
                  </span>
                  <Select
                    allowClear
                    showSearch
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleRetailerChange}
                    options={retailers}
                    value={selectedRetailer}
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
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

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Mobile</b>
                  </span>
                  <Input
                    type="text"
                    className="ant-input"
                    placeholder="Mobile"
                    value={selectedMobile}
                    onChange={e => setSelectedMobile(e.target.value)}
                  />
                </Space>

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
              </Space>

              <Table
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
