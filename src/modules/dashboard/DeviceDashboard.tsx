// import ClientMonthlyColumnChart from "@/components/charts/clientDashboard/ClientMonthlyColumnChart";
// import ClientQuarterColumnChart from "@/components/charts/clientDashboard/ClientQuarterColumnChart";
// import ClientYearlyColumnChart from "@/components/charts/clientDashboard/ClientYearlyColumnChart";
// import CustomerMonthlyColumnChart from "@/components/charts/clientDashboard/CustomerMonthlyColumnChart";
// import CustomerQuarterColumnChart from "@/components/charts/clientDashboard/CustomerQuarterColumnChart";
// import CustomerYearlyColumnChart from "@/components/charts/clientDashboard/CustomerYearlyColumnChart";
// import ZoneCardData from "@/components/dashboard/Zone/ZoneCardData";
// import ZoneWiseCardData from "@/components/dashboard/Zone/ZoneWiseCardData";
// import SubZoneWiseCardData from "@/components/dashboard/Zone/SubZoneWiseCardData";
// import ClientCardData from "@/components/dashboard/client/ClientCardData";
// import CustomerCardData from "@/components/dashboard/client/CustomerCardData";
import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
// import { Card, Col, Select, Space } from "antd";
import { Col } from "antd";

import DeviceTableData from "@/components/dashboard/Device/DeviceTableData";
import DeviceCardData from "@/components/dashboard/Device/DeviceCardData";
// import React, { useState } from "react";

// const clientDataType = [
//   {
//     label: "Monthly New Clients",
//     value: "monthly"
//   },
//   {
//     label: "Quarterly New Clients",
//     value: "quarterly"
//   },
//   {
//     label: "Yearly New Clients",
//     value: "yearly"
//   }
// ];

// const customerDataType = [
//   {
//     label: "Monthly New Customers",
//     value: "monthly"
//   },
//   {
//     label: "Quarterly New Customers",
//     value: "quarterly"
//   },
//   {
//     label: "Yearly New Customers",
//     value: "yearly"
//   }
// ];

const DeviceDashboard = () => {
  // const [selectedClientDataType, setSelectedClientDataType] = useState<string>(
  //   clientDataType[0].value
  // );

  // const [selectedCustomerDataType, setSelectedCustomerDataType] =
  //   useState<string>(customerDataType[0].value);

  // const handleChange = (value: string) => {
  //   setSelectedClientDataType(value);
  // };

  // const handleChangeCustomer = (value: string) => {
  //   setSelectedCustomerDataType(value);
  // };

  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col span={24}>
            <DeviceCardData />
          </Col>

          {/* <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  {selectedClientDataType === "monthly"
                    ? "Monthly New Clients"
                    : selectedClientDataType === "yearly"
                    ? "Yearly New Clients"
                    : "Quarterly New Clients"}
                </>
              }
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
              extra={
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={clientDataType}
                    value={selectedClientDataType}
                  />
                </Space>
              }
            >
              {selectedClientDataType === "monthly" ? (
                <ClientMonthlyColumnChart />
              ) : selectedClientDataType === "yearly" ? (
                <ClientYearlyColumnChart />
              ) : (
                <ClientQuarterColumnChart />
              )}
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  {selectedCustomerDataType === "monthly"
                    ? "Monthly New Customers"
                    : selectedCustomerDataType === "yearly"
                    ? "Yearly New Customers"
                    : "Quarterly New Customers"}
                </>
              }
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
              extra={
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleChangeCustomer}
                    options={customerDataType}
                    value={selectedCustomerDataType}
                  />
                </Space>
              }
            >
              {selectedCustomerDataType === "monthly" ? (
                <CustomerMonthlyColumnChart />
              ) : selectedCustomerDataType === "yearly" ? (
                <CustomerYearlyColumnChart />
              ) : (
                <CustomerQuarterColumnChart />
              )}
            </Card>
          </Col> */}
        </AppRowContainer>
        <AppRowContainer>
          <Col span={24}>
            <DeviceTableData />
          </Col>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default DeviceDashboard;
