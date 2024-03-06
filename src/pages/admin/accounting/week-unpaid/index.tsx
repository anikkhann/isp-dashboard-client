import AccountLayout from "@/core/layouts/AccountLayout";
import AppLoader from "@/lib/AppLoader";
import WeekUnpaid from "@/modules/accounting/WeekUnpaid/WeekUnpiad";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {/* {ability.can("customerImportCsv.list", "") ? ( */}
      {ability.can("accounting.dashboard-current-week-due", "") ? (
        <WeekUnpaid />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <AccountLayout>{page}</AccountLayout>;

export default Home;
