/* eslint-disable @typescript-eslint/no-explicit-any */

import CreateCustomerTopUpForm from "@/components/forms/care/CreateCustomerTopUpForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";
import React from "react";

const NewPasswordChange = () => {
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
              title: <Link href="/admin/customer-care">Customer Care</Link>
            },
            {
              title: "Password Change"
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
            Password Change
          </h1>
        </div>

        <Card
          // title="New Customer Ticket"
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
            border: "1px solid #F15F22"
          }}
        >
          <CreateCustomerTopUpForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewPasswordChange;
