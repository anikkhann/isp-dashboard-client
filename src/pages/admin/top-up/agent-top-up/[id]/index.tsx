import TopUpLayout from "@/core/layouts/TopUpLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import DetailsAgentTopUp from "@/modules/top-up/agentTopUp/DetailsAgentTopUp";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("agentTopUp.view", "") ? (
        <DetailsAgentTopUp id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <TopUpLayout>{page}</TopUpLayout>;

export default Home;
