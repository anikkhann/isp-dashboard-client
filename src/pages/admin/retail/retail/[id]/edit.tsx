import RetailLayout from "@/core/layouts/RetailLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import EditRetail from "@/modules/retail/retail/EditRetail";

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
      {ability.can("user.update", "") ? <EditRetail id={id} /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <RetailLayout>{page}</RetailLayout>;

export default Home;
