/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Space, Tag } from "antd";
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
import { EditOutlined } from "@ant-design/icons";
import ability from "@/services/guard/ability";
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

const CustomerOnboardingReqList: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

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
    sort: string
  ) => {
    const token = Cookies.get("token");
    // // console.log('token', token)
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
      }
    };

    const { data } = await axios.post("/api/distribution-zone/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["users-list", page, limit, order, sort],
    queryFn: async () => {
      const response = await fetchData(page, limit, order, sort);
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

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  // console.log(error, isLoading, isError)

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
      title: "name",
      dataIndex: "name",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "username",
      dataIndex: "username",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "phone",
      dataIndex: "phone",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "email",
      dataIndex: "email",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "userRoles",
      dataIndex: "userRoles",
      sorter: true,
      render: (userRoles: any) => {
        return (
          <>
            {userRoles.map((item: any, index: number) => (
              <Tag color="blue" key={index}>
                {item && item.role && item.role.name}
              </Tag>
            ))}
          </>
        );
      },
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
    {
      title: "Action",
      dataIndex: "action",
      sorter: false,
      render: (text: any, record: any) => {
        return (
          <>
            <Space size="middle" align="center">
              {ability.can("user.update", "") ? (
                <Space size="middle" align="center" wrap>
                  <Link href={`/admin/user/user/${record.id}/edit`}>
                    <Button type="primary" icon={<EditOutlined />} />
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
            title="Users List"
            hasLink={true}
            addLink="/admin/user/user/create"
            permission="user.create"
            style={{
              // backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* <Space style={{ marginBottom: 16 }}>
                <Button >Sort age</Button>
                <Button >Clear filters</Button>
                <Button >Clear filters and sorters</Button>
              </Space> */}
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

export default CustomerOnboardingReqList;
