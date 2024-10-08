import NotificationLayout from "@/core/layouts/NotificationLayout";
import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import EditSystemSmsTemplate from "@/modules/notification/systemSmsTemplate/EditSystemSmsTemplate";

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
      {ability.can("systemSmsTemplate.update", "") ? (
        <EditSystemSmsTemplate id={id} />
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
