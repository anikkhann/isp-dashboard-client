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
import ability from "@/services/guard/ability";
import Link from "next/link";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { ClientData } from "@/interfaces/ClientData";
import { format } from "date-fns";

const tagsList = [
  {
    label: "Tri Cycle",
    value: "tri_cycle"
  },
  {
    label: "Quad Cycle",
    value: "quad_cycle"
  }
];

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const ClientList: React.FC = () => {
  const [data, setData] = useState<ClientData[]>([]);

  const [clientLevel, setClientLevel] = useState<any>(null);

  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const [divisions, setDivisions] = useState<any[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<any>(null);

  const [districts, setDistricts] = useState<any[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  const [upazillas, setUpazillas] = useState<any[]>([]);
  const [selectedUpazilla, setSelectedUpazilla] = useState<any>(null);

  const [unions, setUnions] = useState<any[]>([]);
  const [selectedUnion, setSelectedUnion] = useState<any>(null);

  const [licenseTypes, setLicenseTypes] = useState<any[]>([]);
  const [selectedLicenseType, setSelectedLicenseType] = useState<any>(null);

  const [contactNumber, setContactNumber] = useState<any>(null);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

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
    clientLevelParam?: string,
    selectedClientParam?: string,
    selectedDivisionParam?: string,
    selectedDistrictParam?: string,
    selectedUpazillaParam?: string,
    selectedUnionParam?: string,
    selectedLicenseTypeParam?: string,
    contactNumberParam?: string
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
        partnerType: "client",
        clientLevel: clientLevelParam,

        // SEND FIELD NAME WITH DATA TO SEARCH
        id: selectedClientParam,
        contactNumber: contactNumberParam,
        licenseType: {
          id: selectedLicenseTypeParam
        },
        division: {
          id: selectedDivisionParam
        },
        district: {
          id: selectedDistrictParam
        },

        upazilla: {
          id: selectedUpazillaParam
        },

        union: {
          id: selectedUnionParam
        }
      }
    };

    const { data } = await axios.post("/api/partner/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "clients-list",
      page,
      limit,
      order,
      sort,
      clientLevel,
      selectedClient,
      selectedDivision,
      selectedDistrict,
      selectedUpazilla,
      selectedUnion,
      selectedLicenseType,
      contactNumber
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        clientLevel,
        selectedClient,
        selectedDivision,
        selectedDistrict,
        selectedUpazilla,
        selectedUnion,
        selectedLicenseType,
        contactNumber
      );
      return response;
    },
    onSuccess(data: any) {
      if (data) {
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

  const handleClear = () => {
    setSelectedClient(null);
    setSelectedDivision(null);
    setSelectedDistrict(null);
    setSelectedUpazilla(null);
    setSelectedUnion(null);
    setSelectedLicenseType(null);
    setClientLevel(null);
    setContactNumber(null);
  };

  const handleChange = (value: string) => {
    console.log("checked = ", value);
    setClientLevel(value);
  };

  const handleDivisionChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedDivision(value as any);
  };

  const handleDistrictChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedDistrict(value as any);
  };

  const handleClientChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedClient(value as any);
  };

  const handleUpazillaChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedUpazilla(value as any);
  };

  const handleUnionChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedUnion(value as any);
  };

  const handleLicenseTypeChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedLicenseType(value as any);
  };

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
        partnerType: "client"
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

      setClients(list);
    });
  }

  function getDivisions() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      }
    };
    axios.post("/api/division/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setDivisions(list);
    });
  }

  // function getDistricts(selectedDivision: string) {
  function getDistricts() {
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
        // division: { id: selectedDivision }
      }
    };

    axios.post("/api/district/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setDistricts(list);
    });
  }

  // function getUpazillas(selectedDistrict: string) {
  function getUpazillas() {
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
        // district: { id: selectedDistrict }
      }
    };

    axios.post("/api/upazilla/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setUpazillas(list);
    });
  }

  // function getUnions(selectedUpazilla: string) {
  function getUnions() {
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
        // upazilla: { id: selectedUpazilla }
      }
    };

    axios.post("/api/union/get-list", body).then(res => {
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setUnions(list);
    });
  }

  function getLicenseTypes() {
    axios
      .get("/api/lookup-details/get-by-master-key/license_type")
      .then(res => {
        const { data } = res;
        const list = data.body.map((item: any) => {
          return {
            label: item.name,
            value: item.id
          };
        });
        setLicenseTypes(list);
      });
  }

  useEffect(() => {
    getClients();
    getDivisions();
    getDistricts();
    getUpazillas();
    getUnions();
    getLicenseTypes();
  }, []);

  const columns: ColumnsType<ClientData> = [
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
      width: 140,
      align: "center" as AlignType
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: 500,
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
      title: "Contact Person",
      dataIndex: "contactPerson",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      sorter: true,
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
      title: "Address",
      dataIndex: "address",
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
    {
      title: "Created By",
      dataIndex: "insertedBy",
      sorter: false,
      render: (insertedBy: any) => {
        if (!insertedBy) return "-";
        return <>{insertedBy.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
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
    {
      title: "Updated By",
      dataIndex: "editedBy",
      sorter: false,
      render: (editedBy: any) => {
        if (!editedBy) return "-";
        return <>{editedBy.name}</>;
      },

      width: "20%",
      align: "center" as AlignType
    },
    // updatedOn
    {
      title: "Updated At",
      dataIndex: "updatedOn",
      sorter: false,
      render: (updatedOn: any) => {
        if (!updatedOn) return "-";
        const date = new Date(updatedOn);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Action",
      dataIndex: "action",
      sorter: false,
      render: (text: any, record: any) => {
        return (
          <>
            <Space size="middle" align="center">
              {ability.can("client.update", "") ? (
                <Space size="middle" align="center" wrap>
                  <Link href={`/admin/client/client/${record.id}/edit`}>
                    <Button type="primary" icon={<EditOutlined />} />
                  </Link>
                </Space>
              ) : null}
            </Space>
            <Space size="middle" align="center">
              {ability.can("client.view", "") ? (
                <Space size="middle" align="center" wrap>
                  <Link href={`/admin/client/client/${record.id}`}>
                    <Button type="primary" icon={<EyeOutlined />} />
                  </Link>
                </Space>
              ) : null}
            </Space>
          </>
        );
      },
      align: "center" as AlignType
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ClientData> | SorterResult<ClientData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<ClientData>).order) {
      // // console.log((sorter as SorterResult<ClientData>).order)

      SetOrder(
        (sorter as SorterResult<ClientData>).order === "ascend" ? "asc" : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<ClientData>).field) {
      // // console.log((sorter as SorterResult<ClientData>).field)

      SetSort((sorter as SorterResult<ClientData>).field as string);
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
            title="Clients List"
            hasLink={true}
            addLink="/admin/client/client/create"
            permission="client.create"
            style={{
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
                    <b>Client Level</b>
                  </span>
                  <Select
                    allowClear
                    style={{
                      width: "100%",
                      textAlign: "start"
                    }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={tagsList}
                    value={clientLevel}
                  />
                </Space>

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
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>License Type</b>
                  </span>
                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleLicenseTypeChange}
                    options={licenseTypes}
                    value={selectedLicenseType}
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Division</b>
                  </span>

                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleDivisionChange}
                    options={divisions}
                    value={selectedDivision}
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>District</b>
                  </span>

                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleDistrictChange}
                    options={districts}
                    value={selectedDistrict}
                  />
                </Space>
                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Upazilla</b>
                  </span>
                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleUpazillaChange}
                    options={upazillas}
                    value={selectedUpazilla}
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Union</b>
                  </span>
                  <Select
                    allowClear
                    showSearch
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleUnionChange}
                    options={unions}
                    value={selectedUnion}
                  />
                </Space>

                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Contact Number</b>
                  </span>
                  <Input
                    type="text"
                    className="ant-input"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)}
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

export default ClientList;
