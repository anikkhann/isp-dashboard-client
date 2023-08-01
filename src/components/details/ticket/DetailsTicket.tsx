import { TicketData } from "@/interfaces/TicketData";
import { Card, Col, Row } from "antd";
import React from "react";

interface PropData {
  item: TicketData;
}

const DetailsTicket = ({ item }: PropData) => {
  console.log(item);
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
      <Col
        xs={24}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="gutter-row"
      >
        <Card
          title={item.ticketNo}
          bordered={false}
          style={{ textAlign: "start" }}
        >
          <div style={{ textAlign: "start" }}>
            <p>
              <span className="font-bold">Customer ID:</span>
              <span className="mx-2">1232244</span>
            </p>
            <p>
              <span className="font-bold">Customer Name:</span>
              <span className="mx-2">Nazmul Hasan</span>
            </p>
            <p>
              <span className="font-bold"> Created By:</span>
              <span className="mx-2">Sayem Sadat</span>
            </p>
            <p>
              <span className="font-bold">Assigned To:</span>
              <span className="mx-2">Hasan Mahmud</span>
            </p>
          </div>
        </Card>

        <Card
          // title="Card title"
          bordered={false}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "start"
          }}
        >
          <div style={{ textAlign: "start" }}>
            <h1 className="font-bold text-lg">Internet Slow</h1>
            <p className="text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium quis, numquam error adipisci molestiae dolorem velit
              inventore dolores esse soluta ea facere qui nemo veritatis tempora
              quidem corporis odio perferendis?
            </p>
          </div>
        </Card>
      </Col>
      {/* <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col> */}
      <Col
        xs={24}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="gutter-row"
      >
        <Card
          // title="Card title"
          bordered={false}
          style={{ textAlign: "start" }}
        >
          <div style={{ textAlign: "start" }}>
            <h1 className="font-bold text-xl text-[#4361ee]">Reply History</h1>
            <div>
              <p>
                <span className="font-bold text-base">Rayhan Mollik</span>
                <span className="mx-2">-</span>
                <span className="mx-2">29 May 2023</span>{" "}
                <span className="mx-2">10:20 AM</span>
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                magni facere unde officia quasi harum ducimus cupiditate sit in
                alias quam ab vel cum, excepturi iusto culpa! Praesentium,
                cupiditate nisi!
              </p>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsTicket;
