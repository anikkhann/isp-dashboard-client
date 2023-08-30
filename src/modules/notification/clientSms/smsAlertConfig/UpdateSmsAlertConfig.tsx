import UpdateSmsAlertForm from "@/components/forms/notification/smsAlert/UpdateSmsAlertForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const UpdateSmsAlertConfig = () => {
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
              title: "Sms Alert Config"
            }
          ]}
        />

        <Card
          title="Update Sms Alert Config"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <UpdateSmsAlertForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default UpdateSmsAlertConfig;
