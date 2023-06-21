import CreateRoleForm from "@/components/forms/role/CreateRoleForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewClient = () => {
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
              title: <Link href="/admin/settings">Settings</Link>
            },
            {
              title: <Link href="/admin/settings/role">Roles</Link>
            },
            {
              title: "New Role"
            }
          ]}
        />

        <Card
          title="New Role"
          style={{
            width: "80%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateRoleForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewClient;
