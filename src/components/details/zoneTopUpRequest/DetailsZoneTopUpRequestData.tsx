import { ZoneTopUpRequestData } from "@/interfaces/ZoneTopUpRequestData";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Modal } from "antd";
import { format } from "date-fns";
import { FileImageOutlined } from "@ant-design/icons";
// import { FileImageOutlined } from "@ant-design/icons";
interface PropData {
  item: ZoneTopUpRequestData;
}

const DetailsZoneTopUpData = ({ item }: PropData) => {
  // const data = JSON.stringify(item);
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleCancel = () => setPreviewOpen(false);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {}, [item]);
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="gutter-row"
      >
        <Card
          hoverable
          bordered={false}
          style={{
            textAlign: "start",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #F15F22"
          }}
        >
          <div>
            {/* <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Name :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.client?.name}</span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Email :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.client?.email}</span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Address :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.client?.address}</span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Mobile No :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.client?.contactNumber}
                </span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Alternate No :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.client?.altContactNumber}
                </span>
              </Col>
            </Row> */}
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Zone Manager :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.partner?.username}</span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">SD Commission (%) :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.partner?.salesDistributionCommission}
                </span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Payment Status :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.paymentStatus}</span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Payment Type :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.paymentType}</span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Parent Note :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.parentNote}</span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Request Note :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.requestNote}</span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Request No :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.requestNo}</span>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Status :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.status}</span>
              </Col>
            </Row>

            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Requested By :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.insertedBy?.username}
                </span>
              </Col>
            </Row>

            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Requested At :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.createdOn
                    ? format(new Date(item.createdOn), "yyyy-MM-dd pp")
                    : null}
                </span>
              </Col>
            </Row>
            {item.paymentType === "offline" && (
              <div>
                <h1 className="font-bold text-lg">Attachment :</h1>

                <Button onClick={() => setPreviewOpen(true)}>
                  <FileImageOutlined /> {item.fileName}
                </Button>

                <Modal
                  open={previewOpen}
                  title={item.fileName}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt={item.fileName}
                    style={{ width: "100%" }}
                    src={`${url}/zone-topup-request/public/downloadFile/${item.fileName}`}
                  />
                </Modal>
              </div>
            )}
          </div>
        </Card>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="gutter-row"
      ></Col>
    </Row>
  );
};

export default DetailsZoneTopUpData;
