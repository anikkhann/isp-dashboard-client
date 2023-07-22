/* eslint-disable @typescript-eslint/no-explicit-any */

import EditUserForm from "@/components/forms/user/EditUserForm";
import { UserData } from "@/interfaces/UserData";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EditCustomerOnboardingReq = ({ id }: any) => {
  const [item, SetItem] = useState<UserData | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    // // console.log('token', token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/users/get-by-id/${id}`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["users-list", id],
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
    // // console.log('data -b', data)
    if (item) {
      // // console.log('data', data)
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
              title: <Link href="/admin/user/user">Users</Link>
            },
            {
              title: "Edit User"
            }
          ]}
        />

        <Card
          title="Edit User"
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

          {!isLoading && item && <EditUserForm item={item} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default EditCustomerOnboardingReq;
