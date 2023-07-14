/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Select, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
interface FormData {
  title: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const categories = [
  {
    label: "zone",
    value: "zone"
  },
  {
    label: "client",
    value: "client"
  },
  {
    label: "customer",
    value: "customer"
  }
];

const CreateRootCauseForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [selectCategory, setSelectCategory] = useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ rootCauseCategory: value });
    setSelectCategory(value as any);
  };

  const onSubmit = (data: FormData) => {
    // console.log(data);
    const { title } = data;

    const formData = {
      rootCauseCategory: selectCategory,
      title: title,
      isActive: isActive
    };

    try {
      axios
        .post("/api/root-cause/create", formData)
        .then(res => {
          const { data } = res;
          MySwal.fire({
            title: "Success",
            text: data.message || "Added successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/complaint/root-cause");
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
            rootCauseCategory: "",
            name: ""
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
          {/* rootCauseCategory */}
          <Form.Item
            label="Category"
            name="rootCauseCategory"
            rules={[
              {
                required: true,
                message: "Please select Category!"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleChange}
                options={categories}
                value={selectCategory}
              />
            </Space>
          </Form.Item>

          {/* title */}
          <Form.Item
            label="Title"
            style={{
              marginBottom: 0
            }}
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="title"
              className={`form-control`}
              name="title"
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

export default CreateRootCauseForm;
