import CreateSystemSmsForm from "@/components/forms/notification/systemSmsTemplate/CreateSystemSmsForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewSystemSmsTemplate = () => {
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
              title: "New System SMS Template"
            }
          ]}
        />

        <Card
          title="New System SMS Template"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateSystemSmsForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewSystemSmsTemplate;
