import RetailLayout from "@/core/layouts/RetailLayout";
import AppLoader from "@/lib/AppLoader";
import MainDashboard from "@/modules/dashboard/MainDashboard";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("dashboard.view", "") ? <MainDashboard /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <RetailLayout>{page}</RetailLayout>;

export default Home;
