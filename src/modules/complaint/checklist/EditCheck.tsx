/* eslint-disable @typescript-eslint/no-explicit-any */

import EditChecklistForm from "@/components/forms/checklist/EditChecklistForm";
import { ChecklistData } from "@/interfaces/ChecklistData";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EditCheck = ({ id }: any) => {
  const [item, SetItem] = useState<ChecklistData | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/checklist/get-by-id/${id}`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["checklist-list", id],
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
              title: <Link href="/admin/complain">Complain Dashboard</Link>
            },
            {
              title: <Link href="/admin/complain/checklist">Checklist</Link>
            },
            {
              title: "Edit Checklist"
            }
          ]}
        />

        <Card
          title="Edit Checklist"
          style={{
            width: "80%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          {isLoading && isFetching && <AppLoader />}

          {isError && <div>{error.message}</div>}

          {!isLoading && item && <EditChecklistForm item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default EditCheck;
