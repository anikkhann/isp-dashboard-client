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

const WeekUnpaid = () => {
  const [data, setData] = useState<any[]>([]);
  const MySwal = withReactContent(Swal);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const downloadRef = useRef<any>(null);
  const [downloadRow, setDownloadRow] = useState<any[]>([]);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/dashboard/current-week-due-details`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["current-week-due-details"],
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
      title: "User Name",
      dataIndex: "username",
      sorter: false,
      render: (username: any) => {
        if (!username) return "-";
        return <>{username}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },

    {
      title: "Mobile No",
      dataIndex: "mobile_no",
      sorter: false,
      render: (mobile_no: any) => {
        if (!mobile_no) return "-";
        return <>{mobile_no}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Alt Mobile No",
      dataIndex: "alt_mobile_no",
      sorter: false,
      render: (alt_mobile_no: any) => {
        if (!alt_mobile_no) return "-";
        return <>{alt_mobile_no}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: false,
      render: (email: any) => {
        if (!email) return "-";
        return <>{email}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Zone Manager",
      dataIndex: "zone_manager",
      sorter: false,
      render: (zone_manager: any) => {
        if (!zone_manager) return "-";
        return <>{zone_manager}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "SubZone Manager",
      dataIndex: "sub_zone_manager",
      sorter: false,
      render: (sub_zone_manager: any) => {
        if (!sub_zone_manager) return "-";
        return <>{sub_zone_manager}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Retailer",
      dataIndex: "retailer",
      sorter: false,
      render: (retailer: any) => {
        if (!retailer) return "-";
        return <>{retailer}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Connection Address",
      dataIndex: "connection_address",
      sorter: false,
      render: (connection_address: any) => {
        if (!connection_address) return "-";
        return <>{connection_address}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Credits",
      dataIndex: "credits",
      sorter: false,
      render: (credits: any) => {
        if (!credits) return "-";
        return <>{credits}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Package",
      dataIndex: "packagename",
      sorter: false,
      render: (packagename: any) => {
        if (!packagename) return "-";
        return <>{packagename}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Package Price",
      dataIndex: "package_price",
      sorter: false,
      render: (package_price: any) => {
        if (!package_price) return "-";
        return <>{package_price}</>;
      },
      /* width: "20%", */
      align: "center" as AlignType
    },
    {
      title: "Expiration Time",
      dataIndex: "expiration_time",
      sorter: false,
      render: (expiration_time: any) => {
        if (!expiration_time) return "-";
        const date = new Date(expiration_time);
        return <>{format(date, "yyyy-MM-dd pp")}</>;
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
      .get(`/api/dashboard/current-week-due-details`, {
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
          const expiration = new Date(item.expiration_time);

          return {
            Username: item.username,
            "Mobile No": item.mobile_no,
            "Alt Mobile No": item.alt_mobile_no,
            Email: item.email,
            "Zone Manager": item.zone_manager,
            "SubZone Manager": item.sub_zone_manager,
            Retailer: item.retailer,
            "Connection Address": item.connection_address,
            Credits: item.credits,
            Package: item.packagename,
            "Package Price": item.package_price,
            "Expiration Time": format(expiration, "yyyy-MM-dd pp")
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
                  filename={`current-week-due-list-${dayjs().format(
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
                title=""
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

export default WeekUnpaid;
