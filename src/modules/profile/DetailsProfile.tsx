/* eslint-disable @typescript-eslint/no-explicit-any */

import DetailsProfileData from "@/components/details/profile/DetailsProfileData";
import AppRowContainer from "@/lib/AppRowContainer";
import { useAppSelector } from "@/store/hooks";
import { Card } from "antd";

import React from "react";

const DetailsProfile = () => {
  const authUser = useAppSelector(state => state.auth.user);

  return (
    <>
      <AppRowContainer>
        <div
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            // border: "1px solid #F15F22",
            textAlign: "center"
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              color: "#F15F22"
            }}
          >
            Profile Details
          </h1>
        </div>
        <Card
          style={{
            width: "90%",
            backgroundColor: "#ECF0F1",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem"
          }}
        >
          {authUser && <DetailsProfileData item={authUser} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default DetailsProfile;
