import { IpSubnetData } from "@/interfaces/IpSubnetData";
import React from "react";
import { Row, Col, Card } from "antd";
interface PropData {
  item: IpSubnetData;
}

const DetailsNetworkData = ({ item }: PropData) => {
  console.log("item", item);
  // const data = JSON.stringify(item);
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
            <p>
              <span className="font-bold">
                Network Name <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.networkName}</span>
            </p>
            <p>
              <span className="font-bold">
                Network Address <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.networkAddress}</span>
            </p>
            <p>
              <span className="font-bold">
                Subnet Mask <span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.subnetMask}</span>
            </p>
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
            marginTop: "2rem"
          }}
        >
          <div style={{ textAlign: "start" }}>
            <p>
              <span className="font-bold">
                Inserted By<span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.insertedBy?.username}</span>
            </p>
            <p>
              <span className="font-bold">
                User Type<span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.insertedBy?.userType}</span>
            </p>
            <p>
              <span className="font-bold">
                Phone<span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.insertedBy?.phone}</span>
            </p>
            <p>
              <span className="font-bold">
                Email<span className="mx-2">:</span>
              </span>
              <span className="mx-2">{item.insertedBy?.email}</span>
            </p>
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
          hoverable
          bordered={false}
          style={{
            textAlign: "start",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #F15F22"
          }}
        >
          <p>
            <span className="font-bold">
              Partner Name<span className="mx-2">:</span>
            </span>
            <span className="mx-2">{item.partner?.name}</span>
          </p>
          <p>
            <span className="font-bold">
              Contact Person<span className="mx-2">:</span>
            </span>
            <span className="mx-2">{item.partner?.contactPerson}</span>
          </p>
          <p>
            <span className="font-bold">
              Contact Number<span className="mx-2">:</span>
            </span>
            <span className="mx-2">{item.partner?.contactNumber}</span>
          </p>
          <p>
            <span className="font-bold">
              Alternate Number<span className="mx-2">:</span>
            </span>
            <span className="mx-2">{item.partner?.altContactNumber}</span>
          </p>
          <p>
            <span className="font-bold">
              Email<span className="mx-2">:</span>
            </span>
            <span className="mx-2">{item.partner?.email}</span>
          </p>
          <p>
            <span className="font-bold">
              Address<span className="mx-2">:</span>
            </span>
            <span className="mx-2">{item.partner?.address}</span>
          </p>
          <p>
            <span className="font-bold">
              Division<span className="mx-2">:</span>
            </span>
            <span className="mx-2">{item.partner?.division?.name}</span>
          </p>
          <p>
            <span className="font-bold">
              District<span className="mx-2">:</span>
            </span>
            <span className="mx-2">{item.partner?.district?.name}</span>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsNetworkData;
