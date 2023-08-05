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
  Select,
  Space,
  Row,
  Col
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
interface FormData {
  name: string;
  packageType: string;
  slabStart: string;
  slabEnd: string;
  chargeAmount: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const types = [
  {
    label: "Monthly",
    value: "Monthly"
  },
  {
    label: "Per Customer",
    value: "Per Customer"
  }
];

const CreateSubscriptionForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [packageType, setPackageType] = useState(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleChange = (value: any) => {
    console.log("checked = ", value);
    form.setFieldsValue({ packageType: value });
    setPackageType(value as any);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);

    const { name, chargeAmount, slabStart, slabEnd, packageType } = data;

    const formData = {
      name: name,
      packageType: packageType,
      chargeAmount: chargeAmount,
      slabStart: slabStart,
      slabEnd: slabEnd,
      isActive: isActive
    };

    try {
      axios
        .post("/api/subscription-plan/create", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          MySwal.fire({
            title: "Success",
            text: data.message || "subscription Added successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/client/subscription");
          });
        })
        .catch(err => {
          // console.log(err);
          setShowError(true);
          setErrorMessages(err.response.data.message);
        });
    } catch (err: any) {
      // // console.log(err)
      setShowError(true);
      setErrorMessages(err.message);
    }
  };

  return (
    <>
      {showError && <Alert message={errorMessages} type="error" showIcon />}

      <div className="mt-3">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            name: "",
            packageType: "",
            chargeAmount: 0,
            slabStart: "",
            slabEnd: ""
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
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* packageType*/}

              <Form.Item
                label="Package Type"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="packageType"
                rules={[
                  {
                    required: true,
                    message: "Please select package type!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={types}
                    value={packageType}
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
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* chargeAmount */}

              <Form.Item
                label="Charge Amount"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="chargeAmount"
                rules={[
                  {
                    required: true,
                    message: "Please input your Charge Amount!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Charge Amount"
                  className={`form-control`}
                  name="chargeAmount"
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
              {/* slabStart */}
              <Form.Item
                label="Slab Start"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="slabStart"
                rules={[
                  {
                    required: true,
                    message: "Please input your Slab Start!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Slab Start"
                  className={`form-control`}
                  name="slabStart"
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
              {/* slabEnd */}
              <Form.Item
                label="Slab End"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="slabEnd"
                rules={[
                  {
                    required: true,
                    message: "Please input your Slab End!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Slab End"
                  className={`form-control`}
                  name="slabEnd"
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
    </>
  );
};

export default CreateSubscriptionForm;
