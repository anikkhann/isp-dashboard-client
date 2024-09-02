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
  Input,
  Space,
  Select,
  Upload,
  Modal,
  DatePicker
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { FileImageOutlined, UploadOutlined } from "@ant-design/icons";
// FileImageOutlined,
import type { UploadProps } from "antd/es/upload";
import type { UploadFile, UploadFileStatus } from "antd/es/upload/interface";
// UploadFileStatus
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

interface DailyIncomeExpenseFormData {
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

  const [previewOpen, setPreviewOpen] = useState(false);
  // const handleCancel = () => setPreviewOpen(false);

  const [file, setFile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectType, setSelectType] = useState<string>(item.type);
  const [accountHeadIds, setAccountHeadIds] = useState<any>([]);
  const [selectedAccountHeadId, setSelectedAccountHeadId] = useState<any>(null);

  const [selectPaymentChannel, setSelectPaymentChannel] = useState<any>(null);

  const [selectedDate, setSelectedDate] = useState<any>(null);
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
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

  const uploadButton = (
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  );
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
  useEffect(() => {
    setSelectedDate(item.date ? dayjs(item.date) : null);
    setSelectedAccountHeadId(item.accountHeadId);
    setSelectPaymentChannel(item.paymentChannel);
    if (item) {
      form.setFieldsValue({
        date: item.date ? dayjs(item.date) : null,
        type: item.type,
        accountHeadId: item.accountHeadId,
        amount: item.amount,
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
      const { type, amount, remarks } = data;

      const bodyData = {
        id: item.id,
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
  //get file as image or pdf or csv
  const getFilePreview = (url: string) => {
    const fileExtension = item.attachment.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png"].includes(fileExtension || "")) {
      return (
        <img
          alt={item.attachment}
          style={{ width: "100%" }}
          // src={`${url}/public/downloadFile/${item.attachment}/daily-expenditure`}
          src={url}
        />
      );
    } else if (fileExtension === "pdf") {
      const downloadPdf = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Network response was not ok");

          const blob = await response.blob();
          const fileName = item.attachment;
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(link.href); // Clean up the object URL
        } catch (error) {
          console.error("Download error:", error);
        }
      };

      return (
        <div>
          <button onClick={downloadPdf}>Download {item.attachment}</button>
        </div>
      );
    } else if (fileExtension === "csv") {
      const downloadCsv = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Network response was not ok");

          const blob = await response.blob();
          const fileName = item.attachment;
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(link.href); // Clean up the object URL
        } catch (error) {
          console.error("Download error:", error);
        }
      };
      return (
        <div>
          <button onClick={downloadCsv}>Download {item.attachment}</button>
        </div>
      );
      // return (
      //   <iframe
      //     title="CSV Preview"
      //     src={`${url}/public/downloadFile/${item.attachment}/daily-expenditure`}
      //     style={{ width: "100%", height: "600px" }}
      //   />
      // );
    } else {
      return <div>Cannot preview this file type.</div>;
    }
  };
  const handlePreviewClick = () => setPreviewOpen(true);
  // const handlePdfClick = (url: any) => {
  //   const fileName = url.split("/").pop();
  //   const aTag = document.createElement("a");
  //   aTag.href = url;
  //   aTag.setAttribute("download", fileName);
  //   document.body.appendChild(aTag);
  //   aTag.click();
  //   aTag.remove();
  // };
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
                //     message: "Please input your Start Date!"
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
                    message: "Please select Account Head !"
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
          </Row>

          <div>
            <h1 className="font-bold text-sm">View Existing Attachment :</h1>

            {/* <Button onClick={() => setPreviewOpen(true)}>
              <FileImageOutlined /> {item.attachment}
            </Button> */}
            <Button onClick={handlePreviewClick}>
              <FileImageOutlined />
              {item.attachment}
            </Button>

            <Modal
              open={previewOpen}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
              title="File Preview"
            >
              {getFilePreview(
                `${url}/public/downloadFile/${item.attachment}/daily-expenditure`
              )}
            </Modal>
          </div>

          {/* <Button
            onClick={() => {
              handlePdfClick(
                `${url}/public/downloadFile/${item.attachment}/daily-expenditure`
              );
            }}
          >
            <FileImageOutlined />
            Download Pdf
          </Button> */}

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col>
              <Form.Item
                label="Upload New Attachment"
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
                <Button
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
    </>
  );
};

export default EditDailyIncomeExpenseForm;
