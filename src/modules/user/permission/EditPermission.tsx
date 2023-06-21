/* eslint-disable @typescript-eslint/no-explicit-any */
import EditPermissionForm from "@/components/forms/permission/EditPermissionForm";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface DataType {
  createdOn: number;
  updatedOn: number;
  id: string;
  displayName: string;
  tag: string;
  actionTags: string[];
}

const EditPermission = ({ id }: any) => {
  const [item, SetItem] = useState<DataType | null>(null);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(`/api/permission/get-by-id/${id}`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["permissions-list", id],
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    enabled: !!id,
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
              title: <Link href="/admin/user">User</Link>
            },
            {
              title: <Link href="/admin/user/permission">Permission</Link>
            },
            {
              title: "Edit Permission"
            }
          ]}
        />

        <Card
          title="Edit Permission"
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

          {!isLoading && item && <EditPermissionForm item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default EditPermission;
