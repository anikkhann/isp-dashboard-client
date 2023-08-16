/* eslint-disable @typescript-eslint/no-explicit-any */

// import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import {
  // Alert,
  Breadcrumb,
  Button,
  Card,
  Space,
  Tabs
} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ability from "@/services/guard/ability";
import Customer from "@/components/details/customerCare/Customer";
import SessionHistory from "@/components/details/customerCare/SessionHistory";
import TransactionHistory from "@/components/details/customerCare/TransactionHistory";
import TicketHistory from "@/components/details/customerCare/TicketHistory";
import ActivityLog from "@/components/details/customerCare/ActivityLog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { CustomerData } from "@/interfaces/CustomerData";
import AppLoader from "@/lib/AppLoader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { useRouter } from "next/router";

interface TabData {
  key: string;
  label: string;
  children: React.ReactNode;
  permission?: string;
}

const DetailsCustomerCare = ({ id }: any) => {
  const [item, SetItem] = useState<CustomerData | null>(null);

  const MySwal = withReactContent(Swal);
  // const router = useRouter();

  async function handleDisconnect(username: string) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, Disconnect customer!"
      });

      if (result.isConfirmed) {
        const { data } = await axios.get(
          `/api/customer/disconnect/${username}`
        );
        if (data.status === 200) {
          MySwal.fire("Success!", data.body.message, "success").then(() => {
            // router.reload();
          });
        } else {
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error: any) {
      // console.log(error);
      if (error.response) {
        MySwal.fire("Error!", error.response.data.message, "error");
      } else {
        MySwal.fire("Error!", "Something went wrong", "error");
      }
    }
  }

  async function handleRenew(id: string) {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, Renew customer!"
      });

      if (result.isConfirmed) {
        const { data } = await axios.get(`/api/customer/renew/${id}`);
        if (data.status === 200) {
          MySwal.fire("Success!", data.body.message, "success").then(() => {
            // router.reload();
          });
        } else {
          MySwal.fire("Error!", data.message, "error");
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error: any) {
      // console.log(error);
      if (error.response) {
        MySwal.fire("Error!", error.response.data.message, "error");
      } else {
        MySwal.fire("Error!", "Something went wrong", "error");
      }
    }
  }

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

  /* const onChange = (key: string) => {
    console.log(key);
  }; */

  const items: TabData[] = [
    {
      key: "1",
      label: `Customer`,
      children: <>{item && <Customer item={item} />}</>,
      permission: "customerCare.list"
    },

    {
      key: "2",
      label: `Session History`,
      children: <>{item && <SessionHistory item={item} />}</>,
      permission: "customerCare.list"
    },
    {
      key: "3",
      label: `Transaction History`,
      children: <>{item && <TransactionHistory item={item} />}</>,
      permission: "customerCare.list"
    },
    {
      key: "4",
      label: `Ticket History`,
      children: <>{item && <TicketHistory item={item} />}</>,
      permission: "customerCare.list"
    },
    {
      key: "5",
      label: `Activity Log`,
      children: <>{item && <ActivityLog item={item} />}</>,
      permission: "customerCare.list"
    }
  ];

  const filterItems = items.filter((item: any) => {
    if (item.permission) {
      return ability.can(item.permission, "");
    }
    return true;
  });

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
              title: <Link href="/admin/customer-care">Customer Care</Link>
            },
            {
              title: "Details Customer Care"
            }
          ]}
        />

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
              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#EA1179",
                  color: "#ffffff"
                }}
                className="btn btn-primary hover:bg-accent"
              >
                <Link href={`/admin/customer-care/${id}/ticket`}>
                  Create Ticket
                </Link>
              </Button>

              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#241468",
                  color: "#ffffff"
                }}
              >
                SAF Verification
              </Button>

              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#0B666A",
                  color: "#ffffff"
                }}
              >
                Live Bandwidth
              </Button>

              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#F94A29",
                  color: "#ffffff"
                }}
                onClick={() => handleDisconnect(item?.username)}
              >
                Disconnect
              </Button>

              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#35A29F",
                  color: "#ffffff"
                }}
              >
                <Link href={`/admin/customer-care/${id}/topup`}>Top Up</Link>
              </Button>

              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  backgroundColor: "#D61355",
                  color: "#ffffff"
                }}
                onClick={() => handleRenew(item?.id)}
              >
                Renew
              </Button>
            </Space>
          )}
        </Space>

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
            defaultActiveKey={filterItems[0].key}
            items={filterItems}
          />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default DetailsCustomerCare;
