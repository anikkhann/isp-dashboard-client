import CreateCustomerReqForm from "@/components/forms/customer-req/CreateCustomerReqForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewCustomerOnboardingReq = () => {
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
              title: <Link href="/admin/customer">Customer Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/customer/customer-onboarding-req">
                  customer Request
                </Link>
              )
            },
            {
              title: "New Customer Request"
            }
          ]}
        />

        <Card
          title="New Customer Request"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateCustomerReqForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewCustomerOnboardingReq;
