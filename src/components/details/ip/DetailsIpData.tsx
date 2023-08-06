import { IpData } from "@/interfaces/IpData";
import React from "react";
import { Row, Col, Card } from "antd";

interface PropData {
  item: IpData;
}

const DetailsIpData = ({ item }: PropData) => {
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
              <span className="mx-2">{item.ipSubnet?.networkName}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Network Address</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.ipSubnet?.networkAddress}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Subnet Mask</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.ipSubnet?.subnetMask}</span>
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
            marginTop: "2rem"
          }}
        >
          <div style={{ textAlign: "start" }}>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Radius IP</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.ipSubnet?.partner?.radiusIp?.name}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Radius Name</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.ipSubnet?.partner?.radiusIp?.master?.name}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Radius Key</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.ipSubnet?.partner?.radiusIp?.master?.key}
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
          <div style={{ textAlign: "start" }}>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Partner Name</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.ipSubnet?.partner?.username}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Partner Type</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.ipSubnet?.partner?.partnerType}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Contact Person</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.ipSubnet?.partner?.contactPerson}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Contact Number</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.ipSubnet?.partner?.contactNumber}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Alternate Number</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.ipSubnet?.partner?.altContactNumber}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Email</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.ipSubnet?.partner?.email}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Address</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.ipSubnet?.partner?.address}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Division</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.ipSubnet?.partner?.division?.name}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Division</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.ipSubnet?.partner?.district?.name}
              </span>
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsIpData;
