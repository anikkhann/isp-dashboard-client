import CreateBulkSmsForm from "@/components/forms/notification/bulkSms/CreateBulkSmsForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewBulkSms = () => {
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
              title: "New Bulk SMS"
            }
          ]}
        />

        <Card
          title="New Bulk SMS"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateBulkSmsForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewBulkSms;
