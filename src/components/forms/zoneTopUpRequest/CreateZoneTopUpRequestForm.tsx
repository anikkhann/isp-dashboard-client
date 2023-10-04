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
  Space,
  Row,
  Col,
  Upload,
  Input,
  Select
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
// import { useAppSelector } from "@/store/hooks";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile, UploadFileStatus } from "antd/es/upload/interface";
import AppImageLoader from "@/components/loader/AppImageLoader";
import { PaymentGatewayConfigData } from "@/interfaces/PaymentGatewayConfigData";

interface FormData {
  paidAmount: string;
}

const paymentTypes = [
  {
    label: "offline",
    value: "offline"
  },
  {
    label: "online",
    value: "online"
  }
];

const CreateZoneTopUpRequestForm = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [paymentGateways, setPaymentGateways] = useState<any[]>([]);
  const [selectedPaymentGateway, setSelectedPaymentGateway] =
    useState<any>(null);

  const [paymentType, setPaymentType] = useState<any>(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [file, setFile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const user = useAppSelector(state => state.auth.user);
  // console.log("user", user)

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handlePaymentTypeChange = (value: any) => {
    setPaymentType(value);
    form.setFieldsValue({
      paymentType: value
    });
  };

  const handlePaymentGatewayChange = (value: any) => {
    setSelectedPaymentGateway(value);
    form.setFieldsValue({
      paymentGatewayId: value
    });
  };

  function getPaymentGateway() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "bankName"
          }
        ]
      },
      body: {
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

  useEffect(() => {
    getPaymentGateway();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const { paidAmount } = data;

    const bodyData = {
      paymentType: paymentType,
      paidAmount: paidAmount,
      paymentGatewayId: selectedPaymentGateway
    };

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    formData.append("body", JSON.stringify(bodyData));

    try {
      axios
        .post("/api/zone-topup-request/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
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
              text: data.message || "Updated successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/top-up/zone-top-up-request");
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

      <div className="mt-3">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            paidAmount: "",
            paymentType: "",
            paymentGatewayId: ""
          }}
          style={{ maxWidth: "100%" }}
          name="wrap"
          // labelCol={{ flex: "110px" }}
          // labelAlign="left"
          // labelWrap
          // wrapperCol={{ flex: 1 }}
          colon={false}
          scrollToFirstError
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="gutter-row"
            >
              {/* paymentType */}
              <Form.Item
                label="Payment Type"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="paymentType"
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handlePaymentTypeChange}
                    options={paymentTypes}
                    value={paymentType}
                  />
                </Space>
              </Form.Item>
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
              {/* paidAmount */}
              <Form.Item
                label="Paid Amount"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="paidAmount"
                rules={[
                  {
                    required: true,
                    message: "Please input paidAmount!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="paidAmount"
                  className={`form-control`}
                  name="paidAmount"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
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
              {/* paymentGatewayId */}
              <Form.Item
                label="Payment Gateway"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="paymentGatewayId"
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
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col>
              <Form.Item
                label="file"
                style={{
                  marginBottom: 0,
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold"
                }}
                name="file"
                rules={[
                  {
                    required: paymentType ? paymentType === "offline" : false,
                    message: "Please upload file!"
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

          {/* submit */}
          <Row justify="center">
            <Col>
              <Form.Item>
                {/* wrapperCol={{ ...layout.wrapperCol, offset: 4 }} */}
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
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateZoneTopUpRequestForm;
