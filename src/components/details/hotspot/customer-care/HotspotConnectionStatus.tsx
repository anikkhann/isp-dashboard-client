/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row, Space } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";
import { format } from "date-fns";
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
        confirmButtonText: "Yes, Proceed"
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
                  <div className="flex justify-center items-center bg-[#F15F22]">
                    <h1 className="text-lg font-semibold my-2">
                      Basic Information
                    </h1>
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
                        <span className="font-bold text-base">ISP :</span>
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
                        <span className="font-bold text-base">Name :</span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.customer?.name}
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
                          Date of Birth :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.customer?.dateOfBirth
                            ? format(
                                new Date(item.customer?.dateOfBirth),
                                "yyyy-MM-dd"
                              )
                            : null}
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
                        <span className="font-bold text-base">Gender :</span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.customer?.gender}
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
                        <span className="font-bold text-base">Mobile :</span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.customer?.phone}
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
                          Expiration Time :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.expirationTime
                            ? format(
                                new Date(item.expirationTime),
                                "yyyy-MM-dd pp"
                              )
                            : null}
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
                        <span className="font-bold text-base">Package :</span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.activePricingPlan?.name}
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
                        <span className="font-bold text-base">Speed :</span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {`${item.activePricingPlan?.dataRate} ${item.activePricingPlan?.dataRateUnit}`}
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
                        <span className="font-bold text-base">MAC :</span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">{item.mac}</span>
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
                        <span className="font-bold text-base">OTP :</span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">{item.otp}</span>
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
                          Last IP Address :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.lastIpAddress}
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
                          Last Activated By :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.lastActivatedBy}
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
                          Is Bonus Availed? :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.customer?.isBonusRedeemed === true
                            ? "Yes"
                            : "No"}
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
                          Last Active Time :
                        </span>
                      </Col>
                      <Col>
                        <span className="mx-1 text-base">
                          {item.customer?.lastActive
                            ? format(
                                new Date(item.customer?.lastActive),
                                "yyyy-MM-dd pp"
                              )
                            : null}
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
                <div className="flex justify-center items-center bg-[#F15F22]">
                  <h1 className="text-lg font-semibold my-2">
                    Connection Status
                  </h1>
                </div>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Row
                      style={{
                        marginTop: "10px"
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
                        {/* <span className="mx-1 text-base"> */}

                        <span
                          className="mx-1 text-base"
                          style={{
                            color:
                              data && data?.connection_status == "Online"
                                ? "green"
                                : "red"
                          }}
                          // className={`mx-1 text-base ${data?.connection_status === "Online" ? "text-[green]" : "text-[red]"}`}
                        >
                          {data?.connection_status}
                        </span>
                        {/* </span> */}
                      </Col>
                      {data?.connection_status === "Online" && (
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
