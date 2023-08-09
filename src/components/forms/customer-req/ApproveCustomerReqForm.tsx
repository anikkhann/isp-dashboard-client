/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { CustomerData } from "@/interfaces/CustomerData";

interface PropData {
  item: CustomerData;
}

const ApproveCustomerReqForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [distributionZones, setDistributionZones] = useState([]);
  const [distributionPops, setDistributionPops] = useState([]);

  const [selectedDistributionZone, setSelectedDistributionZone] =
    useState(null);
  const [selectedDistributionPop, setSelectedDistributionPop] = useState(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ distributionZoneId: value });
    setSelectedDistributionZone(value);
  };

  const handlePopChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ distributionPopId: value });
    setSelectedDistributionPop(value);
  };

  function getDistributionZones() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        isActive: true
      }
    };

    axios.post("/api/distribution-zone/get-list", body).then(res => {
      const { data } = res;
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setDistributionZones(list);
    });
  }

  function getDistributionPops(selectedDistributionZone: string) {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        distributionZone: { id: selectedDistributionZone },
        isActive: true
      }
    };

    axios.post("/api/distribution-pop/get-list", body).then(res => {
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setDistributionPops(list);
    });
  }

  useEffect(() => {
    getDistributionZones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedDistributionZone) {
      getDistributionPops(selectedDistributionZone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistributionZone]);

  useEffect(() => {
    if (item) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = () => {
    // console.log(data);

    const formData = {
      id: item.id,
      distributionZoneId: selectedDistributionZone,
      distributionPopId: selectedDistributionPop
    };

    try {
      axios
        .put("/api/customer-request/approve", formData)
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
              router.replace(`/admin/customer/customer-onboarding-req`);
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
            distributionZoneId: "",
            distributionPopId: ""
          }}
          style={{ maxWidth: "100%" }}
          name="wrap"
          // labelCol={{ flex: "110px" }}
          // labelAlign="left"
          // labelWrap
          // wrapperCol={{ flex: 1 }}
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
              {/* distributionZoneId */}
              <Form.Item
                label="Distribution Zone"
                name="distributionZoneId"
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
                    options={distributionZones}
                    value={selectedDistributionZone}
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
              {/* distributionPopId */}
              <Form.Item
                label="Distribution Pop"
                name="distributionPopId"
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
                    onChange={handlePopChange}
                    options={distributionPops}
                    value={selectedDistributionPop}
                  />
                </Space>
              </Form.Item>
            </Col>
          </Row>

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

export default ApproveCustomerReqForm;
