import ComplaintLayout from "@/core/layouts/ComplaintLayout";

import AppLoader from "@/lib/AppLoader";
import NewAdminTicket from "@/modules/complaint/adminTicket/NewAdminTicket";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("adminTicket.create", "") ? (
        <NewAdminTicket />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ComplaintLayout>{page}</ComplaintLayout>;

export default Home;
