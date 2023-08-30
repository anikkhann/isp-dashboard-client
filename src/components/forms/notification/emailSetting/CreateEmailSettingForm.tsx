/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Space,
  Select
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";
interface FormData {
  smtpAccountName: string;
  smtpServer: string;
  smtpPort: string;
  smtpUserName: string;
  smtpPassword: string;
}

const authTypes = [
  {
    label: "none",
    value: "none"
  },
  {
    label: "tls",
    value: "tls"
  },
  {
    label: "ssl",
    value: "ssl"
  }
];

const CreateEmailSettingForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const [selectedAuthType, setSelectedAuthType] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleAuthType = (value: any) => {
    form.setFieldsValue({ authType: value });
    setSelectedAuthType(value);
  };

  const onSubmit = (data: FormData) => {
    setLoading(true);

    const {
      smtpAccountName,
      smtpServer,
      smtpPort,
      smtpUserName,
      smtpPassword
    } = data;

    const formData = {
      smtpAccountName: smtpAccountName,
      smtpServer: smtpServer,
      smtpPort: smtpPort,
      authType: selectedAuthType,
      smtpUserName: smtpUserName,
      smtpPassword: smtpPassword,
      isActive: isActive
    };

    try {
      axios
        .post("/api/email-settings/create", formData)
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
              router.replace("/admin/notification/email/email-setting");
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
              smtpAccountName: "",
              smtpServer: "",
              smtpPort: "",
              authType: "",
              smtpUserName: "",
              smtpPassword: ""
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
                {/* authType */}
                <Form.Item
                  label="Auth Type"
                  name="authType"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select authType!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select "
                      onChange={handleAuthType}
                      options={authTypes}
                      value={selectedAuthType}
                      showSearch
                      filterOption={(input, option) => {
                        if (typeof option?.label === "string") {
                          return (
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }
                        return false;
                      }}
                    />
                  </Space>
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
                {/* smtpAccountName */}
                <Form.Item
                  label="SMTP Account Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="smtpAccountName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your SMTP Account Name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="SMTP Account Name"
                    className={`form-control`}
                    name="smtpAccountName"
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
                {/* smtpServer */}
                <Form.Item
                  label="SMTP Server"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="smtpServer"
                  rules={[
                    {
                      required: true,
                      message: "Please input your SMTP Server!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="SMTP Server"
                    className={`form-control`}
                    name="smtpServer"
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
                {/* smtpPort */}
                <Form.Item
                  label="SMTP PORT"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="smtpPort"
                  rules={[
                    {
                      required: true,
                      message: "Please input your SMTP PORT!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="SMTP PORT"
                    className={`form-control`}
                    name="smtpPort"
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
                {/* smtpUserName */}
                <Form.Item
                  label="SMTP UserName"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="smtpUserName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your SMTP UserName!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="SMTP UserName"
                    className={`form-control`}
                    name="smtpUserName"
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
                {/* smtpPassword */}
                <Form.Item
                  label="SMTP Password"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="smtpPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your SMTP Password!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="SMTP Password"
                    className={`form-control`}
                    name="smtpPassword"
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

export default CreateEmailSettingForm;
