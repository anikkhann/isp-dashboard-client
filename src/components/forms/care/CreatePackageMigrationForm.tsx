/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Select, Space, Row, Col, DatePicker } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import "react-quill/dist/quill.snow.css";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";
// import AppImageLoader from "@/components/loader/AppImageLoader";
const tags = [
  {
    label: "Upgrade",
    value: "Upgrade"
  },
  {
    label: "Downgrade",
    value: "Downgrade"
  }
];
const CreatePackageMigrationForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States

  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [customers, setCustomers] = useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [selectTags, setSelectTags] = useState<any>(null);

  const [customerPackages, setCustomerPackages] = useState([]);
  const [selectedCustomerPackage, setSelectedCustomerPackage] = useState(null);

  const [selectedMigrationDate, setSelectedMigrationDate] = useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleCustomerPackageChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerPackageId: value });
    setSelectedCustomerPackage(value as any);
  };

  const handleMigrationDateChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedMigrationDate(value);
    form.setFieldsValue({
      migrationDate: value
    });
  };

  const getCustomerPackages = () => {
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
    axios.post("/api/customer-package/get-list", body).then(res => {
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
      setCustomerPackages(list);
    });
  };

  const getCustomers = async () => {
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
        // isActive: true
      }
    };

    const res = await axios.post("/api/customer/get-list", body);
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.username,
          value: item.id
        };
      });

      setCustomers(items);
    }
  };

  // customerId
  const handleCustomerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerId: value });
    setSelectedCustomer(value);
  };

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ tag: value });
    setSelectTags(value as any);
  };

  useEffect(() => {
    getCustomers();
    getCustomerPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      const formData = {
        customerId: selectedCustomer,
        tag: selectTags,
        customerPackageId: selectedCustomerPackage,
        migrationDate: selectedMigrationDate
          ? dayjs(selectedMigrationDate).format("YYYY-MM-DD")
          : null
      };

      try {
        await axios
          .post("/api/package-migration/create", formData)
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
                router.replace(`/admin/package-migration`);
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
      <div className="mt-3">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            type: "",
            comment: ""
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
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* customerId */}
              <Form.Item
                label="Customer"
                name="customerId"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please select Customer!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Customer"
                    onChange={handleCustomerChange}
                    options={customers}
                    value={selectedCustomer}
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
              {/* type */}
              <Form.Item
                label="Tag"
                name="tag"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please select Tag!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Tag"
                    onChange={handleChange}
                    options={tags}
                    value={selectTags}
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
              {/* customerPackageId */}
              <Form.Item
                label="Customer Package"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please select Customer Package!"
                  }
                ]}
                name="customerPackageId"
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Customer Package"
                    onChange={handleCustomerPackageChange}
                    options={customerPackages}
                    value={selectedCustomerPackage}
                    showSearch
                    // filterOption={(input, option) => {
                    //   if (typeof option?.label === 'string') {
                    //     return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    //   }
                    //   return false;
                    // }}
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
              {/* startDate */}
              <Form.Item
                label="Migration Date"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="migrationDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Migration Date!"
                  }
                ]}
              >
                <DatePicker
                  className={`form-control`}
                  style={{
                    padding: "6px",
                    width: "100%"
                  }}
                  format={dateFormat}
                  onChange={handleMigrationDateChange}
                  value={selectedMigrationDate}
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
            ></Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            ></Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            ></Col>
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

export default CreatePackageMigrationForm;
