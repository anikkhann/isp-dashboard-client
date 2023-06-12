import SettingLayout from "@/core/layouts/SettingLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import NewAdmin from "@/modules/settings/admin/NewAdmin";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("admin.create", "") ? <NewAdmin /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <SettingLayout>{page}</SettingLayout>;

export default Home;
