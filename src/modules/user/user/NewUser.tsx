import CreateUserForm from "@/components/forms/user/CreateUserForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewUser = () => {
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
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "5.5rem",
            marginBottom: "5.5rem"
          }}
        >
          <CreateUserForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewUser;
