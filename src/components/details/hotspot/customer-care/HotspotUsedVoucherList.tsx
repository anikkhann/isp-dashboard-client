/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Space } from "antd";
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
import { format } from "date-fns";
import { VoucherAndPackageData } from "@/interfaces/VoucherAndPackageData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { format } from "date-fns";
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

interface PropData {
  item: any | null;
}

const HotspotUsedVoucherList = ({ item }: PropData) => {
  const [data, setData] = useState<VoucherAndPackageData[]>([]);
  const MySwal = withReactContent(Swal);
  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("desc");
  const [sort, SetSort] = useState("createdOn");

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

    // const body = {
    //   meta: {
    //     limit: limit,
    //     page: page === 0 ? 0 : page - 1,
    //     sort: [
    //       {
    //         order: order,
    //         field: sort
    //       }
    //     ]
    //   },
    //   // body: {
    //   //   // SEND FIELD NAME WITH DATA TO SEARCH
    //   //   clientCustomer: {
    //   //     id: item.id
    //   //   }
    //   // }
    // };

    const { data } = await axios.get(
      `/api-hotspot/partner-customer/voucher-and-package-purchase-history?id=${item.id}`,
      {
        params: {
          page,
          limit,
          order,
          sort
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["voucher-archive-list", page, limit, order, sort],
    queryFn: async () => {
      const response = await fetchData(page, limit, order, sort);
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);

        if (data.status == 500) {
          MySwal.fire({
            title: "Error!",
            text: data.message ? data.message : "Something went wrong",
            icon: "error",
            confirmButtonText: "Ok"
          });
        }

        if (data.body) {
          setData(data.body);
          setTableParams({
            pagination: {
              total: data.body.length,
              // total: data.meta.totalRecords,
              // pageSize: data.meta.limit,
              // current: (data.meta.page as number) + 1,
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

  const columns: ColumnsType<VoucherAndPackageData> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return <>{page !== 0 ? index + 1 + (page - 1) * limit : index + 1}</>;
      },
      sorter: true,
      ellipsis: false,
      width: "auto",
      align: "center" as AlignType
    },
    // subject
    {
      title: "Voucher",
      dataIndex: "voucher_number",
      sorter: false,
      render: (voucher_number: any) => {
        if (!voucher_number) return "-";
        return <>{voucher_number}</>;
      },
      /* width: "20%", */
      ellipsis: false,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Package",
      dataIndex: "package_name",
      sorter: false,
      render: (package_name: any) => {
        if (!package_name) return "-";
        return <>{package_name}</>;
      },
      /* width: "20%", */
      ellipsis: false,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Reference Number",
      dataIndex: "reference_number",
      sorter: false,
      render: (reference_number: any) => {
        if (!reference_number) return "-";
        return <>{reference_number}</>;
      },
      /* width: "20%", */
      ellipsis: false,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Used IP",
      dataIndex: "used_ip",
      sorter: false,
      render: (used_ip: any) => {
        if (!used_ip) return "-";
        return <>{used_ip}</>;
      },
      /* width: "20%", */
      ellipsis: false,
      width: "auto",
      align: "center" as AlignType
    },

    {
      title: "Used Mac",
      dataIndex: "used_mac",
      sorter: false,
      render: (used_mac: any) => {
        if (!used_mac) return "-";
        return <>{used_mac}</>;
      },
      /* width: "20%", */
      ellipsis: false,
      width: "auto",
      align: "center" as AlignType
    },
    {
      title: "Activated At",
      dataIndex: "created_on",
      sorter: false,
      render: (created_on: any) => {
        if (!created_on) return "-";
        const date = new Date(created_on);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      /* width: "20%", */
      ellipsis: false,
      width: "auto",
      align: "center" as AlignType
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<VoucherAndPackageData>
      | SorterResult<VoucherAndPackageData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<VoucherAndPackageData>).order) {
      SetOrder(
        (sorter as SorterResult<VoucherAndPackageData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<VoucherAndPackageData>).field) {
      SetSort((sorter as SorterResult<VoucherAndPackageData>).field as string);
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
            title=""
            hasLink={false}
            addLink="/admin/device/ip-management/create"
            permission="ip.create"
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto",
              backgroundColor: "#ffffff"
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

export default HotspotUsedVoucherList;
