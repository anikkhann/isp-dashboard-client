/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert, Button, Form, Row, Col, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface AdminFormData {
  name: string;
  email: string;
  password: string;
  userName: string;
  contactPersonName: string;
  contactPersonNumber: string;
  address: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const CreateBwNttnProviderForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const onSubmit = (data: AdminFormData) => {
    setLoading(true);

    const {
      name,
      email,
      password,
      userName,
      contactPersonName,
      contactPersonNumber,
      address
    } = data;

    const formData = {
      name: name,
      email: email,
      contactPersonName: contactPersonName,
      contactPersonNumber: contactPersonNumber,
      address: address,
      password: password,
      userName: userName
    };

    try {
      axios
        .post("/api/bw-nttn-provider/create", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status != 200) {
            setShowError(true);
            setErrorMessages(data.message);
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
              router.replace("/admin/user/bw-nttn-provider");
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
      // // console.log(err)
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
              name: "",
              email: "",
              password: "",
              userName: "",
              contactPersonName: "",
              contactPersonNumber: "",
              address: ""
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
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                <Form.Item
                  label="Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Name"
                    className={`form-control`}
                    name="name"
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
                <Form.Item
                  name="userName"
                  label="User Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your User Name!"
                    },
                    {
                      pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                      message:
                        "Only letters, numbers, underscores and hyphens allowed"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="User Name"
                    className={`form-control`}
                    name="userName"
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
                <Form.Item
                  label="Email"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    },
                    {
                      pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                      message:
                        "Only letters, numbers, underscores and hyphens allowed"
                    }
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Email"
                    className={`form-control`}
                    name="email"
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
                <Form.Item
                  name="password"
                  label="Password"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      min: 6,
                      message: "Password must be minimum 6 characters."
                    },
                    {
                      pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                      message:
                        "Only letters, numbers, underscores and hyphens allowed"
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
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
                <Form.Item
                  label="Contact Person Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="contactPersonName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your contact Person Name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Contact Person Name"
                    className={`form-control`}
                    name="contactPersonName"
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
                <Form.Item
                  label="Contact Person Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="contactPersonNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Contact Person Number!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Contact Person Number"
                    className={`form-control`}
                    name="contactPersonNumber"
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
                <Form.Item
                  label="Address"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Address"
                    className={`form-control`}
                    name="address"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            </Row>

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
                    loading={loading}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
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

export default CreateBwNttnProviderForm;
