/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { IpData } from "@/interfaces/IpData";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface FormData {
  assignedType: string;
  assignedTo: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

interface PropData {
  item: IpData;
}

const assignTypes = [
  {
    label: "customer",
    value: "customer"
  },
  {
    label: "others",
    value: "others"
  },
  {
    label: "free",
    value: "free"
  }
];

const EditIPForm = ({ item }: PropData) => {
  console.log(item);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any[]>([]);

  const [selectedAssignType, setSelectedAssignType] = useState<any[]>([]);
  const [requiredCustomer, setRequiredCustomer] = useState<boolean>(false);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleCustomerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerId: value });
    setSelectedCustomer(value as any);
  };

  const handleAssignTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ assignedType: value });

    setSelectedAssignType(value as any);

    if (value === "customer") {
      setRequiredCustomer(true);
    } else {
      setRequiredCustomer(false);
    }
  };

  // function getCustomers() {
  //   const body = {
  //     meta: {
  //       sort: [
  //         {
  //           order: "asc",
  //           field: "name"
  //         }
  //       ]
  //     },

  //     body: {

  //       partnerType: "client",
  //       isActive: true
  //     }
  //   };

  //   axios.post("/api/partner/get-list", body).then(res => {

  //     const { data } = res;

  //     if (data.status != 200) {
  //       MySwal.fire({
  //         title: "Error",
  //         text: data.message || "Something went wrong",
  //         icon: "error"
  //       });
  //     }

  //     if (!data.body) return;
  //     const list = data.body.map((item: any) => {
  //       return {
  //         label: item.name,
  //         value: item.id
  //       };
  //     });
  //     setCustomers(list);
  //   });
  // }
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
  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        ip: item.ip,
        customerId: item.customer?.id
      });
      setSelectedCustomer(item.customer?.id as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data: FormData) => {
    setLoading(true);

    const { assignedTo } = data;

    const formData = {
      id: item.id,
      assignedType: selectedAssignType,
      customerId: selectedCustomer,
      assignedTo: assignedTo
    };

    try {
      axios
        .put("/api/ip-list/update", formData)
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
              router.replace("/admin/device/ip-management");
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
              assignedType: "",
              customerId: "",
              assignedTo: ""
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
                {/* ip */}
                <Form.Item
                  label="IP Address"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="ip"
                >
                  <Input
                    type="text"
                    placeholder="IP Address"
                    className={`form-control`}
                    name="ip"
                    disabled
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
                {/* assignedType */}
                <Form.Item
                  label="Assign Type"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="assignedType"
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
                      onChange={handleAssignTypeChange}
                      options={assignTypes}
                      value={selectedAssignType}
                    />
                  </Space>
                </Form.Item>
              </Col>
              {selectedAssignType?.includes("customer") && ( // corrected comparison from '===' to 'includes'
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  className="gutter-row"
                >
                  {/* customerId */}
                  <Form.Item
                    label="Customer"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="customerId"
                    rules={[
                      {
                        required: requiredCustomer ? true : false,
                        message: "Please select Customers!"
                      }
                    ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select Customers"
                        onChange={handleCustomerChange}
                        options={customers}
                        value={selectedCustomer}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              )}

              {/* assignedTo */}
              {selectedAssignType?.includes("others") && (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  className="gutter-row"
                >
                  <Form.Item
                    label="Assigned To"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="assignedTo"
                  >
                    <Input
                      type="text"
                      placeholder="Assigned To"
                      className={`form-control`}
                      name="assignedTo"
                      style={{ padding: "6px" }}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>

            {/* submit */}
            <Row justify="center">
              <Col>
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
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditIPForm;
