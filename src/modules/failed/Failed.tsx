// export default Success;
/* eslint-disable @typescript-eslint/no-explicit-any */

// import DetailsProfileData from "@/components/details/profile/DetailsProfileData";
import AppRowContainer from "@/lib/AppRowContainer";
import { useAppSelector } from "@/store/hooks";
import { Card } from "antd";

import React from "react";
interface FailedProps {
  message: string;
}
const Failed: React.FC<FailedProps> = ({ message }) => {
  const authUser = useAppSelector(state => state.auth.user);

  return (
    <>
      <AppRowContainer>
        {authUser && (
          <Card
            className=" bg-white p-8 rounded shadow-lg text-center relative"
            style={{ margin: "0 auto", borderBottom: "4px solid #EE5921" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4"
              style={{ color: "#EE5921", height: "6rem", width: "6rem" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm0 14a6 6 0 100-12 6 6 0 000 12zm-.707-9.293a1 1 0 00-1.414 1.414L8.586 10 7.293 11.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>

            <h1
              className="text-2xl font-bold mb-4"
              style={{ color: "#EE5921" }}
            >
              Payment Unsuccessful
            </h1>
            <div>
              <p className="font-semibold text-center">{message}</p>
            </div>
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

export default Failed;
