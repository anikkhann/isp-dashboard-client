import CreateBwNttnProviderForm from "@/components/forms/bwnttnProvider/CreateBwNttnProviderForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewBwNttnProvider = () => {
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
              title: <Link href="/admin/user">User Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/user/bw-nttn-provider">
                  Bw Nttn Provider
                </Link>
              )
            },
            {
              title: "New Bw Nttn Provider"
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
            New Bw Nttn Provider
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
          <CreateBwNttnProviderForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewBwNttnProvider;
