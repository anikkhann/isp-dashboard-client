import CreateUserForm from "@/components/forms/user/CreateUserForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewApprovedCustomerOnboardingReq = () => {
  return (
    <>
      <AppRowContainer>
        <Breadcrumb
          style={{
            margin: "10px 30px",
            textAlign: "left"
          }}
          items={[
            {
              title: <Link href="/admin">Home</Link>
            },
            {
              title: <Link href="/admin/user">User</Link>
            },
            {
              title: <Link href="/admin/user/user">User</Link>
            },
            {
              title: "New User"
            }
          ]}
        />

        <Card
          title="New User"
          style={{
            width: "80%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateUserForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewApprovedCustomerOnboardingReq;
