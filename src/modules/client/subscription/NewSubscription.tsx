import CreateSubscriptionForm from "@/components/forms/subscription/CreateSubscriptionForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewSubscription = () => {
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
              title: <Link href="/admin/client">CLient</Link>
            },
            {
              title: <Link href="/admin/client/subscription">Subscription</Link>
            },
            {
              title: "New Subscription"
            }
          ]}
        />

        <Card
          title="New Subscription"
          style={{
            width: "80%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateSubscriptionForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewSubscription;
