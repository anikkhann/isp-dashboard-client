import { DeviceData } from "@/interfaces/DeviceData";
import React from "react";
import { Row, Col, Card } from "antd";

interface PropData {
  item: DeviceData;
}

const DetailsDeviceData = ({ item }: PropData) => {
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
              <span className="font-bold">Name</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.name}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Device Type</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.deviceType}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Monitoring Type</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.monitoringType}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">OLT Type</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.oltType}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Incoming Port</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.incomingPort}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">SNMP Community</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.snmpCommunity}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">SNMP Port</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.snmpPortNo}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">SNMP Version</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.snmpVersion}</span>
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
          <p className="flex flex-row   overflow-hidden">
            <span className="font-bold">Inserted By</span>
            <span className="mx-2">:</span>
            <span className="mx-2">{item.insertedBy?.username}</span>
          </p>
          <p className="flex flex-row   overflow-hidden">
            <span className="font-bold">User Type</span>
            <span className="mx-2">:</span>
            <span className="mx-2">{item.insertedBy?.userType}</span>
          </p>
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
              <span className="font-bold">Zone Name</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.distributionZone?.name}</span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Pop Name</span>
              <span className="mx-2">:</span>
              <span className="mx-2">{item.distributionPop?.name}</span>
            </p>

            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Partner Name</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.distributionZone?.partner?.name}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Partner Type</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.distributionZone?.partner?.partnerType}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Contact Person</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.distributionZone?.partner?.contactPerson}
              </span>
            </p>

            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Contact Number</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.distributionZone?.partner?.contactNumber}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Alternate Number</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.distributionZone?.partner?.altContactNumber}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Partner Email</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.distributionZone?.partner?.email}
              </span>
            </p>
            <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Partner Address</span>
              <span className="mx-2">:</span>
              <span className="mx-2">
                {item.distributionZone?.partner?.address}
              </span>
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsDeviceData;
