import { CustomerData } from "@/interfaces/CustomerData";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface PropData {
  item: CustomerData;
}

const Customer = ({ item }: PropData) => {
  console.log(item);
  const [data, setData] = useState<any>({
    assigned_ip: "",
    connection_status: "",
    nasipaddress: "",
    router_mac: ""
  });

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(
      `/api/customer/connection-status/${item.username}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["connection-list", item],
    queryFn: async () => {
      const response = await fetchData();
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        if (data.body) {
          setData(data.body[0]);
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

  function subOneDay(date = new Date()) {
    date.setDate(date.getDate() - 1);

    return date;
  }
  const date = new Date(item?.expirationTime);
  const result2 = subOneDay(date);
  const today = new Date();

  const isDateGreen = result2 >= today;
  const color = isDateGreen ? "green" : "red";
  return (
    <>
      {isLoading && isFetching && (
        <>
          <AppImageLoader />
        </>
      )}

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
      {data && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            className="gutter-row"
          >
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
                  fontSize: "1.3rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#0e8fdc"
                }}
              >
                Basic Information
              </h1>
            </div>
            <Card
              hoverable
              bordered={false}
              style={{
                textAlign: "start",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #F15F22"
              }}
            >
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
                    <span className="mx-1 text-base">{item?.name}</span>
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
                    <span className="font-bold text-base">Customer ID :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.customerId}</span>
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
                    <span className="font-bold text-base">Username :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.username}</span>
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
                    <span className="font-bold text-base">Password :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.password}</span>
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
                    <span className="font-bold text-base">Credits :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.credits}</span>
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
                    <span className="font-bold text-base">Discount :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.discount}</span>
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
                    <span className="font-bold text-base">Mobile No :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.mobileNo}</span>
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
                      Alternative Mobile No :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.altMobileNo}</span>
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
                      Connection Address :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.connectionAddress}
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
                      Contact Person :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.contactPerson}
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
                      Contact Person Contact :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.contactNumber}
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
                    <span className="font-bold text-base">Email :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.email}</span>
                  </Col>
                </Row>

                {/* <Row
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
                    <span className="font-bold text-base">House No :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.houseNo}</span>
                  </Col>
                </Row> */}

                {/* <Row
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
                    <span className="font-bold text-base">Flat No :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.flatNo}</span>
                  </Col>
                </Row> */}

                {/* <Row
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
                    <span className="font-bold text-base">Road No :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.roadNo}</span>
                  </Col>
                </Row> */}

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
                    <span className="font-bold text-base">Identity Type :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.identityType}</span>
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
                    <span className="font-bold text-base">Identity No :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.identityNo}</span>
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
                    <span className="font-bold text-base">Reference Type:</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.referenceType}
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
                      Reference Name :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.referrerName}</span>
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
                    <span className="font-bold text-base">Remarks :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.remarks}</span>
                  </Col>
                </Row>
              </div>
            </Card>

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
                  fontSize: "1.3rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#0e8fdc"
                }}
              >
                Miscellaneous Information
              </h1>
            </div>
            <Card
              hoverable
              bordered={false}
              style={{
                textAlign: "start",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #F15F22"
              }}
            >
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
                    <span className="font-bold text-base">Auto Renew :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item && item?.autoRenew == true ? "Yes" : "No"}
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
                    <span className="font-bold text-base">Email Alert :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item && item?.emailAlert == true ? "Yes" : "No"}
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
                    <span className="font-bold text-base">SMS Alert :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item && item?.smsAlert == true ? "Yes" : "No"}
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
                      Is SAF Verified :
                    </span>
                  </Col>
                  <Col>
                    <span
                      className="mx-1 text-base"
                      style={{
                        color:
                          item && item?.isSafVerified == true ? "green" : "red"
                      }}
                    >
                      {item && item?.isSafVerified == true ? "Yes" : "No"}
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
                    <span className="font-bold text-base">Division :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.division?.name}
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
                    <span className="font-bold text-base">District :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.district?.name}
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
                    <span className="font-bold text-base">Upazilla :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.upazilla?.name}
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
                    <span className="font-bold text-base">Union :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.union?.name}</span>
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
                    <span className="font-bold text-base">Zone Manager :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.zoneManager?.name}
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
                      Sub Zone Manager :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.subZoneManager?.name}
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
                      Adjustment Day :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.adjustmentDay}
                    </span>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            className="gutter-row"
          >
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
                  fontSize: "1.3rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#0e8fdc"
                }}
              >
                Connection Information
              </h1>
            </div>
            <Card
              hoverable
              bordered={false}
              style={{
                textAlign: "start",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #F15F22"
              }}
            >
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
                    <span className="font-bold text-base">Zone :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base"></span>
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
                    <span className="font-bold text-base">POP :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base"></span>
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
                    <span className="font-bold text-base">House No :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.houseNo}</span>
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
                    <span className="font-bold text-base">Road No :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.roadNo}</span>
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
                    <span className="font-bold text-base">Flat No :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.flatNo}</span>
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
                    <span className="font-bold text-base">Area :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.area}</span>
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
                      Connection Address :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.connectionAddress}
                    </span>
                  </Col>
                </Row>
              </div>
            </Card>

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
                  fontSize: "1.3rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#0e8fdc"
                }}
              >
                Link Information
              </h1>
            </div>
            <Card
              hoverable
              bordered={false}
              style={{
                textAlign: "start",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #F15F22"
              }}
            >
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
                      Connection Type :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.connectionType}
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
                      Fiber Optic Device :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base"></span>
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
                    <span className="font-bold text-base">OLT Device :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base"></span>
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
                    <span className="font-bold text-base">ONU Device :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base"></span>
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
                      Switch Port No :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.swPortNo}</span>
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
                    <span className="font-bold text-base">Vlan Box Name :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.vlanBoxName}</span>
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
                    <span className="font-bold text-base">Splitter :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base"></span>
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
                    <span className="font-bold text-base">Cable ID :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base"></span>
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
                    <span className="font-bold text-base">Cable Length :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{item?.cableLength}</span>
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
                    <span className="font-bold text-base">Color Code :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base"></span>
                  </Col>
                </Row>
              </div>
            </Card>
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
                  fontSize: "1.3rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#0e8fdc"
                }}
              >
                Subscription Information
              </h1>
            </div>
            <Card
              hoverable
              bordered={false}
              style={{
                textAlign: "start",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #F15F22"
              }}
            >
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
                      Account Status :
                    </span>
                  </Col>
                  <Col>
                    <span
                      className="mx-1 text-base"
                      style={{
                        color: item && item?.isActive == true ? "green" : "red"
                      }}
                    >
                      {item && item?.isActive == true ? "Active" : "Inactive"}
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
                    <span className="mx-1 text-base" style={{ color }}>
                      {format(result2, "yyyy-MM-dd")}
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
                      Subscription Status :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {/* {format(result2, "yyyy-MM-dd")} */}
                    </span>
                  </Col>
                </Row>
              </div>
            </Card>

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
                  fontSize: "1.3rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#0e8fdc"
                }}
              >
                Connection Status
              </h1>
            </div>
            <Card
              hoverable
              bordered={false}
              style={{
                textAlign: "start",
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #F15F22",
                marginTop: "1rem"
              }}
            >
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
                    <span className="font-bold text-base">Created By :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.insertedBy?.username}
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
                    <span className="font-bold text-base">Created At :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.createdOn
                        ? format(new Date(item.createdOn), "yyyy-MM-dd pp")
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
                    <span className="font-bold text-base">Updated By :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.editedBy ? item.editedBy.username : null}
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
                    <span className="font-bold text-base">Updated At :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.updatedOn
                        ? format(new Date(item.updatedOn), "yyyy-MM-dd pp")
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
                    <span className="font-bold text-base">
                      Account Status :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {item?.isActive == true ? "Active" : "Inactive"}
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
                    <span className="font-bold text-base">Assigned Ip :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{data.assigned_ip}</span>
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
                      {data.connection_status}
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
                      Nas Ip Address :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{data.nasipaddress}</span>
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
                    <span className="font-bold text-base">Router Mac :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{data.router_mac}</span>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Customer;
