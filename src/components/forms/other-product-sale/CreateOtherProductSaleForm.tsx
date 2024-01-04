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

interface FromData {
  otherProductId: number;
  quantity: number;
  customerName: string;
  customerNumber: string;
  address: string;
  tsoComment: string;
}

const CreateOtherProductSaleForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [otherProducts, setOtherProducts] = useState<any[]>([]);
  const [selectedOtherProduct, setSelectedOtherProduct] = useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  function getOtherProducts() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "createdOn"
          }
        ]
      },
      body: {
        isActive: true
      }
    };

    axios.post("/api-hotspot/other-product/get-list", body).then(res => {
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

      setOtherProducts(list);
    });
  }

  useEffect(() => {
    getOtherProducts();
  }, []);

  const handleOtherProductChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ otherProductId: value });
    setSelectedOtherProduct(value);
  };

  const onSubmit = (data: FromData) => {
    setLoading(true);
    const { quantity, customerName, customerNumber, address, tsoComment } =
      data;

    const formData = {
      otherProductId: selectedOtherProduct,
      quantity: quantity,
      customerName: customerName,
      customerNumber: customerNumber,
      address: address,
      tsoComment: tsoComment
    };
    try {
      axios
        .post("/api-hotspot/other-product-sales/create", formData)
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
              router.replace("/admin/hotspot/other-product-sale");
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
                  {/* otherProductId */}
                  <Form.Item
                    label="Product"
                    name="otherProductId"
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
                        onChange={handleOtherProductChange}
                        options={otherProducts}
                        value={selectedOtherProduct}
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
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* quantity */}
                  <Form.Item
                    label="Quantity"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="quantity"
                    rules={[
                      {
                        required: true,
                        message: "Please input quantity!"
                      }
                    ]}
                  >
                    <Input placeholder="Quantity" className={`form-control`} />
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
                  {/* customerName */}
                  <Form.Item
                    label="Customer Name"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="customerName"
                    rules={[
                      {
                        required: true,
                        message: "Please input customerName!"
                      }
                    ]}
                  >
                    <Input placeholder="Customer Name" />
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
                  {/* customerNumber */}
                  <Form.Item
                    label="Customer Number"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="customerNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input Customer Number!"
                      }
                    ]}
                  >
                    <Input placeholder="Customer Number" />
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
                  {/* address */}
                  <Form.Item
                    label="Address"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please input address!"
                      }
                    ]}
                  >
                    <Input placeholder="Address" />
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
                  {/* tsoComment */}
                  <Form.Item
                    label="TSO Comment"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="tsoComment"
                    rules={[
                      {
                        required: true,
                        message: "Please input TSO Comment!"
                      }
                    ]}
                  >
                    <Input placeholder="TSO Comment" />
                  </Form.Item>
                </Col>
              </Row>

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

export default CreateOtherProductSaleForm;
