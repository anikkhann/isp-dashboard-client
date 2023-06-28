import RetailLayout from "@/core/layouts/RetailLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import RetailList from "@/modules/retail/retail/RetailList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("user.view", "") ? <RetailList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <RetailLayout>{page}</RetailLayout>;

export default Home;
