/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Collapse,
  Input,
  Row,
  Space,
  Tag,
  Tooltip
} from "antd";
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
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { IpSubnetData } from "@/interfaces/IpSubnetData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const NetworkList: React.FC = () => {
  const [data, setData] = useState<IpSubnetData[]>([]);
  const { Panel } = Collapse;
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [networkName, setNetworkName] = useState<any>(null);
  const [networkAddress, setNetworkAddress] = useState<any>(null);
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
    networkNameParam?: string,
    networkAddressParam?: string
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
        networkName: networkNameParam,
        networkAddress: networkAddressParam
        // SEND FIELD NAME WITH DATA TO SEARCH
      }
    };

    const { data } = await axios.post("/api/ip-subnet/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: [
      "ip-subnet-list",
      page,
      limit,
      order,
      sort,
      networkName,
      networkAddress
    ],
    queryFn: async () => {
      const response = await fetchData(
        page,
        limit,
        order,
        sort,
        networkName,
        networkAddress
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

  const handleClear = () => {
    setNetworkName(null);
    setNetworkAddress(null);
  };

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);
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
        const { data } = await axios.delete(`/api/ip-subnet/delete/${id}`);
        if (data.status == 200) {
          MySwal.fire("Deleted!", data.message, "success").then(() => {
            router.reload();
          });
        } else {
          console.log(data.message);
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
  const columns: ColumnsType<IpSubnetData> = [
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
      // width: "10%",
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Network Name",
      dataIndex: "networkName",
      sorter: true,
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Network Address",
      dataIndex: "networkAddress",
      sorter: true,
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Subnet Mask",
      dataIndex: "subnetMask",
      sorter: true,
      /* width: "20%", */
      ellipsis: true,
      width: "auto",
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
      /* width: "20%", */
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
      title: "Created At",
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
              {ability.can("network.update", "") ? (
                <Tooltip title="Edit" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link href={`/admin/device/network/${record.id}/edit`}>
                      <Button type="primary" icon={<EditOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
              {ability.can("network.view", "") ? (
                <Tooltip title="View" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap className="mx-1">
                    <Link href={`/admin/device/network/${record.id}`}>
                      <Button type="primary" icon={<EyeOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}
              {ability.can("network.view", "") ? (
                <Tooltip title="Delete" placement="bottomRight" color="green">
                  <Space size="middle" align="center" wrap>
                    <Button
                      type="primary"
                      icon={<DeleteOutlined />}
                      style={{
                        backgroundColor: "#EA1179",
                        color: "#ffffff"
                      }}
                      onClick={() => handleDelete(record.id)}
                    />
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
    sorter: SorterResult<IpSubnetData> | SorterResult<IpSubnetData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<IpSubnetData>).order) {
      // // console.log((sorter as SorterResult<IpSubnetData>).order)

      SetOrder(
        (sorter as SorterResult<IpSubnetData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<IpSubnetData>).field) {
      // // console.log((sorter as SorterResult<IpSubnetData>).field)

      SetSort((sorter as SorterResult<IpSubnetData>).field as string);
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
            title="Networks List"
            hasLink={true}
            addLink="/admin/device/network/create"
            permission="network.create"
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
                {/* <Button >Sort age</Button>
                <Button >Clear filters</Button>
                <Button >Clear filters and sorters</Button> */}
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
                        <Space style={{ width: "100%" }} direction="vertical">
                          <span>
                            <b>Network Name</b>
                          </span>
                          <Input
                            type="text"
                            className="ant-input"
                            placeholder="Network Name"
                            value={networkName}
                            onChange={e => setNetworkName(e.target.value)}
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
                        <Space style={{ width: "100%" }} direction="vertical">
                          <span>
                            <b>Network Address</b>
                          </span>
                          <Input
                            type="text"
                            className="ant-input"
                            placeholder="Network Address"
                            value={networkAddress}
                            onChange={e => setNetworkAddress(e.target.value)}
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
                    </Row>
                  </Panel>
                </Collapse>
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

export default NetworkList;
