/* eslint-disable @typescript-eslint/no-explicit-any */
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Row, Space, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import type { ColumnsType } from "antd/es/table";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

import { format } from "date-fns";
import { CSVLink } from "react-csv";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const OnlineCustomerList = () => {
  const [data, setData] = useState<any[]>([]);
  const MySwal = withReactContent(Swal);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const downloadRef = useRef<any>(null);
  const [downloadRow, setDownloadRow] = useState<any[]>([]);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(`/api/dashboard/online-customer-list`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["dashboard-get-online-customer-list"],
    queryFn: async () => {
      const response = await fetchData();
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);

        if (data.body) {
          setData(data.body);
        } else {
          setData([]);
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

  const columns: ColumnsType<any> = [
    {
      title: "Serial",
      dataIndex: "id",
      render: (tableParams, row, index) => {
        return (
          <>
            <Space>{index + 1}</Space>
          </>
        );
      },
      sorter: false,
      width: "10%",
      align: "center" as AlignType
    },
    {
      title: "Customer",
      dataIndex: "customer",
      sorter: false,
      render: (customer: any) => {
        if (!customer) return "-";
        return <>{customer}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },

    {
      title: "IP",
      dataIndex: "ip",
      sorter: false,
      render: (ip: any) => {
        if (!ip) return "-";
        return <>{ip}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "MAC",
      dataIndex: "mac",
      sorter: false,
      render: (mac: any) => {
        if (!mac) return "-";
        return <>{mac}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "NAS",
      dataIndex: "nas",
      sorter: false,
      render: (nas: any) => {
        if (!nas) return "-";
        return <>{nas}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Session Start Time",
      dataIndex: "session_start_time",
      sorter: false,
      render: (session_start_time: any) => {
        if (!session_start_time) return "-";
        const date = new Date(session_start_time);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      width: 200,
      align: "center" as AlignType
    },
    {
      title: "Online Time",
      dataIndex: "duration_min",
      sorter: false,
      render: (duration_min: any) => {
        if (!duration_min) return "-";
        return <>{duration_min} Min</>;
        // return <>{format(date, "yyyy-MM-dd pp")}</>;
      },
      width: 200,
      align: "center" as AlignType
    }
  ];

  const handleDownload = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // const body = {
    //   meta: {
    //     // limit: 10,
    //     // page: 1,
    //     sort: [
    //       {
    //         order: "desc",
    //         field: "trxDate"
    //       }
    //     ]
    //   },
    //   body: {
    //     userType: "zone",
    //     userId: selectUser,
    //     transactionId: transactionId,
    //     trxMode: selectedTransactionMode,
    //     trxType: selectedTransactionType,
    //     trxBy: selectedTransactionBy,
    //     dateRangeFilter: {
    //       field: "trxDate",
    //       startDate: selectedStartDate,
    //       endDate: selectedEndDate
    //     }
    //   }
    // };

    await axios
      .get(`/api/dashboard/online-customer-list`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        // console.log(res);
        const { data } = res;
        console.log(data.body);
        if (data.status != 200) {
          MySwal.fire({
            title: "Error",
            text: data.message || "Something went wrong",
            icon: "error"
          });
        }

        if (!data.body) return;

        const list = data.body.map((item: any) => {
          const session = new Date(item.session_start_time);
          // const duration = new Date(item.duration_min);
          // const durationHours = Math.floor(item.duration_min / 60);
          // const durationMinutes = item.duration_min % 60;
          // const formattedDuration = `${durationHours}h ${durationMinutes}m`;
          // const duration = item.duration_min;
          // const durationHours = Math.floor(duration / 60);
          // const durationMinutes = duration % 60;
          // const formattedDuration = `${durationHours}:${durationMinutes.toString().padStart(2, "0")}:00 ${durationHours >= 12 ? "PM" : "AM"}`;
          return {
            Customer: item.customer,
            IP: item.ip,
            MAC: item.mac,
            Nas: item.nas,
            "Session Start Time": format(session, "yyyy-MM-dd pp"),
            "Online Time": item.duration_min
          };
        });

        setDownloadRow([
          // {
          //   ZoneManager: "Zone Manager",
          //   TRXType: "TRX Type",
          //   TrxMode: "Trx Mode",
          //   TransactionId: "Transaction Id",
          //   Amount: "Amount",
          //   Balance: "Balance",
          //   Remarks: "Remarks",
          //   TrxBy: "Trx By",
          //   TrxDate: "Trx Date"
          // },
          ...list
        ]);
      });
  };

  useEffect(() => {
    if (downloadRow && downloadRow.length > 0) {
      setDownloadRow(downloadRow);

      if (downloadRef.current) {
        downloadRef.current.link.click();
      }
      setDownloadLoading(false);
    }
  }, [downloadRow]);

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
            addLink=""
            permission=""
            style={{
              // backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto",
              backgroundColor: "#d5dfe6"
            }}
          >
            {/* {ability.can("customerImportCsv.download", "") && ( */}
            <Row justify={"end"}>
              <Col span={3}>
                <Button
                  type="primary"
                  onClick={() => {
                    setDownloadLoading(true);
                    handleDownload();
                  }}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "25px",
                    backgroundColor: "#F15F22",
                    color: "#ffffff"
                  }}
                >
                  {downloadLoading ? "Loading..." : "Download"}
                </Button>

                <CSVLink
                  data={downloadRow}
                  ref={downloadRef}
                  target="_blank"
                  filename={`online-customer-list-${dayjs().format(
                    "YYYY-MM-DD"
                  )}.csv`}
                  style={{
                    display: "none"
                  }}
                ></CSVLink>
              </Col>
            </Row>
            {/* )} */}
            <Space direction="vertical" style={{ width: "100%" }}>
              <TableCard
                title="Online Customer List"
                hasLink={false}
                addLink=""
                permission=""
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  width: "100%",
                  overflowX: "auto",
                  backgroundColor: "#ffffff"
                }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  {/* {data && data.length != 0 && ( */}
                  <Table
                    className={"table-striped-rows"}
                    columns={columns}
                    rowKey={record => record.client}
                    dataSource={data}
                    loading={isLoading || isFetching}
                  />
                  {/* )} */}
                </Space>
              </TableCard>
            </Space>
          </TableCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default OnlineCustomerList;
