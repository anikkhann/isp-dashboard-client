/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { GatewayData } from "@/interfaces/GatewayData";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface FormData {
  name: string;
  baseUrl: string;
}

interface PropData {
  item: GatewayData;
}

const EditGatewayForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        baseUrl: item.baseUrl
      });
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: FormData) => {
    setLoading(true);

    const { name, baseUrl } = data;

    const formData = {
      id: item.id,
      name: name,
      baseUrl: baseUrl,

      isActive: isActive
    };

    try {
      axios
        .put("/api/sms-gateway/update", formData)
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
              router.replace("/admin/notification/sms/gateway");
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
              name: "",
              baseUrl: ""
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
                {/* name */}
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
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* baseUrl */}
                <Form.Item
                  label="BaseUrl"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="baseUrl"
                  rules={[
                    {
                      required: true,
                      message: "Please input your BaseUrl!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="BaseUrl"
                    className={`form-control`}
                    name="baseUrl"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
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

export default EditGatewayForm;
