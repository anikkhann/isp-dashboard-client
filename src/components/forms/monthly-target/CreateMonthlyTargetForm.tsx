/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import AppImageLoader from "@/components/loader/AppImageLoader";

interface FromData {
  remarks: string;
  lines: LineDataProps[];
}

interface LineDataProps {
  otherProductId: string | undefined;
  amount: string | undefined;
}

// generate dynamic year - current year along with next two year -> default current year

const currentYear = new Date().getFullYear();

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 }
];

const CreateMonthlyTargetForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [years, setYears] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [otherProducts, setOtherProducts] = useState<any[]>([]);

  const [linesValues, setLinesValues] = useState<LineDataProps[]>([]);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //functions for getting zone manger list data using POST request
  function getOtherProducts() {
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

  function getUsers() {
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
        userCategory: "tso"
      }
    };
    axios.post("/api/users/get-list", body).then(res => {
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

      setUsers(list);
    });
  }

  useEffect(() => {
    getOtherProducts();
    getUsers();
  }, []);

  useEffect(() => {
    const years = [];
    for (let i = currentYear; i <= currentYear + 2; i++) {
      years.push({
        label: i,
        value: i
      });
    }
    setYears(years);

    setSelectedYear(currentYear);
    form.setFieldsValue({ year: currentYear });
  }, []);

  const handleOtherPrductChange = (value: any, key: number) => {
    // make a new field in forms lines list and set pricing plan id
    form.setFieldsValue({ [`lines[${key}].otherProductId`]: value });

    if (value) {
      const newLinesValues = [...linesValues];
      newLinesValues[key] = {
        ...newLinesValues[key],
        otherProductId: value
      };
      setLinesValues(newLinesValues);
    }
  };

  const handleUserChange = (value: any) => {
    form.setFieldsValue({ tsoId: value });
    setSelectedUser(value);
  };

  const handleYearChange = (value: any) => {
    form.setFieldsValue({ year: value });
    setSelectedYear(value);
  };

  const handleMonthChange = (value: any) => {
    form.setFieldsValue({ month: value });
    setSelectedMonth(value);
  };
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const onSubmit = async (data: FromData) => {
    setLoading(true);
    setTimeout(async () => {
      const { lines } = data;

      const formData = {
        tsoId: selectedUser,
        year: selectedYear,
        month: selectedMonth,
        productLines: lines
      };

      try {
        await axios
          .post("/api-hotspot/monthly-target/create", formData)
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
                router.replace("/admin/hotspot/monthly-target");
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

  return (
    <>
      {/* {loading && <AppImageLoader />} */}
      {showError && <Alert message={errorMessages} type="error" showIcon />}
      {/* {!loading && ( */}
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
                {/* tsoId */}
                <Form.Item
                  label="TSO"
                  name="tsoId"
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
                      onChange={handleUserChange}
                      options={users}
                      value={selectedUser}
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
                {/* year */}
                <Form.Item
                  label="Year"
                  name="year"
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
                      onChange={handleYearChange}
                      options={years}
                      value={selectedYear}
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
                {/* month */}
                <Form.Item
                  label="Month"
                  name="month"
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
                      onChange={handleMonthChange}
                      options={months}
                      value={selectedMonth}
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
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
              <Col>
                <Form.List name="lines">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            label="Product"
                            name={[name, "otherProductId"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input"
                              }
                            ]}
                          >
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select"
                              onChange={value =>
                                handleOtherPrductChange(value, key)
                              }
                              options={otherProducts}
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
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label="Amount"
                            name={[name, "amount"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input"
                              }
                            ]}
                          >
                            <Input placeholder="Amount" />
                          </Form.Item>

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Target
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
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
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default CreateMonthlyTargetForm;
