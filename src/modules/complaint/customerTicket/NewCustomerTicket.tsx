import CreateTicketForm from "@/components/forms/ticket/CreateTicketForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewCustomerTicket = () => {
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
              title: <Link href="/admin/complaint">Complain Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/complaint/customer-ticket">
                  Customer Ticket
                </Link>
              )
            },
            {
              title: "New Customer Ticket"
            }
          ]}
        />

        <Card
          title="New Customer Ticket"
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
          <CreateTicketForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewCustomerTicket;
