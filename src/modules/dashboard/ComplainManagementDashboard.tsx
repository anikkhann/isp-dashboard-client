import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Col } from "antd";
import TotalComplainData from "@/components/dashboard/ComplainManagement/TotalComplainData";
import GetCustomerComplainData from "@/components/dashboard/ComplainManagement/GetCustomerComplainData";
import LatestComplainData from "@/components/dashboard/ComplainManagement/LatestComplainData";
// import CustomerComplainSummaryData from "@/components/dashboard/ComplainManagement/CustomerComplainSummaryData";
import RootWiseComplainSummaryData from "@/components/dashboard/ComplainManagement/RootWiseComplainSummaryData";
const ComplainManagementDashboard = () => {
  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col span={24}>
            <TotalComplainData />
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col span={24}>
            <GetCustomerComplainData />
          </Col>
          <Col span={24}>
            <LatestComplainData />
          </Col>
          {/* <Col span={24}>
            <CustomerComplainSummaryData />
          </Col> */}
          <Col span={24}>
            <RootWiseComplainSummaryData />
          </Col>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default ComplainManagementDashboard;
