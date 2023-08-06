import { ClientData } from "@/interfaces/ClientData";
import React from "react";
import { Row, Col, Card } from "antd";
// const { Meta } = Card;
interface PropData {
  item: ClientData;
}

const DetailsClientData = ({ item }: PropData) => {
  console.log("item", item);
  // convert to string
  // const data = JSON.stringify(item);
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
            {/* // <Meta
            //   style={{ display: "flex" }}
            //   title={
            //     <span className="font-bold">
            //       Client Level <span className="mx-2">:</span>
            //     </span>
            //   }
            //   description={<span className="mx-2">{item.clientLevel}</span>}
            // /> */}

            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold flex">
                Client Level <span className="mx-2">:</span>
              </span>
              <span>{item.clientLevel}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Partner Type <span className="mx-2">:</span>
              </span>
              <span>{item.partnerType}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Division <span className="mx-2">:</span>
              </span>
              <span>{item.division?.name}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                District <span className="mx-2">:</span>
              </span>
              <span>{item.district?.name}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Inserted By <span className="mx-2">:</span>
              </span>
              <span>{item.insertedBy?.username}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                User Type <span className="mx-2">:</span>
              </span>
              <span>{item.insertedBy?.userType}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Phone <span className="mx-2">:</span>
              </span>
              <span>{item.insertedBy?.phone}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold flex">
                Email <span className="mx-2">:</span>
              </span>
              <span>{item.insertedBy?.email}</span>
            </p>
          </div>
        </Card>
      </Col>
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
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Username <span className="mx-2">:</span>
              </span>
              <span>{item.username}</span>
            </p>

            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Name <span className="mx-2">:</span>
              </span>
              <span>{item.name}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Email <span className="mx-2">:</span>
              </span>
              <span>{item.email}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Address <span className="mx-2">:</span>
              </span>
              <span>{item.address}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Contact Person <span className="mx-2">:</span>
              </span>
              <span>{item.contactPerson}</span>
            </p>
            <p className="sm:flex sm:flex-row grid grid-col overflow-hidden">
              <span className="font-bold">
                Contact Number <span className="mx-2">:</span>
              </span>
              <span>{item.contactNumber}</span>
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailsClientData;
