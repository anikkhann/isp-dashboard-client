import PackageWiseActiveData from "@/components/dashboard/CustomerPackage/PackageWiseActiveData";
import PackageWiseRevCustomerData from "@/components/dashboard/CustomerPackage/PackageWiseRevCustomerData";
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
const CustomerPackageDashboard = () => {
  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          {/* <Col span={24}>
            <ZoneCardData />
          </Col> */}
        </AppRowContainer>
        <AppRowContainer>
          <Col span={24}>
            <PackageWiseActiveData />
          </Col>
          <Col span={24}>
            <PackageWiseRevCustomerData />
          </Col>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default CustomerPackageDashboard;
