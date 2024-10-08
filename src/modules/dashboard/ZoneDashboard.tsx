import ZoneCardData from "@/components/dashboard/Zone/ZoneCardData";
import ZoneWiseCardData from "@/components/dashboard/Zone/ZoneWiseCardData";
import SubZoneWiseCardData from "@/components/dashboard/Zone/SubZoneWiseCardData";
import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Col } from "antd";
const ZoneDashboard = () => {
  return (
    <>
      <AppAnimate>
        <AppRowContainer>
          <Col span={24}>
            <ZoneCardData />
          </Col>
        </AppRowContainer>
        <AppRowContainer>
          <Col span={24}>
            <ZoneWiseCardData />
          </Col>
          <Col span={24}>
            <SubZoneWiseCardData />
          </Col>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default ZoneDashboard;
