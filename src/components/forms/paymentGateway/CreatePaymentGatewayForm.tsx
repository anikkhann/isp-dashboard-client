/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import AppImageLoader from "@/components/loader/AppImageLoader";
interface FormData {
  bankName: string;
  key: string;
  paymentUrl: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const CreatePaymentGatewayForm = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const { bankName, key, paymentUrl } = data;

    const formData = {
      bankName: bankName,
      key: key,
      paymentUrl: paymentUrl,
      isActive: isActive
    };

    try {
      axios
        .post("/api/payment-gateway/create", formData)
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
              text: data.message || "Added successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/payment/payment-gateway");
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
        <div className="mt-3">
          <Form
            // {...layout}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{
              bankName: "",
              key: "",
              paymentUrl: ""
            }}
            style={{ maxWidth: "100%" }}
            name="wrap"
            colon={false}
            scrollToFirstError
          >
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              justify="space-between"
            >
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* bankName */}
                <Form.Item
                  label="Bank Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="bankName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your bank Name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="bankName"
                    className={`form-control`}
                    name="bankName"
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
                {/* key */}
                <Form.Item
                  label="Key"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="key"
                  rules={[
                    {
                      required: true,
                      message: "Please input your key!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="key"
                    className={`form-control`}
                    name="key"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                className="gutter-row"
              >
                {/* paymentUrl */}
                <Form.Item
                  label="Payment URL"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="paymentUrl"
                  rules={[
                    {
                      required: true,
                      message: "Please input your paymentUrl!"
                    }
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="paymentUrl"
                    className={`form-control`}
                    name="paymentUrl"
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

            {/* status */}
            <Form.Item
              label=""
              style={{
                marginBottom: 0
              }}
            >
              <Checkbox onChange={handleActive} checked={isActive}>
                Active
              </Checkbox>
            </Form.Item>

            {/* submit */}
            <Row justify="center">
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
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default CreatePaymentGatewayForm;
