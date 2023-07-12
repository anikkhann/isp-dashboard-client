/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Select, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
interface FormData {
  name: string;
  zoneId: string;
  latitude: string;
  longitude: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const CreateDistributionPopForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [zoneList, setZoneList] = useState([]);
  const [zoneId, setZoneId] = useState(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ zoneId: value });
    setZoneId(value as any);
  };

  function getZoneList() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        partnerType: "zone"
      }
    };
    axios.post("/api/partner/get-list", body).then(res => {
      const { data } = res;
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setZoneList(list);
    });
  }

  useEffect(() => {
    getZoneList();
  }, []);

  const onSubmit = (data: FormData) => {
    // console.log(data);
    const { name, latitude, longitude } = data;

    const formData = {
      zoneId: zoneId,
      name: name,
      isActive: isActive,
      latitude: latitude,
      longitude: longitude
    };

    try {
      axios
        .post("/api/distribution-pop/create", formData)
        .then(res => {
          const { data } = res;
          MySwal.fire({
            title: "Success",
            text: data.message || "Added successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/customer/distribution-pop");
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
            zoneId: "",
            name: "",
            latitude: "",
            longitude: ""
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
          {/* zoneId */}
          <Form.Item
            label="Zone"
            name="zoneId"
            rules={[
              {
                required: true,
                message: "Please select Zone!"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleZoneChange}
                options={zoneList}
                value={zoneId}
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

          {/* latitude */}
          <Form.Item
            label="latitude"
            style={{
              marginBottom: 0
            }}
            name="latitude"
          >
            <Input
              type="text"
              placeholder="latitude"
              className={`form-control`}
              name="latitude"
            />
          </Form.Item>

          {/* longitude */}
          <Form.Item
            label="longitude"
            style={{
              marginBottom: 0
            }}
            name="longitude"
          >
            <Input
              type="text"
              placeholder="longitude"
              className={`form-control`}
              name="longitude"
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

export default CreateDistributionPopForm;
