import PaymentLayout from "@/core/layouts/PaymentLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import PaymentGatewayConfigList from "@/modules/payment/payment-gateway-config/PaymentGatewayConfigList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("paymentGatewayConfig.list", "") ? (
        <PaymentGatewayConfigList />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <PaymentLayout>{page}</PaymentLayout>;

export default Home;
