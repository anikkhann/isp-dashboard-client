import SettingLayout from "@/core/layouts/SettingLayout";
import AppLoader from "@/lib/AppLoader";
import SettingDashboard from "@/modules/dashboard/SettingDashboard";
import { useAppSelector } from "@/store/hooks";

import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);
  return (
    <>
      {auth.isLoading && <AppLoader />}
      <SettingDashboard />
    </>
  );
};

Home.getLayout = (page: ReactNode) => <SettingLayout>{page}</SettingLayout>;

export default Home;
