/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
// import AppImageLoader from "@/components/loader/AppImageLoader";
import { CustomerData } from "@/interfaces/CustomerData";
import { RightSquareOutlined } from "@ant-design/icons";
interface FormData {
  otpNo: string;
}

interface PropData {
  item: CustomerData;
}

const CreateSafOtpVerifyForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // async function handleSendSafOtp(id: string) {
  //   try {
  //     const result = await MySwal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#570DF8",
  //       cancelButtonColor: "#EB0808",
  //       confirmButtonText: "Yes, Send Otp!"
  //     });

  //     if (result.isConfirmed) {
  //       const body = {
  //         customerId: id
  //       };

  //       const { data } = await axios.post(
  //         `/api/saf-verification/send-otp`,
  //         body
  //       );
  //       if (data.status === 200) {
  //         MySwal.fire("Success!", data.message, "success").then(() => {
  //           // router.reload();
  //         });
  //       } else {
  //         MySwal.fire("Error!", data.message, "error");
  //       }
  //     } else if (result.isDismissed) {
  //       MySwal.fire("Cancelled", "Your Data is safe :)", "error");
  //     }
  //   } catch (error: any) {
  //     // console.log(error);
  //     if (error.response) {
  //       MySwal.fire("Error!", error.response.data.message, "error");
  //     } else {
  //       MySwal.fire("Error!", "Something went wrong", "error");
  //     }
  //   }
  // }
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { otpNo } = data;

      const formData = {
        customerId: item.id,
        otpNo: otpNo
      };

      try {
        await axios
          .post("/api/saf-verification/otp-verification", formData)
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
                router.replace(`/admin/customer-care/${item.id}`);
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
      <div className="mt-3">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            otpNo: ""
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
              {/* otpNo */}
              <Form.Item
                label="SAF Verification Code"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="otpNo"
                rules={[
                  {
                    required: true,
                    message: "Please input your SAF Verification Code!"
                  }
                ]}
              >
                <Input
                  placeholder="SAF Verification Code"
                  className={`form - control`}
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* submit */}
          <Row justify="center">
            <Col>
              <Form.Item>
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
            <Col>
              <Button
                style={{
                  backgroundColor: "#F15F22",
                  border: "1px solid #F15F22",
                  color: "#ffffff"
                }}
                // Resend
                // Verification
                icon={<RightSquareOutlined />}
                // onClick={() => handleSendSafOtp(record.customerId)}
                // onClick={() => handleSendSafOtp(record.id)}
              />
            </Col>
          </Row>
        </Form>
      </div>
      {/* )} */}
    </>
  );
};

export default CreateSafOtpVerifyForm;
