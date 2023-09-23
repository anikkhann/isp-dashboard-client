import AccountLayout from "@/core/layouts/AccountLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";
import AgentTransactionList from "@Modules/accounting/agentTransaction/AgentTransactionList";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("accounting.agentTransaction", "") ? (
        <AgentTransactionList />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <AccountLayout>{page}</AccountLayout>;

export default Home;
