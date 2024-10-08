/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { SystemSmsData } from "@/interfaces/SystemSmsData";
// import AppImageLoader from "@/components/loader/AppImageLoader";

interface FormData {
  subject: string;
  key: string;
  template: string;
  placeholder: string;
}

interface PropData {
  item: SystemSmsData;
}

const EditSystemSmsForm = ({ item }: PropData) => {
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
        subject: item.subject,
        key: item.key,
        template: item.template,
        placeholder: item.placeholder
      });
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { subject, key, template, placeholder } = data;

      const formData = {
        id: item.id,
        subject: subject,
        key: key,
        template: template,
        placeholder: placeholder,
        isActive: isActive
      };

      try {
        await axios
          .put("/api/system-sms-template/update", formData)
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
                router.replace("/admin/notification/sms/system-sms-template");
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
            subject: "",
            key: "",
            template: "",
            placeholder: ""
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
                  placeholder="subject"
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
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="gutter-row"
            >
              {/* template */}
              <Form.Item
                label="Template"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="template"
                rules={[
                  {
                    required: true,
                    message: "Please input your template!"
                  }
                ]}
              >
                <Input.TextArea
                  // type="text"
                  placeholder="template"
                  className={`form-control`}
                  name="template"
                  style={{ padding: "6px" }}
                  rows={6}
                  cols={20}
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
              {/* placeholder */}
              <Form.Item
                label="Placeholder"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="placeholder"
                rules={[
                  {
                    required: true,
                    message: "Please input your placeholder!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="placeholder"
                  className={`form-control`}
                  name="placeholder"
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
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      {/* )} */}
    </>
  );
};

export default EditSystemSmsForm;
