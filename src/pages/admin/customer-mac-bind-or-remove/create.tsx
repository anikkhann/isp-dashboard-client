import CustomerCareLayout from "@/core/layouts/CustomerCareLayout";

import AppLoader from "@/lib/AppLoader";
import NewMacUpdate from "@/modules/customer-care/mac-update/NewMacUpdate";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("customerCare.macUpdate", "") ? (
        <NewMacUpdate />
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
