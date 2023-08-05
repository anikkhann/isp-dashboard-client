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
            New Sub Zone In Charge
          </h1>
        </div>
        <Card
          // title="New Sub Zone In Charge"
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
            border: "1px solid #F15F22"
          }}
        >
          <CreateSubZoneForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewSubZoneInCharge;
