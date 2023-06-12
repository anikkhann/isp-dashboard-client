import SaleStatics from "@/components/charts/SaleStatics";
import SalesCard from "@/components/dashboard/SalesCard";
import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Col } from "antd";
import React from "react";


const MainDashboard = () => {
  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col xs={24} sm={12} md={6}>
            <SalesCard
              bgColor="#ffffff"
              color="#1363DF"
              icon="/assets/icons/icon_visits.svg"
              title="Total Users"
              value="200"
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <SalesCard
              bgColor="#49BD65"
              color="#fff"
              icon="/assets/icons/revenue_icon.svg"
              title="Total Revenue"
              value="200"
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <SalesCard
              bgColor="#9E49E6"
              color="#fff"
              icon="/assets/icons/querries.svg"
              title="Total Queries"
              value="200"
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <SalesCard
              bgColor="#005082"
              color="#fff"
              icon="/assets/icons/icon_visits.svg"
              title="Total Users"
              value="200"
            />
          </Col>
          <Col xs={24} lg={18}>
            <SaleStatics />
          </Col>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default MainDashboard;
