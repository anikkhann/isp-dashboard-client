import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Note: Home Page
const Home = () => {
  const router = useRouter();

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      router.replace("/admin");
    }
  }, [router, token]);

  return (
    <>
      <div className="min-h-screen min-w-screen">Dashboard</div>
    </>
  );
};

export default Home;
