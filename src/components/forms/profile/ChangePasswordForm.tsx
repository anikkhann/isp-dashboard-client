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

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordForm = () => {
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

    const { oldPassword, newPassword, confirmPassword } = data;

    const formData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    try {
      axios
        .post("/api/users/change-password", formData)
        .then(res => {
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
              text: data.message || "Updated successfully",
              icon: "success"
            }).then(() => {
              router.reload();
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
        <div className="mt-3 mx-5">
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: ""
            }}
            style={{ maxWidth: "100%" }}
            name="wrap"
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
                <Form.Item
                  name="oldPassword"
                  label="oldPassword"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your oldPassword!"
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
                    placeholder="oldPassword"
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
                <Form.Item
                  name="newPassword"
                  label="newPassword"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  // placeholder="Confirm Password"
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your newPassword!"
                    },
                    {
                      pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                      message:
                        "Only letters, numbers, underscores and hyphens allowed"
                    }
                  ]}
                >
                  <Input.Password
                    placeholder="New Password"
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
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  // placeholder="Confirm Password"
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    {
                      pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                      message:
                        "Only letters, numbers, underscores and hyphens allowed"
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "confirm password that you entered do not match with password!"
                          )
                        );
                      }
                    })
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password"
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

export default ChangePasswordForm;
