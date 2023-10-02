import CreateZoneTopUpRequestForm from "@/components/forms/zoneTopUpRequest/CreateZoneTopUpRequestForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewZoneTopUpRequest = () => {
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
              title: <Link href="/admin/top-up">Top Up Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/top-up/zone-top-up-request">
                  Zone Top Up Request
                </Link>
              )
            },
            {
              title: "New Zone Top Up Request"
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
            New Zone Top Up Request
          </h1>
        </div>
        <Card
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
          <CreateZoneTopUpRequestForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewZoneTopUpRequest;
