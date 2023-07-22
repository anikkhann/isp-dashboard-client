import CreateCustomerForm from "@/components/forms/customer/CreateCustomerForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewCustomer = () => {
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
              title: <Link href="/admin/customer">Customer Dashboard</Link>
            },
            {
              title: <Link href="/admin/customer/customer">customer</Link>
            },
            {
              title: "New Customer"
            }
          ]}
        />

        <Card
          title="New Customer"
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <CreateCustomerForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewCustomer;
