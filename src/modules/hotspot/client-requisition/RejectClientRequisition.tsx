/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ClientRequisitionData } from "@/interfaces/ClientRequisitionData";
// import { DurjoyRequisitionData } from "@/interfaces/DurjoyRequisitionData";
// import RejectDurjoyRequisitionForm from "@/components/forms/durjoy-requisition/RejectDurjoyRequisitionForm";
import RejectClientRequisitionForm from "@/components/forms/client-requisition/RejectClientRequisitionForm";

const RejectClientRequisition = ({ id }: any) => {
  const [item, SetItem] = useState<ClientRequisitionData | null>(null);
  console.log("req", item);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api-hotspot/zone-card-requisition/get-by-id/${id}`
    );
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["client-card-requisition-list", id],
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    onSuccess(data: any) {
      console.log("reqaa", data.body);
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
              title: <Link href="/admin/hotspot">Hotspot Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/hotspot/durjoy-requisition">
                  Durjoy Requisition
                </Link>
              )
            },
            {
              title: "Reject Durjoy Requisition"
            }
          ]}
        />
        <div
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",

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
            Reject Durjoy Requisition
          </h1>
        </div>

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
            border: "1px solid #F15F22"
          }}
        >
          {isLoading && isFetching && <AppLoader />}

          {isError && <div>{error.message}</div>}

          {!isLoading && item && <RejectClientRequisitionForm item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default RejectClientRequisition;
