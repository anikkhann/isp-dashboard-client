import PackageLayout from "@/core/layouts/PackageLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import PackageList from "@/modules/package/package/PackageList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("package.list", "") ? <PackageList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <PackageLayout>{page}</PackageLayout>;

export default Home;
