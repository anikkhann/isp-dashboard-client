import { TicketData } from "@/interfaces/TicketData";
import { Card, Col, Row } from "antd";
import React from "react";

interface PropData {
  item: TicketData;
}

const DetailsTicket = ({ item }: PropData) => {
  console.log(item);
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title={item.ticketNo} bordered={false}>
          <p>Customer ID:{item.customerId}</p>
          <p>Customer Name:{item.customer.name}</p>
          <p>Created By:</p>
          <p>Assigned To:</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsTicket;
