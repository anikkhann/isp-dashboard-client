/* eslint-disable @typescript-eslint/no-explicit-any */

import EditSubZoneForm from "@/components/forms/sub-zone/EditSubZoneForm";
import { UserData } from "@/interfaces/UserData";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EditSubZoneInCharge = ({ id }: any) => {
  const [item, SetItem] = useState<UserData | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/partner/get-by-id/${id}`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["sub-zone-list", id],
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
              title: <Link href="/admin/sub-zone">Sub Zone Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/sub-zone/sub-zone-in-charge">
                  Sub Zone In Charge
                </Link>
              )
            },
            {
              title: "Edit Sub Zone In Charge"
            }
          ]}
        />

        <Card
          title="Edit Sub Zone In Charge"
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

          {!isLoading && item && <EditSubZoneForm item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default EditSubZoneInCharge;
