import SettingLayout from "@/core/layouts/SettingLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import PermissionList from "@/modules/settings/permission/PermissionList";
import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";

import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("permission.view", "") ? <PermissionList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <SettingLayout>{page}</SettingLayout>;

export default Home;
