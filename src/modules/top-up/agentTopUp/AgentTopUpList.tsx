/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Select, Space } from "antd";
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
import { EyeOutlined } from "@ant-design/icons";
import { AgentTopUpData } from "@/interfaces/AgentTopUpData";
import { format } from "date-fns";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const AgentTopUpList: React.FC = () => {
  const [data, setData] = useState<AgentTopUpData[]>([]);

  const [page, SetPage] = useState(0);
  const [limit, SetLimit] = useState(10);
  const [order, SetOrder] = useState("asc");
  const [sort, SetSort] = useState("id");

  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

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
    agentId?: string
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
        agent: {
          id: agentId
        }
      }
    };

    const { data } = await axios.post("/api/agent-topup/get-list", body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["agent-top-up-list", page, limit, order, sort, selectedAgent],
    queryFn: async () => {
      const response = await fetchData(page, limit, order, sort, selectedAgent);
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

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedAgent(value as any);
  };

  const handleClear = () => {
    setSelectedAgent(null);
  };

  async function getUsers() {
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
      body: {}
    };
    const res = await axios.post("/api/users/get-list", body);
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setAgents(items);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const columns: ColumnsType<AgentTopUpData> = [
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
      title: "Agent",
      dataIndex: "agent",
      sorter: false,
      render: (agent: any) => {
        return <>{agent ? agent.name : "N/A"}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    /*  {
       title: "Serial No",
       dataIndex: "serialNo",
       sorter: true,
       render: (serialNo: any) => {
         return <>{serialNo ? serialNo : "N/A"}</>;
       },
       width: "20%",
       align: "center" as AlignType
     }, */
    {
      title: "Type",
      dataIndex: "type",
      sorter: false,
      render: (type: any) => {
        return <>{type ? type : "N/A"}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: true,
      width: "20%",
      align: "center" as AlignType
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      sorter: false,
      render: (remarks: any) => {
        return <>{remarks ? remarks : "N/A"}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },

    // rechargedBy
    {
      title: "Recharged By",
      dataIndex: "rechargedBy",
      sorter: false,
      render: (rechargedBy: any) => {
        if (!rechargedBy) return "-";
        return <>{rechargedBy.name}</>;
      },
      width: "20%",
      align: "center" as AlignType
    },
    // createdOn
    {
      title: "Recharged At",
      dataIndex: "rechargedDate",
      sorter: false,
      render: (rechargedDate: any) => {
        if (!rechargedDate) return "-";
        const date = new Date(rechargedDate);
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
              {ability.can("agentTopUp.view", "") ? (
                <Space size="middle" align="center" wrap className="mx-1">
                  <Link href={`/admin/top-up/agent-top-up/${record.id}`}>
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
    sorter: SorterResult<AgentTopUpData> | SorterResult<AgentTopUpData>[]
  ) => {
    SetPage(pagination.current as number);
    SetLimit(pagination.pageSize as number);

    if (sorter && (sorter as SorterResult<AgentTopUpData>).order) {
      // // console.log((sorter as SorterResult<AgentTopUpData>).order)

      SetOrder(
        (sorter as SorterResult<AgentTopUpData>).order === "ascend"
          ? "asc"
          : "desc"
      );
    }
    if (sorter && (sorter as SorterResult<AgentTopUpData>).field) {
      // // console.log((sorter as SorterResult<AgentTopUpData>).field)

      SetSort((sorter as SorterResult<AgentTopUpData>).field as string);
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
            title="Agent Top up List"
            hasLink={true}
            addLink="/admin/top-up/agent-top-up/create"
            permission="agentTopUp.create"
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto"
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* search */}
              <Space style={{ marginBottom: 16 }}>
                <Space style={{ width: "100%" }} direction="vertical">
                  <span>
                    <b>Agent</b>
                  </span>
                  <Select
                    allowClear
                    style={{
                      width: "100%",
                      textAlign: "start"
                    }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={agents}
                    value={selectedAgent}
                    showSearch
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

export default AgentTopUpList;
