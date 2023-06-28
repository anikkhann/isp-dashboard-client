import ClientLayout from "@/core/layouts/ClientLayout";

import AppLoader from "@/lib/AppLoader";
import EditClient from "@/modules/client/client/EditClient";
import Forbidden from "@/modules/errorPage/Forbidden";

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
      {ability.can("user.update", "") ? <EditClient id={id} /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default Home;
