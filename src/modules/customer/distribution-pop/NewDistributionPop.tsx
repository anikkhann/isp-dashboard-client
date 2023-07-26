import CreateDistributionPopForm from "@/components/forms/distribution-pop/CreateDistributionPopForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewDistributionPop = () => {
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
                <Link href="/admin/customer/distribution-pop">
                  Distribution Pop
                </Link>
              )
            },
            {
              title: "New Distribution Pop"
            }
          ]}
        />

        <Card
          title="New Distribution Pop"
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
          <CreateDistributionPopForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewDistributionPop;
