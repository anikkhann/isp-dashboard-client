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
import type { DatePickerProps } from "antd";
import { format } from "date-fns";
import { Col, Row } from "antd";
import AppImageLoader from "@/components/loader/AppImageLoader";
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
  divisionId: string;
  districtId: string;
  upazillaId: any;
  unionId: any;
  licenseTypeId: any;
  btrcLicenseNo: any;
  licenseExpireDate: any;
  radiusIpId: string;
  latitude: string;
  longitude: string;
  serviceType: string;
  packageType: string;
  dnsName: string;
  wsdCommission: number;
  bankName: string;
  bankAccountNumber: number;
  bKashNumber: number;
  nagadNumber: number;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
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
const serviceTypeList = [
  {
    label: "Technology",
    value: "technology"
  },
  {
    label: "Sales Marketing",
    value: "salesMarketing"
  }
];
const packageTypeList = [
  {
    label: "Voucher",
    value: "voucher"
  },
  {
    label: "Voucher Online",
    value: "voucherOnline"
  }
];

const CreateClientForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [clientLevel, setClientLevel] = useState(null);
  const [serviceType, setServiceType] = useState("technology");
  const [packageType, setPackageType] = useState("voucher");
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [upazillas, setUpazillas] = useState([]);
  const [selectedUpazilla, setSelectedUpazilla] = useState(null);

  const [unions, setUnions] = useState([]);
  const [selectedUnion, setSelectedUnion] = useState(null);

  const [licenseTypes, setLicenseTypes] = useState([]);
  const [selectedLicenseType, setSelectedLicenseType] = useState(null);

  const [radiusIps, setRadiusIps] = useState([]);
  const [selectedRadiusIp, setSelectedRadiusIp] = useState(null);

  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ clientLevel: value });
    setClientLevel(value as any);
  };
  const handleService = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ serviceType: value });
    setServiceType(value as any);
  };
  const handlePackage = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ packageType: value });
    setPackageType(value as any);
  };
  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
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

  const handleRadiusIpChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ radiusIpId: value });
    setSelectedRadiusIp(value as any);
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
      },
      body: {
        isActive: true
      }
    };
    axios.post("/api/division/get-list", body).then(res => {
      // console.log(res);
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
        division: { id: selectedDivision },
        isActive: true
      }
    };

    axios.post("/api/district/get-list", body).then(res => {
      // console.log(res);
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
      setDistricts(list);
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
        district: { id: selectedDistrict },
        isActive: true
      }
    };

    axios.post("/api/upazilla/get-list", body).then(res => {
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
        upazilla: { id: selectedUpazilla },
        isActive: true
      }
    };

    axios.post("/api/union/get-list", body).then(res => {
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
      setUnions(list);
    });
  }

  function getLicenseTypes() {
    axios
      .get("/api/lookup-details/get-by-master-key/license_type")
      .then(res => {
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
        setLicenseTypes(list);
      });
  }

  function getRadiusIps() {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
        isActive: true,
        authProtocol: "PPPoE"
      }
    };

    axios.post("/api/radius-ip/get-list", body).then(res => {
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
      setRadiusIps(list);
    });
  }

  useEffect(() => {
    getDivisions();
    getLicenseTypes();
    getRadiusIps();
  }, []);

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
    setLoading(true);
    const {
      clientLevel,

      name,

      username,
      password,
      email,
      address,
      altContactNumber,
      contactNumber,
      districtId,
      divisionId,
      upazillaId,
      unionId,
      contactPerson,
      licenseExpireDate,
      btrcLicenseNo,
      licenseTypeId,
      radiusIpId,
      latitude,
      longitude,
      serviceType,
      packageType,
      dnsName,
      wsdCommission,
      bankName,
      bankAccountNumber,
      bKashNumber,
      nagadNumber,
      bankAccountName,
      bankBranchName,
      bankRoutingNumber,
      bankAccountCode
    } = data;

    let formatDate = null;

    if (licenseExpireDate) {
      formatDate = format(new Date(licenseExpireDate), "yyyy-MM-dd");
    }

    const formData = {
      partnerType: "client",
      clientLevel: clientLevel,

      name: name,

      username: username,
      password: password,
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
      isActive: isActive,
      radiusIpId: radiusIpId,
      serviceType: serviceType,
      packageType: packageType,
      dnsName: dnsName,
      wsdCommission: wsdCommission,
      bankName: bankName,
      bankAccountNumber: bankAccountNumber,
      bKashNumber: bKashNumber,
      nagadNumber: nagadNumber,
      bankAccountName: bankAccountName,
      bankBranchName: bankBranchName,
      bankRoutingNumber: bankRoutingNumber,
      bankAccountCode: bankAccountCode
    };

    try {
      axios
        .post("/api/partner/create", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status === 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || "Client Added successfully",
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
        <div className="my-6">
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
              licenseExpireDate: "",
              radiusIpId: "",
              address: "",
              latitude: "",
              longitude: "",
              serviceType: "",
              packageType: "",
              dnsName: "",
              wsdCommission: 0,
              bankName: "",
              bankAccountNumber: "",
              bKashNumber: "",
              nagadNumber: "",
              bankAccountName: "",
              bankBranchName: "",
              bankRoutingNumber: "",
              bankAccountCode: ""
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
                xs={24}
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
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="clientLevel"
                  rules={[
                    {
                      required: true,
                      message: "Please select actions"
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
                      onChange={handleChange}
                      options={tagsList}
                      value={clientLevel}
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
                  name="username"
                  label="Username"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!"
                    },
                    {
                      pattern: new RegExp(/^[A-Za-z0-9_\-@]+$/),
                      message:
                        "Only letters, numbers, underscores and hyphens allowed"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Username"
                    className={`form-control`}
                    name="username"
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
                  label="Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
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
                  label="Email"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
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
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
              {/* password, confirm password, address */}
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
                  name="address"
                  label="Address"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
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
                  name="password"
                  label="Password"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      min: 6,
                      message: "Password must be minimum 6 characters."
                    },
                    {
                      pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                      message:
                        "Only letters, numbers, underscores and hyphens allowed"
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
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
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    {
                      pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                      message:
                        "Only letters, numbers, underscores and hyphens allowed"
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "confirm password that you entered do not match with password!"
                          )
                        );
                      }
                    })
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>

              {/* contact person, contact number, contact number 2 */}
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
                  name="contactPerson"
                  label="Contact Person"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
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
                  name="contactNumber"
                  label="Contact Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Contact Number!"
                    },
                    {
                      pattern: new RegExp(/^(01)[0-9]{9}$/),
                      message: "Please enter correct BD Phone number."
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Contact Number"
                    className={`form-control`}
                    name="contactNumber"
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
                  name="altContactNumber"
                  label="Alt Contact Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      pattern: new RegExp(/^(01)[0-9]{9}$/),
                      message: "Please enter correct BD Phone number."
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Alt Contact Number"
                    className={`form-control`}
                    name="altContactNumber"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>

              {/* divisionId, districtId, upazillaId */}
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
                  label="Division"
                  style={{
                    marginBottom: 0,
                    marginRight: lg ? "10px" : "0px",
                    fontWeight: "bold"
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
                xs={24}
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
                    marginBottom: 0,
                    fontWeight: "bold"
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
                xs={24}
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
                    marginBottom: 0,
                    fontWeight: "bold"
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
                xs={24}
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
                    marginBottom: 0,
                    fontWeight: "bold"
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
                xs={24}
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
                    marginBottom: 0,
                    fontWeight: "bold"
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
                xs={24}
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
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                >
                  <Input
                    type="text"
                    placeholder="BTRC License No"
                    className={`form-control`}
                    name="btrcLicenseNo"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>

              {/* licenseExpireDate, radiusIpId*/}
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
                  name="licenseExpireDate"
                  label="License Expire Date"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                >
                  <DatePicker
                    style={{ width: "100%", padding: "6px" }}
                    className={`form-control`}
                    name="licenseExpireDate"
                    placeholder="License Expire Date"
                    onChange={onDateChange}
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
                  label="Radius IP"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
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
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                <Form.Item
                  name="latitude"
                  label="Latitude"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                >
                  <Input
                    type="text"
                    placeholder="Latitude"
                    className={`form-control`}
                    name="latitude"
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
                  name="longitude"
                  label="Longitude"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                >
                  <Input
                    type="text"
                    placeholder="Longitude"
                    className={`form-control`}
                    name="longitude"
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
                  label="Service Type"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="serviceType"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please select Service Type"
                  //   }
                  // ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{
                        width: "100%",
                        textAlign: "start"
                      }}
                      placeholder="Please select Service Type"
                      onChange={handleService}
                      options={serviceTypeList}
                      value={serviceType}
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
                  label="Package Type"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="packageType"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please select Service Type"
                  //   }
                  // ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{
                        width: "100%",
                        textAlign: "start"
                      }}
                      placeholder="Please select Package Type"
                      onChange={handlePackage}
                      options={packageTypeList}
                      value={packageType}
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
                  label="DNS Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="dnsName"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="text"
                    placeholder="DNS Name"
                    className={`form-control`}
                    name="dnsName"
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
                  label="WSD Commission (%)"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="wsdCommission"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="number"
                    placeholder="WSD Commission"
                    className={`form-control`}
                    name="wsdCommission"
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
                  label="Bank Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="bankName"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="text"
                    placeholder="Bank Name"
                    className={`form-control`}
                    name="bankName"
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
                  label="Account Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="bankAccountNumber"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="number"
                    placeholder="Account Number"
                    className={`form-control`}
                    name="bankAccountNumber"
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
                  label="BKash Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="bKashNumber"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="number"
                    placeholder="BKash Number"
                    className={`form-control`}
                    name="bKashNumber"
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
                  label="Nagad Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="nagadNumber"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="number"
                    placeholder="Nagad Number"
                    className={`form-control`}
                    name="nagadNumber"
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
                  label="Account Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="bankAccountName"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="text"
                    placeholder="Account Name"
                    className={`form-control`}
                    name="bankAccountName"
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
                  label="Branch Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="bankBranchName"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="text"
                    placeholder="Branch Name"
                    className={`form-control`}
                    name="bankBranchName"
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
                  label="Routing Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="bankRoutingNumber"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="text"
                    placeholder="Routing Number"
                    className={`form-control`}
                    name="bankRoutingNumber"
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
                  label="Account Code"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="bankAccountCode"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="text"
                    placeholder="Account Code"
                    className={`form-control`}
                    name="bankAccountCode"
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

export default CreateClientForm;
