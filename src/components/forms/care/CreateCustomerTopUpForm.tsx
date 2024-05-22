/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Alert,
  Button,
  Form,
  Input,
  Select,
  Space,
  Row,
  Col,
  Checkbox
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
// import { useAppDispatch } from "@/store/hooks";
// import AppImageLoader from "@/components/loader/AppImageLoader";

interface FormData {
  amount: string;
  remarks: string;
}

const types = [
  {
    label: "debit (deduct)",
    value: "debit"
  },
  {
    label: "credit (deposit)",
    value: "credit"
  }
];

const CreateCustomerTopUpForm = () => {
  const [form] = Form.useForm();

  // const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [customers, setCustomers] = useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [selectType, setSelectType] = useState<any>("credit");

  const [isRenew, setIsRenew] = useState<boolean>(false);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ type: value });
    setSelectType(value as any);
  };

  const handleRenew = (e: any) => {
    setIsRenew(e.target.checked ? true : false);
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
    setSelectedCustomer(value as any);
  };

  useEffect(() => {
    getCustomers();
    form.setFieldsValue({ type: selectType });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { amount, remarks } = data;

      const formData = {
        customerId: selectedCustomer,
        amount: amount,
        type: selectType,
        remarks: remarks,
        isRenew: isRenew
      };

      try {
        await axios
          .post("/api/customer-topup/create", formData)
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
              }).then(async () => {
                await axios
                  .get("/api/api/v1/auth/get-user-balance", {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  })
                  .then(response => {
                    // // console.log(response);
                    // if (response.data.status == "401") {
                    //   Cookies.remove("token");
                    //   router.replace("/login");
                    // }
                    Cookies.set("user_balance", response.data);
                    // dispatch({ type: "auth/setUser", payload: response.data });
                    // console.log(response.data);
                  })
                  .catch(error => {
                    // // console.log(error);
                    if (error.response) {
                      if (error.response.status === 401) {
                        Cookies.remove("token");
                        router.replace("/login");
                      }
                    }
                  });
                router.replace(`/admin/customer-top-up`);
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
    }, 3000);
    // return false;
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
            amount: "",
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
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="gutter-row"
            >
              {/* Amount */}
              <Form.Item
                label="Amount"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please input your Amount!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="amount"
                  className={`form - control`}
                  name="amount"
                  style={{ padding: "6px" }}
                />
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
              {/* remarks */}
              <Form.Item
                label="Remarks"
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
                <Input.TextArea
                  placeholder="remarks"
                  className={`form - control`}
                  name="remarks"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          {selectType === "credit" && (
            <Form.Item
              label=""
              style={{
                marginBottom: 0
              }}
            >
              <Checkbox onChange={handleRenew} checked={isRenew}>
                Is Renew ?
              </Checkbox>
            </Form.Item>
          )}

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
                  // loading={loading}
                  disabled={loading}
                  // Set loading state to true when button is clicked
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

export default CreateCustomerTopUpForm;
