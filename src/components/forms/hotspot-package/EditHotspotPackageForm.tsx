/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import type { DatePickerProps } from "antd";
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Space
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Col, Row } from "antd";
// import AppImageLoader from "@/components/loader/AppImageLoader";
import type { Dayjs } from "dayjs";
import { HotspotPackage } from "@/interfaces/HotspotPackage";

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

interface PropData {
  item: HotspotPackage;
}

const EditHotspotPackageForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState<boolean>(true);

  const [dataRateUnit, setDataRateUnit] = useState<string | null>(null);
  const [validityUnit, setValidityUnit] = useState<string | null>(null);
  const [packageCategory, setPackageCategory] = useState<string | null>(null);

  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(
    null
  );

  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const onStartDateChange: DatePickerProps<Dayjs[]>["onChange"] = (
    date: any,
    dateString: any
  ) => {
    console.log(date, dateString);
    setSelectedStartTime(dateString);
  };

  const onEndDateChange: DatePickerProps<Dayjs[]>["onChange"] = (
    date: any,
    dateString: any
  ) => {
    console.log(date, dateString);
    setSelectedEndTime(dateString);
  };

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

  useEffect(() => {
    if (item) {
      setDataRateUnit(item.dataRateUnit);
      setValidityUnit(item.validityUnit);
      setPackageCategory(item.packageCategory);

      // convert start time to string

      let startTime = null;
      let endTime = null;

      if (item.startTime) {
        startTime = dayjs(item.startTime);
        setSelectedStartTime(startTime);
      }

      if (item.endTime) {
        endTime = dayjs(item.endTime);
        setSelectedEndTime(endTime);
      }

      form.setFieldsValue({
        name: item.name,
        price: item.price,
        dataRate: item.dataRate,
        dataRateUnit: item.dataRateUnit,
        validity: item.validity,
        validityUnit: item.validityUnit,
        otpLimit: item.otpLimit,
        packageCategory: item.packageCategory,
        startTime: startTime,
        endTime: endTime
      });
    }
  }, [item]);

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
        startTime: selectedStartTime,
        endTime: selectedEndTime,
        isActive: isActive
      };

      try {
        await axios
          .put("/api-hotspot/pricing-plan/update", formData)
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
                label="price"
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
                label="dataRate"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input dataRate!"
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="dataRate"
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
                label="dataRateUnit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="dataRateUnit"
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
                label="validity"
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
                label="validityUnit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="validityUnit"
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
                label="otpLimit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input otpLimit!"
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="otpLimit"
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
                label="packageCategory"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
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
                name="startTime"
                label="startTime"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input startTime!"
                  }
                ]}
              >
                <DatePicker
                  onChange={onStartDateChange}
                  showTime
                  needConfirm={false}
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
                name="endTime"
                label="endTime"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input endTime!"
                  }
                ]}
              >
                <DatePicker
                  onChange={onEndDateChange}
                  showTime
                  needConfirm={false}
                />
              </Form.Item>
            </Col>
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

export default EditHotspotPackageForm;
