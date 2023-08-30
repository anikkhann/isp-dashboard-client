import CreateSingleSmsForm from "@/components/forms/notification/singleSms/CreateSingleSmsForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewSingleSms = () => {
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
              title: "New Single Sms"
            }
          ]}
        />

        <Card
          title="New Single Sms"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateSingleSmsForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewSingleSms;
