import DeviceLayout from "@/core/layouts/DeviceLayout";
import AppLoader from "@/lib/AppLoader";
import IpManagementList from "@/modules/device/ip-management/IpManagementList";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("ip.list", "") ? <IpManagementList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <DeviceLayout>{page}</DeviceLayout>;

export default Home;
