/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Input, Space, Tag, Row } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table, Collapse, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import ability from "@/services/guard/ability";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { format } from "date-fns";
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

const RoleList: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const { Panel } = Collapse;
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [name, setName] = useState<any>(null);

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
    nameParam?: string
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
        name: nameParam
      }
    };

    const { data } = await axios.post("/api/role/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["roles-list", page, limit, order, sort, name],
    queryFn: async () => {
      const response = await fetchData(page, limit, order, sort, name);
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
    // // console.log('data -b', data)
    if (data) {
      // // console.log('data', data)
      setData(data);
    }
  }, [data]);

  const handleClear = () => {
    setName(null);
  };

  const columns: ColumnsType<DataType> = [
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
      width: "10%",
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
              {ability.can("role.update", "") ? (
                <Tooltip title="Edit" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link href={`/admin/user/role/${record.id}/edit`}>
                      <Button type="primary" icon={<EditOutlined />} />
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
            title="Roles List"
            hasLink={true}
            addLink="/admin/user/role/create"
            permission="role.create"
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
                    <Panel header="Roles Filters" key="1">
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
                              <b>Name</b>
                            </span>
                            <Input
                              value={name}
                              placeholder="Name"
                              onChange={e => {
                                setName(e.target.value);
                              }}
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

export default RoleList;
