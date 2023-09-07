import AppLoader from "@/lib/AppLoader";
import Forbidden from "@/modules/errorPage/Forbidden";
import DetailsProfile from "@/modules/profile/DetailsProfile";

import ability from "@/services/guard/ability";
import { useAppSelector } from "@/store/hooks";

const Home = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      {auth.isLoading && <AppLoader />}
      {ability.can("dashboard.view", "") ? <DetailsProfile /> : <Forbidden />}
    </>
  );
};

export default Home;
