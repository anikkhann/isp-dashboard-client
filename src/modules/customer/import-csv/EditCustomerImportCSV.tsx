/* eslint-disable @typescript-eslint/no-explicit-any */

import UpdateCustomerImportCsvForm from "@/components/forms/customer-import-csv/UpdateCustomerImportCsvForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";
import React from "react";

const EditCustomerImportCSV = ({ id }: any) => {
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
              title: <Link href="/admin/customer">customer</Link>
            },
            {
              title: (
                <Link href="/admin/customer/import-csv">
                  Customer Import CSV
                </Link>
              )
            },
            {
              title: "Customer Import CSV"
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
            Edit Customer Import CSV
          </h1>
        </div>
        <Card
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
          {<UpdateCustomerImportCsvForm item={id} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default EditCustomerImportCSV;
