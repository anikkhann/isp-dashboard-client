import TopUpLayout from "@/core/layouts/TopUpLayout";
import AppLoader from "@/lib/AppLoader";
import TopUpDashboard from "@/modules/dashboard/TopUpDashboard";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("topUp.dashboard", "") ? <TopUpDashboard /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <TopUpLayout>{page}</TopUpLayout>;

export default Home;
