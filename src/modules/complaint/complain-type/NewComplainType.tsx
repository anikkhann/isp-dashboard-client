import CreateComplainTypeForm from "@/components/forms/complain-type/CreateComplainTypeForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewComplainType = () => {
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
              title: <Link href="/admin/complaint/complain-type">Complain</Link>
            },
            {
              title: "New Complain Type"
            }
          ]}
        />

        <Card
          title="New Complain Type"
          style={{
            width: "80%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateComplainTypeForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewComplainType;
