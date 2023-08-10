import ClientMonthlyColumnChart from "@/components/charts/clientDashboard/ClientMonthlyColumnChart";
import ClientQuarterColumnChart from "@/components/charts/clientDashboard/ClientQuarterColumnChart";
import ClientYearlyColumnChart from "@/components/charts/clientDashboard/ClientYearlyColumnChart";
import CustomerMonthlyColumnChart from "@/components/charts/clientDashboard/CustomerMonthlyColumnChart";
import CustomerQuarterColumnChart from "@/components/charts/clientDashboard/CustomerQuarterColumnChart";
import CustomerYearlyColumnChart from "@/components/charts/clientDashboard/CustomerYearlyColumnChart";
import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Card, Col } from "antd";
import React from "react";

const ClientDashboard = () => {
  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col xs={24} lg={12}>
            <Card
              title="Monthly New Clients"
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
            >
              <ClientMonthlyColumnChart />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="Yearly New Clients"
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
            >
              <ClientYearlyColumnChart />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="Quarter New Clients"
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
            >
              <ClientQuarterColumnChart />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="Monthly New Customers"
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
            >
              <CustomerMonthlyColumnChart />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="Yearly New Customers"
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
            >
              <CustomerYearlyColumnChart />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="Quarter New Customers"
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
            >
              <CustomerQuarterColumnChart />
            </Card>
          </Col>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default ClientDashboard;
