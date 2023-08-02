/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Grid,
  Input,
  Select,
  Space
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Row, Col } from "antd";
import { ClientData } from "@/interfaces/ClientData";
import { format } from "date-fns";

import dayjs from "dayjs";
import type { DatePickerProps } from "antd";
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

interface FormData {
  clientLevel: string;
  name: string;
  username: string;
  password: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: any;
  email: string;
  address: string;
  latitude: string;
  longitude: string;
  divisionId: string;
  districtId: string;
  upazillaId: any;
  unionId: any;
  licenseTypeId: any;
  btrcLicenseNo: any;
  licenseExpireDate: any;
  radiusIpId: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const tagsList = [
  {
    label: "Tri Cycle",
    value: "tri_cycle"
  },
  {
    label: "Quad Cycle",
    value: "quad_cycle"
  }
];
interface PropData {
  item: ClientData;
}

const EditClientForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [clientLevel, setClientLevel] = useState<any>(null);

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [radiusIps, setRadiusIps] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  const [selectedRadiusIp, setSelectedRadiusIp] = useState<any>(null);

  const [upazillas, setUpazillas] = useState([]);
  const [selectedUpazilla, setSelectedUpazilla] = useState<any>(null);

  const [unions, setUnions] = useState([]);
  const [selectedUnion, setSelectedUnion] = useState<any>(null);

  const [licenseTypes, setLicenseTypes] = useState([]);
  const [selectedLicenseType, setSelectedLicenseType] = useState<any>(null);

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleChange = (value: any) => {
    console.log("checked = ", value);
    form.setFieldsValue({ clientLevel: value });
    setClientLevel(value as any);
  };

  const handleDivisionChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ divisionId: value });
    setSelectedDivision(value as any);
  };

  const handleDistrictChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ districtId: value });
    setSelectedDistrict(value as any);
  };

  const handleRadiusIpChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ radiusIpId: value });
    setSelectedRadiusIp(value as any);
  };

  const handleUpazillaChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ upazillaId: value });
    setSelectedUpazilla(value as any);
  };

  const handleUnionChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ unionId: value });
    setSelectedUnion(value as any);
  };

  const handleLicenseTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ licenseTypeId: value });
    setSelectedLicenseType(value as any);
  };

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    // console.log(date, dateString);
    const newDate = dayjs(dateString);
    setSelectedDate(newDate);
    form.setFieldsValue({ licenseExpireDate: newDate });
  };

  function getDivisions() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      }
    };
    axios.post("/api/division/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setDivisions(list);
    });
  }

  function getDistricts(selectedDivision: string) {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        division: { id: selectedDivision }
      }
    };

    axios.post("/api/district/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setDistricts(list);
    });
  }

  function getRadiusIps() {
    axios.get("/api/lookup-details/get-by-master-key/radius_ip").then(res => {
      const { data } = res;
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setRadiusIps(list);
    });
  }

  function getUpazillas(selectedDistrict: string) {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        district: { id: selectedDistrict }
      }
    };

    axios.post("/api/upazilla/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setUpazillas(list);
    });
  }

  function getUnions(selectedUpazilla: string) {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        upazilla: { id: selectedUpazilla }
      }
    };

    axios.post("/api/union/get-list", body).then(res => {
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setUnions(list);
    });
  }

  function getLicenseTypes() {
    axios
      .get("/api/lookup-details/get-by-master-key/license_type")
      .then(res => {
        const { data } = res;
        const list = data.body.map((item: any) => {
          return {
            label: item.name,
            value: item.id
          };
        });
        setLicenseTypes(list);
      });
  }

  useEffect(() => {
    getDivisions();
    getRadiusIps();
    getLicenseTypes();
  }, []);

  useEffect(() => {
    if (item) {
      setClientLevel(item.clientLevel);
      form.setFieldsValue({
        name: item.name,
        username: item.username,
        /*  password: item.password, */
        email: item.email,
        address: item.address,
        altContactNumber: item.altContactNumber,
        contactNumber: item.contactNumber,
        districtId: item.districtId,
        divisionId: item.divisionId,
        upazillaId: item.upazillaId,
        unionId: item.unionId,
        contactPerson: item.contactPerson,
        radiusIpId: item.radiusIpId,
        clientLevel: item.clientLevel,
        btrcLicenseNo: item.btrcLicenseNo
      });
      setSelectedDivision(item.divisionId);
      setSelectedDistrict(item.districtId);
      if (item.upazillaId) {
        setSelectedUpazilla(item.upazillaId);
      }
      if (item.unionId) {
        setSelectedUnion(item.unionId);
      }

      if (item.licenseTypeId) {
        setSelectedLicenseType(item.licenseTypeId);
      }
      // licenseExpireDate
      if (item.licenseExpireDate) {
        const date = new Date(item.licenseExpireDate);
        const formatDate = dayjs(date);
        form.setFieldsValue({
          licenseExpireDate: formatDate
        });
        setSelectedDate(formatDate);
      }

      setSelectedRadiusIp(item.radiusIpId);
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    if (selectedDivision) {
      getDistricts(selectedDivision);
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      getUpazillas(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedUpazilla) {
      getUnions(selectedUpazilla);
    }
  }, [selectedUpazilla]);

  const onSubmit = (data: FormData) => {
    const {
      clientLevel,
      name,
      username,
      email,
      address,
      latitude,
      longitude,
      altContactNumber,
      contactNumber,
      districtId,
      divisionId,
      upazillaId,
      unionId,
      licenseTypeId,
      btrcLicenseNo,
      licenseExpireDate,
      contactPerson,
      radiusIpId
    } = data;

    if (!item) {
      MySwal.fire({
        title: "Error",
        text: "Please select a client",
        icon: "error"
      });
    }

    let formatDate = null;

    if (licenseExpireDate) {
      formatDate = format(new Date(licenseExpireDate), "yyyy-MM-dd");
    }

    const formData = {
      id: item ? item.id : null,
      partnerType: "client",
      clientLevel: clientLevel,
      name: name,
      username: username,
      contactPerson: contactPerson,
      contactNumber: contactNumber,
      altContactNumber: altContactNumber,
      email: email,
      address: address,
      latitude: latitude,
      longitude: longitude,
      divisionId: divisionId,
      districtId: districtId,
      upazillaId: upazillaId,
      unionId: unionId,
      licenseTypeId: licenseTypeId,
      btrcLicenseNo: btrcLicenseNo,
      licenseExpireDate: formatDate,
      radiusIpId: radiusIpId,
      isActive: isActive
    };

    try {
      axios
        .put("/api/partner/update", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status === 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || "Client Update successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/client/client");
            });
          } else {
            MySwal.fire({
              title: "Error",
              text: data.message || "Client Added Failed",
              icon: "error"
            });
          }
        })
        .catch(err => {
          // console.log(err);
          setShowError(true);
          setErrorMessages(err.response.data.message);
        });
    } catch (err: any) {
      // // console.log(err)
      setShowError(true);
      setErrorMessages(err.message);
    }
  };

  return (
    <>
      {showError && <Alert message={errorMessages} type="error" showIcon />}

      <div className="mt-3">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            name: "",
            email: "",
            password: "",
            username: "",
            clientLevel: "",
            contactPerson: "",
            contactNumber: "",
            altContactNumber: "",
            divisionId: "",
            districtId: "",
            upazillaId: "",
            unionId: "",
            licenseTypeId: "",
            btrcLicenseNo: "",
            licenseExpireDate: dayjs(),
            radiusIpId: "",
            address: "",
            latitude: "",
            longitude: ""
          }}
          style={{ maxWidth: "100%" }}
          name="wrap"
          // labelCol={{ flex: "110px" }}
          // labelAlign="left"
          // labelWrap
          // wrapperCol={{ flex: 1 }}
          colon={false}
          scrollToFirstError
        >
          {/* name, username, email */}
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify="space-between"
          >
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="username"
                label="Username"
                style={{
                  marginBottom: 0
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!"
                  },
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                    message:
                      "Only letters, numbers, underscores and hyphens allowed"
                  }
                ]}
              >
                <Input
                  disabled
                  type="text"
                  placeholder="Username"
                  className={`form-control`}
                  name="username"
                />
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="Client Level"
                style={{
                  marginBottom: 0
                }}
                name="clientLevel"
                rules={[
                  {
                    required: true,
                    message: "Please select Client Level!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={tagsList}
                    value={clientLevel}
                  />
                </Space>
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="Name"
                style={{
                  marginBottom: 0
                }}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Name"
                  className={`form-control`}
                  name="name"
                />
              </Form.Item>
            </Col>

            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="Email"
                style={{
                  marginBottom: 0
                }}
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  },
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                    message:
                      "Only letters, numbers, underscores and hyphens allowed"
                  }
                ]}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  className={`form-control`}
                  name="email"
                />
              </Form.Item>
            </Col>
            {/* password, confirm password, address */}
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="address"
                label="Address"
                style={{
                  marginBottom: 0
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Address!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Address"
                  className={`form-control`}
                  name="address"
                />
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="latitude"
                label="latitude"
                style={{
                  marginBottom: 0
                }}
              >
                <Input
                  type="text"
                  placeholder="latitude"
                  className={`form-control`}
                  name="latitude"
                />
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="longitude"
                label="longitude"
                style={{
                  marginBottom: 0
                }}
              >
                <Input
                  type="text"
                  placeholder="longitude"
                  className={`form-control`}
                  name="longitude"
                />
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="contactPerson"
                label="Contact Person"
                style={{
                  marginBottom: 0
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Contact Person!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Contact Person"
                  className={`form-control`}
                  name="contactPerson"
                />
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="contactNumber"
                label="Contact Number"
                style={{
                  marginBottom: 0
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Contact Number!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Contact Number"
                  className={`form-control`}
                  name="contactNumber"
                />
              </Form.Item>
            </Col>

            {/* contact person, contact number, contact number 2 */}
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="altContactNumber"
                label="Alt Contact Number"
                style={{
                  marginBottom: 0
                }}
              >
                <Input
                  type="text"
                  placeholder="Alt Contact Number"
                  className={`form-control`}
                  name="altContactNumber"
                />
              </Form.Item>
            </Col>
            {/* divisionId, districtId, upazillaId */}
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="Division"
                style={{
                  marginBottom: 0,
                  marginRight: lg ? "10px" : "0px"
                }}
                name="divisionId"
                rules={[
                  {
                    required: true,
                    message: "Please select Division"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleDivisionChange}
                    options={divisions}
                    value={selectedDivision}
                  />
                </Space>
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="District"
                style={{
                  marginBottom: 0
                }}
                name="districtId"
                rules={[
                  {
                    required: true,
                    message: "Please select District"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleDistrictChange}
                    options={districts}
                    value={selectedDistrict}
                  />
                </Space>
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="Upazilla"
                style={{
                  marginBottom: 0
                }}
                name="upazillaId"
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleUpazillaChange}
                    options={upazillas}
                    value={selectedUpazilla}
                  />
                </Space>
              </Form.Item>
            </Col>

            {/* unionId, licenseTypeId, btrcLicenseNo*/}
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="Union"
                style={{
                  marginBottom: 0
                }}
                name="unionId"
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleUnionChange}
                    options={unions}
                    value={selectedUnion}
                  />
                </Space>
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="License Type"
                style={{
                  marginBottom: 0
                }}
                name="licenseTypeId"
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleLicenseTypeChange}
                    options={licenseTypes}
                    value={selectedLicenseType}
                  />
                </Space>
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="btrcLicenseNo"
                label="BTRC License No"
                style={{
                  marginBottom: 0
                }}
              >
                <Input
                  type="text"
                  placeholder="BTRC License No"
                  className={`form-control`}
                  name="btrcLicenseNo"
                />
              </Form.Item>
            </Col>

            {/* licenseExpireDate, radiusIpId*/}
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                name="licenseExpireDate"
                label="License Expire Date"
                style={{
                  marginBottom: 0
                }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  className={`form-control`}
                  name="licenseExpireDate"
                  placeholder="License Expire Date"
                  onChange={onDateChange}
                  value={selectedDate}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item
                label="Radius IP"
                style={{
                  marginBottom: 0
                }}
                name="radiusIpId"
                rules={[
                  {
                    required: true,
                    message: "Please select Radius IP!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleRadiusIpChange}
                    options={radiusIps}
                    value={selectedRadiusIp}
                  />
                </Space>
              </Form.Item>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            ></Col>
          </Row>

          {/* status */}
          <Form.Item
            label=""
            style={{
              marginBottom: 0
            }}
          >
            <Checkbox onChange={handleActive} checked={isActive}>
              Active
            </Checkbox>
          </Form.Item>

          {/* submit */}
          <Row justify="center">
            <Col>
              <Form.Item>
                {/* wrapperCol={{ ...layout.wrapperCol, offset: 4 }} */}
                <Button type="primary" htmlType="submit" shape="round">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default EditClientForm;
