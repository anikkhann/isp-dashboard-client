/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { TicketData } from "@/interfaces/TicketData";
import { FileImageOutlined } from "@ant-design/icons";
import { Card, Col, Row, Button, Modal } from "antd";
import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

interface PropData {
  item: TicketData;
  replys: any;
}

const DetailsTicket = ({ item, replys }: PropData) => {
  const [createdDate, setCreatedDate] = useState<Date | null>(null);
  const [timeDiff, setTimeDiff] = useState<string>("");

  const [previewOpen, setPreviewOpen] = useState(false);
  const handleCancel = () => setPreviewOpen(false);
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [attachmentName, setAttachmentName] = useState("");

  const [replyPreviewOpen, setReplyPreviewOpen] = useState(false);
  const handleReplyCancel = () => setReplyPreviewOpen(false);
  const [replyAttachmentUrl, setReplyAttachmentUrl] = useState("");
  const [replyAttachmentName, setReplyAttachmentName] = useState("");

  function timeDifference(timestamp = Date.now()) {
    const inputDate = new Date(timestamp);
    setTimeDiff(formatDistanceToNow(inputDate, { addSuffix: true }));
  }

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (item.attachment) {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;
      setAttachmentUrl(`${url}/ticket/public/downloadFile/${item.attachment}`);
      setAttachmentName(item.attachment);
    }

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
            {item.ticketCategory === "parent" && (
              <>
                <p>
                  <span className="font-bold">Client Name:</span>
                  <span className="mx-2">{item.client?.name}</span>
                </p>
                <p>
                  <span className="font-bold">Client Username:</span>
                  <span className="mx-2">{item.client?.username}</span>
                </p>
              </>
            )}

            <p>
              <span className="font-bold">Customer Name:</span>
              <span className="mx-2">{item.customer?.name}</span>
            </p>
            <p>
              <span className="font-bold">Customer Username:</span>
              <span className="mx-2">{item.customer?.username}</span>
            </p>
            <p>
              <span className="font-bold">Owner:</span>
              <span className="mx-2">{item.assignedTo?.name}</span>
            </p>

            {item.status == "closed" && (
              <>
                <p>
                  <span className="font-bold">Closed By:</span>
                  <span className="mx-2">{item.closedBy?.name}</span>
                </p>

                <p>
                  <span className="font-bold">Closed Time:</span>
                  <span className="mx-2">
                    {item.closedTime
                      ? format(new Date(item.closedTime), "yyyy-MM-dd pp")
                      : null}
                  </span>
                </p>

                <p>
                  <span className="font-bold">Root Cause:</span>
                  <span className="mx-2">
                    {item.rootCause?.title ? item.rootCause?.title : null}
                  </span>
                </p>
              </>
            )}
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
              <Button onClick={() => setPreviewOpen(true)}>
                <FileImageOutlined /> {item.attachment}
              </Button>
            )}

            <Modal
              open={previewOpen}
              title={attachmentName}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt={attachmentName}
                style={{ width: "100%" }}
                src={attachmentUrl}
              />
            </Modal>

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

            {replys &&
              replys.map((replyData: any, index: number) => (
                <div
                  key={index}
                  style={{
                    borderRadius: "10px",
                    padding: "5px 5px",
                    margin: "8px",
                    border: "1px solid #F15F22"
                  }}
                >
                  {/* <Divider type="vertical" orientation="left" plain> */}
                  <p>
                    <span className="font-bold text-base capitalize">
                      {replyData.created_by}
                    </span>
                    <span className="mx-2">-</span>
                    <span className="mx-2 font-bold text-base capitalize">
                      {replyData.subject}
                    </span>
                    <span className="mx-2">
                      {formatDistanceToNow(new Date(replyData.created_on), {
                        addSuffix: true
                      })}
                      - {new Date(replyData.created_on).toDateString()}
                    </span>
                    <span className="mx-2">
                      {new Date(replyData.created_on).toLocaleTimeString()}
                    </span>

                    {replyData.attachment && (
                      <Button
                        onClick={() => {
                          setReplyAttachmentUrl(
                            `${url}/ticket/public/downloadFile/${replyData.attachment}`
                          );
                          setReplyAttachmentName(replyData.attachment);
                          setReplyPreviewOpen(true);
                        }}
                      >
                        <FileImageOutlined /> {replyData.attachment}
                      </Button>
                    )}

                    <Modal
                      open={replyPreviewOpen}
                      title={replyAttachmentName}
                      footer={null}
                      onCancel={handleReplyCancel}
                    >
                      <img
                        alt={replyAttachmentName}
                        style={{ width: "100%" }}
                        src={replyAttachmentUrl}
                      />
                    </Modal>
                  </p>
                  <p className="ml-10 font-semibold">{replyData.note}</p>
                  {/* </Divider> */}
                </div>
              ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsTicket;
