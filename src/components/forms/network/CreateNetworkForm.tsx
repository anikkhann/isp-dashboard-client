/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
interface FormData {
  networkName: string;
  networkAddress: string;
  subnetMask: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const CreateNetworkForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const onSubmit = (data: FormData) => {
    // console.log(data);
    const { networkName, networkAddress, subnetMask } = data;

    const formData = {
      networkName: networkName,
      networkAddress: networkAddress,
      subnetMask: subnetMask,
      isActive: isActive
    };

    try {
      axios
        .post("/api/ip-subnet/create", formData)
        .then(res => {
          const { data } = res;
          MySwal.fire({
            title: "Success",
            text: data.message || "Added successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/device/network");
          });
        })
        .catch(err => {
          // console.log(err);
          setShowError(true);
          setErrorMessages(err.response.data.message);
        });
    } catch (err: any) {
      // console.log(err)
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
            networkName: "",
            networkAddress: "",
            subnetMask: ""
          }}
          style={{ maxWidth: "100%" }}
          name="wrap"
          /* labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }} */
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
              {/* networkName */}
              <Form.Item
                label="Network Name"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="networkName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Network Name!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Network Name"
                  className={`form-control`}
                  name="networkName"
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
              {/* networkAddress */}
              <Form.Item
                label="Network Address"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="networkAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input your Network Address!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Network Address"
                  className={`form-control`}
                  name="networkAddress"
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
              {/* subnetMask */}
              <Form.Item
                label="Subnet Mask"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="subnetMask"
                rules={[
                  {
                    required: true,
                    message: "Please input your Subnet Mask!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Subnet Mask"
                  className={`form-control`}
                  name="subnetMask"
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
    </>
  );
};

export default CreateNetworkForm;
