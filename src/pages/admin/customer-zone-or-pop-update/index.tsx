import CustomerCareLayout from "@/core/layouts/CustomerCareLayout";

import AppLoader from "@/lib/AppLoader";
import SearchZonPopList from "@/modules/customer-care/zone-or-pop-update/SearchZonPopList";

import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("customerCare.distributionZoneUpdate", "") ? (
        <SearchZonPopList />
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
