import CreatePackageForm from "@/components/forms/package/CreatePackageForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewPackage = () => {
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
              title: <Link href="/admin/package">Package Dashboard</Link>
            },
            {
              title: <Link href="/admin/package/package">Package</Link>
            },
            {
              title: "New package"
            }
          ]}
        />

        <Card
          title="New Package"
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
          <CreatePackageForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewPackage;
