import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import Failed from "@/modules/failed/Failed";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("dashboard.view", "") ? <Failed /> : <Forbidden />}
    </>
  );
};

export default Home;
