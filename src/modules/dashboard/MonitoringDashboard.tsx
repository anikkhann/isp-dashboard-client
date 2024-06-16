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
import { Col, Collapse } from "antd";
// import { useState } from "react";
import React, { useState } from "react";
import ability from "@/services/guard/ability";

const TotalVoucherDashboard = () => {
  const { Panel } = Collapse;
  const [clientWise, setClientWise] = useState(false);
  const toggleCilent = () => {
    setClientWise(!clientWise);
  };
  // online customer
  const [onlineCustomer, setOnlineCustomer] = useState(false);
  const toggleOnlineCustomer = () => {
    setOnlineCustomer(!onlineCustomer);
  };
  // packagewise summary
  const [packageWise, setPackageWise] = useState(false);
  const togglePackageWise = () => {
    setPackageWise(!packageWise);
  };
  //Nas wise
  const [NASWise, setNASWise] = useState(false);
  const toggleNASWise = () => {
    setNASWise(!NASWise);
  };
  // registeredCustomer
  const [registeredCustomer, setRegisteredCustomer] = useState(false);
  const toggleRegisteredCustomer = () => {
    setRegisteredCustomer(!NASWise);
  };
  // expiredCustomer

  const [expiredCustomer, setExpiredCustomer] = useState(false);
  const toggleExpiredCustomer = () => {
    setExpiredCustomer(!NASWise);
  };
  // customerWise
  const [customerWise, setCustomerWise] = useState(false);
  const toggleCustomerWise = () => {
    setCustomerWise(!NASWise);
  };
  return (
    <>
      <AppAnimate>
        <AppRowContainer style={{ width: "100%" }}>
          {/* <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 28 }}
            justify="space-between"
          > */}
          <Collapse
            accordion
            activeKey={clientWise ? [] : ["1"]}
            onChange={toggleCilent}
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
                  Client Wise Summary
                </div>
              }
              key="1"
              style={{ padding: "0 1rem" }}
            >
              {/* <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                justify="space-between"
              > */}
              {ability.can("monitoring.monitoring-client-summary", "") && (
                <Col span={24}>
                  <ClientWiseSummary />
                </Col>
              )}

              {/* </Row> */}
            </Panel>
          </Collapse>
        </AppRowContainer>
        <AppRowContainer style={{ margin: "1rem 0", width: "100%" }}>
          <Collapse
            accordion
            activeKey={onlineCustomer ? [] : ["1"]}
            onChange={toggleOnlineCustomer}
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
                  Online Customer
                </div>
              }
              key="1"
              style={{ padding: "0 1rem" }}
            >
              {ability.can("monitoring.monitoring-online-customer", "") && (
                <Col span={24}>
                  <ClientWiseOnline />
                </Col>
              )}
            </Panel>
          </Collapse>
        </AppRowContainer>
        <AppRowContainer style={{ margin: "1rem 0", width: "100%" }}>
          <Collapse
            accordion
            activeKey={packageWise ? [] : ["1"]}
            onChange={togglePackageWise}
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
                  Package Wise Summary
                </div>
              }
              key="1"
              style={{ padding: "0 1rem" }}
            >
              {ability.can("monitoring.monitoring-package-summary", "") && (
                <Col span={24}>
                  <PackageWiseSummary />
                </Col>
              )}
            </Panel>
          </Collapse>
        </AppRowContainer>

        <AppRowContainer style={{ margin: "1rem 0", width: "100%" }}>
          <Collapse
            accordion
            activeKey={NASWise ? [] : ["1"]}
            onChange={toggleNASWise}
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
                  NAS Wise Summary
                </div>
              }
              key="1"
              style={{ padding: "0 1rem" }}
            >
              {ability.can("monitoring.monitoring-nas-summary", "") && (
                <Col span={24}>
                  <NASWiseSummary />
                </Col>
              )}
            </Panel>
          </Collapse>
        </AppRowContainer>

        <AppRowContainer style={{ margin: "1rem 0", width: "100%" }}>
          <Collapse
            accordion
            activeKey={registeredCustomer ? [] : ["1"]}
            onChange={toggleRegisteredCustomer}
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
                  Registered Customer
                </div>
              }
              key="1"
              style={{ padding: "0 1rem" }}
            >
              {ability.can("monitoring.monitoring-registered-customer", "") && (
                <Col span={24}>
                  <RegisteredCustomer />
                </Col>
              )}
            </Panel>
          </Collapse>
        </AppRowContainer>

        <AppRowContainer style={{ margin: "1rem 0", width: "100%" }}>
          <Collapse
            accordion
            activeKey={expiredCustomer ? [] : ["1"]}
            onChange={toggleExpiredCustomer}
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
                  Expired Customer
                </div>
              }
              key="1"
              style={{ padding: "0 1rem" }}
            >
              {ability.can("monitoring.monitoring-expired-customer", "") && (
                <Col span={24}>
                  <ExpiredCustomer />
                </Col>
              )}
            </Panel>
          </Collapse>
        </AppRowContainer>

        <AppRowContainer style={{ margin: "1rem 0", width: "100%" }}>
          <Collapse
            accordion
            activeKey={customerWise ? [] : ["1"]}
            onChange={toggleCustomerWise}
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
                  Customer Summary
                </div>
              }
              key="1"
              style={{ padding: "0 1rem" }}
            >
              {ability.can("monitoring.monitoring-customer-summary", "") && (
                <Col span={24}>
                  <CustomerWiseSummary />
                </Col>
              )}
            </Panel>
          </Collapse>
        </AppRowContainer>

        {/* </Row> */}
      </AppAnimate>
    </>
  );
};

export default TotalVoucherDashboard;
