/* eslint-disable @typescript-eslint/no-explicit-any */

import EditUserForm from "@/components/forms/user/EditUserForm";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import Forbidden from "@/modules/errorPage/Forbidden";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface DataType {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  roles: object[];
  base: {
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
  };
}

const EditSubscription = ({ id }: any) => {
  const [unauthorized, setUnauthorized] = useState(false);

  const [item, SetItem] = useState<DataType | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    // console.log('token', token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(`/api/v1/admins/${id}`);
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["admin-list", id],
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    onSuccess(data: any) {
      if (data) {
        console.log("data", data.user);

        SetItem(data.user);
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    // console.log('data -b', data)
    if (item) {
      // console.log('data', data)
      SetItem(item);
    }
  }, [item]);

  useEffect(() => {
    if (id == 1) {
      setUnauthorized(true);
    }
  }, [id]);

  return (
    <>
      {unauthorized ? (
        <>
          <Forbidden />
        </>
      ) : (
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
                title: <Link href="/admin/settings/admin">Admins</Link>
              },
              {
                title: "Edit Admin"
              }
            ]}
          />

          <Card
            title="Edit Admin"
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

            {!isLoading && !unauthorized && item && (
              <EditUserForm item={item} />
            )}
          </Card>
        </AppRowContainer>
      )}
    </>
  );
};

export default EditSubscription;
