import CreatePaymentGatewayConfigForm from "@/components/forms/paymentGatewayConfig/CreatePaymentGatewayConfigForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewPaymentGatewayConfig = () => {
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
                <Link href="/admin/payment/payment-gateway-config">
                  Payment Gateway Config
                </Link>
              )
            },
            {
              title: "New Payment Gateway Config"
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
            New Payment Gateway Config
          </h1>
        </div>
        <Card
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
          <CreatePaymentGatewayConfigForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewPaymentGatewayConfig;
