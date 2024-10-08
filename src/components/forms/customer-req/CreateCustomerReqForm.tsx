/* eslint-disable react-hooks/exhaustive-deps */
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
  Grid,
  Input,
  Select,
  Space,
  Row,
  Col
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppSelector } from "@/store/hooks";
// import AppImageLoader from "@/components/loader/AppImageLoader";
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
  remarks: string;
  referenceType: string;
  referrerName: string;
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

const CreateCustomerReqForm = () => {
  const authUser = useAppSelector(state => state.auth.user);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [divisions, setDivisions] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [upazillas, setUpazillas] = useState<any[]>([]);
  const [unions, setUnions] = useState<any[]>([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazilla, setSelectedUpazilla] = useState(null);
  const [selectedUnion, setSelectedUnion] = useState(null);

  const [selectedIdentityType, setSelectedIdentityType] = useState(null);

  const [customerTypes, setCustomerTypes] = useState<any[]>([]);
  const [selectedCustomerType, setSelectedCustomerType] = useState(null);

  const [customerPackages, setCustomerPackages] = useState<any[]>([]);
  const [selectedCustomerPackage, setSelectedCustomerPackage] = useState(null);

  const [selectedReferenceType, setSelectedReferenceType] = useState(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

  const handleReferenceTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ referenceType: value });
    setSelectedReferenceType(value as any);
  };

  const handleCustomerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ referrerCustomerId: value });
    setSelectedCustomer(value as any);
  };

  const handleUserChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ referrerUserId: value });
    setSelectedUser(value as any);
  };

  function getCustomerTypes() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "title"
          }
        ]
      },
      body: {
        isActive: true
      }
    };
    axios.post("/api/customer-type/get-list", body).then(res => {
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
          label: item.title,
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
            field: "username"
          }
        ]
      },
      body: {
        // isActive: true
      }
    };
    axios.post("/api/customer/get-list", body).then(res => {
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
          label: item.username,
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
            field: "username"
          }
        ]
      },
      body: {
        // isActive: true
      }
    };
    axios.post("/api/users/get-list-for-table", body).then(res => {
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
          label: item.username,
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

  const getCustomerPackages = () => {
    const body = {
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
    axios.post("/api/customer-package/get-list", body).then(res => {
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
      setCustomerPackages(list);
    });
  };

  // call on page load
  useEffect(() => {
    getDivisions();
    getCustomerPackages();
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
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
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
        referrerName
      } = data;

      const formData = {
        name: name,
        username: username,
        password: password,
        customerTypeId: selectedCustomerType,
        customerPackageId: selectedCustomerPackage,
        mobileNo: mobileNo,
        altMobileNo: altMobileNo,
        email: email,
        contactPerson: contactPerson,
        contactPersonNumber: contactNumber,
        connectionAddress: connectionAddress,
        flatNo: flatNo,
        houseNo: houseNo,
        roadNo: roadNo,
        area: area,
        identityType: selectedIdentityType,
        identityNo: identityNo,
        remarks: remarks,
        referenceType: selectedReferenceType,
        referrerCustomerId: selectedCustomer,
        referrerUserId: selectedUser,
        referrerName: referrerName,
        divisionId: selectedDivision,
        districtId: selectedDistrict,
        upazillaId: selectedUpazilla,
        unionId: selectedUnion
      };

      try {
        await axios
          .post("/api/customer-request/create", formData)
          .then(res => {
            // console.log(res);
            const { data } = res;

            if (data.status === 200) {
              MySwal.fire({
                title: "Success",
                text: data.message || " Added successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/customer/customer-onboarding-req");
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
            customerTypeId: "",
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
            remarks: "",
            referenceType: "",
            referrerCustomerId: "",
            referrerUserId: "",
            referrerName: ""
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
            {/* name */}
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
                  maxLength={50}
                />
              </Form.Item>
            </Col>
            {/* username */}
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
                  addonBefore={
                    <span
                      style={{
                        backgroundColor: "#cfcdca",
                        color: "black"
                      }}
                    >
                      {authUser ? authUser.clientPrefix + "_" : "Not Available"}
                    </span>
                  }
                  placeholder="Username"
                  className={`form-control`}
                  name="username"
                  style={{ padding: "6px" }}
                  maxLength={32}
                  minLength={3}
                />
              </Form.Item>
            </Col>
            {/* email */}
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
                  maxLength={32}
                />
              </Form.Item>
            </Col>
            {/* password */}
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
                    min: 3,
                    message: "Password must be minimum 3 characters."
                  },
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                    message:
                      "Only letters, numbers, underscores, @ and hyphens allowed"
                  }
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  style={{ padding: "6px" }}
                  maxLength={32}
                />
              </Form.Item>
            </Col>
            {/* customerTypeId */}
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
                label="Customer Type"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="customerTypeId"
                rules={[
                  {
                    required: true,
                    message: "Please select Customer Type!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Customer Type"
                    onChange={handleCustomerTypeChange}
                    options={customerTypes}
                    value={selectedCustomerType}
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
            {/* mobileNo */}
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
                name="mobileNo"
                label="Mobile No"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Mobile No!"
                  },
                  {
                    pattern: new RegExp(/^(01)[0-9]{9}$/),
                    message:
                      "Please enter correct BD Number starting with (01) and containing a total of 11 digits."
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="01XXXXXXXXX"
                  className={`form-control`}
                  name="mobileNo"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* altMobileNo */}
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
                name="altMobileNo"
                label="Alt Mobile No"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  // {
                  //   required: true,
                  //   message: "Please input your Alt Mobile No!"
                  // }
                  {
                    pattern: new RegExp(/^(01)[0-9]{9}$/),
                    message:
                      "Please enter correct BD Number starting with (01) and containing a total of 11 digits."
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="01XXXXXXXXX"
                  className={`form-control`}
                  name="altMobileNo"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* contact Person */}
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
            {/* contactNumber */}
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
                    message:
                      "Please enter correct BD Number starting with (01) and containing a total of 11 digits."
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="01XXXXXXXXX"
                  className={`form-control`}
                  name="contactNumber"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* connectionAddress */}
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
                name="connectionAddress"
                label="Connection Address"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
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
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* flatNo */}
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
                name="flatNo"
                label="Flat No"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
              >
                <Input
                  type="text"
                  placeholder="Flat No"
                  className={`form-control`}
                  name="flatNo"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* houseNo */}
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
                name="houseNo"
                label="House No"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input Your House No!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="House No"
                  className={`form-control`}
                  name="houseNo"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* roadNo */}
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
                name="roadNo"
                label="Road No"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
              >
                <Input
                  type="text"
                  placeholder="Road No"
                  className={`form-control`}
                  name="roadNo"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* area */}
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
                name="area"
                label="Area"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input Your Area!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Area"
                  className={`form-control`}
                  name="area"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* identityType */}
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
                label="Identity Type"
                style={{
                  marginBottom: 0,
                  marginRight: lg ? "10px" : "0px",
                  fontWeight: "bold"
                }}
                name="identityType"
                rules={[
                  {
                    required: true,
                    message: "Please select Identity Type!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Identity Type"
                    onChange={handleIdentityTypeChange}
                    options={identityTypes}
                    value={selectedIdentityType}
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
            {/* identityNo */}
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
                name="identityNo"
                label="Identity No"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
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
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* divisionId */}
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
                    message: "Please select Division!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Division"
                    onChange={handleDivisionChange}
                    options={divisions}
                    value={selectedDivision}
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
            {/* districtId */}
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
                    message: "Please select District!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select District"
                    onChange={handleDistrictChange}
                    options={districts}
                    value={selectedDistrict}
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
            {/* upazillaId */}
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
                label="Upazilla/Thana"
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
                    placeholder="Please select Upazilla"
                    onChange={handleUpazillaChange}
                    options={upazillas}
                    value={selectedUpazilla}
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
            {/* unionId */}
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
                    placeholder="Please select Union"
                    onChange={handleUnionChange}
                    options={unions}
                    value={selectedUnion}
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
            {/* customerPackageId */}
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
                label="Customer Package"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please select Customer Package!"
                  }
                ]}
                name="customerPackageId"
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Customer Package"
                    onChange={handleCustomerPackageChange}
                    options={customerPackages}
                    value={selectedCustomerPackage}
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
            {/* remarks */}
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
                name="remarks"
                label="Remarks"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your Remarks!"
                //   }
                // ]}
              >
                <Input
                  type="text"
                  placeholder="Remarks"
                  className={`form-control`}
                  name="remarks"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
            {/* referenceType */}
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
                label="Reference Type"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="referenceType"
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Reference Type"
                    onChange={handleReferenceTypeChange}
                    options={referenceTypes}
                    value={selectedReferenceType}
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
            {/* referrerUser */}
            {selectedReferenceType == "Internal" && (
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
                  label="Referrer User"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="referrerUserId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Referrer User"
                      onChange={handleUserChange}
                      options={users}
                      value={selectedUser}
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
            )}
            {/* referrerName */}
            {selectedReferenceType == "External" && (
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
                  name="referrerName"
                  label="Referrer Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Referrer Name!"
                  //   }
                  // ]}
                >
                  <Input
                    type="text"
                    placeholder="Referrer Name"
                    className={`form-control`}
                    name="referrerName"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {/* referrerCustomer */}
            {selectedReferenceType == "Customer" && (
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
                  label="Referrer Customer"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="referrerCustomerId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Referrer Customer"
                      onChange={handleCustomerChange}
                      options={customers}
                      value={selectedCustomer}
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

export default CreateCustomerReqForm;
