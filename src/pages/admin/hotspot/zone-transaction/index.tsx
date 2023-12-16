import HotspotLayout from "@/core/layouts/HotspotLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import ZoneTransactionList from "@/modules/hotspot/zone-transaction/ZoneTransactionList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("zoneTransaction.list", "") ? (
        <ZoneTransactionList />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <HotspotLayout>{page}</HotspotLayout>;

export default Home;
