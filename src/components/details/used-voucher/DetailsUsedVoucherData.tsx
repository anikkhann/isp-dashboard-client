import { UsedVoucherData } from "@/interfaces/UsedVoucherData";
import React from "react";
import { Row, Col, Card } from "antd";
import { format } from "date-fns";
// const { Meta } = Card;
interface PropData {
  item: UsedVoucherData;
}

const DetailsUsedVoucherData = ({ item }: PropData) => {
  // convert to string
  // const data = JSON.stringify(item);
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
                <span className="font-bold text-base">Zone Manager :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.zoneManager?.username}
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
                <span className="font-bold text-base">SubZone Manager :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.subZoneManager?.username}
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
                <span className="font-bold text-base">Retailer :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.retailer}</span>
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
                <span className="font-bold text-base">Serial No :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.serialNo}</span>
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
                <span className="font-bold text-base">Voucher :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.voucherNumber}</span>
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
                <span className="font-bold text-base">Reference :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.referenceNumber}</span>
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
                <span className="font-bold text-base">Package :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.pricingPlan?.name}</span>
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
                <span className="font-bold text-base">Price (BDT) :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.pricingPlan?.price}
                </span>
              </Col>
            </Row>
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
                <span className="font-bold text-base">Customer Name :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.usedBy?.customer?.name}
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
                <span className="font-bold text-base">Mobile :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.usedBy?.customer?.phone}
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
                <span className="font-bold text-base">Gender :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.usedBy?.customer?.gender}
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
                <span className="font-bold text-base">Date of Birth :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.createdOn
                    ? format(
                        new Date(item.usedBy?.customer?.dateOfBirth),
                        "yyyy-MM-dd "
                      )
                    : null}
                  {/* {item.usedBy?.customer?.dateOfBirth} */}
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
                <span className="font-bold text-base">Used IP :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.usedIp}</span>
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
                <span className="font-bold text-base">Used MAC :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.usedMac}</span>
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
                <span className="font-bold text-base">Used Time :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.createdOn
                    ? format(new Date(item.usedTime), "yyyy-MM-dd pp")
                    : null}
                  {/* {item.usedBy?.customer?.dateOfBirth} */}
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
                  {item.editedBy?.username}
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
                  {item.updatedOn
                    ? format(new Date(item.updatedOn), "yyyy-MM-dd pp")
                    : null}
                </span>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsUsedVoucherData;
