import PaymentLayout from "@/core/layouts/PaymentLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import EditPaymentGateway from "@/modules/payment/payment-gateway/EditPaymentGateway";

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
      {ability.can("paymentGateway.update", "") ? (
        <EditPaymentGateway id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <PaymentLayout>{page}</PaymentLayout>;

export default Home;
