import CreateSubZoneForm from "@/components/forms/sub-zone/CreateSubZoneForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewSubZoneInCharge = () => {
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
              title: <Link href="/admin/sub-zone">Sub Zone Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/sub-zone/sub-zone-in-charge">
                  Sub Zone In Charge
                </Link>
              )
            },
            {
              title: "New Sub Zone In Charge"
            }
          ]}
        />

        <Card
          title="New Sub Zone In Charge"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateSubZoneForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewSubZoneInCharge;
