import CreateCustomerTypeForm from "@/components/forms/customer-type/CreateCustomerTypeForm";

import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewCustomerType = () => {
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
              title: (
                <Link href="/admin/customer/customer-type">Customer Types</Link>
              )
            },
            {
              title: "New Customer Type"
            }
          ]}
        />

        <Card
          title="New Customer Type"
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "3rem",
            marginBottom: "3rem"
          }}
        >
          <CreateCustomerTypeForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewCustomerType;
