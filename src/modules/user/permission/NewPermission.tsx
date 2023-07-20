import CreatePermissionForm from "@/components/forms/permission/CreatePermissionForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Breadcrumb, Card } from "antd";
import Link from "next/link";

import React from "react";

const NewPermission = () => {
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
              title: <Link href="/admin/user">User</Link>
            },
            {
              title: <Link href="/admin/user/permission">Permissions</Link>
            },
            {
              title: "New Permission"
            }
          ]}
        />

        <Card
          title="New Permission"
          hoverable
          style={{
            width: "80%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "3rem",
            marginBottom: "3rem"
          }}
        >
          <CreatePermissionForm />
        </Card>
      </AppRowContainer>
    </>
  );
};

export default NewPermission;
