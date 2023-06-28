import SubZoneLayout from "@/core/layouts/SubZoneLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import EditSubZoneInCharge from "@/modules/sub-zone/sub-zone-in-charge/EditSubZoneInCharge";

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
      {ability.can("user.update", "") ? (
        <EditSubZoneInCharge id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <SubZoneLayout>{page}</SubZoneLayout>;

export default Home;
