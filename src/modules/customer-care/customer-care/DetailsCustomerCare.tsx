/* eslint-disable @typescript-eslint/no-explicit-any */

// import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import {
  // Alert,
  Breadcrumb,
  Button,
  Card,
  Space,
  Tabs
} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ability from "@/services/guard/ability";
import Customer from "@/components/details/customerCare/Customer";
import SessionHistory from "@/components/details/customerCare/SessionHistory";
import TransactionHistory from "@/components/details/customerCare/TransactionHistory";
import TicketHistory from "@/components/details/customerCare/TicketHistory";
import ActivityLog from "@/components/details/customerCare/ActivityLog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { CustomerData } from "@/interfaces/CustomerData";
import AppLoader from "@/lib/AppLoader";

interface TabData {
  key: string;
  label: string;
  children: React.ReactNode;
  permission?: string;
}

const DetailsCustomerCare = ({ id }: any) => {
  const [item, SetItem] = useState<CustomerData | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/customer/get-by-id/${id}`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["customer-list", id],
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

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabData[] = [
    {
      key: "1",
      label: `Customer`,
      children: <>{item && <Customer item={item} />}</>,
      permission: "customerCare.list"
    },
    {
      key: "2",
      label: `Session History`,
      children: <>{item && <SessionHistory item={item} />}</>,
      permission: "customerCare.list"
    },
    {
      key: "3",
      label: `Transaction History`,
      children: <>{item && <TransactionHistory item={item} />}</>,
      permission: "customerCare.list"
    },
    {
      key: "4",
      label: `Ticket History`,
      children: <>{item && <TicketHistory item={item} />}</>,
      permission: "customerCare.list"
    },
    {
      key: "5",
      label: `Activity Log`,
      children: <>{item && <ActivityLog item={item} />}</>,
      permission: "customerCare.list"
    }
  ];

  const filterItems = items.filter((item: any) => {
    if (item.permission) {
      return ability.can(item.permission, "");
    }
    return true;
  });

  return (
    <>
      {isLoading && isFetching && <AppLoader />}
      {isError && <div>{error.message}</div>}
      <AppRowContainer>
        <Breadcrumb
          style={{
            margin: "10px 30px",
            textAlign: "left",
            width: "100%"
          }}
          items={[
            {
              title: <Link href="/admin">Home</Link>
            },
            {
              title: <Link href="/admin/customer-care">Customer Care</Link>
            },
            {
              title: "Details Customer Care"
            }
          ]}
        />

        <div
          style={{
            margin: "10px 40px",
            textAlign: "left",
            display: "flex",
            justifyContent: "right",
            width: "100%"
          }}
        >
          <Space direction="vertical">
            <Space wrap>
              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#EA1179",
                  color: "#ffffff"
                }}
                className="btn btn-primary hover:bg-accent"
              >
                <Link href="/admin/complaint/customer-ticket/create">
                  Create Ticket
                </Link>
              </Button>

              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#241468",
                  color: "#ffffff"
                }}
              >
                SAF Verification
              </Button>

              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#0B666A",
                  color: "#ffffff"
                }}
              >
                Live Bandwidth
              </Button>

              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#F94A29",
                  color: "#ffffff"
                }}
              >
                Disconnect
              </Button>
              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#35A29F",
                  color: "#ffffff"
                }}
              >
                Top Up
              </Button>

              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#D61355",
                  color: "#ffffff"
                }}
              >
                Renew
              </Button>
            </Space>
          </Space>
        </div>

        <Card
          title="Customer Care"
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "3rem",
            marginBottom: "3rem"
          }}
        >
          <Tabs
            onChange={onChange}
            type="card"
            defaultActiveKey={filterItems[0].key}
            items={filterItems}
          />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default DetailsCustomerCare;
