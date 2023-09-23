import AccountLayout from "@/core/layouts/AccountLayout";

import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import RejectZoneRevenueDisbursement from "@/modules/accounting/zoneRevenueDisbursement/RejectZoneRevenueDisbursement";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("zoneRevenueDisbursement.reject", "") ? (
        <RejectZoneRevenueDisbursement id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <AccountLayout>{page}</AccountLayout>;

export default Home;
