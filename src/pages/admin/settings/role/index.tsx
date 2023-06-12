import DefaultLayout from "@/core/layouts/DefaultLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";

import RoleList from "@/modules/settings/role/RoleList";
import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("role.view", "") ? <RoleList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

export default Home;
