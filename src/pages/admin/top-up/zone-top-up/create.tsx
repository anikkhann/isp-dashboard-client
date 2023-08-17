import TopUpLayout from "@/core/layouts/TopUpLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import NewZoneTopUp from "@/modules/top-up/zoneTopUp/NewZoneTopUp";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("zoneTopUp.create", "") ? <NewZoneTopUp /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <TopUpLayout>{page}</TopUpLayout>;

export default Home;
