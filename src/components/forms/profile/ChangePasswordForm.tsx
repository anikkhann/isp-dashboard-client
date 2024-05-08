/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert, Button, Form, Row, Col, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
// import AppImageLoader from "@/components/loader/AppImageLoader";

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
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { oldPassword, newPassword, confirmPassword } = data;

      const formData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      };

      try {
        await axios
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
                // router.reload();
                router.replace("/admin");
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
    }, 2000);
  };

  return (
    <>
      {/* {loading && <AppImageLoader />} */}

      {showError && <Alert message={errorMessages} type="error" showIcon />}

      {/* {!loading && ( */}
      <div className="mt-8 mx-5">
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
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="oldPassword"
                label="Current Password"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Current Password!"
                  },
                  // {
                  //   min: 6,
                  //   message: "Password must be minimum 6 characters."
                  // },
                  // {
                  //   pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                  //   message:
                  //     "Only letters, numbers, underscores and hyphens allowed"
                  // }
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-]{6,}$/),
                    message:
                      "Password should be at least 6 characters and only contain letters, numbers, underscores, and hyphens (0-9,a-z,A-Z,_,-)."
                  }
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Current Password"
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
                name="newPassword"
                label="New Password"
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
                    message: "Please input your New Password!"
                  },
                  // {
                  //   min: 6,
                  //   message: "Password must be minimum 6 characters."
                  // },
                  // {
                  //   pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                  //   message:
                  //     "Only letters, numbers, underscores and hyphens allowed"
                  // }
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-]{6,}$/),
                    message:
                      "Password should be at least 6 characters and only contain letters, numbers, underscores, and hyphens (0-9,a-z,A-Z,_,-)."
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
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
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
                    message: "Please confirm your new password!"
                  },
                  // {
                  //   min: 6,
                  //   message: "Password must be minimum 6 characters."
                  // },
                  // {
                  //   pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                  //   message:
                  //     "Only letters, numbers, underscores and hyphens allowed"
                  // },
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-]{6,}$/),
                    message:
                      "Password should be at least 6 characters and only contain letters, numbers, underscores, and hyphens (0-9,a-z,A-Z,_,-)."
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
                  placeholder="Confirm New Password"
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
        <div className="bg-gray-400 flex flex-col gap-1 my-5">
          <div className="rounded-sm w-full grid grid-cols-12 bg-white shadow p-6 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform">
            <div className="col-span-11 xl:-ml-5">
              <p className="text-blue-600 font-semibold text-left text-lg">
                <span className="text-danger">
                  * Password should be at least 6 digit and Only letters,
                  numbers, underscores and hyphens allowed (0-9,a-z,A-Z,_,-)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default ChangePasswordForm;
