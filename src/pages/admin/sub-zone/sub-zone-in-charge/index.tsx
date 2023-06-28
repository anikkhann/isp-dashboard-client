import SubZoneLayout from "@/core/layouts/SubZoneLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import SubZoneInChargeList from "@/modules/sub-zone/sub-zone-in-charge/SubZoneInChargeList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("user.view", "") ? <SubZoneInChargeList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <SubZoneLayout>{page}</SubZoneLayout>;

export default Home;
