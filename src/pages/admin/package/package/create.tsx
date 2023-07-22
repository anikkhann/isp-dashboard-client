import PackageLayout from "@/core/layouts/PackageLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import NewPackage from "@/modules/package/package/NewPackage";
import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("package.create", "") ? <NewPackage /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <PackageLayout>{page}</PackageLayout>;

export default Home;
