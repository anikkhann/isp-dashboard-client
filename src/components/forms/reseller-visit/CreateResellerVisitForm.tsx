/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AppImageLoader from "@/components/loader/AppImageLoader";

const statuses = [
  {
    label: "yes",
    value: true
  },
  {
    label: "no",
    value: false
  }
];

const frequentComplains = [
  {
    label: "option1",
    value: "option1"
  },
  {
    label: "option2",
    value: "option2"
  }
];

interface FromData {
  retailerId: string | undefined;
  totalSalesInLastWeek: string | undefined;
  gpsLocation: string | undefined;
  isCompetitionPresent: string | undefined;
  hotspotFrequency: string | undefined;
  internetSpeed: string | undefined;
  totalComplainsSinceLastVisit: string | undefined;
  frequentComplains: string | undefined;
  fiberCut: string | undefined;
  laserIssues: string | undefined;
  powerIssues: string | undefined;
  powerBackup: string | undefined;
  sunShedBannerPresent: string | undefined;
  lavelOneSupportShown: string | undefined;
  rateCardFestoonDisplayed: string | undefined;

  lines: LineDataProps[];
}

interface LineDataProps {
  contactNo: string | undefined;
  hotspotFrequency: string | undefined;
  frequentComplains: string | undefined;
  internetSpeed: string | undefined;
}

const CreateResellerVisitForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [selectedRetailer, setSelectedRetailer] = useState<any>(null);

  // totalSalesInLastWeek
  const [totalSalesInLastWeek, setTotalSalesInLastWeek] = useState<any>(null);

  // isCompetitionPresent
  const [isCompetitionPresent, setIsCompetitionPresent] = useState<any>(null);

  // frequentComplains
  const [frequentComplains, setFrequentComplains] = useState<any[]>([]);

  // powerBackup
  const [powerBackup, setPowerBackup] = useState<any>(null);

  // sunShedBannerPresent
  const [sunShedBannerPresent, setSunShedBannerPresent] = useState<any>(null);

  // rateCardFestoonDisplayed
  const [rateCardFestoonDisplayed, setRateCardFestoonDisplayed] =
    useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {}, []);

  const handleStatusChange = (value: any) => {
    setIsCompetitionPresent(value);
  };

  const onSubmit = (data: FromData) => {
    setLoading(true);
    const {
      gpsLocation,
      hotspotFrequency,
      internetSpeed,
      totalComplainsSinceLastVisit,
      fiberCut,
      laserIssues,
      powerIssues,
      lavelOneSupportShown,
      lines
    } = data;

    const formData = {
      retailerId: selectedRetailer,
      totalSalesInLastWeek: totalSalesInLastWeek,
      gpsLocation: gpsLocation,
      isCompetitionPresent: isCompetitionPresent,
      hotspotFrequency: hotspotFrequency,
      internetSpeed: internetSpeed,
      totalComplainsSinceLastVisit: totalComplainsSinceLastVisit,
      frequentComplains: frequentComplains,
      fiberCut: fiberCut,
      laserIssues: laserIssues,
      powerIssues: powerIssues,
      powerBackup: powerBackup,
      sunShedBannerPresent: sunShedBannerPresent,
      rateCardFestoonDisplayed: rateCardFestoonDisplayed,
      lavelOneSupportShown: lavelOneSupportShown,
      competitorInfoLine: lines
    };

    try {
      axios
        .post("/api-hotspot/reseller-visit/submit-report", formData)
        .then(res => {
          const { data } = res;

          if (data.status != 200) {
            MySwal.fire({
              title: "Error",
              text: data.message || "Something went wrong",
              icon: "error"
            });
          }

          if (data.status == 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || "Created successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/hotspot/reseller-visit");
            });
          }
        })
        .catch(err => {
          // console.log(err);
          MySwal.fire({
            title: "Error",
            text: err.response.data.message || "Something went wrong",
            icon: "error"
          });
          setShowError(true);
          setErrorMessages(err.response.data.message);
        });
    } catch (err: any) {
      // console.log(err)
      setShowError(true);
      setErrorMessages(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <AppImageLoader />}
      {showError && <Alert message={errorMessages} type="error" showIcon />}
      {!loading && (
        <>
          <div className="mt-3">
            <Form
              // {...layout}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmit}
              form={form}
              initialValues={{}}
              style={{ maxWidth: "100%" }}
              name="wrap"
              colon={false}
              scrollToFirstError
            >
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* isCompetitionPresent */}
                  <Form.Item
                    label="isCompetitionPresent"
                    name="isCompetitionPresent"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please select!"
                      }
                    ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select"
                        onChange={handleStatusChange}
                        options={statuses}
                        value={isCompetitionPresent}
                        showSearch
                        filterOption={(input, option) => {
                          if (typeof option?.label === "string") {
                            return (
                              option.label
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            );
                          }
                          return false;
                        }}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col xs={24} className="gutter-row">
                  {/* remarks */}
                  <Form.Item
                    label="remarks"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="remarks"
                    rules={[
                      {
                        required: true,
                        message: "Please input remarks!"
                      }
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      cols={16}
                      placeholder="remarks"
                      className={`form-control`}
                    />
                  </Form.Item>
                </Col>

                <Col xs={12} className="gutter-row">
                  {/* deliveryType */}
                  <Form.Item
                    label="deliveryType"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="deliveryType"
                    rules={[
                      {
                        required: true,
                        message: "Please input deliveryType!"
                      }
                    ]}
                  >
                    <Input placeholder="deliveryType" />
                  </Form.Item>
                </Col>
                <Col xs={12} className="gutter-row">
                  {/* deliveryName */}
                  <Form.Item
                    label="deliveryName"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="deliveryName"
                    rules={[
                      {
                        required: true,
                        message: "Please input deliveryName!"
                      }
                    ]}
                  >
                    <Input placeholder="deliveryName" />
                  </Form.Item>
                </Col>

                <Col xs={12} className="gutter-row">
                  {/* deliveryAddress */}
                  <Form.Item
                    label="deliveryAddress"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="deliveryAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please input deliveryAddress!"
                      }
                    ]}
                  >
                    <Input placeholder="deliveryAddress" />
                  </Form.Item>
                </Col>

                <Col xs={12} className="gutter-row">
                  {/* deliveryContact */}
                  <Form.Item
                    label="deliveryContact"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="deliveryContact"
                    rules={[
                      {
                        required: true,
                        message: "Please input deliveryContact!"
                      }
                    ]}
                  >
                    <Input placeholder="deliveryContact" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col>
                  <Form.List name="lines">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              label="contactNo"
                              name={[name, "contactNo"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Input placeholder="contactNo" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="hotspotFrequency"
                              name={[name, "hotspotFrequency"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Input placeholder="hotspotFrequency" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="frequentComplains"
                              name={[name, "frequentComplains"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Input placeholder="frequentComplains" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="internetSpeed"
                              name={[name, "internetSpeed"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Input placeholder="internetSpeed" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add field
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>

              {/* submit */}
              <Row justify="center">
                <Col>
                  <Form.Item style={{ margin: "0 8px" }}>
                    <div style={{ marginTop: 24 }}>
                      <Button
                        // type="primary"
                        htmlType="submit"
                        shape="round"
                        style={{
                          backgroundColor: "#F15F22",
                          color: "#FFFFFF",
                          fontWeight: "bold"
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default CreateResellerVisitForm;
