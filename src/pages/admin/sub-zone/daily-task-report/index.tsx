import SubZoneLayout from "@/core/layouts/SubZoneLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import ResellerDailyReportList from "@/modules/sub-zone/reseller-daily-report/ResellerDailyReportList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("dailyTaskReport.list", "") ? (
        <ResellerDailyReportList />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <SubZoneLayout>{page}</SubZoneLayout>;

export default Home;
