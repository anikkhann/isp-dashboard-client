import UserLayout from "@/core/layouts/UserLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import VendorsList from "@/modules/user/vendors/VendorsList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("vendors.list", "") ? <VendorsList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>;

export default Home;
