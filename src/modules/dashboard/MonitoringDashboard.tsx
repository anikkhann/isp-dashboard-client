import ClientWiseOnline from "@/components/dashboard/Monitoring/ClientWiseOnline";
import ClientWiseSummary from "@/components/dashboard/Monitoring/ClientWiseSummary";
import CustomerWiseSummary from "@/components/dashboard/Monitoring/CustomerWiseSummary";
import ExpiredCustomer from "@/components/dashboard/Monitoring/ExpiredCustomer";
import NASWiseSummary from "@/components/dashboard/Monitoring/NASWiseSummary";
import PackageWiseSummary from "@/components/dashboard/Monitoring/PackageWiseSummary";
import RegisteredCustomer from "@/components/dashboard/Monitoring/RegisteredCustomer";

import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
// import { Card, Col, Select, Space } from "antd";
import { Col, Collapse, Row } from "antd";
import { useState } from "react";
// import React, { useState } from "react";

// const clientDataType = [
//   {
//     label: "Monthly",
//     value: "monthly"
//   },

//   {
//     label: "Quarterly",
//     value: "quarterly"
//   },
//   {
//     label: "Yearly",
//     value: "yearly"
//   }
// ];

// const customerDataType = [
//   {
//     label: "Monthly ",
//     value: "monthly"
//   },
//   {
//     label: "Quarterly ",
//     value: "quarterly"
//   },
//   {
//     label: "Yearly ",
//     value: "yearly"
//   }
// ];

const TotalVoucherDashboard = () => {
  const { Panel } = Collapse;
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          {/* <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 28 }}
            justify="space-between"
          > */}
          <Collapse
            accordion
            activeKey={collapsed ? [] : ["1"]}
            onChange={toggleCollapse}
            style={{
              backgroundColor: "#FFC857",
              color: "white",
              borderRadius: 4,
              // marginBottom: 24,
              // border: 0,
              overflow: "hidden",
              // fontWeight: "bold",
              font: "1rem",
              margin: "0 1rem"
            }}
          >
            <Panel
              header={
                <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Monitoring Dashboards
                </div>
              }
              key="1"
              style={{ padding: "0 1rem" }}
            >
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 28 }}
                justify="space-between"
              >
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <ClientWiseSummary />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <ClientWiseOnline />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <PackageWiseSummary />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <NASWiseSummary />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <RegisteredCustomer />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <ExpiredCustomer />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <CustomerWiseSummary />
                </Col>
              </Row>
            </Panel>
          </Collapse>

          {/* </Row> */}
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default TotalVoucherDashboard;
