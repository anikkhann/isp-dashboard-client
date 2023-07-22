import CreateClientForm from "@/components/forms/client/CreateClientForm";

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
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateClientForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewClient;
