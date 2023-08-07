import { IpSubnetData } from "@/interfaces/IpSubnetData";
import React from "react";
import { Row, Col, Card } from "antd";
import { format } from "date-fns";
interface PropData {
  item: IpSubnetData;
}

const DetailsNetworkData = ({ item }: PropData) => {
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
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Network Name</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.networkName}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Network Address</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.networkAddress}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Subnet Mask</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.subnetMask}</span>
            </p>
          </div>
        </Card>
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
          <div style={{ textAlign: "start" }}>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Phone</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.insertedBy?.phone}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Email</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.insertedBy?.email}</span>
            </p>
          </div>
        </Card>
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
          <div style={{ textAlign: "start" }}>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Created By</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.insertedBy?.username}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Created At</span>
              <span className="mx-1">:</span>
              <span className="mx-1">
                {item.createdOn
                  ? format(new Date(item.createdOn), "yyyy-MM-dd pp")
                  : null}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Updated By</span>
              <span className="mx-1">:</span>
              <span className="mx-1">
                {item.editedBy ? item.editedBy.username : null}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Updated At</span>
              <span className="mx-1">:</span>
              <span className="mx-1">
                {item.updatedOn
                  ? format(new Date(item.updatedOn), "yyyy-MM-dd pp")
                  : null}
              </span>
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
          <p className="flex flex-row   overflow-hidden">
            <span className="font-bold">Partner Name</span>
            <span className="mx-2">:</span>
            <span className="mx-2">{item.partner?.name}</span>
          </p>
          <p className="flex flex-row   overflow-hidden">
            <span className="font-bold">Contact Person</span>
            <span className="mx-2">:</span>
            <span className="mx-2">{item.partner?.contactPerson}</span>
          </p>
          <p className="flex flex-row   overflow-hidden">
            <span className="font-bold">Contact Number</span>
            <span className="mx-2">:</span>
            <span className="mx-2">{item.partner?.contactNumber}</span>
          </p>
          <p className="flex flex-row   overflow-hidden">
            <span className="font-bold">Alternate Number</span>
            <span className="mx-2">:</span>
            <span className="mx-2">{item.partner?.altContactNumber}</span>
          </p>
          <p className="flex flex-row   overflow-hidden">
            <span className="font-bold">Email</span>
            <span className="mx-2">:</span>
            <span className="mx-2">{item.partner?.email}</span>
          </p>

          <p className="flex flex-row   overflow-hidden">
            <span className="font-bold">
              Division<span className="mx-2">:</span>
            </span>
            <span className="mx-2">{item.partner?.division?.name}</span>
          </p>
          <p className="flex flex-row   overflow-hidden">
            <span className="font-bold">District</span>
            <span className="mx-2">:</span>
            <span className="mx-2">{item.partner?.district?.name}</span>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsNetworkData;
