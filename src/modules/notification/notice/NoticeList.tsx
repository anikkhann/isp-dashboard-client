/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Space, Tag } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlignType } from "rc-table/lib/interface";
import axios from "axios";
import ability from "@/services/guard/ability";
import Link from "next/link";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { NoticeBoardData } from "@/interfaces/NoticeBoardData";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const NoticeList: React.FC = () => {
  const [data, setData] = useState<NoticeBoardData[]>([]);

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
      },
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        // "noticeType": "true", // dropdown - (for_all, client_specific, zone_manager_specific, sub_zone_manager_specific, retailer_specific package_specific, customer_specific)
        // "isActive": true, // (true, false)
        // "client": {"id": "d303dbd3-87bf-4fb6-8b4d-7997e1722d73"}, // dropdown - Partner -> Client list API
        // "zoneManager": {"id": "9a1978fe-7de0-4912-b7d2-a70f3fe8c3b1"}, // dropdown - Partner -> ZoneManager list API
        // "subZoneManager": {"id": "9a1978fe-7de0-4912-b7d2-a70f3fe8c3b1"}, // dropdown - Partner -> subZoneManager list API
        // "retailer": {"id": "9a1978fe-7de0-4912-b7d2-a70f3fe8c3b1"}, // dropdown - Partner -> Retailer list API
        // "customerPackage": {"id": "9a1978fe-7de0-4912-b7d2-a70f3fe8c3b1"}, // dropdown - Customer Package list API
        // "customer": {"id": "9a1978fe-7de0-4912-b7d2-a70f3fe8c3b1"}, // dropdown - Customer list API
        // "dateRangeFilter": {"field": "endDate", "startDate": "2023-07-20", "endDate": "2023-10-20"}
      }
    };

    const { data } = await axios.post("/api/notice-board/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["notice-board-list", page, limit, order, sort],
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

  const columns: ColumnsType<NoticeBoardData> = [
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
      title: "noticeType",
      dataIndex: "noticeType",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "message",
      dataIndex: "message",
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
    {
      title: "Action",
      dataIndex: "action",
      sorter: false,
      render: (text: any, record: any) => {
        return (
          <>
            <Space size="middle" align="center">
              {ability.can("smsGateway.update", "") ? (
                <Tooltip title="Edit" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link href={`/admin/notification/notice/${record.id}/edit`}>
                      <Button type="primary" icon={<EditOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
              ) : null}

              {ability.can("smsGateway.view", "") ? (
                <Tooltip title="view" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link href={`/admin/notification/notice/${record.id}`}>
                      <Button type="primary" icon={<EyeOutlined />} />
                    </Link>
                  </Space>
                </Tooltip>
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
    sorter: SorterResult<NoticeBoardData> | SorterResult<NoticeBoardData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<NoticeBoardData>).order) {
      // // console.log((sorter as SorterResult<NoticeBoardData>).order)

      SetOrder(
        (sorter as SorterResult<NoticeBoardData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<NoticeBoardData>).field) {
      // // console.log((sorter as SorterResult<NoticeBoardData>).field)

      SetSort((sorter as SorterResult<NoticeBoardData>).field as string);
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
            title="Notice Board List"
            hasLink={true}
            addLink="/admin/notification/notice/create"
            permission="smsGateway.create"
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto",
              backgroundColor: "#d5dfe6"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* <Space style={{ marginBottom: 16 }}>
                <Button >Sort age</Button>
                <Button >Clear filters</Button>
                <Button >Clear filters and sorters</Button>
              </Space> */}
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

export default NoticeList;
