/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Select, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { RootCauseData } from "@/interfaces/RootCauseData";

interface FormData {
  title: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

interface PropData {
  item: RootCauseData;
}

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

const EditRootCauseForm = ({ item }: PropData) => {
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

  useEffect(() => {
    if (item) {
      setSelectCategory(item.rootCauseCategory);
      form.setFieldsValue({
        title: item.title,
        rootCauseCategory: item.rootCauseCategory
      });
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: FormData) => {
    // console.log(data);
    const { title } = data;

    const formData = {
      id: item.id,
      rootCauseCategory: selectCategory,
      title: title,
      isActive: isActive
    };

    try {
      axios
        .put("/api/root-cause/update", formData)
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
            complainCategory: "",
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
                message: "Please select rootCauseCategory!"
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

          {/* Title */}
          <Form.Item
            label="Title"
            style={{
              marginBottom: 0
            }}
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your Name!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="Title"
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

export default EditRootCauseForm;
