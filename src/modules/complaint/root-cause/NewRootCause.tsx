import CreateRootCauseForm from "@/components/forms/root-cause/CreateRootCauseForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewRootCause = () => {
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
              title: <Link href="/admin/complaint">Complain Dashboard</Link>
            },
            {
              title: <Link href="/admin/complaint/root-cause">Root Cause</Link>
            },
            {
              title: "New Root Cause"
            }
          ]}
        />

        <Card
          title="New Root Cause"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateRootCauseForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewRootCause;
