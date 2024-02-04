import ClientLayout from "@/core/layouts/ClientLayout";
import AppLoader from "@/lib/AppLoader";
import RadiusIpList from "@/modules/client/radiusIp/RadiusIpList";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("radiusIp.list", "") ? <RadiusIpList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default Home;
