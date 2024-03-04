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
  active_customer?: number;
  expired_customer?: number;
  registered_customer?: number;
  total_customer?: number;
}
// interface onlineCustomerData {
//   total_online?: number;
// }

const CustomerCard = () => {
  const [item, SetItem] = useState<Data | null>(null);

  const [onlineCustomer, setOnlineCustomer] = useState<any[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api/dashboard/get-total-customer-admin-wise`
    );

    return response;
  };

  const {
    isLoading: isLoadingTotalCustomer,
    isError: isErrorTotalCustomer,
    error: errorTotalCustomer,
    isFetching: isFetchingTotalCustomer
  } = useQuery<boolean, any>({
    queryKey: ["dashboard-get-total-customer-admin-wise"],
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    onSuccess(data: any) {
      if (data) {
        SetItem(data.body);
        console.log("total", data.body);
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

  //get online customer data

  const fetchCustomerData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/dashboard/online-customer-total`);
    return response;
  };

  const {
    isLoading: isLoadingOnlineCustomer,
    isError: isErrorOnlineCustomer,
    error: errorOnlineCustomer,
    isFetching: isFetchingOnlineCustomer
  } = useQuery<boolean, any>({
    queryKey: ["dashboard-online-customer-total"],
    queryFn: async () => {
      const { data } = await fetchCustomerData();
      return data;
    },
    onSuccess(data: any) {
      if (data) {
        setOnlineCustomer(data.body);
        console.log("online", data.body);
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    if (onlineCustomer) {
      setOnlineCustomer(onlineCustomer);
    }
  }, [onlineCustomer]);

  useEffect(() => {
    fetchData();
    fetchCustomerData();
  }, []);

  return (
    <>
      {/* {isLoading && isFetching && <AppLoader />}

      {isError && <div>{error.message}</div>} */}
      {(isLoadingTotalCustomer ||
        isFetchingTotalCustomer ||
        isLoadingOnlineCustomer ||
        isFetchingOnlineCustomer) && <AppLoader />}

      {isErrorTotalCustomer && <div>{errorTotalCustomer.message}</div>}
      {isErrorOnlineCustomer && <div>{errorOnlineCustomer.message}</div>}

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
                title="Total Customers"
                value={item?.total_customer}
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
          sm={24}
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
                title="Active Customers"
                value={item?.active_customer ? item?.active_customer : 0}
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
          sm={24}
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
                title="Registered Customers"
                value={
                  item?.registered_customer ? item?.registered_customer : 0
                }
                // precision={2}
                valueStyle={{ color: "#5F5D9C" }}
                prefix={<FaUsers className="w-7 h-6 mr-3 " />}
                // suffix="%"
              />
            </Card>
          </Link>
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
                title="Expired Customers"
                value={item?.expired_customer ? item?.expired_customer : 0}
                // precision={2}
                valueStyle={{ color: "#B80000" }}
                prefix={<FaUsers className="w-7 h-6 mr-3 " />}
                // suffix="%"
              />
            </Card>
          </Link>
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
          <Link href={`/admin/customer/online-customer-list`}>
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
                title="Total Online"
                value={
                  // onlineCustomer?.total_online ? onlineCustomer?.total_online : 0
                  onlineCustomer?.length > 0
                    ? onlineCustomer[0]?.total_online
                    : 0
                }
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
          sm={24}
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

export default CustomerCard;
