import ComplaintLayout from "@/core/layouts/ComplaintLayout";

import AppLoader from "@/lib/AppLoader";
import ChecklistList from "@/modules/complaint/checklist/ChecklistList";
import Forbidden from "@/modules/errorPage/Forbidden";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("checklist.list", "") ? <ChecklistList /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => <ComplaintLayout>{page}</ComplaintLayout>;

export default Home;
