import DeviceLayout from "@/core/layouts/DeviceLayout";
import AppLoader from "@/lib/AppLoader";
import EditIpManagement from "@/modules/device/ip-management/EditIpManagement";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("ip.update", "") ? (
        <EditIpManagement id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <DeviceLayout>{page}</DeviceLayout>;

export default Home;
