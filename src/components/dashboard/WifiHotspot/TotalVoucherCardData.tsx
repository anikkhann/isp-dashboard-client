/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

import {
  Card,
  Col,
  Row,
  Statistic,
  DatePicker,
  Space,
  Select,
  Collapse,
  Button,
  Typography
} from "antd";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "@/lib/AppLoader";
import { FaUsers } from "react-icons/fa";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";

interface Data {
  total_activated: number;
  voucher: number;
  online: number;
}

const totalVoucherType = [
  {
    label: "Today",
    value: "today"
  },

  {
    label: "Current Month",
    value: "current_month"
  },
  {
    label: "Custom",
    value: "custom"
  }
];
const TotalVoucherCardData = () => {
  const [data, setData] = useState<Data | null>(null);
  //   const MySwal = withReactContent(Swal);
  const { Panel } = Collapse;
  //   const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
  //     null
  //   );
  //   const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);
  const { RangePicker } = DatePicker;
  const [selectedTotalVoucherType, setSelectedTotalVoucherType] =
    useState<string>(totalVoucherType[0].value);
  const [activeKey, setActiveKey] = useState<string | string[]>(["1"]);
  const [isDateTouched, setIsDateTouched] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setSelectedTotalVoucherType(value);
  };
  const fetchData = async (
    selectedTotalVoucherParam?: string,
    startDateParam?: string,
    endDateParam?: string
  ) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // let date = null;
    // if (startDateParam && endDateParam) {
    //   date = `${startDateParam} to ${endDateParam}`;
    // }

    const { data } = await axios.get(
      `/api-hotspot/dashboard/total-voucher-usages-summary?reportType=${selectedTotalVoucherParam}&startDate=${startDateParam}&endDate=${endDateParam}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<string, any>({
    queryKey: [
      "total-voucher-data",
      selectedTotalVoucherType,
      selectedStartDate,
      selectedEndDate
    ],
    queryFn: async () => {
      const response = await fetchData(
        selectedTotalVoucherType,
        selectedStartDate,
        selectedEndDate
      );
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);

        // if (data.status == 500) {
        //   MySwal.fire({
        //     title: "Error!",
        //     text: data.message ? data.message : "Something went wrong",
        //     icon: "error",
        //     confirmButtonText: "Ok"
        //   });
        // }

        if (data.body) {
          setData(data.body);
        } else {
          setData(null);
        }
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  const handleDateChange = (value: any) => {
    // console.log(value);

    if (value) {
      setSelectedDateRange(value);

      const startDate = dayjs(value[0]).format(dateFormat);
      const endDate = dayjs(value[1]).format(dateFormat);

      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
      setIsDateTouched(true);

      // console.log(startDate, endDate);
    } else {
      setSelectedDateRange(null);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  };

  const handleClear = () => {
    setSelectedDateRange(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    // setSelectedTotalVoucherType(null);
  };

  const handleCollapseChange = (key: string | string[]) => {
    setActiveKey(key);
  };
  //   const fetchData = async (
  //     startDate: string | null,
  //     endDate: string | null
  //   ) => {
  //     const token = Cookies.get("token");
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //     const params = new URLSearchParams();
  //     if (startDate) params.append("startDate", startDate);
  //     if (endDate) params.append("endDate", endDate);

  //     const { data } = await axios.get(
  //       `/api-hotspot/dashboard/total-voucher-usages-summary?reportType=${params.toString()}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
  //     return data;
  //   };

  //   const { isLoading, isError, error, isFetching, refetch } = useQuery<
  //     Data,
  //     any
  //   >({
  //     queryKey: ["total-voucher-data", selectedStartDate, selectedEndDate],
  //     queryFn: () => fetchData(selectedStartDate, selectedEndDate),
  //     onSuccess: data => {
  //       setData(data);
  //     },
  //     onError: error => {
  //       console.error("Error fetching data:", error);
  //       setData(null);
  //     },
  //     enabled: false // Disable automatic refetching
  //   });

  //   const handleStartDateChange = (value: any) => {
  //     setSelectedStartDate(value ? value.format(dateFormat) : null);
  //   };

  //   const handleEndDateChange = (value: any) => {
  //     setSelectedEndDate(value ? value.format(dateFormat) : null);
  //   };

  //   useEffect(() => {
  //     if (selectedStartDate && selectedEndDate) {
  //       refetch();
  //     }
  //   }, [selectedStartDate, selectedEndDate, refetch]);

  return (
    <>
      {isLoading && isFetching && <AppLoader />}
      {isError && <div>{(error as Error).message}</div>}

      <Space direction="vertical" style={{ width: "100%" }}>
        <h2 className="p-5 font-bold text-[#F15F22]">Voucher :</h2>
        <Space style={{ marginBottom: 16 }}>
          <div style={{ padding: "20px", backgroundColor: "white" }}>
            <Collapse
              accordion
              activeKey={activeKey}
              onChange={handleCollapseChange}
              style={{
                backgroundColor: "#FFC857",
                color: "white",
                borderRadius: 4,
                // marginBottom: 24,
                // border: 0,
                width: "100%",
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
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    className="gutter-row"
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <span>
                        <b style={{ color: "red" }}>*</b> <b>Voucher Type</b>
                      </span>
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select"
                        onChange={handleChange}
                        options={totalVoucherType}
                        value={selectedTotalVoucherType}
                      />
                      {!selectedTotalVoucherType && (
                        <Typography.Text type="danger">
                          Voucher Type is required
                        </Typography.Text>
                      )}
                    </Space>
                  </Col>
                  {selectedTotalVoucherType == "custom" && (
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      className="gutter-row"
                    >
                      <Space style={{ width: "100%" }} direction="vertical">
                        <span>
                          <b style={{ color: "red" }}>*</b> <b>Date</b>
                        </span>
                        <RangePicker
                          style={{ width: "100%" }}
                          onChange={handleDateChange}
                          value={selectedDateRange}
                          placeholder={["Start Date", "End Date"]}
                        />
                        {isDateTouched && !selectedDateRange && (
                          <Typography.Text type="danger">
                            Date is required
                          </Typography.Text>
                        )}
                      </Space>
                    </Col>
                  )}
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    xxl={24}
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
          </div>
        </Space>
      </Space>

      <Row gutter={16}>
        <Col lg={12} span={24}>
          <Card
            hoverable
            style={{
              width: "90%",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
              border: "2px solid #F15F22"
            }}
          >
            <Statistic
              title="Total Activated"
              value={data?.total_activated}
              valueStyle={{ color: "#0e8fdc" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
            />
          </Card>
        </Col>
        <Col lg={12} span={24}>
          <Card
            hoverable
            style={{
              width: "90%",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
              border: "2px solid #F15F22"
            }}
          >
            <Statistic
              title="Voucher"
              value={data?.voucher}
              valueStyle={{ color: "#3f8600" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
            />
          </Card>
        </Col>
        <Col lg={12} span={24}>
          <Card
            hoverable
            style={{
              width: "90%",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
              border: "2px solid #F15F22"
            }}
          >
            <Statistic
              title="Online"
              value={data?.online}
              valueStyle={{ color: "#3f8600" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TotalVoucherCardData;
