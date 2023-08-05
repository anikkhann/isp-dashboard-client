import CreateCustomerForm from "@/components/forms/customer/CreateCustomerForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb } from "antd";
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
        <div
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            // border: "1px solid #F15F22",
            textAlign: "center"
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              color: "#F15F22"
            }}
          >
            New Customer
          </h1>
        </div>
        {/* <Card
          title="New Customer"
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
          <CreateCustomerForm />
        </Card> */}
        <CreateCustomerForm />
      </AppRowContainer>
    </>
  );
};

export default NewCustomer;
