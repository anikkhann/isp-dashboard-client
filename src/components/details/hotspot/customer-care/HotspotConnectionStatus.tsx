/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row, Space } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
interface PropData {
  item: any | null;
}

const HotspotConnectionStatus = ({ item }: PropData) => {
  const [data, setData] = useState<any>(null);

  const MySwal = withReactContent(Swal);
  const router = useRouter();

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
          `/api-hotspot/partner-customer/disconnect-user/${username}`
        );
        if (data.status === 200) {
          MySwal.fire("Success!", data.message, "success").then(() => {
            router.reload();
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

    const { data } = await axios.get(
      `/api-hotspot/partner-customer/get-connection-status/${item.radiusUsername}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isError, error } = useQuery<boolean, any>({
    queryKey: ["hotspot-get-connection-status-list", item],
    queryFn: async () => {
      const response = await fetchData();
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);
        if (data.body) {
          setData(data.body);
        } else {
          setData(null);
        }
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return (
    <>
      <AppRowContainer>
        <Col span={24} key="data-f">
          {isError && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: " 10px 5px"
                }}
              >
                <Card
                  title="Error"
                  style={{
                    width: 300,
                    color: "#FF5630",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <p>
                    {error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                      ? error.response.data.message
                      : error.message
                        ? error.message
                        : "Something went wrong"}
                  </p>
                </Card>
              </div>
            </>
          )}

          <TableCard
            title=""
            hasLink={false}
            addLink=""
            permission=""
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              overflowX: "auto",
              backgroundColor: "#ffffff"
            }}
          >
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              justify="space-between"
            >
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div className="flex justify-center items-center">
                    <h1 className="text-lg font-semibold">Basic Information</h1>
                  </div>
                  <div>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">Name :</span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item?.radiusUsername}
                        </span>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          Client Name :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.client?.username}
                        </span>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          Client Address :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.client?.address}
                        </span>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          Client Number :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.client?.contactNumber}
                        </span>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          Client Level :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.client?.clientLevel}
                        </span>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          Registered Customer :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.client?.registeredCustomer}
                        </span>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          Total Customer :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.client?.totalCustomer}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </Space>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row "
              >
                <div className="flex justify-center items-center">
                  <h1 className="text-lg font-semibold"> Connection Status</h1>
                </div>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          Assigned IP :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {data?.assigned_ip}
                        </span>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          Connection Status :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {data?.connection_status}
                        </span>
                      </Col>
                      {data?.connection_status === "online" && (
                        <Button
                          style={{
                            marginLeft: "auto",
                            marginRight: "20px",
                            backgroundColor: "#F94A29",
                            color: "#ffffff"
                          }}
                          onClick={() => handleDisconnect(item?.radiusUsername)}
                        >
                          Disconnect
                        </Button>
                      )}
                    </Row>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          NAS IP Address :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {data?.nasipaddress}
                        </span>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "2px"
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "end"
                        }}
                      >
                        <span className="font-bold text-base">
                          Router MAC :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {data?.router_mac}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </Space>
              </Col>
            </Row>
          </TableCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default HotspotConnectionStatus;
