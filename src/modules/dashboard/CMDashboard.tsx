import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Col } from "antd";
import CustomerStatisticData from "@/components/dashboard/CustomerManagement/CustomerStatisticData";
import ZoneWiseCustomerStatisticData from "@/components/dashboard/CustomerManagement/ZoneWiseCustomerStatisticData";
import PopWiseCustomerStatisticData from "@/components/dashboard/CustomerManagement/PopWiseCustomerStatisticData";
import CustomerCard from "@/components/dashboard/CustomerManagement/CustomerCard";
import DeviceOnlineCustomerData from "@/components/dashboard/CustomerManagement/DeviceOnlineCustomerData";
import { useAppSelector } from "@/store/hooks";

const CMDashboard = () => {
  const authUser = useAppSelector(state => state.auth.user);
  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col span={24}>
            <CustomerCard />
          </Col>
          {authUser && authUser.userType == "client" && (
            <Col span={24}>
              <DeviceOnlineCustomerData />
            </Col>
          )}

          <Col span={24}>
            <CustomerStatisticData />
          </Col>
          {authUser && authUser.userType == "client" && (
            <Col span={24}>
              <ZoneWiseCustomerStatisticData />
            </Col>
          )}
          {authUser && authUser.userType == "client" && (
            <Col span={24}>
              <PopWiseCustomerStatisticData />
            </Col>
          )}
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default CMDashboard;
