// import SubZoneWiseCardData from "@/components/dashboard/Zone/SubZoneWiseCardData";
import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Col } from "antd";
import ActiveAndTotalRetailer from "@/components/dashboard/Retailer/ActiveAndTotalRetailer";
import RetailerWiseActiveCustomerData from "@/components/dashboard/Retailer/RetailerWiseActiveCustomerData";
const RetailerDashboard = () => {
  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col span={24}>
            <ActiveAndTotalRetailer />
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col span={24}>
            <RetailerWiseActiveCustomerData />
          </Col>
          {/* <Col span={24}>
            <SubZoneWiseCardData />
          </Col> */}
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default RetailerDashboard;
