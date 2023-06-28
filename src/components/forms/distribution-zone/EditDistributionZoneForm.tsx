/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { DistributionZoneData } from "@/interfaces/DistributionZoneData";

interface FormData {
  name: string;
  packageType: string;
  slabStart: string;
  slabEnd: string;
  chargeAmount: string;
}

interface PropData {
  item: DistributionZoneData;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const EditDistributionZoneForm = ({ item }: PropData) => {
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

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name
      });
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: FormData) => {
    console.log(data);

    const { name } = data;

    const formData = {
      id: item.id,
      name: name,
      isActive: isActive
    };

    try {
      axios
        .put("/api/distribution-zone/update", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          MySwal.fire({
            title: "Success",
            text: data.message || "Updated successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/customer/distribution-zone");
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

export default EditDistributionZoneForm;
