import { CustomerData } from "@/interfaces/CustomerData";
import React from "react";
import { Row, Col, Card } from "antd";
import { format } from "date-fns";
interface PropData {
  item: CustomerData | null;
}

const Customer = ({ item }: PropData) => {
  // console.log("item", item);
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
                <span className="font-bold text-base">Username :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item?.username}</span>
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
                <span className="font-bold text-base">Password :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item?.password}</span>
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
                <span className="font-bold text-base">Mobile Number :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item?.mobileNo}</span>
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
                backgroundColor: "#accbe6"
              }}
            >
              <span className="font-bold text-base">Email :</span>
            </Col>
            <Col >
              <span className="mx-1 text-base">{item.email}</span>
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
                <span className="font-bold text-base">House No :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item?.houseNo}</span>
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
                <span className="font-bold text-base">Identity Type :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item?.identityType}</span>
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
                <span className="font-bold text-base">Identity No :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item?.identityNo}</span>
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
                <span className="font-bold text-base">Phone :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.insertedBy?.phone}
                </span>
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
              <Col >
                <span className="mx-1 text-base">{item.insertedBy?.email}</span>
              </Col>
            </Row> */}
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
              <span className="font-bold text-base">Client Name :</span>
            </Col>
            <Col>
              <span className="mx-1 text-base">{item?.client?.username}</span>
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
              <span className="font-bold text-base">Contact Person :</span>
            </Col>
            <Col>
              <span className="mx-1 text-base">
                {item?.client?.contactPerson}
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
              <span className="font-bold text-base">Contact Number :</span>
            </Col>
            <Col>
              <span className="mx-1 text-base">
                {item?.client?.contactNumber}
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
              <span className="font-bold text-base">Alternate Number :</span>
            </Col>
            <Col>
              <span className="mx-1 text-base">
                {item?.client?.altContactNumber}
              </span>
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
                backgroundColor: "#accbe6"
              }}
            >
              <span className="font-bold text-base">Email :</span>
            </Col>
            <Col >
              <span className="mx-1 text-base">{item.client?.email}</span>
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
              <span className="mx-1 text-base">{item?.client?.address}</span>
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
              <span className="font-bold text-base">Division :</span>
            </Col>
            <Col>
              <span className="mx-1 text-base">
                {item?.client?.division?.name}
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
              <span className="font-bold text-base">Address :</span>
            </Col>
            <Col>
              <span className="mx-1 text-base">
                {item?.client?.district?.name}
              </span>
            </Col>
          </Row>
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
                <span className="font-bold text-base">Created By :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.insertedBy?.username}
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
                  {item?.createdOn
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
                  {item?.editedBy ? item.editedBy.username : null}
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
                  {item?.updatedOn
                    ? format(new Date(item.updatedOn), "yyyy-MM-dd pp")
                    : null}
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
                <span className="font-bold text-base">Partner :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.partner?.username}
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
                <span className="font-bold text-base">Contact Person :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.partner?.contactPerson}
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
                <span className="font-bold text-base">Contact Number :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.partner?.contactNumber}
                </span>
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
              <Col >
                <span className="mx-1 text-base">{item.partner?.email}</span>
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
                <span className="mx-1 text-base">{item?.partner?.address}</span>
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
                <span className="font-bold text-base">Division :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.partner?.division?.name}
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
                <span className="font-bold text-base">District :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.partner?.district?.name}
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
                <span className="font-bold text-base">Display Name :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.displayName}
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
                <span className="font-bold text-base">Download Limit :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.downloadLimit}
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
                <span className="font-bold text-base">
                  Download Limit Unit :
                </span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.downloadLimitUnit}
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
                <span className="font-bold text-base">Total Price :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.totalPrice}
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
                <span className="font-bold text-base">Unit Price :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.unitPrice}
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
                <span className="font-bold text-base">Upload Limit :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.uploadLimit}
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
                <span className="font-bold text-base">Upload Limit Unit :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.downloadLimitUnit}
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
                <span className="font-bold text-base">Vat :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.vat}
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
                <span className="font-bold text-base">Validity :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.validity}
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
                <span className="font-bold text-base">Validity Unit :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {item?.customerPackage?.validityUnit?.name}
                </span>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Customer;
