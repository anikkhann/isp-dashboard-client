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
  Row,
  Col,
  Space,
  Select,
  Input,
  DatePicker,
  Upload
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
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile, UploadFileStatus } from "antd/es/upload/interface";
// UploadFileStatus
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";

// import AppImageLoader from "@/components/loader/AppImageLoader";

interface DailyIncomeExpenseFormData {
  date: string;
  type: string;
  accountHeadId: number;
  amount: number;
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

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const CreateDailyIncomeExpenseForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectType, setSelectType] = useState<string>("income");
  const [accountHeadIds, setAccountHeadIds] = useState<any>([]);
  const [selectedAccountHeadId, setSelectedAccountHeadId] = useState<any>(null);

  const [selectPaymentChannel, setSelectPaymentChannel] = useState(null);
  const [file, setFile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const handleDateChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedDate(value);
    form.setFieldsValue({
      date: value
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

  const handleFileChange: UploadProps["onChange"] = ({
    fileList: newFileList
  }) => {
    // only remove the files that are not uploaded
    const filteredList = newFileList.filter(
      file =>
        file.status !== "removed" &&
        file.status !== "error" &&
        file.status !== "uploading"
    ) as UploadFile[];

    setFileList(filteredList);
  };
  // const handleFileChange: UploadProps["onChange"] = ({
  //   fileList: newFileList
  // }) => {
  //   // Filter the file list to remove files that are not uploaded
  //   const filteredList = newFileList.filter(
  //     file =>
  //       file.status !== "removed" &&
  //       file.status !== "error" &&
  //       file.status !== "uploading"
  //   ) as UploadFile[];

  //   setFileList(filteredList);
  // };

  const dummyAction = (options: any) => {
    const { file } = options;
    console.log("Dummy action triggered. File:", file);

    fileList.push({
      uid: file.uid,
      name: file.name,
      status: "done" as UploadFileStatus
    });
    setFile(file);
  };
  // const dummyAction = (options: any) => {
  //   const { file } = options;
  //   console.log("Dummy action triggered. File:", file);

  //   setFileList(prevList => [
  //     ...prevList,
  //     {
  //       uid: file.uid,
  //       name: file.name,
  //       status: "done" as UploadFile["status"],
  //       url: URL.createObjectURL(file) // Create a URL for previewing the file
  //     }
  //   ]);
  // };
  const uploadButton = (
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  );

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (selectType) {
      getAccountHeadList(selectType);
    }
  }, [selectType]);
  // const onSubmit = async (data: DailyIncomeExpenseFormData) => {
  //   setLoading(true);

  //   try {
  //     const { type, amount, remarks } = data;
  //     const bodyData = {
  //       date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : null,
  //       type,
  //       accountHeadId: selectedAccountHeadId,
  //       amount,
  //       paymentChannel: selectPaymentChannel,
  //       remarks
  //     };

  //     const formData = new FormData();
  //     formData.append("body", JSON.stringify(bodyData));

  //     // Use the first file in fileList (if any) for uploading
  //     // if (fileList.length > 0) {
  //     //   formData.append("attachment", fileList[0].originFileObj as Blob);
  //     // }
  //     // Check if there is at least one file in the fileList
  //     if (fileList.length > 0) {
  //       // Append the file to the formData
  //       const file = fileList[0].originFileObj;
  //       if (file) {
  //         formData.append("attachment", file); // Attach the file
  //       } else {
  //         console.error("File is undefined:", file);
  //       }
  //     } else {
  //       console.error("No files found in the fileList.");
  //     }

  //     const response = await axios.post(
  //       "/api/daily-expenditure/create",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data"
  //         }
  //       }
  //     );

  //     const { data: responseData } = response;

  //     if (responseData.status !== 200) {
  //       setShowError(true);
  //       setErrorMessages(responseData.message);
  //       MySwal.fire({
  //         title: "Error",
  //         text: responseData.message || "Something went wrong",
  //         icon: "error"
  //       });
  //     } else {
  //       MySwal.fire({
  //         title: "Success",
  //         text: responseData.message || "Added successfully",
  //         icon: "success"
  //       }).then(() => {
  //         router.replace("/admin/accounting/daily-income-expense");
  //       });
  //     }
  //   } catch (err: any) {
  //     console.error("Error during submission:", err);
  //     setShowError(true);
  //     setErrorMessages(
  //       err.response?.data?.message || err.message || "Something went wrong"
  //     );
  //     MySwal.fire({
  //       title: "Error",
  //       text: err.response?.data?.message || "Something went wrong",
  //       icon: "error"
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data: DailyIncomeExpenseFormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { type, amount, remarks } = data;

      const bodyData = {
        date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : null,
        type: type,
        accountHeadId: selectedAccountHeadId,
        amount: amount,
        paymentChannel: selectPaymentChannel,
        remarks: remarks
      };

      const formData = new FormData();
      if (file) {
        formData.append("attachment", file);
      }
      formData.append("body", JSON.stringify(bodyData));

      try {
        await axios
          .post("/api/daily-expenditure/create", formData)
          .then(res => {
            console.log("data", res);
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
            console.log(err.response.data.message);
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
          initialValues={{
            type: "income",
            // accountHeadId:
            amount: null,
            paymentChannel: "",
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
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="Event Date"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="date"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your Date!"
                //   }
                // ]}
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
              {/* remarks */}
              <Form.Item
                label="Amount (BDT)"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="amount"
              >
                <Input
                  placeholder="amount"
                  // maxLength={6}
                  className={`form - control`}
                  name="amount"
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

          {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col>
              <Form.Item
                label="Attachment"
                style={{
                  marginBottom: 0,
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Upload
                    customRequest={dummyAction}
                    onChange={handleFileChange}
                    maxCount={1}
                    listType="picture"
                    fileList={fileList}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </Space>
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col>
              <Form.Item
                label="Attachment"
                style={{
                  marginBottom: 0,
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Upload
                    customRequest={dummyAction}
                    onChange={handleFileChange}
                    maxCount={1}
                    listType="picture"
                    fileList={fileList}
                    accept=".pdf,.jpg,.jpeg,.png,.csv"
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </Space>
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

export default CreateDailyIncomeExpenseForm;
