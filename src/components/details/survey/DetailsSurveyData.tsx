import React from "react";
import { Row, Col, Card } from "antd";
import { format } from "date-fns";
import type { SurveyData } from "@/interfaces/SurveyData";

interface PropData {
  item: SurveyData;
}

const DetailsSurveyData = ({ item }: PropData) => {
  // ;
  // const data = JSON.stringify(item);
  // convert options to array
  // const options = item.options
  //     .slice(1, -1) // Remove the curly braces
  //     .split(",")
  //     .map(option => option.replace(/'/g, "").trim());
  //
  // const newOptions = options.map((option: any, index: number) => {
  //     return {
  //         option: option,
  //         index: index
  //     };
  // });
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
                <span className="font-bold text-base">Type :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.type}</span>
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
                <span className="font-bold text-base">Title :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.title}</span>
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
                <span className="font-bold text-base">Options:</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">{item.options}</span>
              </Col>
            </Row>
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
                <span className="font-bold text-base">Created At :</span>
              </Col>
              <Col>
                <span className="mx-1 text-base">
                  {" "}
                  {item.createdOn
                    ? format(new Date(item.createdOn), "yyyy-MM-dd pp")
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

export default DetailsSurveyData;
