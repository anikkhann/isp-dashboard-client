import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "@/lib/AppLoader";
import { FaUsers } from "react-icons/fa";

interface Data {
  total_commission: number;
  offline_commission: number;
  online_commission: number;
}
const LastMonthRevenue = () => {
  const [item, SetItem] = useState<Data | null>(null);
  //   console.log(item);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api/dashboard/get-my-revenue-last-month`
    );
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["last-month-revenue-dashboard-count"],
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
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
          className="gutter-row"
        >
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
              title="Total Commission"
              value={item?.total_commission}
              // precision={2}
              valueStyle={{ color: "#0e8fdc" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
          className="gutter-row"
        >
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
              title="Online Commission"
              value={item?.online_commission}
              // precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
          className="gutter-row"
        >
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
              title="Offline Commission"
              value={item?.offline_commission}
              // precision={2}
              valueStyle={{ color: "red" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
              // suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LastMonthRevenue;
