/* eslint-disable @typescript-eslint/no-explicit-any */

import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { RetailerRevenueDisbursement } from "@/interfaces/RetailerRevenueDisbursement";

import DetailsRetailerRevenueDisbursementData from "@/components/details/retailer-revenue-disbursement/DetailsRetailerRevenueDisbursementData";

const DetailsRetailerRevenueDisbursement = ({ id }: any) => {
  const [item, SetItem] = useState<RetailerRevenueDisbursement | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api/retailer-revenue-disbursement/get-by-id/${id}`
    );
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["retailer-revenue-disbursement-list", id],
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
              title: <Link href="/admin/accounting">Accounting</Link>
            },
            {
              title: (
                <Link href="/admin/accounting/retailer-revenue-disbursement">
                  Retailer Revenue Disbursement
                </Link>
              )
            },
            {
              title: "Retailer Revenue Disbursement"
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
            Retailer Revenue Disbursement
          </h1>
        </div>
        <Card
          // title="Edit Subscription"
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "1rem"
            // border: "1px solid #F15F22"
          }}
        >
          {isLoading && isFetching && <AppLoader />}

          {isError && <div>{error.message}</div>}

          {!isLoading && item && (
            <DetailsRetailerRevenueDisbursementData item={item} />
          )}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default DetailsRetailerRevenueDisbursement;
