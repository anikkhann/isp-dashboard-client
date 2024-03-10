import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
// import { Card, Col, Select, Space } from "antd";
import { Col } from "antd";
import ZoneTopUpData from "@/components/dashboard/TopUp/ZoneTopUpData";
import AgentTopUpData from "@/components/dashboard/TopUp/AgentTopUpData";
import { useAppSelector } from "@/store/hooks";
import MainDashboard from "./MainDashboard";

const TopUpDashboard = () => {
  const authUser = useAppSelector(state => state.auth.user);

  return (
    <>
      <AppAnimate>
        {/* <AppRowContainer>
          {authUser && authUser.userType == "client" ? (
            <Col span={24}>
              <AgentTopUpData />
            </Col>
          ) : (
            <MainDashboard />
          )}

          {authUser &&
          authUser.userType === "client" &&
          (authUser.clientLevel === "quad_cycle" ||
            authUser.clientLevel === "quad_cycle_hotspot" ||
            authUser.clientLevel === "quad_cycle_isp_hotspot") ? (
            <Col span={24}>
              <ZoneTopUpData />
            </Col>
          ) : (
            <MainDashboard />
          )}
        </AppRowContainer> */}
        {authUser && authUser.userType === "client" ? (
          authUser.clientLevel === "quad_cycle" ||
          authUser.clientLevel === "quad_cycle_hotspot" ||
          authUser.clientLevel === "quad_cycle_isp_hotspot" ? (
            <AppRowContainer>
              <Col span={24}>
                <AgentTopUpData />
              </Col>
              <Col span={24}>
                <ZoneTopUpData />
              </Col>
            </AppRowContainer>
          ) : (
            <AgentTopUpData />
          )
        ) : (
          <MainDashboard />
        )}
        ;
      </AppAnimate>
    </>
  );
};

export default TopUpDashboard;
