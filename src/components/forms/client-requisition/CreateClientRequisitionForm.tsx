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
// import AppImageLoader from "@/components/loader/AppImageLoader";
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
  const [wsdCommissionValue, setWsdCommissionValue] = useState<any>(0);

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
      // meta: {
      //   sort: [
      //     {
      //       order: "asc",
      //       field: "bankName"
      //     }
      //   ]
      // },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        isActive: true
      }
    };

    axios
      .post("/api/payment-gateway-config/get-list-for-online-payment", body)
      .then(res => {
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

    // total = total - commission;

    setTotalAmount(total);
    setWsdCommissionValue(commission);
  };

  const handlePaymentGatewayChange = (value: any) => {
    setSelectedPaymentGateway(value);
    form.setFieldsValue({
      paymentGatewayId: value
    });
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FromData) => {
    setLoading(true);
    setTimeout(async () => {
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
        const result = await MySwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#570DF8",
          cancelButtonColor: "#EB0808",
          confirmButtonText: "Yes, Proceed!"
        });
        if (result.isConfirmed) {
          await axios
            .post("/api-hotspot/zone-card-requisition/create", formData)
            .then(res => {
              const { data } = res;
              if (data.status === 200) {
                MySwal.fire("Success!", data.message, "success").then(() => {
                  router.replace("/admin/hotspot/client-requisition");
                });
              } else {
                MySwal.fire("Error!", data.message, "error");
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
        } else if (result.isDismissed) {
          MySwal.fire("Cancelled", "Your Data is safe :)", "error");
        }
      } catch (err: any) {
        // console.log(err)
        setShowError(true);
        setErrorMessages(err.message);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <>
      {/* {loading && <AppImageLoader />} */}
      {showError && <Alert message={errorMessages} type="error" showIcon />}
      {/* {!loading && ( */}
      <>
        <div className="mt-3">
          <Form
            // {...layout}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{ paymentType: selectedPaymentType }}
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
                            label="Package"
                            name={[name, "pricingPlanId"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input Package"
                              }
                            ]}
                          >
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select Package"
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
                            label="Quantity"
                            name={[name, "quantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input Quantity"
                              }
                            ]}
                          >
                            <Input placeholder="Quantity" />
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
                          Set Requirements
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" onClick={() => calculateTotal()}>
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
                  label="Total Amount"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                >
                  <Input
                    placeholder="Total Amount"
                    value={totalAmount}
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Payable"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                >
                  <Input
                    placeholder="Payable"
                    value={wsdCommissionValue}
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
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
                  label="Payment Type"
                  name="paymentType"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select Payment Type!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Payment Type"
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
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
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
              )}
              {/* {selectedPaymentType === "online" && (
                  <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={8}
                    xl={8}
                    xxl={8}
                    className="gutter-row"
                  >
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
                )} */}
              {selectedPaymentType === "offline" && (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
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
              )}

              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* remarks */}
                <Form.Item
                  label="Remarks"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="remarks"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input remarks!"
                  //   }
                  // ]}
                >
                  <Input.TextArea
                    rows={4}
                    cols={16}
                    placeholder="remarks"
                    className={`form-control`}
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
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="bg-gray-400 flex flex-col gap-1 ">
            <div className="rounded-sm w-full grid grid-cols-12 bg-white shadow p-6 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform">
              <div className="col-span-11 xl:-ml-5">
                <p className="text-blue-600 font-semibold text-left text-lg">
                  <span className="text-danger">
                    * Attachment must be either JPG or PNG format and should not
                    exceed 10 MB in size.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default CreateClientRequisitionForm;
