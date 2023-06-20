import DeviceLayout from "@/core/layouts/DeviceLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import EditAdmin from "@/modules/settings/admin/EditAdmin";

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
      {ability.can("admin.update", "") ? <EditAdmin id={id} /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <DeviceLayout>{page}</DeviceLayout>;

export default Home;
