// export default Success;
/* eslint-disable @typescript-eslint/no-explicit-any */

// import DetailsProfileData from "@/components/details/profile/DetailsProfileData";
import AppRowContainer from "@/lib/AppRowContainer";
import { useAppSelector } from "@/store/hooks";
import { Card } from "antd";

import React from "react";

const Success = () => {
  const authUser = useAppSelector(state => state.auth.user);

  return (
    <>
      <AppRowContainer>
        {authUser && (
          <Card
            className=" bg-white p-8 rounded shadow-lg text-center relative"
            style={{ margin: "0 auto", borderBottom: "4px solid #2DB48B" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4"
              style={{ color: "#2DB48B", height: "6rem", width: "6rem" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.293 9.293a1 1 0 011.414 0l3 3a1 1 0 001.414 0l7-7a1 1 0 10-1.414-1.414l-6.293 6.293a1 1 0 01-1.414 0l-2.293-2.293a1 1 0 00-1.414 1.414l3 3z"
                clip-rule="evenodd"
              />
            </svg>

            <h1
              className="text-2xl font-bold mb-4"
              style={{ color: "#2DB48B" }}
            >
              Payment Successful
            </h1>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="focus:outline-none focus:shadow-outline"
              style={{
                backgroundColor: "#4B6BFB",
                color: "white",
                cursor: "pointer",
                fontWeight: "700",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem"
              }}
            >
              Go To Dashboard
            </button>
          </Card>
        )}
        {/* </Card> */}
      </AppRowContainer>
    </>
  );
};

export default Success;
