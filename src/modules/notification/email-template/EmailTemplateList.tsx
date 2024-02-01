/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Space } from "antd";
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
import { EditOutlined } from "@ant-design/icons";
import { EmailTemplateData } from "@/interfaces/EmailTemplateData";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const EmailTemplateList: React.FC = () => {
  const [data, setData] = useState<EmailTemplateData[]>([]);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("website");

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

    const { data } = await axios.post(
      "/api/email-template-settings/get-list",
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
    queryKey: ["email-template-list", page, limit, order, sort],
    queryFn: async () => {
      const response = await fetchData(page, limit, order, sort);
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        console.log("data.data", data);

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

  const columns: ColumnsType<EmailTemplateData> = [
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
      title: "Brand Of",
      dataIndex: "brandOf",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Phone",
      dataIndex: "phone",
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
      title: "Website",
      dataIndex: "website",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "CC",
      dataIndex: "cc",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "BCC",
      dataIndex: "bcc",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Support Number",
      dataIndex: "supportNumber",
      sorter: true,
      render: (supportNumber: any) => {
        return <>{supportNumber}</>;
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
              {ability.can("emailTemplate.update", "") ? (
                <Tooltip title="Edit" placement="bottomRight" color="magenta">
                  <Space size="middle" align="center" wrap>
                    <Link
                      href={`/admin/notification/email/email-template/${record.id}/edit`}
                    >
                      <Button type="primary" icon={<EditOutlined />} />
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
    sorter: SorterResult<EmailTemplateData> | SorterResult<EmailTemplateData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<EmailTemplateData>).order) {
      // // console.log((sorter as SorterResult<EmailTemplateData>).order)

      SetOrder(
        (sorter as SorterResult<EmailTemplateData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<EmailTemplateData>).field) {
      // // console.log((sorter as SorterResult<EmailTemplateData>).field)

      SetSort((sorter as SorterResult<EmailTemplateData>).field as string);
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
            title="Email Template List"
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

export default EmailTemplateList;
