/* eslint-disable @typescript-eslint/no-explicit-any */
import DetailsSubscriptionData from "@/components/details/subscription/DetailsSubscriptionData";
import { SubscriptionData } from "@/interfaces/SubscriptionData";

import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DetailsSubscription = ({ id }: any) => {
  const [item, SetItem] = useState<SubscriptionData | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/subscription-plan/get-by-id/${id}`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["subscriptions-list", id],
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
              title: <Link href="/admin/client">Client</Link>
            },
            {
              title: (
                <Link href="/admin/client/subscription">Subscriptions</Link>
              )
            },
            {
              title: "Details Subscription"
            }
          ]}
        />

        <Card
          title="Details Subscription"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          {isLoading && isFetching && <AppLoader />}

          {isError && <div>{error.message}</div>}

          {!isLoading && item && <DetailsSubscriptionData item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default DetailsSubscription;
