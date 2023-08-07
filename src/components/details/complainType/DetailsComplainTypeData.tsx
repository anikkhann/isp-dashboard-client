import { ComplainTypeData } from "@/interfaces/ComplainTypeData";
import React from "react";
import { Card, Col, Row } from "antd";

interface PropData {
  item: ComplainTypeData;
}

const DetailsComplainTypeData = ({ item }: PropData) => {
  console.log("item", item);
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
              <span className="font-bold flex">Partner</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partner?.username}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Partner Type</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partner?.partnerType}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Contact Person</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partner?.contactPerson}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Contact Number</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partner?.contactNumber}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Alternate Contact Number</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partner?.altContactNumber}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Email</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partner?.email}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Address</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partner?.address}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Division</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partner?.division?.name}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">District</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partner?.district?.name}</span>
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
              <span className="font-bold flex">Name</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.name}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold flex">Complain Category</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.complainCategory}</span>
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
              <span className="font-bold">Email</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.insertedBy?.email}</span>
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsComplainTypeData;
