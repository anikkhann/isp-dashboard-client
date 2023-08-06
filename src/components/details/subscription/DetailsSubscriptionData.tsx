import { SubscriptionData } from "@/interfaces/SubscriptionData";
import React from "react";
import { Row, Col, Card } from "antd";

interface PropData {
  item: SubscriptionData;
}

const DetailsSubscriptionData = ({ item }: PropData) => {
  console.log("item", item);
  // const data = JSON.stringify(item);
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
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
          <div style={{ textAlign: "start" }}>
            <p>
              <span className="font-bold">
                Package Name <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.name}</span>
            </p>
            <p>
              <span className="font-bold">
                Package Type <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.packageType}</span>
            </p>

            <p>
              <span className="font-bold">
                Charge Amount <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.chargeAmount}</span>
            </p>
            <p>
              <span className="font-bold">
                Slab Start <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.slabStart}</span>
            </p>
            <p>
              <span className="font-bold">
                Slab End <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.slabEnd}</span>
            </p>
          </div>
        </Card>
      </Col>

      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
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
          <div style={{ textAlign: "start" }}>
            <p>
              <span className="font-bold">
                Inserted By <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.insertedBy?.username}</span>
            </p>
            <p>
              <span className="font-bold">
                User Type <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.insertedBy?.userType}</span>
            </p>
            <p>
              <span className="font-bold">
                Phone Number<span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.insertedBy?.phone}</span>
            </p>

            <p>
              <span className="font-bold">
                Email <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.insertedBy?.email}</span>
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsSubscriptionData;
