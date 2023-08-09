import React from "react";
import { Button, Card } from "antd";

import styled from "styled-components";
import Link from "next/link";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Can } from "@/services/guard/Can";

export const StyledCard = styled(Card)`
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',

  `;

interface CardProps {
  title: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  hasLink: boolean;
  addLink: string;
  permission: string;
  btnText?: string;
}

const TableCard = ({
  title,
  style,
  addLink,
  hasLink,
  permission,
  children,
  btnText = "Add New"
}: CardProps) => (
  <Card
    title={title}
    style={style}
    extra={
      hasLink && (
        <Can I={permission}>
          <Link href={addLink}>
            <Button
              type="primary"
              icon={<PlusSquareOutlined />}
              size={"middle"}
              style={{ marginLeft: "1rem" }}
            >
              {btnText}
            </Button>
          </Link>
        </Can>
      )
    }
  >
    {children}
  </Card>
);

export default TableCard;
