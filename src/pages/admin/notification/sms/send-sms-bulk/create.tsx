import NotificationLayout from "@/core/layouts/NotificationLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import NewBulkSms from "@/modules/notification/bulkSms/NewBulkSms";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("smsBulk.create", "") ? <NewBulkSms /> : <Forbidden />}
    </>
  );
};

Home.getLayout = (page: ReactNode) => (
  <NotificationLayout>{page}</NotificationLayout>
);

export default Home;
