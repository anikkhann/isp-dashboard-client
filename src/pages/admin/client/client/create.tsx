import ClientLayout from "@/core/layouts/ClientLayout";
import AppLoader from "@/lib/AppLoader";
import NewClient from "@/modules/client/client/NewClient";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("client.create", "") ? <NewClient /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default Home;
