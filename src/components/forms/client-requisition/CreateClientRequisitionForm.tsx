/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Alert,
  Button,
  Form,
  Input,
  Select,
  Space,
  Row,
  Col,
  Upload
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined
} from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile, UploadFileStatus } from "antd/es/upload/interface";
import AppImageLoader from "@/components/loader/AppImageLoader";
import { useAppSelector } from "@/store/hooks";
import { PaymentGatewayConfigData } from "@/interfaces/PaymentGatewayConfigData";

const paymentTypes = [
  {
    label: "online",
    value: "online"
  },
  {
    label: "offline",
    value: "offline"
  }
];

interface FromData {
  remarks: string;
  lines: LineDataProps[];
}

interface LineDataProps {
  pricingPlanId: string | undefined;
  quantity: string | undefined;
}

const CreateClientRequisitionForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [wsdCommission, setWsdCommission] = useState<any>(0);

  const [totalAmount, setTotalAmount] = useState<any>(0);

  const authUser = useAppSelector(state => state.auth.user);

  const [file, setFile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [selectedPaymentType, setSelectedPaymentType] = useState<any>(null);

  const [pricingPlans, setPricingPlans] = useState<any[]>([]);

  const [allPricingPlans, setAllPricingPlans] = useState<any[]>([]);

  const [paymentGateways, setPaymentGateways] = useState<any>([]);
  const [selectedPaymentGateway, setSelectedPaymentGateway] =
    useState<any>(null);

  const [linesValues, setLinesValues] = useState<LineDataProps[]>([]);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleFileChange: UploadProps["onChange"] = ({
    fileList: newFileList
  }) => {
    // only remove the files that are not uploaded
    const filteredList = newFileList.filter(
      file =>
        file.status !== "removed" &&
        file.status !== "error" &&
        file.status !== "uploading"
    ) as UploadFile[];

    setFileList(filteredList);
  };

  const dummyAction = (options: any) => {
    const { file } = options;
    console.log("Dummy action triggered. File:", file);

    fileList.push({
      uid: file.uid,
      name: file.name,
      status: "done" as UploadFileStatus
    });
    setFile(file);
  };

  const uploadButton = (
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  );

  //functions for getting zone manger list data using POST request
  function getPricingPlan() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        isActive: true
      }
    };
    axios.post("/api-hotspot/pricing-plan/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setPricingPlans(list);
      setAllPricingPlans(data.body);
    });
  }

  function getPaymentGateway() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        isActive: true
      }
    };

    axios.post("/api/payment-gateway-config/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const list = data.body.map((item: PaymentGatewayConfigData) => {
        return {
          label: item.paymentGateway.bankName,
          value: item.id
        };
      });

      setPaymentGateways(list);
    });
  }

  // getWsdCommission
  const getWsdCommission = async (partnerId: string) => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/partner/get-by-id/${partnerId}`);

    const { data } = response;

    if (data.status != 200) {
      MySwal.fire({
        title: "Error",
        text: data.message || "Something went wrong",
        icon: "error"
      });
    }

    if (!data.body) return;

    const { wsdCommission } = data.body;

    setWsdCommission(wsdCommission);
  };

  useEffect(() => {
    if (authUser?.partnerId) {
      getWsdCommission(authUser.partnerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  useEffect(() => {
    getPricingPlan();
    getPaymentGateway();
  }, []);

  const handlePaymentTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ paymentType: value });
    setSelectedPaymentType(value as any);
  };

  const handlePricingPlanChange = (value: any, key: number) => {
    // make a new field in forms lines list and set pricing plan id
    form.setFieldsValue({ [`lines[${key}].pricingPlanId`]: value });

    if (value) {
      const newLinesValues = [...linesValues];
      newLinesValues[key] = {
        ...newLinesValues[key],
        pricingPlanId: value
      };
      setLinesValues(newLinesValues);
    }
  };

  const calculateTotal = () => {
    const lines = form.getFieldValue("lines");

    if (!lines) return;

    let total = 0;
    lines.map((line: any) => {
      const { pricingPlanId, quantity } = line;

      const pricingPlan = allPricingPlans.find(
        (item: any) => item.id === pricingPlanId
      );
      if (pricingPlan) {
        total += Number(pricingPlan.price) * Number(quantity);
      }
    });
    const commission = (total * wsdCommission) / 100;

    total = total - commission;

    setTotalAmount(total);
    setWsdCommission(commission);
  };

  const handlePaymentGatewayChange = (value: any) => {
    setSelectedPaymentGateway(value);
    form.setFieldsValue({
      paymentGatewayId: value
    });
  };

  const onSubmit = (data: FromData) => {
    setLoading(true);
    const {
      remarks,

      lines
    } = data;

    const bodyData = {
      remarks: remarks,
      paymentType: selectedPaymentType,
      paymentGatewayId: selectedPaymentGateway,

      lines: lines
    };

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("body", JSON.stringify(bodyData));

    try {
      axios
        .post("/api-hotspot/zone-card-requisition/create", formData)
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
              if (selectedPaymentType === "online") {
                const url = data.body;
                window.open(url, "_blank");
              } else {
                router.replace("/admin/hotspot/client-requisition");
              }
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
                  {/* paymentType */}
                  <Form.Item
                    label="paymentType"
                    name="paymentType"
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
                        onChange={handlePaymentTypeChange}
                        options={paymentTypes}
                        value={selectedPaymentType}
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
                {selectedPaymentType === "online" && (
                  <Col
                    xs={24}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    className="gutter-row"
                  >
                    {/* paymentGatewayId */}
                    <Form.Item
                      label="Payment Gateway"
                      name="paymentGatewayId"
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
                          onChange={handlePaymentGatewayChange}
                          options={paymentGateways}
                          value={selectedPaymentGateway}
                        />
                      </Space>
                    </Form.Item>
                  </Col>
                )}
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
                              label="pricingPlanId"
                              name={[name, "pricingPlanId"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select"
                                onChange={value =>
                                  handlePricingPlanChange(value, key)
                                }
                                options={pricingPlans}
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
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="quantity"
                              name={[name, "quantity"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Input placeholder="quantity" />
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
                        <Form.Item>
                          <Button
                            type="primary"
                            onClick={() => calculateTotal()}
                          >
                            Calculate Total
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col>
                  <Form.Item
                    label="Attachment"
                    style={{
                      marginBottom: 0,
                      width: "100%",
                      textAlign: "center",
                      fontWeight: "bold"
                    }}
                    name="attachment"
                    rules={[
                      {
                        required:
                          selectedPaymentType === "offline" ? true : false,
                        message: "Please input attachment!"
                      }
                    ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Upload
                        customRequest={dummyAction}
                        onChange={handleFileChange}
                        maxCount={1}
                        listType="picture"
                        fileList={fileList}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col>
                  <Form.Item
                    label="WSD Commission"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                  >
                    <Input
                      placeholder="WSD Commission"
                      value={wsdCommission}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Total Amount"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                  >
                    <Input
                      placeholder="Total Amount"
                      value={totalAmount}
                      disabled
                    />
                  </Form.Item>
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

export default CreateClientRequisitionForm;
