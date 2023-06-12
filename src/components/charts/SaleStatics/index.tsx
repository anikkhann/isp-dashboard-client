import React from "react";

import SaleStaticChart from "./SaleStaticChart";
import { Col } from "antd";

import {
  StyledChartActionItem,
  StyledChartContainer,
  StyledChartContainerAction,
  StyledChartContainerView
} from "./index.styled";

import AppCard from "@/lib/AppCard";
import AppSelect from "@/lib/AppSelect";
import AppRowContainer from "@/lib/AppRowContainer";

import { StyledAppProgressCircular } from "@/components/dashboard/Revenue/index.styled";

const SaleStatics = () => {
  const handleSelectionType = (data: object) => {
    console.log("data: ", data);
  };

  return (
    <AppCard
      title="Earnings"
      className="bg-white"
      extra={
        <AppSelect
          menus={["This Week", "This Month", "This Year"]}
          defaultValue={"This Week"}
          onChange={handleSelectionType}
        />
      }
    >
      <AppRowContainer>
        <Col xs={24} md={18}>
          <SaleStaticChart />
        </Col>
        <Col xs={24} md={6}>
          <StyledChartContainerView>
            <StyledChartContainer>
              <StyledAppProgressCircular
                strokeColor="#0A8FDC"
                trailColor="#F44D50"
                percent={70}
                strokeWidth={10}
              />
            </StyledChartContainer>
            <StyledChartContainerAction>
              <StyledChartActionItem>
                <span className="dot" style={{ backgroundColor: "#0A8FDC" }} />
                <p>Local</p>
              </StyledChartActionItem>
              <StyledChartActionItem>
                <span className="dot" style={{ backgroundColor: "#F44D50" }} />
                <p>Foreign</p>
              </StyledChartActionItem>
            </StyledChartContainerAction>
          </StyledChartContainerView>
        </Col>
      </AppRowContainer>
    </AppCard>
  );
};

export default SaleStatics;
