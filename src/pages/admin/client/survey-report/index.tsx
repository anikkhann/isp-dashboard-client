import ClientLayout from "@/core/layouts/ClientLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";
import SurveyReport from "@/modules/client/survey/SurveyReport";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("subscription.list", "") ? <SurveyReport /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default Home;
