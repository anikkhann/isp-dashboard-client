import ClientWiseSummary from "@/components/dashboard/Monitoring/ClientWiseSummary";

import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
// import { Card, Col, Select, Space } from "antd";
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

const TotalVoucherDashboard = () => {
  //   const [selectedClientDataType, setSelectedClientDataType] = useState<string>(
  //     clientDataType[0].value
  //   );

  //   const [selectedCustomerDataType, setSelectedCustomerDataType] =
  //     useState<string>(customerDataType[0].value);

  //   const handleChange = (value: string) => {
  //     setSelectedClientDataType(value);
  //   };

  //   const handleChangeCustomer = (value: string) => {
  //     setSelectedCustomerDataType(value);
  //   };

  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col span={24}>
            <ClientWiseSummary />
          </Col>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default TotalVoucherDashboard;
