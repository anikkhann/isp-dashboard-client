import CreateRetailForm from "@/components/forms/retail/CreateRetailForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewRetail = () => {
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
              title: <Link href="/admin/retail">Retail Dashboard</Link>
            },
            {
              title: <Link href="/admin/retail/retail">Retail</Link>
            },
            {
              title: "New Retail"
            }
          ]}
        />

        <Card
          title="New Retail"
          hoverable
          style={{
            width: "80%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "3rem",
            marginBottom: "3rem"
          }}
        >
          <CreateRetailForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewRetail;
