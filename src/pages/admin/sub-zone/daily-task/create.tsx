import SubZoneLayout from "@/core/layouts/SubZoneLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import NewResellerDailyTask from "@/modules/sub-zone/reseller-daily-report/NewResellerDailyTask";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("subZone.list", "") ? (
        <NewResellerDailyTask />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <SubZoneLayout>{page}</SubZoneLayout>;

export default Home;
