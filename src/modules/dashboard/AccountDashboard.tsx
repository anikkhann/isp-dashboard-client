// import ClientMonthlyColumnChart from "@/components/charts/clientDashboard/ClientMonthlyColumnChart";
// import ClientQuarterColumnChart from "@/components/charts/clientDashboard/ClientQuarterColumnChart";
// import ClientYearlyColumnChart from "@/components/charts/clientDashboard/ClientYearlyColumnChart";
// import CustomerMonthlyColumnChart from "@/components/charts/clientDashboard/CustomerMonthlyColumnChart";
// import CustomerQuarterColumnChart from "@/components/charts/clientDashboard/CustomerQuarterColumnChart";
// import CustomerYearlyColumnChart from "@/components/charts/clientDashboard/CustomerYearlyColumnChart";
import CurrentMonthRevenue from "@/components/dashboard/Accounts/CurrentMonthRevenue";
import CurrentWeekDue from "@/components/dashboard/Accounts/CurrentWeekDue";
import LastMonthRevenue from "@/components/dashboard/Accounts/LastMonthRevenue";
import OverallWeekDue from "@/components/dashboard/Accounts/OverallWeekDue";
// import ZoneRevenueData from "@/components/dashboard/Accounts/ZoneRevenueData";
// import CustomerCardData from "@/components/dashboard/client/CustomerCardData";
import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Col } from "antd";
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

const AccountDashboard = () => {
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
          <Col span={24}>{/* <ZoneRevenueData></ZoneRevenueData> */}</Col>
          <Col span={24}>
            <h1
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#0e8fdc",
                paddingLeft: "2rem",
                paddingRight: "2rem"
              }}
            >
              Current Month Revenue
            </h1>

            <CurrentMonthRevenue />
          </Col>
          <Col span={24}>
            <h1
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#0e8fdc",
                paddingLeft: "2rem",
                paddingRight: "2rem"
              }}
            >
              Last Month Revenue
            </h1>

            <LastMonthRevenue />
          </Col>
          <Col span={24}>
            <h1
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#0e8fdc",
                paddingLeft: "2rem",
                paddingRight: "2rem"
              }}
            >
              Current Week Due Summary
            </h1>

            <CurrentWeekDue />
          </Col>
          <Col span={24}>
            <h1
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#0e8fdc",
                paddingLeft: "2rem",
                paddingRight: "2rem"
              }}
            >
              Overall Due Summary
            </h1>

            <OverallWeekDue />
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
          </Col> */}

          {/* <Col xs={24} lg={12}>
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
        {/* <AppRowContainer>
          <Col span={24}>
            <CustomerCardData />
          </Col>
        </AppRowContainer> */}
      </AppAnimate>
    </>
  );
};

export default AccountDashboard;
