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
  Space
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

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

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

  const [selectedIdentityType, setSelectedIdentityType] = useState(null);

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
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          scrollToFirstError
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

          {/* password */}
          <Form.Item
            name="password"
            label="Password"
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
          >
            <Input.Password />
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleCustomerTypeChange}
                options={customerTypes}
                value={selectedCustomerType}
              />
            </Space>
          </Form.Item>

          {/* mobileNo */}
          <Form.Item
            name="mobileNo"
            label="mobileNo"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your mobileNo!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="mobileNo"
              className={`form-control`}
              name="mobileNo"
            />
          </Form.Item>

          {/* altMobileNo */}
          <Form.Item
            name="altMobileNo"
            label="altMobileNo"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your altMobileNo!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="altMobileNo"
              className={`form-control`}
              name="altMobileNo"
            />
          </Form.Item>

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

          {/* flatNo */}
          <Form.Item
            name="flatNo"
            label="flat No"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your flat No!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="flat No"
              className={`form-control`}
              name="flatNo"
            />
          </Form.Item>

          {/* houseNo */}
          <Form.Item
            name="houseNo"
            label="houseNo"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your houseNo!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="houseNo"
              className={`form-control`}
              name="houseNo"
            />
          </Form.Item>

          {/* roadNo */}
          <Form.Item
            name="roadNo"
            label="roadNo"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your roadNo!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="roadNo"
              className={`form-control`}
              name="roadNo"
            />
          </Form.Item>

          {/* area */}
          <Form.Item
            name="area"
            label="area"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your area!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="area"
              className={`form-control`}
              name="area"
            />
          </Form.Item>

          {/* identityType */}
          <Form.Item
            label="identityType"
            style={{
              marginBottom: 0,
              marginRight: lg ? "10px" : "0px"
            }}
            name="identityType"
            rules={[
              {
                required: true,
                message: "Please select identityType"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleIdentityTypeChange}
                options={identityTypes}
                value={selectedIdentityType}
              />
            </Space>
          </Form.Item>

          {/* identityNo */}
          <Form.Item
            name="identityNo"
            label="identityNo"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your identityNo!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="identityNo"
              className={`form-control`}
              name="identityNo"
            />
          </Form.Item>

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
                message: "Please select Division"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleDivisionChange}
                options={divisions}
                value={selectedDivision}
              />
            </Space>
          </Form.Item>

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
                message: "Please select District"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleDistrictChange}
                options={districts}
                value={selectedDistrict}
              />
            </Space>
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleUpazillaChange}
                options={upazillas}
                value={selectedUpazilla}
              />
            </Space>
          </Form.Item>

          {/* unionId */}
          <Form.Item
            label="union"
            style={{
              marginBottom: 0
            }}
            name="unionId"
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleUnionChange}
                options={unions}
                value={selectedUnion}
              />
            </Space>
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleCustomerPackageChange}
                options={customerPackages}
                value={selectedCustomerPackage}
              />
            </Space>
          </Form.Item>

          {/* remarks */}
          <Form.Item
            name="remarks"
            label="remarks"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your remarks!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="remarks"
              className={`form-control`}
              name="remarks"
            />
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleDistributionZoneChange}
                options={distributionZones}
                value={selectedDistributionZone}
              />
            </Space>
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleDistributionPopChange}
                options={distributionPops}
                value={selectedDistributionPop}
              />
            </Space>
          </Form.Item>

          {/* isMacBound */}
          <Form.Item
            label=""
            style={{
              marginBottom: 0
            }}
          >
            <Checkbox onChange={handleMacBound} checked={isMacBound}>
              isMacBound
            </Checkbox>
          </Form.Item>

          {/* mac */}
          <Form.Item
            name="mac"
            label="mac"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your mac!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="mac"
              className={`form-control`}
              name="mac"
            />
          </Form.Item>

          {/* simultaneousUser */}
          <Form.Item
            name="simultaneousUser"
            label="simultaneousUser"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your simultaneousUser!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="simultaneousUser"
              className={`form-control`}
              name="simultaneousUser"
            />
          </Form.Item>

          {/* ipMode */}
          <Form.Item
            name="ipMode"
            label="ipMode"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your ipMode!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="ipMode"
              className={`form-control`}
              name="ipMode"
            />
          </Form.Item>

          {/* staticIp */}
          <Form.Item
            name="staticIp"
            label="staticIp"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your staticIp!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="staticIp"
              className={`form-control`}
              name="staticIp"
            />
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleReferenceTypeChange}
                options={referenceTypes}
                value={selectedReferenceType}
              />
            </Space>
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleCustomerChange}
                options={customers}
                value={selectedCustomer}
              />
            </Space>
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleUserChange}
                options={users}
                value={selectedUser}
              />
            </Space>
          </Form.Item>

          {/* referrerName */}
          <Form.Item
            name="referrerName"
            label="referrerName"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your referrerName!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="referrerName"
              className={`form-control`}
              name="referrerName"
            />
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleConnectionTypeChange}
                options={connectionTypes}
                value={selectedConnectionType}
              />
            </Space>
          </Form.Item>

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
                placeholder="Please select"
                onChange={handleFiberOpticDeviceTypeChange}
                options={fiberOpticDeviceTypes}
                value={selectedFiberOpticDeviceType}
              />
            </Space>
          </Form.Item>

          {/* oltDeviceId */}
          <Form.Item
            name="oltDeviceId"
            label="oltDeviceId"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your oltDeviceId!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="oltDeviceId"
              className={`form-control`}
              name="oltDeviceId"
            />
          </Form.Item>

          {/* serialNo */}
          <Form.Item
            name="serialNo"
            label="serialNo"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your serialNo!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="serialNo"
              className={`form-control`}
              name="serialNo"
            />
          </Form.Item>
          {/* cableLength */}
          <Form.Item
            name="cableLength"
            label="cableLength"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your cableLength!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="cableLength"
              className={`form-control`}
              name="cableLength"
            />
          </Form.Item>
          {/* vlanBoxName */}
          <Form.Item
            name="vlanBoxName"
            label="vlanBoxName"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your vlanBoxName!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="vlanBoxName"
              className={`form-control`}
              name="vlanBoxName"
            />
          </Form.Item>
          {/* swPortNo */}
          <Form.Item
            name="swPortNo"
            label="swPortNo"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your swPortNo!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="swPortNo"
              className={`form-control`}
              name="swPortNo"
            />
          </Form.Item>
          {/* cableId */}
          <Form.Item
            name="cableId"
            label="cableId"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your cableId!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="cableId"
              className={`form-control`}
              name="cableId"
            />
          </Form.Item>
          {/* colorCode */}
          <Form.Item
            name="colorCode"
            label="colorCode"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your colorCode!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="colorCode"
              className={`form-control`}
              name="colorCode"
            />
          </Form.Item>
          {/* splitter */}
          <Form.Item
            name="splitter"
            label="splitter"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your splitter!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="splitter"
              className={`form-control`}
              name="splitter"
            />
          </Form.Item>
          {/* onuDeviceId */}
          <Form.Item
            name="onuDeviceId"
            label="onuDeviceId"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your onuDeviceId!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="onuDeviceId"
              className={`form-control`}
              name="onuDeviceId"
            />
          </Form.Item>
          {/* accountStatus */}
          <Form.Item
            name="accountStatus"
            label="accountStatus"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your accountStatus!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="accountStatus"
              className={`form-control`}
              name="accountStatus"
            />
          </Form.Item>

          {/* autoRenew */}
          <Form.Item
            label=""
            style={{
              marginBottom: 0
            }}
          >
            <Checkbox onChange={handleAutoRenew} checked={autoRenew}>
              autoRenew
            </Checkbox>
          </Form.Item>

          {/* discount */}
          <Form.Item
            name="discount"
            label="discount"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your discount!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="discount"
              className={`form-control`}
              name="discount"
            />
          </Form.Item>

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
              Sms Alert
            </Checkbox>
          </Form.Item>

          {/* submit */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateCustomerForm;
