/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";
interface FormData {
  networkName: string;
  networkAddress: string;
  subnetMask: string;
}

const CreateIPForm = () => {
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

  const onSubmit = (data: FormData) => {
    setLoading(true);
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
              router.replace("/admin/device/ip-management");
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
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            scrollToFirstError
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
                  message: "Please input your networkName!"
                }
              ]}
            >
              <Input
                type="text"
                placeholder="networkName"
                className={`form-control`}
                name="networkName"
                style={{ padding: "6px" }}
              />
            </Form.Item>

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
                  message: "Please input your networkAddress!"
                }
              ]}
            >
              <Input
                type="text"
                placeholder="networkAddress"
                className={`form-control`}
                name="networkAddress"
                style={{ padding: "6px" }}
              />
            </Form.Item>

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
                  message: "Please input your subnetMask!"
                }
              ]}
            >
              <Input
                type="text"
                placeholder="subnetMask"
                className={`form-control`}
                name="subnetMask"
                style={{ padding: "6px" }}
              />
            </Form.Item>

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
                    type="primary"
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

export default CreateIPForm;
