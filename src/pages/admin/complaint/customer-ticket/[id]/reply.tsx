import ComplaintLayout from "@/core/layouts/ComplaintLayout";

import AppLoader from "@/lib/AppLoader";
import EditCustomerTicket from "@/modules/complaint/customerTicket/EditCustomerTicket";
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
      {ability.can("customerTicket.update", "") ? (
        <EditCustomerTicket id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ComplaintLayout>{page}</ComplaintLayout>;

export default Home;
