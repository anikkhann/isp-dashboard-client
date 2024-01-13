import { NasDeviceData } from "@/interfaces/NasDeviceData";
import React from "react";
import { Row, Col, Card } from "antd";
import { format } from "date-fns";
// const { Meta } = Card;
interface PropData {
  item: NasDeviceData;
}

const DetailsNasDeviceData = ({ item }: PropData) => {
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
                <span className="font-bold text-base">Device Name :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.name}</span>
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
                <span className="font-bold text-base">Map Location :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.mapLocation}</span>
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
                  Location Description :
                </span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.locationDescription}
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
                <span className="font-bold text-base">IP :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.ip}</span>
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
                <span className="font-bold text-base">Secret :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.secret}</span>
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
                  Radius Incoming Port :
                </span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.radiusIncomingPort}
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
                <span className="font-bold text-base">API SSL :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item.apiSsl === true ? "Yes" : "No"}
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
                <span className="font-bold text-base">API Port :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.apiPort}</span>
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
                <span className="font-bold text-base">API Username :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.apiUsername}</span>
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
                <span className="font-bold text-base">AIP Password :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.apiPassword}</span>
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

export default DetailsNasDeviceData;
