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
// import AppImageLoader from "@/components/loader/AppImageLoader";
import { PaymentGatewayConfigData } from "@/interfaces/PaymentGatewayConfigData";

interface FormData {
  paidAmount: string;
  requestNote: string;
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
        // sort: [
        //   {
        //     order: "asc",
        //     field: "bankName"
        //   }
        // ]
      },
      body: {
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
    setTimeout(async () => {
      const { paidAmount, requestNote } = data;

      const bodyData = {
        paymentType: paymentType,
        paidAmount: paidAmount,
        requestNote: requestNote,
        paymentGatewayId: selectedPaymentGateway
      };

      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }
      formData.append("body", JSON.stringify(bodyData));

      try {
        const result = await MySwal.fire({
          title: "Are you sure?",
          text: "Please confirm to proceed with your payment!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#570DF8",
          cancelButtonColor: "#EB0808",
          confirmButtonText: "Yes, Confirm!"
        });
        if (result.isConfirmed) {
          await axios
            .post("/api/zone-topup-request/create", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(res => {
              const { data } = res;
              if (data.status === 200) {
                MySwal.fire("Success!", data.message, "success").then(() => {
                  router.replace("/admin/top-up/zone-top-up-request");
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
    }, 5000);
  };

  return (
    <>
      {/* {loading && <AppImageLoader />} */}
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
            requestNote: "",
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
              md={8}
              lg={8}
              xl={8}
              xxl={8}
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

            {paymentType == "online" && (
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
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      // required: paymentType ? paymentType === "offline" : false,
                      required: true,
                      message: "Please upload file!"
                    }
                  ]}
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
              {/* paidAmount */}
              <Form.Item
                label="Amount"
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
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* requestNote */}
              <Form.Item
                label="Note"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="requestNote"
                rules={[
                  {
                    required: true,
                    message: "Please input Note!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Note"
                  className={`form-control`}
                  name="requestNote"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            ></Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            ></Col>
          </Row>
          {paymentType == "offline" && (
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
                  name="file"
                  rules={[
                    {
                      // required: paymentType ? paymentType === "offline" : false,
                      required: true,
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
          )}

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
                  {loading ? "Submitting..." : "Submit"}
                </Button>
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
  );
};

export default CreateZoneTopUpRequestForm;
