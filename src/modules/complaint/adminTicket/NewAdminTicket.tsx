import CreateAdminTicketForm from "@/components/forms/adminTicket/CreateAdminTicketForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewAdminTicket = () => {
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
              title: <Link href="/admin/complaint">Complaint Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/complaint/admin-ticket">Service Ticket</Link>
              )
            },
            {
              title: "New Service Ticket"
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
            New Service Ticket
          </h1>
        </div>
        <Card
          // title="New Admin Ticket"
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            // marginTop: "3rem",
            // marginBottom: "3rem"
            marginTop: "1rem",
            marginBottom: "1rem",
            border: "1px solid #F15F22"
          }}
        >
          <CreateAdminTicketForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewAdminTicket;
