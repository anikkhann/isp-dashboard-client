/* eslint-disable @next/next/no-img-element */
import { DurjoyRequisitionData } from "@/interfaces/DurjoyRequisitionData";
import React from "react";
import { Row, Col, Card, Button, Modal } from "antd";
import { format } from "date-fns";
import { FileImageOutlined } from "@ant-design/icons";
import { useState } from "react";
// const { Meta } = Card;
interface PropData {
  item: DurjoyRequisitionData;
}

const DetailsDurjoyRequisitionData = ({ item }: PropData) => {
  // convert to string
  console.log("durjot", item);
  // const data = JSON.stringify(item);
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleCancel = () => setPreviewOpen(false);
  // const [attachmentUrl, setAttachmentUrl] = useState("");
  // const [attachmentName, setAttachmentName] = useState("");

  const url = process.env.NEXT_PUBLIC_HOTSPOT_URL;
  // useEffect(() => {
  //   console.log(
  //     `${url}/public/downloadFile/${item.attachment}/zone-card-requisition`
  //   );
  // if (item.attachment) {
  //   setAttachmentUrl(
  //     `${url}/public/downloadFile/${item.attachment}/zone-card-requisition`
  //   );
  //   setAttachmentName(item.attachment);
  // }
  // if (item.createdOn) {
  //   setCreatedDate(new Date(item.createdOn));
  //   timeDifference(item.createdOn);
  // }
  // }, [item]);
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
                <span className="font-bold text-base">
                  Requisition Number :
                </span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.requisitionNo}</span>
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
                <span className="font-bold text-base">Client :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.client?.username}</span>
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
                <span className="font-bold text-base">
                  Total Amount (BDT) :
                </span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.totalAmount}</span>
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
                <span className="font-bold text-base">
                  Payable Amount (BDT) :
                </span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.payableAmount}</span>
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
                <span className="font-bold text-base">Tag Voucer :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.tagVoucher}</span>
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
                <span className="font-bold text-base">Payment Status :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.paymentStatus}</span>
              </Col>
            </Row>

            {/* <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Address</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.address}</span>
            </p> */}
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
                <span className="font-bold text-base">Delivery Type :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.deliveryType}</span>
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
                <span className="font-bold text-base">Client Note :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.clientNote}</span>
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
                <span className="font-bold text-base">Delivery Name :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.deliveryName}</span>
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
                <span className="font-bold text-base">Delivery Contact :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.deliveryContact}</span>
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
                <span className="font-bold text-base">Delivery Address :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.deliveryAddress}</span>
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
                <span className="font-bold text-base">Contact Number :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.contactNumber}</span>
              </Col>
            </Row>
            <div>
              <h1 className="font-bold text-lg">Attachment :</h1>
              {/* {item.attachment && (  */}
              <Button onClick={() => setPreviewOpen(true)}>
                <FileImageOutlined /> {item.attachment}
              </Button>
              {/* )} */}

              <Modal
                open={previewOpen}
                title={item.attachment}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt={item.attachment}
                  style={{ width: "100%" }}
                  src={`${url}/public/downloadFile/${item.attachment}/client-card-requisition`}
                />
              </Modal>

              {/* <p className="text-justify">{item.complainDetails}</p> */}
            </div>
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
      >
        <Card
          hoverable
          bordered={false}
          style={{
            textAlign: "start",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #F15F22"
            // marginTop: "1rem"
          }}
        >
          <div>
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
                <span className="font-bold text-base">Created By :</span>
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
                <span className="font-bold text-base">Created At :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.createdOn
                    ? format(new Date(item.createdOn), "yyyy-MM-dd pp")
                    : null}
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
                <span className="font-bold text-base">Updated By :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {/* {item.editedBy?.username} */}
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
                <span className="font-bold text-base">Updated At :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {/* {item.updatedOn
                    ? format(new Date(item.updatedOn), "yyyy-MM-dd pp")
                    : null} */}
                </span>
              </Col>
            </Row>
          </div>
        </Card>

        <Card
          hoverable
          bordered={false}
          style={{
            textAlign: "start",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #F15F22",
            marginTop: "1rem"
          }}
        >
          <div>
            <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "start"
                }}
              >
                <span className="font-bold text-base">Package :</span>
              </Col>
              <Col>
                <ol className="mx-1 text-base">
                  {item.lines &&
                    item.lines.map((line, index) => (
                      <li key={index}>{line.pricingPlan?.name}</li>
                    ))}
                </ol>
                {/* <span className="mx-1 text-base">
                  {item.lines &&
                    item.lines.map((line, index) => (
                      <span key={index} className="mx-1 text-base">
                        {line.pricingPlan?.name}
                      </span>
                    ))}
                </span> */}
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
                  alignItems: "start"
                }}
              >
                <span className="font-bold text-base">Quantity :</span>
              </Col>
              <Col>
                <ol className="mx-1 text-base">
                  {item.lines &&
                    item.lines.map((line, index) => (
                      <li key={index}>{line.quantity}</li>
                    ))}
                </ol>
                {/* <span className="mx-1 text-base">
                  {item.lines &&
                    item.lines.map((line, index) => (
                      <span key={index} className="mx-1 text-base">
                        {line.quantity}
                      </span>
                    ))}
                </span> */}
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsDurjoyRequisitionData;
