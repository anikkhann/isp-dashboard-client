import HotspotLayout from "@/core/layouts/HotspotLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import HotspotPackageList from "@/modules/hotspot/package/HotspotPackageList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("hotspotPackage.list", "") ? (
        <HotspotPackageList />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <HotspotLayout>{page}</HotspotLayout>;

export default Home;
