/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Space } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import TableCard from "@/lib/TableCard";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";

interface PropData {
  item: any | null;
}

const HotspotConnectionStatus = ({ item }: PropData) => {
  const [data, setData] = useState<any>(null);

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
        console.log("data.data", data);

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
            title="Connection Status"
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
                    <span className="font-bold text-base">assigned ip :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{data?.assigned_ip}</span>
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
                      connection_status :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">
                      {data?.connection_status}
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
                      nas ip address :
                    </span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{data?.nasipaddress}</span>
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
                    <span className="font-bold text-base">router mac :</span>
                  </Col>
                  <Col>
                    <span className="mx-1 text-base">{data?.router_mac}</span>
                  </Col>
                </Row>
              </div>
            </Space>
          </TableCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default HotspotConnectionStatus;
