import CustomerLayout from "@/core/layouts/CustomerLayout";

import AppLoader from "@/lib/AppLoader";
import ApprovedCustomerOnboardingReqList from "@/modules/customer/approved-customer-onboarding-req/ApprovedCustomerOnboardingReqList";
import Forbidden from "@/modules/errorPage/Forbidden";
import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("customer.view", "") ? (
        <ApprovedCustomerOnboardingReqList />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <CustomerLayout>{page}</CustomerLayout>;

export default Home;
