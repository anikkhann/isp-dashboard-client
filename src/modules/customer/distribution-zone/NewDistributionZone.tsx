import CreateUserForm from "@/components/forms/user/CreateUserForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewDistributionZone = () => {
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
              title: <Link href="/admin/user">Customer</Link>
            },
            {
              title: <Link href="/admin/user/user">Distribution Zone</Link>
            },
            {
              title: "New Distribution Zone"
            }
          ]}
        />

        <Card
          title="New Distribution Zone"
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

export default NewDistributionZone;
