/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Alert,
  Button,
  Form,
  Row,
  Col,
  // Space,
  Select,
  Input,
  DatePicker,
  Space

  // Upload
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
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

const CreateBulkForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  // const [formSets, setFormSets] = useState([
  //   { id: Date.now(), selectType: "income" }
  // ]);
  const [formSets, setFormSets] = useState([
    {
      id: Date.now(),
      selectType: "income",
      accountHeadId: null,
      paymentChannel: null
    }
  ]);
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  // const [selectType, setSelectType] = useState<string>("income");
  const [accountHeadIds, setAccountHeadIds] = useState<any>([]);
  // const [selectedAccountHeadId, setSelectedAccountHeadId] = useState<any>(null);

  // const [selectPaymentChannel, setSelectPaymentChannel] = useState(null);
  // const [file, setFile] = useState<any>(null);
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // const addNewFormSet = () => {
  //   setFormSets([...formSets, { id: Date.now(), selectType: "income" }]);
  // };
  const handleAddFormSet = () => {
    setFormSets(prev => [
      ...prev,
      {
        id: Date.now(),
        selectType: "income",
        accountHeadId: null,
        paymentChannel: null
      }
    ]);
  };
  const deleteFormSet = (id: number) => {
    setFormSets(formSets.filter(set => set.id !== id));
  };
  const getAccountHeadList = async (selectType: string) => {
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
        type: selectType, // Filter based on type
        isActive: true
      }
    };

    try {
      const res = await axios.post("/api/account-head/get-list", body);
      const { data } = res;

      if (data.status !== 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
        return []; // Return empty array on error
      }

      if (!data.body) return [];

      return data.body.map((item: any) => ({
        label: item.title,
        value: item.id
      }));
    } catch (error) {
      console.error("Error fetching account head list:", error);
      MySwal.fire({
        title: "Error",
        text: "An unexpected error occurred.",
        icon: "error"
      });
      return []; // Return empty array on exception
    }
  };

  const handleDateChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedDate(value);
    form.setFieldsValue({
      date: value
    });
  };

  const handleChange = (value: any, id: number) => {
    form.setFieldsValue({
      [`type-${id}`]: value
    });
    setFormSets(prev =>
      prev.map(set => (set.id === id ? { ...set, selectType: value } : set))
    );
  };

  const handleAccountHeadIDChange = (value: any, id: number) => {
    form.setFieldsValue({
      [`accountHeadId-${id}`]: value
    });
    setFormSets(prev =>
      prev.map(set => (set.id === id ? { ...set, accountHeadId: value } : set))
    );
  };

  const handlePaymentChannelChange = (value: any, id: number) => {
    form.setFieldsValue({
      [`paymentChannel-${id}`]: value
    });
    setFormSets(prev =>
      prev.map(set => (set.id === id ? { ...set, paymentChannel: value } : set))
    );
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    // Set today's date as default value
    const today = new Date();
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    const updateAccountHeadLists = async () => {
      // Create a mapping of form set ids to account head lists
      const accountHeadsMap: { [key: number]: any[] } = {};

      // Loop through each form set to fetch account heads
      for (const set of formSets) {
        if (set.selectType) {
          const accountHeads = await getAccountHeadList(set.selectType);
          accountHeadsMap[set.id] = accountHeads;
        }
      }

      // Update the state with the new account heads
      setAccountHeadIds(accountHeadsMap);
    };

    updateAccountHeadLists();
  }, [formSets]); // Trigger when formSets change

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const values = await form.validateFields();

        const date = selectedDate
          ? dayjs(selectedDate).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD");

        const transactions = formSets.map(set => {
          return {
            type: values[`type-${set.id}`] || set.selectType,
            accountHeadId: values[`accountHeadId-${set.id}`],
            amount: values[`amount-${set.id}`],
            paymentChannel: values[`paymentChannel-${set.id}`],
            remarks: values[`remarks-${set.id}`]
          };
        });

        const requestData = {
          date: date,
          transactions: transactions
        };
        console.log("Transactions:", transactions);
        console.log("Request Data:", requestData);
        await axios
          .post("/api/daily-expenditure/bulk-create", requestData, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
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
            MySwal.fire({
              title: "Error",
              text: err.response.data.message || "Something went wrong",
              icon: "error"
            });
            setShowError(true);
            setErrorMessages(err.response.data.message);
          });
      } catch (error: any) {
        console.log("Failed:", error);
        setShowError(true);
        setErrorMessages(error.message);
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
            // type: "income",
            type: formSets[0]?.selectType || "income",
            // accountHeadId:
            // paymentChannel: "",
            amount: 5000,
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                width: "100%",
                padding: "1rem",
                boxSizing: "border-box"
              }}
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
                  label="Date"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="date"
                >
                  <DatePicker
                    className={`form-control`}
                    style={{
                      padding: "6px",
                      width: "100%"
                    }}
                    format={dateFormat}
                    onChange={handleDateChange}
                    value={selectedDate}
                    defaultValue={dayjs()}
                  />
                </Form.Item>
              </Col>
            </div>

            {formSets.map(set => (
              <div
                key={set.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "1rem",
                  boxSizing: "border-box"
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
                      label={
                        <>
                          <span className="text-[#FF0000] mr-1">*</span>Type
                        </>
                      }
                      name={`type-${set.id}`}
                      style={{ marginBottom: 0, fontWeight: "bold" }}
                      // rules={[
                      //   {
                      //     validator: async (_, value) => {
                      //       if (!value) {
                      //         return Promise.reject("Please select type!");
                      //       }
                      //       return Promise.resolve();
                      //     }
                      //   }
                      // ]}
                    >
                      <Space style={{ width: "100%" }} direction="vertical">
                        <Select
                          allowClear
                          style={{ width: "100%", textAlign: "start" }}
                          placeholder="Please select Type"
                          options={types}
                          onChange={value => handleChange(value, set.id)}
                          value={set.selectType}
                          filterOption={(input, option) =>
                            typeof option?.label === "string" &&
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
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
                      label={
                        <>
                          <span className="text-[#FF0000] mr-1">*</span>Account
                          Head
                        </>
                      }
                      name={`accountHeadId-${set.id}`}
                      style={{ marginBottom: 0, fontWeight: "bold" }}
                      rules={[
                        {
                          validator: async (_, value) => {
                            if (!value) {
                              return Promise.reject(
                                "Please select account head!"
                              );
                            }
                            return Promise.resolve();
                          }
                        }
                      ]}
                    >
                      <Space style={{ width: "100%" }} direction="vertical">
                        <Select
                          key={set.id}
                          allowClear
                          style={{ width: "100%", textAlign: "start" }}
                          placeholder="Please select"
                          onChange={value =>
                            handleAccountHeadIDChange(value, set.id)
                          }
                          options={accountHeadIds[set.id] || []} // Use account heads for this specific set
                          value={set.accountHeadId}
                          showSearch
                          filterOption={(input, option) =>
                            typeof option?.label === "string" &&
                            option.label
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
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
                      label="Amount (BDT)"
                      name={`amount-${set.id}`}
                      style={{ marginBottom: 0, fontWeight: "bold" }}
                      rules={[
                        { required: true, message: "Please enter Amount!" }
                      ]}
                    >
                      <Input
                        placeholder="amount"
                        type="number"
                        className="form-control"
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
                      label={
                        <>
                          <span className="text-[#FF0000] mr-1">*</span>Payment
                          Channel
                        </>
                      }
                      name={`paymentChannel-${set.id}`}
                      style={{ marginBottom: 0, fontWeight: "bold" }}
                      rules={[
                        {
                          validator: async (_, value) => {
                            if (!value) {
                              return Promise.reject(
                                "Please select payment channel!"
                              );
                            }
                            return Promise.resolve();
                          }
                        }
                      ]}
                    >
                      <Space style={{ width: "100%" }} direction="vertical">
                        <Select
                          allowClear
                          style={{ width: "100%", textAlign: "start" }}
                          placeholder="Please select Payment"
                          onChange={value =>
                            handlePaymentChannelChange(value, set.id)
                          }
                          options={channelList}
                          value={set.paymentChannel}
                          showSearch
                          filterOption={(input, option) =>
                            typeof option?.label === "string" &&
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
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
                      label="Remarks"
                      name={`remarks-${set.id}`}
                      style={{ marginBottom: 0, fontWeight: "bold" }}
                    >
                      <Input.TextArea
                        placeholder="remarks"
                        rows={4}
                        className="form-control"
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
                    <Button
                      onClick={() => deleteFormSet(set.id)}
                      type="dashed"
                      danger
                      shape="round"
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </Row>
          <Row justify="center">
            <Col>
              <Button
                // onClick={addNewFormSet}
                onClick={handleAddFormSet}
                shape="round"
                type="dashed"
                style={{
                  backgroundColor: "#0000FF",
                  color: "#FFFFFF",
                  fontWeight: "bold"
                }}
              >
                Add New Field
              </Button>
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

export default CreateBulkForm;
