import CreateClientForm from "@/components/forms/client/CreateClientForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewZoneInCharge = () => {
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
              title: <Link href="/admin/zone">Zone Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/zone/zone-in-charge">Zone in Charge</Link>
              )
            },
            {
              title: "New Zone in Charge"
            }
          ]}
        />

        <Card
          title="New Zone in Charge"
          style={{
            width: "80%",
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

export default NewZoneInCharge;
