import UserLayout from "@/core/layouts/UserLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import UserList from "@/modules/user/user/UserList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("user.list", "") ? <UserList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>;

export default Home;
