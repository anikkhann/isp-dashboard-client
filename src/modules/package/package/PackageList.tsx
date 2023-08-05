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
import ability from "@/services/guard/ability";
import Link from "next/link";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { PackageData } from "@/interfaces/PackageData";
import { format } from "date-fns";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const PackageList: React.FC = () => {
  const [data, setData] = useState<PackageData[]>([]);

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
      }
    };

    const { data } = await axios.post("/api/customer-package/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["packages-list", page, limit, order, sort],
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

  const columns: ColumnsType<PackageData> = [
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
      title: "Partner",
      dataIndex: "partner",
      sorter: false,
      render: (text, record) => {
        return (
          <>
            <Space>{record.partner.name}</Space>
          </>
        );
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Package Name",
      dataIndex: "displayName",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Upload/Download Limit",
      dataIndex: "uploadLimit",
      sorter: false,
      render: (text, record) => {
        return (
          <>
            <Space>
              {record.uploadLimit}
              {record.uploadLimitUnit}/{record.downloadLimit}
              {record.downloadLimitUnit}
            </Space>
          </>
        );
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Validity",
      dataIndex: "validity",
      render: (text, record) => {
        return (
          <>
            <Space>{record.validity} Days</Space>
          </>
        );
      },
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },

    {
      title: "Price",
      dataIndex: "totalPrice",
      render: (text, record) => {
        return (
          <>
            <Space>{record.totalPrice} BDT</Space>
          </>
        );
      },
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
              {ability.can("package.update", "") ? (
                <Space size="middle" align="center" wrap>
                  <Link href={`/admin/package/package/${record.id}/edit`}>
                    <Button type="primary" icon={<EditOutlined />} />
                  </Link>
                </Space>
              ) : null}

              {ability.can("package.view", "") ? (
                <Space size="middle" align="center" wrap>
                  <Link href={`/admin/package/package/${record.id}`}>
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
    sorter: SorterResult<PackageData> | SorterResult<PackageData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<PackageData>).order) {
      // // console.log((sorter as SorterResult<PackageData>).order)

      SetOrder(
        (sorter as SorterResult<PackageData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<PackageData>).field) {
      // // console.log((sorter as SorterResult<PackageData>).field)

      SetSort((sorter as SorterResult<PackageData>).field as string);
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
            title="Packages List"
            hasLink={true}
            addLink="/admin/package/package/create"
            permission="package.create"
            style={{
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

export default PackageList;
