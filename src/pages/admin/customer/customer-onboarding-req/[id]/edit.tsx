import CustomerLayout from "@/core/layouts/CustomerLayout";

import AppLoader from "@/lib/AppLoader";
import EditCustomerOnboardingReq from "@/modules/customer/customer-onboarding-req/EditCustomerOnboardingReq";
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
      {ability.can("customerOnboardingReq.update", "") ? (
        <EditCustomerOnboardingReq id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <CustomerLayout>{page}</CustomerLayout>;

export default Home;
