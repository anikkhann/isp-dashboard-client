import { ClientData } from "@/interfaces/ClientData";
import React from "react";
import { Row, Col, Card } from "antd";
import { format } from "date-fns";
// const { Meta } = Card;
interface PropData {
  item: ClientData;
}

const DetailsClientData = ({ item }: PropData) => {
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
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Client Level :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.clientLevel}</span>
              </Col>
            </Row>

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
                  <span className="font-bold text-base">Username :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{item.username}</span>
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
                  <span className="font-bold text-base">Prefix :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{item.prefix}</span>
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
                  <span className="font-bold text-base">Name :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{item.name}</span>
                </Col>
              </Row>

              {/* <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end",
               
                }}
              >
                <span className="font-bold text-base">Email :</span>
              </Col>
              <Col
               
              >
                <span className="mx-1 text-base">{item.email}</span>
              </Col>
            </Row> */}

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
                  <span className="font-bold text-base">Contact Person :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{item.contactPerson}</span>
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
            </div>

            {/* <p className="flex flex-row   overflow-hidden">
              <span className="font-bold">Partner Type</span>
              <span className="mx-1">:</span>
              <span className="mx-1">{item.partnerType}</span>
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
                <span className="font-bold text-base">Division :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.division?.name}</span>
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
                <span className="font-bold text-base">District :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.district?.name}</span>
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
                <span className="font-bold text-base">Phone :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.insertedBy?.phone}</span>
              </Col>
            </Row>

            {/* <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end",
               
                }}
              >
                <span className="font-bold text-base">Email :</span>
              </Col>
              <Col
               
              >
                <span className="mx-1 text-base">{item.insertedBy?.email}</span>
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
                <span className="font-bold text-base">Address :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.address}</span>
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
                <span className="font-bold text-base">Radius IP :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.radiusIp?.name}</span>
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
                  {item.editedBy ? item.editedBy.username : null}
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

export default DetailsClientData;
