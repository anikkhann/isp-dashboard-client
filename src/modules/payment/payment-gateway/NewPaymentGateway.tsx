import CreatePaymentGatewayForm from "@/components/forms/paymentGateway/CreatePaymentGatewayForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewPaymentGateway = () => {
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
              title: <Link href="/admin/payment">payment Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/payment/payment-gateway">
                  Payment Gateway
                </Link>
              )
            },
            {
              title: "New payment Gateway"
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
            New Payment Gateway
          </h1>
        </div>
        <Card
          // title="New Payment Gateway"
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
          <CreatePaymentGatewayForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewPaymentGateway;
