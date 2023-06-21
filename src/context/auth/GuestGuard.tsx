import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

// import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch({ type: "auth/setInitialized", payload: true });
    if (!router.isReady) {
      return;
    }

    dispatch({ type: "auth/setIsLoading", payload: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  // console.log(auth.isLoading, auth.isInitialized);

  if (auth.isLoading || !auth.isInitialized) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
