import NotificationLayout from "@/core/layouts/NotificationLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import EmailSettingList from "@/modules/notification/email-setting/EmailSettingList";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("emailNotification.list", "") ? (
        <EmailSettingList />
      ) : (
        <Forbidden />
      )}
    </>
  );
};

Home.getLayout = (page: ReactNode) => (
  <NotificationLayout>{page}</NotificationLayout>
);

export default Home;
