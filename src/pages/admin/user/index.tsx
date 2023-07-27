import AppLoader from "@/lib/AppLoader";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";
import UserLayout from "@/core/layouts/UserLayout";
import MainDashboard from "@/modules/dashboard/MainDashboard";
import ability from "@/services/guard/ability";
import Forbidden from "@/modules/errorPage/Forbidden";

const Home = () => {
  const auth = useAppSelector(state => state.auth);
  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("user.dashboard", "") ? <MainDashboard /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>;

export default Home;
