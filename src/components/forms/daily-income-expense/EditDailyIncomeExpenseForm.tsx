/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert, Button, Form, Row, Col, Input, Space, Select } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
// import AppImageLoader from "@/components/loader/AppImageLoader";

interface DailyIncomeExpenseFormData {
  type: string;
  accountHeadId: number;
  paymentChannel: string;
  remarks: string;
}

const types = [
  {
    label: "Income",
    value: "income"
  },
  {
    label: "Expense",
    value: "expense"
  }
];
const channelList = [
  {
    label: "Cash",
    value: "cash"
  },
  {
    label: "Cheque",
    value: "cheque"
  },
  {
    label: "Online",
    value: "online"
  }
];

interface PropData {
  item: any;
}

const EditDailyIncomeExpenseForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [selectType, setSelectType] = useState<string>(item.type);
  const [accountHeadIds, setAccountHeadIds] = useState<any>([]);
  const [selectedAccountHeadId, setSelectedAccountHeadId] = useState<any>(null);

  const [selectPaymentChannel, setSelectPaymentChannel] = useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const getAccountHeadList = (selectType: string) => {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "id"
          }
        ]
      },
      body: {
        // isActive: true
        type: selectType, // Assuming the API can filter based on type
        isActive: true
      }
    };
    axios.post("/api/account-head/get-list", body).then(res => {
      const { data } = res;

      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const accountHeadIds = data.body.map((item: any) => {
        return {
          label: item.title,
          value: item.id
        };
      });
      setAccountHeadIds(accountHeadIds);
    });
  };

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ type: value });
    setSelectType(value as any);
  };
  const handleAccountHeadIDChange = (value: any) => {
    form.setFieldsValue({ accountHeadId: value });
    setSelectedAccountHeadId(value as any);
  };

  const handlePaymentChannelChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ paymentChannel: value });
    setSelectPaymentChannel(value as any);
  };
  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        title: item.title,
        type: item.type,
        accountHeadId: item.accountHeadId,
        paymentChannel: item.paymentChannel,
        remarks: item.remarks
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (selectType) {
      getAccountHeadList(selectType);
    }
  }, [selectType]);
  const onSubmit = async (data: DailyIncomeExpenseFormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { type, remarks } = data;

      const formData = {
        id: item.id,
        type: type,
        accountHeadId: selectedAccountHeadId,
        paymentChannel: selectPaymentChannel,
        remarks: remarks
      };

      try {
        await axios
          .put("/api/daily-expenditure/update", formData)
          .then(res => {
            // console.log(res);
            const { data } = res;

            if (data.status != 200) {
              setShowError(true);
              setErrorMessages(data.message);
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
                router.replace("/admin/accounting/daily-income-expense");
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
        // // console.log(err)
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
              <Form.Item
                label="Account Head"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="accountHeadId"
                rules={[
                  {
                    required: true,
                    message: "Please select Account Head Id!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{
                      width: "100%",
                      textAlign: "start"
                    }}
                    placeholder="Please select"
                    onChange={handleAccountHeadIDChange}
                    options={accountHeadIds}
                    value={selectedAccountHeadId}
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
                label="Payment Channel"
                name="paymentChannel"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Payment"
                    onChange={handlePaymentChannelChange}
                    options={channelList}
                    value={selectPaymentChannel}
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
              {/* remarks */}
              <Form.Item
                label="Remarks"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="remarks"
              >
                <Input.TextArea
                  placeholder="remarks"
                  rows={4}
                  // maxLength={6}
                  className={`form - control`}
                  name="remarks"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
          </Row>

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
                  loading={loading}
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

export default EditDailyIncomeExpenseForm;
