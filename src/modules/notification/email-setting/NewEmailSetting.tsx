import CreateEmailSettingForm from "@/components/forms/notification/emailSetting/CreateEmailSettingForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewEmailSetting = () => {
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
              title: "New Email Setting"
            }
          ]}
        />

        <Card
          title="New Email Setting"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateEmailSettingForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewEmailSetting;
