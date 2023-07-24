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
  Form,
  Grid,
  Input,
  Select,
  Space,
  Card,
  Row,
  Col
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
interface FormData {
  name: string;
  username: string;
  password: string;
  mobileNo: string;
  altMobileNo: string;
  email: string;
  contactPerson: string;
  contactNumber: string;
  connectionAddress: string;
  flatNo: string;
  houseNo: string;
  roadNo: string;
  area: string;
  identityNo: string;
  remarks: any;
  mac: string;
  simultaneousUser: string;
  ipMode: string;
  staticIp: any;
  referrerName: any;
  oltDeviceId: any;
  serialNo: any;
  cableLength: any;
  vlanBoxName: any;
  swPortNo: any;
  cableId: any;
  colorCode: any;
  splitter: any;
  onuDeviceId: any;
  accountStatus: string;
  discount: any;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const referenceTypes = [
  {
    label: "Internal",
    value: "Internal"
  },
  {
    label: "External",
    value: "External"
  },
  {
    label: "Customer",
    value: "Customer"
  }
];

const identityTypes = [
  {
    label: "NID",
    value: "nid"
  },
  {
    label: "Passport",
    value: "passport"
  }
];

const connectionTypes = [
  {
    label: "fiber_optic",
    value: "fiber_optic"
  },
  {
    label: "utp",
    value: "utp"
  }
];

const fiberOpticDeviceTypes = [
  {
    label: "fiber_optic",
    value: "fiber_optic"
  },
  {
    label: "utp",
    value: "utp"
  }
];

const CreateCustomerForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const [autoRenew, setAutoRenew] = useState(true);

  const [isMacBound, setIsMacBound] = useState(true);

  const [smsAlert, setSmsAlert] = useState(true);
  const [emailAlert, setEmailAlert] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [unions, setUnions] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazilla, setSelectedUpazilla] = useState(null);
  const [selectedUnion, setSelectedUnion] = useState(null);

  const [selectedIdentityType, setSelectedIdentityType] = useState("nid");

  const [distributionZones, setDistributionZones] = useState([]);
  const [distributionPops, setDistributionPops] = useState([]);

  const [selectedDistributionZone, setSelectedDistributionZone] =
    useState(null);
  const [selectedDistributionPop, setSelectedDistributionPop] = useState(null);

  const [customerTypes, setCustomerTypes] = useState([]);
  const [selectedCustomerType, setSelectedCustomerType] = useState(null);

  const [customerPackages, setCustomerPackages] = useState([]);
  const [selectedCustomerPackage, setSelectedCustomerPackage] = useState(null);

  const [selectedReferenceType, setSelectedReferenceType] = useState(null);
  const [selectedConnectionType, setSelectedConnectionType] = useState(null);

  const [selectedFiberOpticDeviceType, setSelectedFiberOpticDeviceType] =
    useState(null);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleSmsAlert = (e: any) => {
    setSmsAlert(e.target.checked ? true : false);
  };

  const handleEmailAlert = (e: any) => {
    setEmailAlert(e.target.checked ? true : false);
  };

  const handleAutoRenew = (e: any) => {
    setAutoRenew(e.target.checked ? true : false);
  };

  const handleMacBound = (e: any) => {
    setIsMacBound(e.target.checked ? true : false);
  };

  const handleIdentityTypeChange = (value: any) => {
    console.log("checked = ", value);
    form.setFieldsValue({ identityType: value });
    setSelectedIdentityType(value as any);
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

  const handleCustomerPackageChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerPackageId: value });
    setSelectedCustomerPackage(value as any);
  };

  const handleCustomerTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerTypeId: value });
    setSelectedCustomerType(value as any);
  };

  const handleDistributionZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ distributionZoneId: value });
    setSelectedDistributionZone(value as any);
  };

  const handleDistributionPopChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ distributionPopId: value });
    setSelectedDistributionPop(value as any);
  };

  const handleReferenceTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ referenceType: value });
    setSelectedReferenceType(value as any);
  };

  const handleCustomerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ referrerCustomer: value });
    setSelectedCustomer(value as any);
  };

  const handleUserChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ referrerUser: value });
    setSelectedUser(value as any);
  };

  const handleConnectionTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ connectionType: value });
    setSelectedConnectionType(value as any);
  };

  const handleFiberOpticDeviceTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ fiberOpticDeviceType: value });
    setSelectedFiberOpticDeviceType(value as any);
  };

  function getCustomerTypes() {
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
    axios.post("/api/customer-type/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setCustomerTypes(list);
    });
  }

  function getCustomers() {
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
    axios.post("/api/customer/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setCustomers(list);
    });
  }

  function getUsers() {
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
    axios.post("/api/users/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setUsers(list);
    });
  }

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

  function getDistributionZones() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      }
    };

    axios.post("/api/distribution-zone/get-list", body).then(res => {
      const { data } = res;
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setDistributionZones(list);
    });
  }

  function getDistributionPops() {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      }
    };

    axios.post("/api/distribution-pop/get-list", body).then(res => {
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setDistributionPops(list);
    });
  }

  const getCustomerPackages = () => {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      }
    };
    axios.post("/api/customer-package/get-list", body).then(res => {
      const { data } = res;
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setCustomerPackages(list);
    });
  };

  // call on page load
  useEffect(() => {
    getDivisions();
    getCustomerPackages();
    getDistributionZones();
    getDistributionPops();
    getCustomerTypes();
    getCustomers();
    getUsers();
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
    console.log(data);

    const {
      name,
      username,
      password,
      mobileNo,
      altMobileNo,
      email,
      contactPerson,
      contactNumber,
      connectionAddress,
      flatNo,
      houseNo,
      roadNo,
      area,
      identityNo,
      remarks,
      mac,
      simultaneousUser,
      ipMode,
      staticIp,
      referrerName,
      oltDeviceId,
      serialNo,
      cableLength,
      vlanBoxName,
      swPortNo,
      cableId,
      colorCode,
      splitter,
      onuDeviceId,
      accountStatus,
      discount
    } = data;

    const formData = {
      name: name,
      username: username,
      password: password,
      customerTypeId: selectedCustomerType,
      mobileNo: mobileNo,
      altMobileNo: altMobileNo,
      email: email,
      contactPerson: contactPerson,
      contactNumber: contactNumber,
      connectionAddress: connectionAddress,
      flatNo: flatNo,
      houseNo: houseNo,
      roadNo: roadNo,
      area: area,
      identityType: selectedIdentityType,
      identityNo: identityNo,
      remarks: remarks,
      isMacBound: isMacBound,
      mac: mac,
      simultaneousUser: simultaneousUser,
      ipMode: ipMode,
      staticIp: staticIp,
      referenceType: selectedReferenceType,
      referrerCustomer: selectedCustomer,
      referrerUser: selectedUser,
      referrerName: referrerName,
      connectionType: selectedConnectionType,
      fiberOpticDeviceType: selectedFiberOpticDeviceType,
      oltDeviceId: oltDeviceId,
      serialNo: serialNo,
      cableLength: cableLength,
      vlanBoxName: vlanBoxName,
      swPortNo: swPortNo,
      cableId: cableId,
      colorCode: colorCode,
      splitter: splitter,
      onuDeviceId: onuDeviceId,
      accountStatus: accountStatus,
      autoRenew: autoRenew,
      discount: discount,
      smsAlert: smsAlert,
      emailAlert: emailAlert,
      isActive: isActive
    };

    try {
      axios
        .post("/api/customer/create", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status === 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || " Added successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/customer/customer");
            });
          } else {
            MySwal.fire({
              title: "Error",
              text: data.message || " Added Failed",
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
      // console.log(err)
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
            username: "",
            password: "",
            // customerTypeId: string
            mobileNo: "",
            altMobileNo: "",
            email: "",
            contactPerson: "",
            contactNumber: "",
            connectionAddress: "",
            flatNo: "",
            houseNo: "",
            roadNo: "",
            area: "",
            identityType: "",
            identityNo: "",
            /*  divisionId: any
              districtId: any
              upazillaId: any
              unionId: any
              customerPackageId: string */
            remarks: "",
            // distributionZoneId: string
            // distributionPopId: string
            isMacBound: false,
            mac: "",
            simultaneousUser: "",
            ipMode: "",
            staticIp: "",
            referenceType: "",
            referrerCustomer: "",
            referrerUser: "",
            referrerName: "",
            connectionType: "",
            fiberOpticDeviceType: "",
            oltDeviceId: "",
            serialNo: "",
            cableLength: "",
            vlanBoxName: "",
            swPortNo: "",
            cableId: "",
            colorCode: "",
            splitter: "",
            onuDeviceId: "",
            accountStatus: "",
            discount: ""
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
          <Card
            hoverable
            style={{
              width: "90%",
              backgroundColor: "#fffff",
              borderRadius: "10px",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "3rem",
              marginBottom: "3rem"
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
                {/* name */}
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
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* username */}
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
                {/* email */}
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

              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* password */}
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!"
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
                >
                  <Input.Password />
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
                {/* customerTypeId */}
                <Form.Item
                  label="Customer Type"
                  style={{
                    marginBottom: 0
                  }}
                  name="customerTypeId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Customer Type"
                      onChange={handleCustomerTypeChange}
                      options={customerTypes}
                      value={selectedCustomerType}
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
                {/* mobileNo */}
                <Form.Item
                  name="mobileNo"
                  label="Mobile No"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mobile No!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Mobile No"
                    className={`form-control`}
                    name="mobileNo"
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
                {/* altMobileNo */}
                <Form.Item
                  name="altMobileNo"
                  label="Alt Mobile No"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Alt Mobile No!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Alt Mobile No"
                    className={`form-control`}
                    name="altMobileNo"
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
                {/* contact Person */}
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
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* contactNumber */}
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
                {/* connectionAddress */}
                <Form.Item
                  name="connectionAddress"
                  label="Connection Address"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Connection Address!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Connection Address"
                    className={`form-control`}
                    name="connectionAddress"
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
                {/* flatNo */}
                <Form.Item
                  name="flatNo"
                  label="Flat No"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Flat No!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Flat No"
                    className={`form-control`}
                    name="flatNo"
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
                {/* houseNo */}
                <Form.Item
                  name="houseNo"
                  label="House No"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your House No!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="House No"
                    className={`form-control`}
                    name="houseNo"
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
                {/* roadNo */}
                <Form.Item
                  name="roadNo"
                  label="Road No"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Road No!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Road No"
                    className={`form-control`}
                    name="roadNo"
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
                {/* area */}
                <Form.Item
                  name="area"
                  label="Area"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Area!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Area"
                    className={`form-control`}
                    name="area"
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
                {/* identityType */}
                <Form.Item
                  label="Identity Type"
                  style={{
                    marginBottom: 0,
                    marginRight: lg ? "10px" : "0px"
                  }}
                  name="identityType"
                  rules={[
                    {
                      required: true,
                      message: "Please select Identity Type"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Identity Type"
                      onChange={handleIdentityTypeChange}
                      options={identityTypes}
                      value={selectedIdentityType}
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
                {/* identityNo */}
                <Form.Item
                  name="identityNo"
                  label="Identity No"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Identity No!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Identity No"
                    className={`form-control`}
                    name="identityNo"
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
                {/* divisionId */}
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
                      message: "Please select Division!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Division"
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
                {/* districtId */}
                <Form.Item
                  label="District"
                  style={{
                    marginBottom: 0
                  }}
                  name="districtId"
                  rules={[
                    {
                      required: true,
                      message: "Please select District!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select District"
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
                {/* upazillaId */}
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
                      style={{ width: "100%" }}
                      placeholder="Please select Upazilla"
                      onChange={handleUpazillaChange}
                      options={upazillas}
                      value={selectedUpazilla}
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
                {/* unionId */}
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
                      style={{ width: "100%" }}
                      placeholder="Please select Union"
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
                {/* customerPackageId */}
                <Form.Item
                  label="Customer Package"
                  style={{
                    marginBottom: 0
                  }}
                  name="customerPackageId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Customer Package"
                      onChange={handleCustomerPackageChange}
                      options={customerPackages}
                      value={selectedCustomerPackage}
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
                  name="remarks"
                  label="Remarks"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Remarks!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Remarks"
                    className={`form-control`}
                    name="remarks"
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
                {/* distributionZoneId */}
                <Form.Item
                  label="Distribution Zone"
                  style={{
                    marginBottom: 0
                  }}
                  name="distributionZoneId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Distribution Zone"
                      onChange={handleDistributionZoneChange}
                      options={distributionZones}
                      value={selectedDistributionZone}
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
                {/* distributionPopId */}
                <Form.Item
                  label="Distribution Pop"
                  style={{
                    marginBottom: 0
                  }}
                  name="distributionPopId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Distribution Pop"
                      onChange={handleDistributionPopChange}
                      options={distributionPops}
                      value={selectedDistributionPop}
                    />
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            hoverable
            style={{
              width: "90%",
              backgroundColor: "#fffff",
              borderRadius: "10px",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "3rem",
              marginBottom: "3rem"
            }}
          >
            {/* isMacBound */}
            <Form.Item
              label=""
              style={{
                marginBottom: 0
              }}
            >
              <Checkbox onChange={handleMacBound} checked={isMacBound}>
                Mac Bound
              </Checkbox>
            </Form.Item>
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
                {/* mac */}
                <Form.Item
                  name="mac"
                  label="Mac"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mac!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Mac"
                    className={`form-control`}
                    name="mac"
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
                {/* simultaneousUser */}
                <Form.Item
                  name="simultaneousUser"
                  label="Simultaneous User"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Simultaneous User!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Simultaneous User"
                    className={`form-control`}
                    name="simultaneousUser"
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
                {/* ipMode */}
                <Form.Item
                  name="ipMode"
                  label="IP Mode"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your IP Mode!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="IP Mode"
                    className={`form-control`}
                    name="ipMode"
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
                {/* staticIp */}
                <Form.Item
                  name="staticIp"
                  label="Static IP"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Static IP!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Static IP"
                    className={`form-control`}
                    name="staticIp"
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
                {/* referenceType */}
                <Form.Item
                  label="Reference Type"
                  style={{
                    marginBottom: 0
                  }}
                  name="referenceType"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Reference Type"
                      onChange={handleReferenceTypeChange}
                      options={referenceTypes}
                      value={selectedReferenceType}
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
                {/* referrerCustomer */}
                <Form.Item
                  label="Referrer Customer"
                  style={{
                    marginBottom: 0
                  }}
                  name="referrerCustomer"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Referrer Customer"
                      onChange={handleCustomerChange}
                      options={customers}
                      value={selectedCustomer}
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
                {/* referrerUser */}
                <Form.Item
                  label="Referrer User"
                  style={{
                    marginBottom: 0
                  }}
                  name="referrerUser"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Referrer User"
                      onChange={handleUserChange}
                      options={users}
                      value={selectedUser}
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
                {/* referrerName */}
                <Form.Item
                  name="referrerName"
                  label="Referrer Name"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Referrer Name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Referrer Name"
                    className={`form-control`}
                    name="referrerName"
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
                {/* connectionType */}
                <Form.Item
                  label="Connection Type"
                  style={{
                    marginBottom: 0
                  }}
                  name="connectionType"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Connection Type"
                      onChange={handleConnectionTypeChange}
                      options={connectionTypes}
                      value={selectedConnectionType}
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
                {/* fiberOpticDeviceType */}
                <Form.Item
                  label="Fiber Optic Device Type"
                  style={{
                    marginBottom: 0
                  }}
                  name="fiberOpticDeviceType"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select Fiber Optic Device Type"
                      onChange={handleFiberOpticDeviceTypeChange}
                      options={fiberOpticDeviceTypes}
                      value={selectedFiberOpticDeviceType}
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
                {/* oltDeviceId */}
                <Form.Item
                  name="oltDeviceId"
                  label="Olt Device Id"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Olt Device Id!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Olt Device Id"
                    className={`form-control`}
                    name="oltDeviceId"
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
                {/* serialNo */}
                <Form.Item
                  name="serialNo"
                  label="Serial No"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Serial No!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Serial No"
                    className={`form-control`}
                    name="serialNo"
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
                {/* cableLength */}
                <Form.Item
                  name="cableLength"
                  label="Cable Length"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Cable Length!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Cable Length"
                    className={`form-control`}
                    name="cableLength"
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
                {/* vlanBoxName */}
                <Form.Item
                  name="vlanBoxName"
                  label="Vlan Box Name"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Vlan Box Name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Vlan Box Name"
                    className={`form-control`}
                    name="vlanBoxName"
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
                {/* swPortNo */}
                <Form.Item
                  name="swPortNo"
                  label="Sw Port No"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Sw Port No!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Sw Port No"
                    className={`form-control`}
                    name="swPortNo"
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
                {/* cableId */}
                <Form.Item
                  name="cableId"
                  label="Cable Id"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Cable Id!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Cable Id"
                    className={`form-control`}
                    name="cableId"
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
                {/* colorCode */}
                <Form.Item
                  name="colorCode"
                  label="Color Code"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Color Code!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Color Code"
                    className={`form-control`}
                    name="colorCode"
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
                {/* splitter */}
                <Form.Item
                  name="splitter"
                  label="Splitter"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Splitter!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Splitter"
                    className={`form-control`}
                    name="splitter"
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
                {/* onuDeviceId */}
                <Form.Item
                  name="onuDeviceId"
                  label="Onu Device Id"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Onu Device Id!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Onu Device Id"
                    className={`form-control`}
                    name="onuDeviceId"
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
                {/* accountStatus */}
                <Form.Item
                  name="accountStatus"
                  label="Account Status"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Account Status!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Account Status"
                    className={`form-control`}
                    name="accountStatus"
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
          </Card>

          <Card
            hoverable
            style={{
              width: "90%",
              backgroundColor: "#fffff",
              borderRadius: "10px",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "3rem",
              marginBottom: "3rem"
            }}
          >
            {/* autoRenew */}
            <Form.Item
              label=""
              style={{
                marginBottom: 0
              }}
            >
              <Checkbox onChange={handleAutoRenew} checked={autoRenew}>
                Auto Renew
              </Checkbox>
            </Form.Item>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* discount */}
                <Form.Item
                  name="discount"
                  label="Discount"
                  style={{
                    marginBottom: 0
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Discount!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Discount"
                    className={`form-control`}
                    name="discount"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Space
              size={[8, 8]}
              wrap
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
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

              {/* emailAlert */}
              <Form.Item
                label=""
                style={{
                  marginBottom: 0
                }}
              >
                <Checkbox onChange={handleEmailAlert} checked={emailAlert}>
                  Email Alert
                </Checkbox>
              </Form.Item>

              {/* smsAlert */}
              <Form.Item
                label=""
                style={{
                  marginBottom: 0
                }}
              >
                <Checkbox onChange={handleSmsAlert} checked={smsAlert}>
                  SMS Alert
                </Checkbox>
              </Form.Item>
            </Space>
          </Card>

          {/* submit */}
          <Row justify="center">
            <Col>
              <Form.Item>
                {/* wrapperCol={{ ...layout.wrapperCol, offset: 4 }} */}
                <Button type="primary" htmlType="submit">
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

export default CreateCustomerForm;
