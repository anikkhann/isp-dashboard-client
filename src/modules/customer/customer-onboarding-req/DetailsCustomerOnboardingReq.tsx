/* eslint-disable @typescript-eslint/no-explicit-any */

import DetailsCustomerRequestData from "@/components/details/customerRequest/DetailsCustomerRequestData";
import { CustomerData } from "@/interfaces/CustomerData";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DetailsCustomerOnboardingReq = ({ id }: any) => {
  const [item, SetItem] = useState<CustomerData | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/customer-request/get-by-id/${id}`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["customer-req-list", id],
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
      <AppRowContainer>
        <Breadcrumb
          style={{
            margin: "10px 30px",
            textAlign: "left"
          }}
          items={[
            {
              title: <Link href="/admin">Home</Link>
            },
            {
              title: <Link href="/admin/customer">Customer</Link>
            },
            {
              title: (
                <Link href="/admin/customer/customer-onboarding-req">
                  Details Customer Request
                </Link>
              )
            },
            {
              title: "Details Customer Onboarding Request"
            }
          ]}
        />
        <div
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            // border: "1px solid #F15F22",
            textAlign: "center"
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              color: "#F15F22"
            }}
          >
            Details Customer Onboarding Request
          </h1>
        </div>
        <Card
          // title="Edit Customer Request"
          style={{
            width: "90%",
            backgroundColor: "#ECF0F1",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem"
          }}
        >
          {isLoading && isFetching && <AppLoader />}

          {isError && <div>{error.message}</div>}

          {!isLoading && item && <DetailsCustomerRequestData item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default DetailsCustomerOnboardingReq;
