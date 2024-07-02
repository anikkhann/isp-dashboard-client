// import HotspotLayout from "@/core/layouts/HotspotLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";
import MonitoringDashboard from "@/modules/dashboard/MonitoringDashboard";
import MonitoringLayout from "@/core/layouts/MonitoringLayout";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("monitoring.dashboard", "") ? (
        <MonitoringDashboard />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => (
  <MonitoringLayout>{page}</MonitoringLayout>
);

export default Home;
