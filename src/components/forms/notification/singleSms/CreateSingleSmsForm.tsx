/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";
interface FormData {
  mobileNo: string;
  subject: string;
  message: string;
}

const CreateSingleSmsForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const onSubmit = (data: FormData) => {
    setLoading(true);

    const { mobileNo, subject, message } = data;

    const formData = {
      mobileNo: mobileNo,
      subject: subject,
      message: message
    };

    try {
      axios
        .post("/api/send-sms/create", formData)
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
              router.replace("/admin/notification/sms/send-sms-single");
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
              mobileNo: "",
              subject: "",
              message: ""
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
                {/* mobileNo */}
                <Form.Item
                  label="Mobile No"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="mobileNo"
                  rules={[
                    {
                      required: true,
                      message: "Please input your mobileNo!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Mobile No"
                    className={`form-control`}
                    name="mobileNo"
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
                {/* subject */}
                <Form.Item
                  label="Subject"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="subject"
                  rules={[
                    {
                      required: true,
                      message: "Please input your subject!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Subject"
                    className={`form-control`}
                    name="subject"
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
                {/* message */}
                <Form.Item
                  label="Message"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please input your message!"
                    }
                  ]}
                >
                  <Input.TextArea
                    placeholder="Message"
                    className={`form-control`}
                    name="message"
                    style={{ padding: "6px" }}
                  />
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
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default CreateSingleSmsForm;
