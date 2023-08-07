import { TicketData } from "@/interfaces/TicketData";
import { FileImageOutlined } from "@ant-design/icons";
import { Card, Col, Row, Button } from "antd";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";

interface PropData {
  item: TicketData;
  replys: any;
}

const DetailsTicket = ({ item, replys }: PropData) => {
  const [createdDate, setCreatedDate] = useState<Date | null>(null);
  const [timeDiff, setTimeDiff] = useState<string>("");

  function timeDifference(timestamp = Date.now()) {
    const inputDate = new Date(timestamp);
    setTimeDiff(formatDistanceToNow(inputDate, { addSuffix: true }));
  }

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (item.createdOn) {
      setCreatedDate(new Date(item.createdOn));
      timeDifference(item.createdOn);
    }
  }, [item]);

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={12}
        xxl={12}
        className="gutter-row"
      >
        <Card
          title={
            <div className="flex justify-between">
              <h1 className="font-bold text-lg text-[#4361ee]">
                {item.ticketNo}
              </h1>

              <Button
                style={{
                  backgroundColor: "#F15F22",
                  color: "#FFFFFF",
                  fontWeight: "bold"
                }}
              >
                {item.status}
              </Button>
            </div>
          }
          hoverable
          bordered={false}
          style={{
            textAlign: "start",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #F15F22"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p className="text-base font-semibold text-[#F15F22]">
              {timeDiff} - {createdDate?.toDateString()}
              <span className="mx-2">{createdDate?.toLocaleTimeString()}</span>
            </p>
          </div>
          <div style={{ textAlign: "start" }}>
            <p>
              <span className="font-bold">Customer ID:</span>
              <span className="mx-2">{item.customerId}</span>
            </p>
            <p>
              <span className="font-bold">Customer Name:</span>
              <span className="mx-2">{item.customer.username}</span>
            </p>
            <p>
              <span className="font-bold"> Created By:</span>
              <span className="mx-2">{item.insertedBy.username}</span>
            </p>
            <p>
              <span className="font-bold">Assigned To:</span>
              <span className="mx-2"></span>
            </p>
          </div>
        </Card>

        <Card
          // title="Card title"
          hoverable
          bordered={false}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "start",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #F15F22"
          }}
        >
          <div style={{ textAlign: "start" }}>
            <h1 className="font-bold text-lg">{item.complainType?.name}</h1>
            {item.attachment && (
              <a
                href={`${url}/ticket/public/downloadFile/${item.attachment}`}
                target="_blank"
              >
                <FileImageOutlined /> {item.attachment}
              </a>
            )}
            <p className="text-justify">{item.complainDetails}</p>
          </div>
        </Card>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={12}
        xxl={12}
        className="gutter-row"
      >
        <Card
          // title="Card title"
          hoverable
          bordered={false}
          style={{
            textAlign: "start",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #F15F22"
          }}
        >
          <div style={{ textAlign: "start" }}>
            <h1 className="font-bold text-xl text-[#4361ee]">Reply History</h1>
            {replys.map((replyData: any, index: number) => (
              <div key={index}>
                <p>
                  <span className="font-bold text-base capitalize">
                    {replyData.insertedBy.username}
                  </span>
                  <span className="mx-2">-</span>
                  <span className="mx-2">
                    {/* createdOn */}
                    {formatDistanceToNow(new Date(replyData.createdOn), {
                      addSuffix: true
                    })}{" "}
                    - {new Date(replyData.createdOn).toDateString()}
                  </span>
                  <span className="mx-2">
                    {new Date(replyData.createdOn).toLocaleTimeString()}
                  </span>
                  {replyData.attachment && (
                    <a
                      href={`${url}/ticket/public/downloadFile/${replyData.attachment}`}
                      target="_blank"
                    >
                      <FileImageOutlined /> {replyData.attachment}
                    </a>
                  )}
                </p>
                <p className="ml-10 font-semibold">{replyData.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsTicket;
