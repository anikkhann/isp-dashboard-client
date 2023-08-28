import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Col } from "antd";
import NumberOfCustomerData from "@/components/dashboard/CustomerManagement/NumberOfCustomerData";
import CustomerStatisticData from "@/components/dashboard/CustomerManagement/CustomerStatisticData";
import ZoneWiseCustomerStatisticData from "@/components/dashboard/CustomerManagement/ZoneWiseCustomerStatisticData";
import PopWiseCustomerStatisticData from "@/components/dashboard/CustomerManagement/PopWiseCustomerStatisticData";
const CMDashboard = () => {
  return (
    <>
      <AppAnimate>
        {/* <AppRowContainer>
          <Col span={24}>
            <ZoneCardData />
          </Col>
        </AppRowContainer> */}
        <AppRowContainer>
          <Col span={24}>
            <NumberOfCustomerData />
          </Col>
          <Col span={24}>
            <CustomerStatisticData />
          </Col>
          <Col span={24}>
            <ZoneWiseCustomerStatisticData />
          </Col>
          <Col span={24}>
            <PopWiseCustomerStatisticData />
          </Col>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default CMDashboard;
