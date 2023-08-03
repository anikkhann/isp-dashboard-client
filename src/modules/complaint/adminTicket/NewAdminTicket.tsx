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
              title: <Link href="/admin/complaint">Complain Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/complaint/admin-ticket">Admin Ticket</Link>
              )
            },
            {
              title: "New Admin Ticket"
            }
          ]}
        />

        <Card
          title="New Admin Ticket"
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
          <CreateAdminTicketForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewAdminTicket;
