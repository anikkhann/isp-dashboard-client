import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";
import React from "react";
import CreateRetailerOnboardForm from "@/components/forms/retailer-onboard/CreateRetailerOnboardForm";

const NewRetailerOnboard = () => {
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
              title: <Link href="/admin/hotspot">Hotspot Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/hotspot/retailer-onboard">
                  Retailer Onboard
                </Link>
              )
            },
            {
              title: "New Retailer Onboard"
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
            New Retailer Onboard
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
          <CreateRetailerOnboardForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewRetailerOnboard;
