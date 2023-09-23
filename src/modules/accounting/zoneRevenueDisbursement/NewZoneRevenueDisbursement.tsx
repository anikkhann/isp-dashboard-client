import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";
import CreateZoneRevenueDisbursementForm from "@Components/forms/zoneRevenueDisbursement/CreateZoneRevenueDisbursementForm";

const NewZoneRevenueDisbursement = () => {
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
              title: <Link href="/admin/accounting">Accounting</Link>
            },
            {
              title: (
                <Link href="/admin/accounting/zone-revenue-disbursement">
                  Zone Revenue Disbursement
                </Link>
              )
            },
            {
              title: "New Zone Revenue Disbursement"
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
            New Zone Revenue Disbursement
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
          <CreateZoneRevenueDisbursementForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewZoneRevenueDisbursement;
