import React from "react";
import { Row, Col, Card } from "antd";

interface PropData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const DetailsProfileData = ({ item }: PropData) => {
  // console.log("item", item);
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
                <span className="font-bold text-base">Name :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.name}</span>
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
                <span className="font-bold text-base">Phone Number :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.phone}</span>
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
                <span className="font-bold text-base">Address :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item ? item.address : null}
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
              <Col className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                <span
                  className="mx-1 text-base"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                >
                  {item.email}
                </span>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsProfileData;
