/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Col, Row } from "antd";
import AppImageLoader from "@/components/loader/AppImageLoader";
import { NasDeviceData } from "@/interfaces/NasDeviceData";
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

interface PropData {
  item: NasDeviceData;
}

const EditNasDeviceForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState<boolean>(true);
  const [isApiSslActive, setIsApiSslActive] = useState<boolean>(false);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleApiSslActive = (e: any) => {
    setIsApiSslActive(e.target.checked ? true : false);
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        mapLocation: item.mapLocation,
        locationDescription: item.locationDescription,
        ip: item.ip,
        secret: item.secret,
        radiusIncomingPort: item.radiusIncomingPort,
        apiPort: item.apiPort,
        apiUsername: item.apiUsername,
        apiPassword: item.apiPassword
      });
      setIsActive(item.isActive);
      setIsApiSslActive(item.apiSsl);
    }
  }, [item]);

  const onSubmit = (data: FormData) => {
    setLoading(true);
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
      id: item.id,
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
      axios
        .put("/api-hotspot/nas-device/update", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status === 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || "Added successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/hotspot/nas-devices");
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
  };

  return (
    <>
      {loading && <AppImageLoader />}
      {showError && <Alert message={errorMessages} type="error" showIcon />}
      {!loading && (
        <div className="my-6">
          <Form
            // {...layout}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{}}
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
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                <Form.Item
                  name="name"
                  label="name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="name"
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
                  name="mapLocation"
                  label="mapLocation"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input mapLocation!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="mapLocation"
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
                  name="locationDescription"
                  label="locationDescription"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input locationDescription!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="locationDescription"
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
                  name="ip"
                  label="ip"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input ip!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="ip"
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
                  label="secret"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input secret!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="secret"
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
                  name="radiusIncomingPort"
                  label="radiusIncomingPort"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input radiusIncomingPort!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="radiusIncomingPort"
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
                  name="apiSsl"
                  label="apiSsl"
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
                    apiSsl
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
                  label="apiPort"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your apiPort!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="apiPort"
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
                  label="apiUsername"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your apiUsername!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="apiUsername"
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
                  name="apiPassword"
                  label="apiPassword"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your apiPassword!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="apiPassword"
                    className={`form-control`}
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
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
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditNasDeviceForm;
