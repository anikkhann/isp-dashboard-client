/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
interface FormData {
  networkName: string;
  networkAddress: string;
  subnetMask: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

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
              marginBottom: 0
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
            />
          </Form.Item>

          {/* networkAddress */}
          <Form.Item
            label="Network Address"
            style={{
              marginBottom: 0
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
            />
          </Form.Item>

          {/* subnetMask */}

          <Form.Item
            label="Subnet Mask"
            style={{
              marginBottom: 0
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
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateNetworkForm;
