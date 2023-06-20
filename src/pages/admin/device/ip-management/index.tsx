import DeviceLayout from "@/core/layouts/DeviceLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import AdminList from "@/modules/settings/admin/AdminList";

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

Home.getLayout = (page: ReactNode) => <DeviceLayout>{page}</DeviceLayout>;

export default Home;
