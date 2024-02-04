import ClientLayout from "@/core/layouts/ClientLayout";
import AppLoader from "@/lib/AppLoader";
import NewRadiusIp from "@/modules/client/radiusIp/NewRadiusIp";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("radiusIp.create", "") ? <NewRadiusIp /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default Home;
