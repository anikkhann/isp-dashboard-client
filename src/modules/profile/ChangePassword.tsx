import ChangePasswordForm from "@/components/forms/profile/ChangePasswordForm";
import AppRowContainer from "@/lib/AppRowContainer";

import React from "react";

const ChangePassword = () => {
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
            Change Password
          </h1>
          <ChangePasswordForm />
        </div>
      </AppRowContainer>
    </>
  );
};

export default ChangePassword;
