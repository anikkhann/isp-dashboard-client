import ZoneLayout from "@/core/layouts/ZoneLayout";
import AppLoader from "@/lib/AppLoader";
import ZoneDashboard from "@/modules/dashboard/ZoneDashboard";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("zone.dashboard", "") ? <ZoneDashboard /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ZoneLayout>{page}</ZoneLayout>;

export default Home;
