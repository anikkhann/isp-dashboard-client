import CustomerLayout from "@/core/layouts/CustomerLayout";

import AppLoader from "@/lib/AppLoader";
import CustomerOnboardingReqList from "@/modules/customer/customer-onboarding-req/CustomerOnboardingReqList";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("customer.list", "") ? (
        <CustomerOnboardingReqList />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <CustomerLayout>{page}</CustomerLayout>;

export default Home;
