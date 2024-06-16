/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import type { TimePickerProps } from "antd";
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

import {
  Alert,
  Button,
  Checkbox,
  // DatePicker,
  Form,
  Input,
  Select,
  Space,
  TimePicker
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Col, Row } from "antd";
// import AppImageLoader from "@/components/loader/AppImageLoader";
// import type { Dayjs } from "dayjs";

interface FormData {
  name: string;
  price: string;
  dataRate: string;
  dataRateUnit: string;
  validity: string;
  validityUnit: string;
  otpLimit: string;
  packageCategory: string;
  startTime: string;
  endTime: string;
}
const dataRateUnits = [
  {
    label: "Mbps",
    value: "Mbps"
  },
  {
    label: "Kbps",
    value: "Kbps"
  }
];
const validityUnits = [
  {
    label: "Hour",
    value: "Hour"
  },
  {
    label: "Minute",
    value: "Minute"
  },
  {
    label: "Day",
    value: "Day"
  }
];

const packageCategories = [
  {
    label: "day_long",
    value: "day_long"
  },
  {
    label: "off_peak",
    value: "off_peak"
  }
];

const CreateHotspotPackageForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState<boolean>(true);

  const [dataRateUnit, setDataRateUnit] = useState<string | null>("Mbps");
  const [validityUnit, setValidityUnit] = useState<string | null>("Hour");
  const [packageCategory, setPackageCategory] = useState<string | null>(null);

  // const [selectedStartTime, setSelectedStartTime] = useState<string | null>(
  //   null
  // );

  // const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);

  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const onChange: TimePickerProps["onChange"] = (
    time: any,
    timeString: any
  ) => {
    if (timeString != "") {
      const newDate = dayjs(timeString, "HH:mm");
      setStartTime(newDate);

      form.setFieldsValue({ startTime: newDate });
    } else {
      setStartTime(null);
      form.setFieldsValue({ startTime: null });
    }
  };

  const onEndChange: TimePickerProps["onChange"] = (
    time: any,
    timeString: any
  ) => {
    if (timeString != "") {
      const newDate = dayjs(timeString, "HH:mm");
      setEndTime(newDate);
      form.setFieldsValue({ endTime: newDate });
    } else {
      setEndTime(null);
      form.setFieldsValue({ endTime: null });
    }
  };

  // const onStartDateChange: DatePickerProps<Dayjs[]>["onChange"] = (
  //   date: any,
  //   dateString: any
  // ) => {
  //   console.log(date, dateString);
  //   setSelectedStartTime(dateString);
  // };

  // const onEndDateChange: DatePickerProps<Dayjs[]>["onChange"] = (
  //   date: any,
  //   dateString: any
  // ) => {
  //   console.log(date, dateString);
  //   setSelectedEndTime(dateString);
  // };

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleDataRateChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ dataRateUnit: value });
    setDataRateUnit(value);
  };

  const handleValidityChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ validityUnit: value });
    setValidityUnit(value);
  };

  const handlePackageCategoryChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ packageCategory: value });
    setPackageCategory(value);
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const {
        name,
        price,
        dataRate,
        dataRateUnit,
        packageCategory,
        validity,
        validityUnit,
        otpLimit
      } = data;

      const formData = {
        name: name,
        price: price,
        dataRate: dataRate,
        dataRateUnit: dataRateUnit,
        validity: validity,
        validityUnit: validityUnit,
        otpLimit: otpLimit,
        packageCategory: packageCategory,
        // startTime: selectedStartTime,
        // endTime: selectedEndTime,
        startTime: startTime ? startTime.format("HH:mm") : null,
        endTime: endTime ? endTime.format("HH:mm") : null,
        isActive: isActive
      };

      try {
        await axios
          .post("/api-hotspot/pricing-plan/create", formData)
          .then(res => {
            // console.log(res);
            const { data } = res;

            if (data.status === 200) {
              MySwal.fire({
                title: "Success",
                text: data.message || "Added successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/hotspot/package");
              });
            } else {
              MySwal.fire({
                title: "Error",
                text: data.message || "Added Failed",
                icon: "error"
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
      <div className="my-6">
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
                name="name"
                label="Name"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input Name!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Name"
                  className={`form-control`}
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
                name="price"
                label="Price"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input price!"
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="price"
                  className={`form-control`}
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
                name="dataRate"
                label="Data Rate"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input data rate!"
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="data rate"
                  className={`form-control`}
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
              {/* dataRateUnit */}
              <Form.Item
                label="Data Rate Unit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="dataRateUnit"
                initialValue={dataRateUnit}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleDataRateChange}
                    options={dataRateUnits}
                    value={dataRateUnit}
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
                name="validity"
                label="Validity"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input validity!"
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="validity"
                  className={`form-control`}
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
              {/* validityUnit */}
              <Form.Item
                label="Validity Unit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="validityUnit"
                initialValue={validityUnit}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleValidityChange}
                    options={validityUnits}
                    value={validityUnit}
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
                name="otpLimit"
                label="OTP Limit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input otp limit!"
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="otp limit"
                  className={`form-control`}
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
              {/* packageCategory */}
              <Form.Item
                label="Package Category"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please select Category"
                  }
                ]}
                name="packageCategory"
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handlePackageCategoryChange}
                    options={packageCategories}
                    value={packageCategory}
                  />
                </Space>
              </Form.Item>
            </Col>
            {packageCategory == "off_peak" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* <Form.Item
                  name="startTime"
                  label="Start Time"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input start time!"
                    }
                  ]}
                >
                  <DatePicker
                    onChange={onStartDateChange}
                    showTime
                    needConfirm={false}
                  />
                </Form.Item> */}
                <Form.Item
                  label="Start Time"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="startTime"
                  rules={[
                    {
                      required: true,
                      message: "Please input your start time!"
                    }
                  ]}
                >
                  <TimePicker
                    style={{
                      width: "100%",
                      marginBottom: 10
                    }}
                    onChange={onChange}
                    value={startTime}
                    format="HH:mm"
                    minuteStep={5}
                    allowClear
                  />
                </Form.Item>
              </Col>
            )}

            {packageCategory == "off_peak" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* <Form.Item
                  name="endTime"
                  label="End Time"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input end time!"
                    }
                  ]}
                >
                  <DatePicker
                    onChange={onEndDateChange}
                    showTime
                    needConfirm={false}
                  />
                </Form.Item> */}
                <Form.Item
                  label="End Time"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your end time!"
                    }
                  ]}
                  name="endTime"
                >
                  <TimePicker
                    style={{
                      width: "100%"
                    }}
                    onChange={onEndChange}
                    value={endTime}
                    format="HH:mm"
                    minuteStep={5}
                    allowClear
                  />
                </Form.Item>
              </Col>
            )}
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

          <Form.Item>
            <Checkbox
              onChange={handleActive}
              checked={isActive}
              className="gutter-row"
            >
              Active
            </Checkbox>
          </Form.Item>
          <div className="bg-gray-400 flex flex-col gap-1 my-5">
            <div className="rounded-sm w-full grid grid-cols-12 bg-white shadow p-6 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform">
              <div className="col-span-11 xl:-ml-5">
                <p className="text-blue-600 font-semibold text-left text-lg">
                  <span className="text-danger">
                    * 0 means unlimited for upload and download limit
                  </span>
                </p>
              </div>
            </div>
          </div>
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

export default CreateHotspotPackageForm;
