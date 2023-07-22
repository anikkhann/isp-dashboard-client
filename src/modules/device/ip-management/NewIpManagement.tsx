import CreateIPForm from "@/components/forms/ip/CreateIPForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewIpManagement = () => {
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
              title: <Link href="/admin/device">Device Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/device/ip-management">IP Management</Link>
              )
            },
            {
              title: "New IP Management"
            }
          ]}
        />

        <Card
          title="New IP Management"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateIPForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewIpManagement;
