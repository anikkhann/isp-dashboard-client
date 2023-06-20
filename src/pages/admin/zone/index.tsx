import ZoneLayout from "@/core/layouts/ZoneLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import AdminList from "@/modules/user/user/UserList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("admin.view", "") ? <AdminList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ZoneLayout>{page}</ZoneLayout>;

export default Home;
