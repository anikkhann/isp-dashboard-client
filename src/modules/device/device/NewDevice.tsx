import CreateDeviceForm from "@/components/forms/device/CreateDeviceForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewDevice = () => {
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
              title: <Link href="/admin/device/device">Device</Link>
            },
            {
              title: "New Device"
            }
          ]}
        />

        <Card
          title="New Device"
          style={{
            width: "80%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateDeviceForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewDevice;
