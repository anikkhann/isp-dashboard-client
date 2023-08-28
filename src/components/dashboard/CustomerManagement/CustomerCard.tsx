import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "@/lib/AppLoader";
import { FaUsers } from "react-icons/fa";

interface Data {
  total_customer: number;
  active_customer: number;
  registered_customer: number;
  expired_customer: number;
}
const CustomerCard = () => {
  const [item, SetItem] = useState<Data | null>(null);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api/dashboard/get-total-customer-admin-wise`
    );
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["dashboard-get-total-customer-admin-wise"],
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

      <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }} justify="space-between">
        <Col
          xs={24}
          sm={24}
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
              title="Total Customers"
              value={item?.total_customer}
              // precision={2}
              valueStyle={{ color: "#0e8fdc" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
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
              title="Active Customers"
              value={item?.active_customer ? item?.active_customer : 0}
              // precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
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
              title="Registered Customers"
              value={item?.registered_customer ? item?.registered_customer : 0}
              // precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<FaUsers className="w-7 h-6 mr-3 " />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
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
              title="Expired Customers"
              value={item?.expired_customer ? item?.expired_customer : 0}
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

export default CustomerCard;
