import CreateNetworkForm from "@/components/forms/network/CreateNetworkForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewNetwork = () => {
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
              title: <Link href="/admin/device/network">Network</Link>
            },
            {
              title: "New Network"
            }
          ]}
        />

        <Card
          title="New Network"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateNetworkForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewNetwork;
