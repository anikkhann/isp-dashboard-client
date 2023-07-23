import CreateDistributionZoneForm from "@/components/forms/distribution-zone/CreateDistributionZoneForm";
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
              title: <Link href="/admin/customer">Customer</Link>
            },
            {
              title: (
                <Link href="/admin/customer/distribution-zone">
                  Distribution Zone
                </Link>
              )
            },
            {
              title: "New Distribution Zone"
            }
          ]}
        />

        <Card
          title="New Distribution Zone"
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "3rem",
            marginBottom: "3rem"
          }}
        >
          <CreateDistributionZoneForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewDistributionZone;
