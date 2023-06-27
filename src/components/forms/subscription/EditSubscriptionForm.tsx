/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Select, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { SubscriptionData } from "@/interfaces/SubscriptionData";
interface FormData {
  name: string;
  packageType: string;
  slabStart: string;
  slabEnd: string;
  chargeAmount: string;
}

interface PropData {
  item: SubscriptionData;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

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

const EditSubscriptionForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [packageType, setPackageType] = useState<any>(null);

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

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        packageType: item.packageType,
        chargeAmount: item.chargeAmount,
        slabStart: item.slabStart,
        slabEnd: item.slabEnd
      });

      setPackageType(item.packageType);

      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: FormData) => {
    console.log(data);

    const { name, chargeAmount, slabStart, slabEnd, packageType } = data;

    const formData = {
      id: item.id,
      name: name,
      packageType: packageType,
      chargeAmount: chargeAmount,
      slabStart: slabStart,
      slabEnd: slabEnd,
      isActive: isActive
    };

    try {
      axios
        .put("/api/subscription-plan/update", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          MySwal.fire({
            title: "Success",
            text: data.message || "subscription Updated successfully",
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
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            name: "",
            packageType: "",
            chargeAmount: "",
            slabStart: "",
            slabEnd: ""
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
          {/* packageType*/}

          <Form.Item
            label="Package Type"
            style={{
              marginBottom: 0
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
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleChange}
                options={types}
                value={packageType}
              />
            </Space>
          </Form.Item>

          {/* name */}
          <Form.Item
            label="Name"
            style={{
              marginBottom: 0
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
            />
          </Form.Item>

          {/* chargeAmount */}

          <Form.Item
            label="Charge Amount"
            style={{
              marginBottom: 0
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
            />
          </Form.Item>

          {/* slabStart */}
          <Form.Item
            label="Slab Start"
            style={{
              marginBottom: 0
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
            />
          </Form.Item>

          {/* slabEnd */}
          <Form.Item
            label="Slab End"
            style={{
              marginBottom: 0
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

export default EditSubscriptionForm;
