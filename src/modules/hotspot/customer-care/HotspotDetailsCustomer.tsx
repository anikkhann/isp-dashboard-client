/* eslint-disable @typescript-eslint/no-explicit-any */

// import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import {
  // Alert,
  Breadcrumb,
  // Button,
  Card,
  Space,
  Tabs
} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ability from "@/services/guard/ability";
import TransactionHistory from "@/components/details/customerCare/TransactionHistory";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import AppLoader from "@/lib/AppLoader";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import HotspotUsedVoucherList from "@/components/details/hotspot/customer-care/HotspotUsedVoucherList";
import HotspotSessionHistory from "@/components/details/hotspot/customer-care/HotspotSessionHistory";
import { useRouter } from "next/router";
import HotspotConnectionStatus from "@/components/details/hotspot/customer-care/HotspotConnectionStatus";

interface TabData {
  key: string;
  label: string;
  children: React.ReactNode;
  permission?: string;
}

const HotspotDetailsCustomer = ({ id }: any) => {
  const [item, SetItem] = useState<any>(null);

  const [data, setData] = useState<any[]>([]);

  // const MySwal = withReactContent(Swal);
  const router = useRouter();

  // async function handleDisconnect(username: string) {
  //   try {
  //     const result = await MySwal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#570DF8",
  //       cancelButtonColor: "#EB0808",
  //       confirmButtonText: "Yes, Disconnect customer!"
  //     });

  //     if (result.isConfirmed) {
  //       const { data } = await axios.get(
  //         `/api-hotspot/partner-customer/disconnect-user/${username}`
  //       );
  //       if (data.status === 200) {
  //         MySwal.fire("Success!", data.message, "success").then(() => {
  //           router.reload();
  //         });
  //       } else {
  //         MySwal.fire("Error!", data.message, "error");
  //       }
  //     } else if (result.isDismissed) {
  //       MySwal.fire("Cancelled", "Your Data is safe :)", "error");
  //     }
  //   } catch (error: any) {
  //     // console.log(error);
  //     if (error.response) {
  //       MySwal.fire("Error!", error.response.data.message, "error");
  //     } else {
  //       MySwal.fire("Error!", "Something went wrong", "error");
  //     }
  //   }
  // }

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api-hotspot/partner-customer/get-by-id/${id}`
    );
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["partner-customer-list", id],
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

  const items: TabData[] = [
    {
      key: "1",
      label: `Connection Status`,
      children: <>{item && <HotspotConnectionStatus item={item} />}</>,
      permission: "HotspotCustomerCare.list"
    },
    {
      key: "2",
      label: `Used Voucher`,
      children: <>{item && <HotspotUsedVoucherList item={item} />}</>,
      permission: "HotspotCustomerCare.list"
    },

    {
      key: "3",
      label: `Session History`,
      children: <>{item && <HotspotSessionHistory item={item} />}</>,
      permission: "HotspotCustomerCare.list"
    },
    {
      key: "4",
      label: `Mac Binding History`,
      children: <>{item && <TransactionHistory item={item} />}</>,
      permission: "HotspotCustomerCare.list"
    }
  ];

  useEffect(() => {
    const filterItems = items.filter((item: any) => {
      if (item.permission) {
        return ability.can(item.permission, "");
      }
      return true;
    });

    setData(filterItems);
  }, [router]);

  return (
    <>
      {isLoading && isFetching && <AppLoader />}
      {isError && <div>{error.message}</div>}
      <AppRowContainer>
        <Breadcrumb
          style={{
            margin: "10px 30px",
            textAlign: "left",
            width: "100%"
          }}
          items={[
            {
              title: <Link href="/admin">Home</Link>
            },
            {
              title: (
                <Link href="/admin/hotspot/customer-care">Customer Care</Link>
              )
            },
            {
              title: "Details Customer Care"
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
            textAlign: "center",
            marginTop: "1rem"
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
            Customer Care
          </h1>
        </div>
        <Space
          direction="vertical"
          style={{
            width: "90%",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {item && (
            <Space wrap>
              {/* <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#F94A29",
                  color: "#ffffff"
                }}
                onClick={() => handleDisconnect(item?.radiusUsername)}
              >
                Disconnect
              </Button> */}

              {/* {ability.can("HotspotCustomerCare.macBinding", "") && (
                <Button
                  style={{
                    marginLeft: "auto",
                    marginRight: "20px",
                    backgroundColor: "#35A29F",
                    color: "#ffffff"
                  }}
                >
                  <Link href={`/admin/hotspot/customer-care/${id}/mac-binding`}>
                    Mac Binding
                  </Link>
                </Button>
              )} */}
            </Space>
          )}
        </Space>

        <Card
          // title="Customer Care"
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ECF0F1",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem"
          }}
        >
          <Tabs
            // onChange={onChange}
            type="card"
            defaultActiveKey={data[0]?.key}
            items={data}
          />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default HotspotDetailsCustomer;
