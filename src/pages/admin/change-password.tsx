import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import ChangePassword from "@/modules/profile/ChangePassword";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("dashboard.view", "") ? <ChangePassword /> : <Forbidden />}
    </>
  );
};

export default Home;
