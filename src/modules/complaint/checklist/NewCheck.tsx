import CreateChecklistForm from "@/components/forms/checklist/CreateChecklistForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewCheck = () => {
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
              title: <Link href="/admin/complain">Complain Dashboard</Link>
            },
            {
              title: <Link href="/admin/complain/checklist">Checklist</Link>
            },
            {
              title: "New Checklist"
            }
          ]}
        />

        <Card
          title="New Checklist"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateChecklistForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewCheck;
