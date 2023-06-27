import CreateRoleForm from "@/components/forms/role/CreateRoleForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewNetwork = () => {
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
              title: <Link href="/admin/client">Client Dashboard</Link>
            },
            {
              title: <Link href="/admin/client/client">Client</Link>
            },
            {
              title: "New Client"
            }
          ]}
        />

        <Card
          title="New Client"
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

export default NewNetwork;
