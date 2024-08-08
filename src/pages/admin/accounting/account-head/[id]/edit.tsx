import AccountLayout from "@/core/layouts/AccountLayout";
import AppLoader from "@/lib/AppLoader";
import EditAccountHead from "@/modules/accounting/account-head/EditAccountHead";
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
      {ability.can("accountHead.update", "") && id ? (
        <EditAccountHead id={id} />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <AccountLayout>{page}</AccountLayout>;

export default Home;
