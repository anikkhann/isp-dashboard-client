/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Select, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { IpData } from "@/interfaces/IpData";

interface FormData {
  assignedType: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

interface PropData {
  item: IpData;
}

const EditIPForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any[]>([]);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleCustomerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerId: value });
    setSelectedCustomer(value as any);
  };

  function getCustomers() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        partnerType: "client"
      }
    };

    axios.post("/api/partner/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setCustomers(list);
    });
  }

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        ip: item.ip,
        customerId: item.ipSubnet.partner.id
      });
      setSelectedCustomer(item.ipSubnet.partner.id as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data: FormData) => {
    // console.log(data);
    // const { assignedType, } = data;

    const formData = {
      id: item.id,
      assignedType: "customer",
      customerId: selectedCustomer
    };

    try {
      axios
        .put("/api/ip-list/update", formData)
        .then(res => {
          const { data } = res;
          MySwal.fire({
            title: "Success",
            text: data.message || "Added successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/device/ip-management");
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
            ip: item.ip,
            assignedType: "",
            customerId: ""
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
          {/* ip */}
          <Form.Item
            label="IP Address"
            style={{
              marginBottom: 0
            }}
            name="ip"
          >
            <Input
              type="text"
              placeholder="ip"
              className={`form-control`}
              name="ip"
              disabled
            />
          </Form.Item>

          {/* divisionId */}
          <Form.Item
            label="Customers"
            style={{
              marginBottom: 0
            }}
            name="customerId"
            rules={[
              {
                required: true,
                message: "Please select"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleCustomerChange}
                options={customers}
                value={selectedCustomer}
              />
            </Space>
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

export default EditIPForm;
