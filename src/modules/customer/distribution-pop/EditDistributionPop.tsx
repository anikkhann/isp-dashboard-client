/* eslint-disable @typescript-eslint/no-explicit-any */

import EditDistributionPopForm from "@/components/forms/distribution-pop/EditDistributionPopForm";
import { DistributionPopData } from "@/interfaces/DistributionPopData";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EditDistributionPop = ({ id }: any) => {
  const [item, SetItem] = useState<DistributionPopData | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/distribution-pop/get-by-id/${id}`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["distribution-pop-list", id],
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
              title: <Link href="/admin/customer">Customer Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/customer/distribution-pop">
                  Distribution Pop
                </Link>
              )
            },
            {
              title: "Edit Distribution Pop"
            }
          ]}
        />

        <Card
          title="Edit Distribution Pop"
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

          {!isLoading && item && <EditDistributionPopForm item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default EditDistributionPop;
