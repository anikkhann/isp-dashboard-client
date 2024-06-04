// import AppLoader from "@/lib/AppLoader";
// import Forbidden from "@/modules/errorPage/Forbidden";
// import Success from "@/modules/success/Success";

// import ability from "@/services/guard/ability";
// import { useAppSelector } from "@/store/hooks";

// const Home = () => {
//   const auth = useAppSelector(state => state.auth);

//   return (
//     <>
//       {auth.isLoading && <AppLoader />}
//       {ability.can("dashboard.view", "") ? <Success /> : <Forbidden />}
//     </>
//   );
// };

// export default Home;
import AppAsyncComponent from "@/lib/AppAsyncComponent";

export default AppAsyncComponent(
  () => import("@Modules/success/Success"),
  false
);
