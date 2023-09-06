/* eslint-disable @typescript-eslint/no-explicit-any */

import CreateZonePopUpdateForm from "@/components/forms/care/CreateZonePopUpdateForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";
import React from "react";

const NewZonePopUpdate = () => {
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
              title: (
                <Link href="/admin/customer-zone-or-pop-update">
                  Zone POP Update List
                </Link>
              )
            },
            {
              title: "Zone POP Update"
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
            Zone POP Update
          </h1>
        </div>

        <Card
          // title="New Customer Ticket"
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
          <CreateZonePopUpdateForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewZonePopUpdate;
