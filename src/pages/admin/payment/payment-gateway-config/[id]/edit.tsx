import PaymentLayout from "@/core/layouts/PaymentLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import EditPaymentGatewayConfig from "@/modules/payment/payment-gateway-config/EditPaymentGatewayConfig";

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
      {ability.can("paymentGatewayConfig.update", "") ? (
        <EditPaymentGatewayConfig id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <PaymentLayout>{page}</PaymentLayout>;

export default Home;
