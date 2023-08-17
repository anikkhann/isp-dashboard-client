/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";
interface FormData {
  amount: string;
  type: string;
  remarks: string;
}

const types = [
  {
    label: "debit",
    value: "debit"
  },
  {
    label: "credit",
    value: "credit"
  }
];

const CreateZoneTopForm = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [selectType, setSelectType] = useState<any>(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [zoneList, setZoneList] = useState([]);
  const [zoneManagerId, setZoneManagerId] = useState(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ type: value });
    setSelectType(value as any);
  };

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ zoneManagerId: value });
    setZoneManagerId(value as any);
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
        partnerType: "zone",
        isActive: true
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
    setLoading(true);
    const { amount, type, remarks } = data;

    const formData = {
      zoneManagerId: zoneManagerId,
      amount: amount,
      type: type,
      remarks: remarks
    };

    try {
      axios
        .post("/api/zone-topup/create", formData)
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
              router.replace("/admin/top-up/zone-top-up");
            });
          }
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
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{
              amount: "",
              zoneManagerId: "",
              type: "",
              remarks: ""
            }}
            style={{ maxWidth: "100%" }}
            name="wrap"
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
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* zoneManagerId */}
                <Form.Item
                  label="Zone Manager"
                  name="zoneManagerId"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select"
                      onChange={handleZoneChange}
                      options={zoneList}
                      value={zoneManagerId}
                    />
                  </Space>
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* type */}
                <Form.Item
                  label="Type"
                  name="type"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select Type!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Type"
                      onChange={handleChange}
                      options={types}
                      value={selectType}
                    />
                  </Space>
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* amount */}
                <Form.Item
                  label="amount"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="amount"
                  rules={[
                    {
                      required: true,
                      message: "Please input your amount!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="amount"
                    className={`form-control`}
                    name="amount"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* remarks */}
                <Form.Item
                  label="remarks"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="remarks"
                  rules={[
                    {
                      required: true,
                      message: "Please input your remarks!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="remarks"
                    className={`form-control`}
                    name="remarks"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* submit */}
            <Row justify="center">
              <Form.Item>
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
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default CreateZoneTopForm;
