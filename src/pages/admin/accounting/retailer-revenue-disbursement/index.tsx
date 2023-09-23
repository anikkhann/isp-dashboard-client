import AccountLayout from "@/core/layouts/AccountLayout";
import AppLoader from "@/lib/AppLoader";
import RetailerRevenueDisbursementList from "@/modules/accounting/retailerRevenueDisbursement/RetailerRevenueDisbursementList";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("retailerRevenueDisbursement.list", "") ? (
        <RetailerRevenueDisbursementList />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <AccountLayout>{page}</AccountLayout>;

export default Home;
