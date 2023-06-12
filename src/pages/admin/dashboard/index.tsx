import MainDashboard from "@/modules/dashboard/MainDashboard";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin");
  }, [router]);

  return (
    <>
      <div className="min-h-screen min-w-screen">
        <MainDashboard />
      </div>
    </>
  );
};

export default Home;
