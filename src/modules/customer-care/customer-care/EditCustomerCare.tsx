/* eslint-disable @typescript-eslint/no-explicit-any */

import EditCustomerCareForm from "@/components/forms/care/EditCustomerCareForm";
// import EditCustomerForm from "@/components/forms/customer/EditCustomerForm";
import { CustomerData } from "@/interfaces/CustomerData";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EditCustomerCare = ({ id }: any) => {
  const [item, SetItem] = useState<CustomerData | null>(null);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/customer/get-by-id/${id}`);

    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["customer-list", id],
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
              title: <Link href="/admin/customer-care">customer care</Link>
            },
            // {
            //   title: (
            //     <Link href="/admin/customer-care/customer-care">
            //       edit customer care
            //     </Link>
            //   )
            // },
            {
              title: "Edit customer care"
            }
          ]}
        />
        <div
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            // border: "1px solid #F15F22",
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
            Edit Customer Care
          </h1>
        </div>
        {/* <Card
          title="Edit customer"
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

          {!isLoading && item && <EditCustomerForm item={item} />}

        </Card> */}
        {isLoading && isFetching && <AppLoader />}

        {isError && <div>{error.message}</div>}

        {!isLoading && item && <EditCustomerCareForm item={item} />}
      </AppRowContainer>
    </>
  );
};

export default EditCustomerCare;
