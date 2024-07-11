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
  Card,
  Space,
  Select
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Col, Row } from "antd";
import { useAppSelector } from "@/store/hooks";
// import AppImageLoader from "@/components/loader/AppImageLoader";
interface FormData {
  name: string;
  mapLocation: string;
  locationDescription: string;
  ip: string;
  secret: string;
  radiusIncomingPort: any;
  apiPort: string;
  apiUsername: string;
  apiPassword: string;
}

const CreateNasDeviceForm = () => {
  const [form] = Form.useForm();
  const authUser = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(false);
  // ** States
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState<boolean>(true);
  const [isApiSslActive, setIsApiSslActive] = useState<boolean>(false);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleClientChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({
      clientId: value
    });
    setSelectedClient(value || null);
  };

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleApiSslActive = (e: any) => {
    setIsApiSslActive(e.target.checked ? true : false);
  };

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const {
        name,
        mapLocation,
        locationDescription,
        ip,
        secret,
        radiusIncomingPort,
        apiPort,
        apiUsername,
        apiPassword
      } = data;

      const formData = {
        clientId: selectedClient,
        name: name,
        mapLocation: mapLocation,
        locationDescription: locationDescription,
        ip: ip,
        secret: secret,
        radiusIncomingPort: radiusIncomingPort,
        apiSsl: isApiSslActive,
        apiPort: apiPort,
        apiUsername: apiUsername,
        apiPassword: apiPassword,
        isActive: isActive
      };

      try {
        await axios
          .post("/api-hotspot/nas-device/create", formData)
          .then(res => {
            // console.log(res);
            const { data } = res;

            if (data.status === 200) {
              MySwal.fire({
                title: "Success",
                text: data.message || "Added successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/hotspot/nas-device");
              });
            } else {
              MySwal.fire({
                title: "Error",
                text: data.message || "Added Failed",
                icon: "error"
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
    }, 2000);
  };

  function getClients() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "username"
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
          label: item.username,
          value: item.id
        };
      });

      setClients(list);
    });
  }
  return (
    <>
      {/* {loading && <AppImageLoader />} */}
      {showError && <Alert message={errorMessages} type="error" showIcon />}
      {/* {!loading && ( */}
      <div className="my-6">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            radiusIncomingPort: 1700,
            apiPort: 1824
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
            <div
              style={{
                margin: "0 auto",
                // border: "1px solid #F15F22",
                textAlign: "center"
              }}
            >
              <h1
                style={{
                  fontSize: "1.5rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#F15F22"
                }}
              >
                New NAS Device
              </h1>
            </div>
            <Card
              style={{
                // width: "90%",
                // backgroundColor: "#ffffff",
                // borderRadius: "10px",
                // margin: "0 auto",
                // textAlign: "center"
                width: "90%",
                backgroundColor: "#F0F2F5",
                borderRadius: "10px",
                margin: "0 auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                padding: "20px"
              }}
            >
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                justify="space-between"
              >
                {authUser &&
                  (authUser.userType == "durjoy" ||
                    authUser.userType == "duronto") && (
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      xxl={8}
                      className="gutter-row"
                    >
                      {/* clientId */}
                      <Form.Item
                        label="Client"
                        style={{
                          marginBottom: 0,
                          fontWeight: "bold"
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please input client!"
                          }
                        ]}
                        name="clientId"
                      >
                        <Space style={{ width: "100%" }} direction="vertical">
                          <Select
                            allowClear
                            style={{ width: "100%", textAlign: "start" }}
                            placeholder="Please select"
                            onChange={handleClientChange}
                            options={clients}
                            value={selectedClient}
                            showSearch
                            filterOption={(input, option) => {
                              if (typeof option?.label === "string") {
                                return (
                                  option.label
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                );
                              }
                              return false;
                            }}
                          />
                        </Space>
                      </Form.Item>
                    </Col>
                  )}

                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="name"
                    label="Device Name"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please input device name!"
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Device Name"
                      className={`form-control`}
                      style={{ padding: "6px" }}
                      maxLength={32}
                    />
                  </Form.Item>
                </Col>

                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="mapLocation"
                    label="Map Location"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please input Map Location!"
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Map Location"
                      className={`form-control`}
                      style={{ padding: "6px" }}
                      maxLength={100}
                    />
                  </Form.Item>
                </Col>

                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="locationDescription"
                    label="Location Description"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please input Location Description!"
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Location Description"
                      className={`form-control`}
                      style={{ padding: "6px" }}
                      maxLength={100}
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="ip"
                    label="IP"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please input IP!"
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="IP"
                      className={`form-control`}
                      style={{ padding: "6px" }}
                    />
                  </Form.Item>
                </Col>

                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="secret"
                    label="Secret"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please input Secret!"
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Secret"
                      className={`form-control`}
                      style={{ padding: "6px" }}
                      maxLength={20}
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="radiusIncomingPort"
                    label="Radius Incoming Port"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true
                        // message: "Please input Radius Incoming Port!"
                      },
                      {
                        validator: async (_, value) => {
                          if (!value) {
                            return Promise.reject(
                              "Please input your Incoming Port!"
                            );
                          }
                          const intValue = parseInt(value, 10);
                          if (isNaN(intValue)) {
                            return Promise.reject(
                              "Please enter a valid number."
                            );
                          }
                          if (intValue <= 1000 || intValue > 65535) {
                            return Promise.reject(
                              "Port number must be greater than 1000 and less than or equal to 65535."
                            );
                          }
                          return Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Radius Incoming Port"
                      className={`form-control`}
                      style={{ padding: "6px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <div
              style={{
                margin: "0 auto",
                // border: "1px solid #F15F22",
                textAlign: "center"
              }}
            >
              <h1
                style={{
                  fontSize: "1.5rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#F15F22"
                }}
              >
                API Information
              </h1>
            </div>
            <Card
              // style={{
              //   width: "90%",
              //   backgroundColor: "#ffffff",
              //   borderRadius: "10px",
              //   margin: "0 auto",

              //   textAlign: "center"
              // }}
              style={{
                width: "90%",
                backgroundColor: "#F0F2F5",
                borderRadius: "10px",
                margin: "0 auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                padding: "20px"
              }}
            >
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                justify="space-between"
              >
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="apiSsl"
                    // label="API SSL"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                  >
                    <Checkbox
                      onChange={handleApiSslActive}
                      checked={isApiSslActive}
                      className="gutter-row"
                    >
                      API SSL
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="apiPort"
                    label="API Port"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true
                        // message: "Please input your API Port!"
                      },
                      {
                        validator: async (_, value) => {
                          if (!value) {
                            return Promise.reject(
                              "Please input your API Port!"
                            );
                          }
                          const intValue = parseInt(value, 10);
                          if (isNaN(intValue)) {
                            return Promise.reject(
                              "Please enter a valid number."
                            );
                          }
                          if (intValue <= 1000 || intValue > 65535) {
                            return Promise.reject(
                              "API Port number must be greater than 1000 and less than or equal to 65535."
                            );
                          }
                          return Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="API Port"
                      className={`form-control`}
                      style={{ padding: "6px" }}
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="apiUsername"
                    label="API Username"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your API Username!"
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="API Username"
                      className={`form-control`}
                      style={{ padding: "6px" }}
                      maxLength={32}
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  <Form.Item
                    name="apiPassword"
                    label="API Password"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your API Password!"
                      }
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="API Password"
                      className={`form-control`}
                      style={{ padding: "6px" }}
                      maxLength={32}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Row>

          <Form.Item>
            <Checkbox
              onChange={handleActive}
              checked={isActive}
              className="gutter-row"
            >
              Active
            </Checkbox>
          </Form.Item>

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
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      {/* )} */}
    </>
  );
};

export default CreateNasDeviceForm;
