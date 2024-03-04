import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Col } from "antd";
import CustomerStatisticData from "@/components/dashboard/CustomerManagement/CustomerStatisticData";
import ZoneWiseCustomerStatisticData from "@/components/dashboard/CustomerManagement/ZoneWiseCustomerStatisticData";
import PopWiseCustomerStatisticData from "@/components/dashboard/CustomerManagement/PopWiseCustomerStatisticData";
import CustomerCard from "@/components/dashboard/CustomerManagement/CustomerCard";
import DeviceOnlineCustomerData from "@/components/dashboard/CustomerManagement/DeviceOnlineCustomerData";

const CMDashboard = () => {
  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col span={24}>
            <CustomerCard />
          </Col>

          <Col span={24}>
            <DeviceOnlineCustomerData />
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
