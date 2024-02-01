import ClientLayout from "@/core/layouts/ClientLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import DetailsSurvey from "@Modules/client/survey/DetailsSurvey";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("survey.view", "") ? (
        <DetailsSurvey id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default Home;
