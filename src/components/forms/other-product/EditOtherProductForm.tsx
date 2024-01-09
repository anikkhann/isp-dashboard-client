/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Row, Col, Checkbox } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import AppImageLoader from "@/components/loader/AppImageLoader";
import { OtherProductData } from "@/interfaces/OtherProductData";

interface FromData {
  name: string;
  unit: string;
  description: string;
}

interface PropData {
  item: OtherProductData;
}

const EditOtherProductForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [isActive, setIsActive] = useState<boolean>(true);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

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
        name: item.name,
        unit: item.unit,
        description: item.description
      });
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: FromData) => {
    setLoading(true);
    const { name, unit, description } = data;

    const formData = {
      id: item.id,
      name: name,
      unit: unit,
      description: description,
      isActive: isActive
    };
    try {
      axios
        .post("/api-hotspot/other-product/create", formData)
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
              text: data.message || "Created successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/hotspot/other-product");
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
        <>
          <div className="mt-3">
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
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* name */}
                  <Form.Item
                    label="Product"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product!"
                      }
                    ]}
                  >
                    <Input placeholder="Product" className={`form-control`} />
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
                  {/* unit */}
                  <Form.Item
                    label="Unit"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="unit"
                    rules={[
                      {
                        required: true,
                        message: "Please input unit!"
                      }
                    ]}
                  >
                    <Input placeholder="Unit" />
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
                  {/* description */}
                  <Form.Item
                    label="Description"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input description!"
                      }
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      cols={16}
                      className={`form-control`}
                      name="description"
                      placeholder="Description"
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
                  <Form.Item style={{ margin: "0 8px" }}>
                    <div style={{ marginTop: 24 }}>
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
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default EditOtherProductForm;
