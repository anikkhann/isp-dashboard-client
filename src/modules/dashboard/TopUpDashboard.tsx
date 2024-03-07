import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
// import { Card, Col, Select, Space } from "antd";
import { Col } from "antd";
import ZoneTopUpData from "@/components/dashboard/TopUp/ZoneTopUpData";
import AgentTopUpData from "@/components/dashboard/TopUp/AgentTopUpData";
import { useAppSelector } from "@/store/hooks";

const TopUpDashboard = () => {
  const authUser = useAppSelector(state => state.auth.user);

  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col span={24}>
            <AgentTopUpData />
          </Col>
          {authUser && authUser.userType == "client" && (
            <Col span={24}>
              <ZoneTopUpData />
            </Col>
          )}
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default TopUpDashboard;
