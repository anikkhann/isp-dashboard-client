/* eslint-disable @typescript-eslint/no-explicit-any */
import DetailsZoneData from "@/components/details/zone/DetailsZoneData";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DetailsZoneInCharge = ({ id }: any) => {
  const [item, SetItem] = useState<any | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    // // console.log('token', token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/partner/get-by-id/${id}`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["zones-list", id],
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
              title: <Link href="/admin/zone">Zone Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/zone/zone-in-charge">Zone in Charge</Link>
              )
            },
            {
              title: "Details Zone in Charge"
            }
          ]}
        />

        <Card
          title="Details Zone In Charge"
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
          {isLoading && isFetching && <AppLoader />}

          {isError && <div>{error.message}</div>}

          {!isLoading && item && <DetailsZoneData item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default DetailsZoneInCharge;
