import { AgentTopUpData } from "@/interfaces/AgentTopUpData";
import React from "react";
import { Row, Col, Card } from "antd";
import { format } from "date-fns";
interface PropData {
  item: AgentTopUpData;
}

const DetailsZoneTopData = ({ item }: PropData) => {
  console.log("item", item);
  // const data = JSON.stringify(item);
  return (
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
                <span className="font-bold text-base">Agent :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.agent?.name}</span>
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
                <span className="font-bold text-base">Amount :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.amount}</span>
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
                <span className="font-bold text-base">Created By :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.insertedBy?.username}
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
                  {item.createdOn
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
                <span className="font-bold text-base">Recharged By :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.rechargedBy ? item.rechargedBy.username : null}
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
                <span className="font-bold text-base">Recharged Date :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {" "}
                  {item.rechargedDate
                    ? format(new Date(item.rechargedDate), "yyyy-MM-dd pp")
                    : null}
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
      ></Col>
    </Row>
  );
};

export default DetailsZoneTopData;
