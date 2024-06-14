// pages/admin/online-payment/index.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import Success from "@/modules/success/Success";
import Failed from "@/modules/failed/Failed";
import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";

const OnlinePayment = () => {
  const router = useRouter();
  const { payment_status, message } = router.query;
  const auth = useAppSelector(state => state.auth);
  const messageStr = Array.isArray(message)
    ? message.join(", ")
    : message || "";

  // Effect to handle any side-effects or dependencies
  useEffect(() => {
    // Any additional side-effects or dependencies can be managed here
  }, [payment_status, message]);

  if (auth.isLoading) {
    return <AppLoader />;
  }

  if (!ability.can("dashboard.view", "")) {
    return <Forbidden />;
  }

  if (payment_status === "success") {
    return <Success message={messageStr} />;
  } else if (payment_status === "failed") {
    return <Failed message={messageStr} />;
  }

  return null;
};

export default OnlinePayment;
