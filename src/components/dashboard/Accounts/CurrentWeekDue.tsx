/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "@/lib/AppLoader";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";

interface Data {
  total_payable_customer: number;
  total_paid_customer: number;
  total_unpaid_customer: number;
  total_unpaid_amount: number;
}
const CurrentWeekDue = () => {
  const [item, SetItem] = useState<Data | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/dashboard/current-week-due-summary`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["current-week-due-summary"],
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

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
          className="gutter-row"
        >
          <Link href={`/admin/customer/customer`}>
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
                title="Total Payable Customer"
                value={item?.total_payable_customer || 0}
                // precision={2}
                valueStyle={{ color: "#0e8fdc" }}
                prefix={<FaUsers className="w-7 h-6 mr-3 " />}
                // suffix="%"
              />
            </Card>
          </Link>
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
          <Link href={`/admin/customer/customer`}>
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
                title="Total Paid Customer"
                value={item?.total_paid_customer || 0}
                // precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<FaUsers className="w-7 h-6 mr-3 " />}
                // suffix="%"
              />
            </Card>
          </Link>
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
          <Link href={`/admin/accounting/week-unpaid`}>
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
                title="Total Unpaid Customer"
                value={item?.total_unpaid_customer || 0}
                // precision={2}
                valueStyle={{ color: "red" }}
                prefix={<FaUsers className="w-7 h-6 mr-3 " />}
                // suffix="%"
              />
            </Card>
          </Link>
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
          <Link href={`/admin/accounting/week-unpaid`}>
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
                title="Total Unpaid Amount"
                value={item?.total_unpaid_amount || 0}
                // precision={2}
                valueStyle={{ color: "red" }}
                prefix={<FaUsers className="w-7 h-6 mr-3 " />}
                // suffix="%"
              />
            </Card>
          </Link>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
          className="gutter-row"
        ></Col>
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
          className="gutter-row"
        ></Col>
      </Row>
    </>
  );
};

export default CurrentWeekDue;
