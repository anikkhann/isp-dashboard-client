/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "@/lib/AppLoader";
import { FaUsers } from "react-icons/fa";

interface Data {
  total_client: number;
  active_client: number;
}
const ZoneRevenueData = () => {
  const [item, SetItem] = useState<Data | null>(null);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api/revenue/get-zone-commission-list?filterType=current_month&zoneId=null&dateRange=null`
    );
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["zone-revenue-dashboard-count"],
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    onSuccess(data: any) {
      if (data) {
        SetItem(data.body);
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    if (item) {
      SetItem(item);
    }
  }, [item]);

  return (
    <>
      {isLoading && isFetching && <AppLoader />}

      {isError && <div>{error.message}</div>}

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
              title="Total Clients"
              value={item?.total_client}
              // precision={2}
              valueStyle={{ color: "#0e8fdc" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col lg={12} span={24}>
          <Card
            // bordered={false}
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
              style={{ backgroundColor: "#ffffff !important" }}
              title="Active Clients"
              value={item?.active_client}
              // precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
              // suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ZoneRevenueData;
