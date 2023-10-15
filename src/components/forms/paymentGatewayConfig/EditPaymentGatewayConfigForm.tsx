/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Row,
  Col
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import AppImageLoader from "@/components/loader/AppImageLoader";
import { PaymentGatewayConfigData } from "@/interfaces/PaymentGatewayConfigData";
interface FormData {
  credential: string;
}

interface PropData {
  item: PaymentGatewayConfigData;
}

const EditPaymentGatewayConfigForm = ({ item }: PropData) => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isActiveForSystem, setIsActiveForSystem] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [clients, setClients] = useState<any>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const [paymentGateways, setPaymentGateways] = useState<any>([]);
  const [selectedPaymentGateway, setSelectedPaymentGateway] =
    useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActiveForSystem = (e: any) => {
    setIsActiveForSystem(e.target.checked ? true : false);
  };
  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleClientChange = (value: any) => {
    setSelectedClient(value);
    form.setFieldsValue({
      clientId: value
    });
  };

  const handlePaymentGatewayChange = (value: any) => {
    setSelectedPaymentGateway(value);
    form.setFieldsValue({
      paymentGatewayId: value
    });
  };

  function getClients() {
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
        partnerType: "client",
        isActive: true
      }
    };

    axios.post("/api/partner/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setClients(list);
    });
  }

  function getPaymentGateway() {
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
        isActive: true
      }
    };

    axios.post("/api/payment-gateway/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const list = data.body.map((item: any) => {
        return {
          label: item.bankName,
          value: item.id
        };
      });

      setPaymentGateways(list);
    });
  }

  useEffect(() => {
    getClients();
    getPaymentGateway();
  }, []);

  useEffect(() => {
    if (item) {
      setIsActiveForSystem(item.isForSystem);
      setIsActive(item.isActive);
      form.setFieldsValue({
        credential: item.credential
      });
      if (item.clientId) {
        setSelectedClient(item.clientId);
        form.setFieldsValue({
          clientId: item.clientId
        });
      }

      if (item.paymentGatewayId) {
        setSelectedPaymentGateway(item.paymentGatewayId);
        form.setFieldsValue({
          paymentGatewayId: item.paymentGatewayId
        });
      }
    }
  }, [item]);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const { credential } = data;

    const formData = {
      id: item.id,
      clientId: selectedClient,
      paymentGatewayId: selectedPaymentGateway,
      credential: credential,
      isActiveForSystem: isActiveForSystem,
      isActive: isActive
    };

    try {
      axios
        .put("/api/payment-gateway-config/update", formData)
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
              text: data.message || "updated successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/payment/payment-gateway-config");
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
            layout="vertical"
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
            colon={false}
            scrollToFirstError
          >
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              justify="space-between"
            >
              {isActiveForSystem === false && (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  className="gutter-row"
                >
                  {/* clientId */}
                  <Form.Item
                    label="Client"
                    name="clientId"
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
                        onChange={handleClientChange}
                        options={clients}
                        value={selectedClient}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              )}

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* paymentGatewayId */}
                <Form.Item
                  label="Payment Gateway"
                  name="paymentGatewayId"
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
                      onChange={handlePaymentGatewayChange}
                      options={paymentGateways}
                      value={selectedPaymentGateway}
                    />
                  </Space>
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                className="gutter-row"
              >
                {/* credential */}
                <Form.Item
                  label="credential"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="credential"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="credential"
                    className={`form-control`}
                    name="credential"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* isForSystem */}
              <Form.Item
                label=""
                style={{
                  marginBottom: 0
                }}
              >
                <Checkbox
                  onChange={handleActiveForSystem}
                  checked={isActiveForSystem}
                >
                  System
                </Checkbox>
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
            </div>

            {/* submit */}
            <Row justify="center">
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
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditPaymentGatewayConfigForm;
