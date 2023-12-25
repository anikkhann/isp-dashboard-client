import CustomerCareLayout from "@/core/layouts/CustomerCareLayout";

import AppLoader from "@/lib/AppLoader";
import NewExpireDateUpdate from "@/modules/customer-care/expire-date-update/NewExpireDateUpdate";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("customerCare.expireDate", "") ? (
        <NewExpireDateUpdate />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => (
  <CustomerCareLayout>{page}</CustomerCareLayout>
);

export default Home;
