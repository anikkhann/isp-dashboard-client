import CreateGatewayConfigForm from "@/components/forms/notification/gatewayConfig/CreateGatewayConfigForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewSmsAlertConfig = () => {
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
              title: <Link href="/admin/notification">Notification</Link>
            },
            {
              title: "New Gateway"
            }
          ]}
        />

        <Card
          title="New Gateway"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateGatewayConfigForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewSmsAlertConfig;
