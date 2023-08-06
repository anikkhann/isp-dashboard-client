import { ClientData } from "@/interfaces/ClientData";
import React from "react";
import { Row, Col, Card } from "antd";
// const { Meta } = Card;
interface PropData {
  item: ClientData;
}

const DetailsClientData = ({ item }: PropData) => {
  console.log("item", item);
  // convert to string
  // const data = JSON.stringify(item);
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
      <Col
        xs={24}
        sm={12}
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
          <div style={{ textAlign: "start" }}>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Client Level</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.clientLevel}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Partner Type</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partnerType}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Division</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.division?.name}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">District</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.district?.name}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Inserted By</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.insertedBy?.username}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">User Type</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.insertedBy?.userType}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Phone</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.insertedBy?.phone}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Email</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.insertedBy?.email}</span>
            </p>
          </div>
        </Card>
      </Col>
      <Col
        xs={24}
        sm={12}
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
          <div style={{ textAlign: "start" }}>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Username</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.username}</span>
            </p>

            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Name</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.name}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Email</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.email}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Address</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.address}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Contact Person</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.contactPerson}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Contact Number</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.contactNumber}</span>
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsClientData;
