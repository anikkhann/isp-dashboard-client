/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { CustomerData } from "@/interfaces/CustomerData";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface FormData {
  remarks: string;
}

interface PropData {
  item: CustomerData;
}

const ReinitiateCustomerRequestForm = ({ item }: PropData) => {
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
    if (item) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const { remarks } = data;

    const formData = {
      id: item.id,
      note: remarks
    };

    try {
      axios
        .put("/api/customer-request/re-initiate", formData)
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
              router.replace(`/admin/customer/customer-onboarding-req`);
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
              note: ""
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
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                className="gutter-row"
              >
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
                      message: "Please input your remarks!"
                    }
                  ]}
                >
                  <Input.TextArea
                    placeholder="remarks"
                    className={`form - control`}
                    name="remarks"
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

export default ReinitiateCustomerRequestForm;
