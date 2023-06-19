/* eslint-disable @typescript-eslint/no-explicit-any */

import EditRoleForm from "@/components/forms/role/EditRoleForm";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ItemType {
  id: number;
  name: string;
  slug: string;
  base: {
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
  };
  permissions: object[];
}

const EditRole = ({ id }: any) => {
  const [item, SetItem] = useState<ItemType | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    // console.log('token', token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(`/api/v1/roles/${id}`);
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["role-list", id],
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    onSuccess(data: any) {
      if (data) {
        console.log("data", data);

        SetItem(data);
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
              title: <Link href="/admin/settings">Settings</Link>
            },
            {
              title: <Link href="/admin/settings/role">Roles</Link>
            },
            {
              title: "Edit Role"
            }
          ]}
        />

        <Card
          title="Edit Role"
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

          {!isLoading && item && <EditRoleForm item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default EditRole;
