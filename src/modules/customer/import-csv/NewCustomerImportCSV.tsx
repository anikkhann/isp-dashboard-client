import CreateCustomerImportCsvForm from "@/components/forms/customer-import-csv/CreateCustomerImportCsvForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb } from "antd";
import Link from "next/link";

import React from "react";

const NewCustomerImportCSV = () => {
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
                <Link href="/admin/customer/import-csv">
                  Customer Import CSV
                </Link>
              )
            },
            {
              title: "New Customer Import CSV"
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
            New Customer Import CSV
          </h1>
        </div>
        <CreateCustomerImportCsvForm />
      </AppRowContainer>
    </>
  );
};

export default NewCustomerImportCSV;
