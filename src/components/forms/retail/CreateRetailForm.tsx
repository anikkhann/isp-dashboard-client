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
import { Row, Col } from "antd";

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
  nidNo: string;
  salesDistributionCommission: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const CreateRetailForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

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

  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleDivisionChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ divisionId: value });
    setSelectedDivision(value as any);
    setSelectedDistrict(null);
    setSelectedUpazilla(null);
    setSelectedUnion(null);
  };

  const handleDistrictChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ districtId: value });
    setSelectedDistrict(value as any);
    setSelectedUpazilla(null);
    setSelectedUnion(null);
  };

  const handleUpazillaChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ upazillaId: value });
    setSelectedUpazilla(value as any);
    setSelectedUnion(null);
  };

  const handleUnionChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ unionId: value });
    setSelectedUnion(value as any);
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

  useEffect(() => {
    getDivisions();
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
      email,
      address,
      altContactNumber,
      contactNumber,
      districtId,
      divisionId,
      upazillaId,
      unionId,
      contactPerson,
      nidNo,
      salesDistributionCommission
    } = data;

    const formData = {
      partnerType: "retailer",
      name: name,
      username: username,
      password: password,
      contactPerson: contactPerson,
      contactNumber: contactNumber,
      altContactNumber: altContactNumber,
      email: email,
      address: address,
      divisionId: divisionId,
      districtId: districtId,
      upazillaId: upazillaId,
      unionId: unionId,
      nidNo: nidNo,
      salesDistributionCommission: salesDistributionCommission,
      isActive: isActive
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
              text: data.message || "Added successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/retail/retail");
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
            contactPerson: "",
            contactNumber: "",
            altContactNumber: "",
            divisionId: "",
            districtId: "",
            upazillaId: "",
            unionId: "",
            address: "",
            nidNo: "",
            salesDistributionCommission: ""
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
                    pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
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
              {/* confirm password */}
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
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
              {/* address */}
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
              {/* altContactNumber */}
              <Form.Item
                name="altContactNumber"
                label="Alt Contact Number"
                style={{
                  marginBottom: 0
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
              {/* nidNo */}
              <Form.Item
                name="nidNo"
                label="NID No"
                style={{
                  marginBottom: 0
                }}
              >
                <Input
                  type="text"
                  placeholder="NID No"
                  className={`form-control`}
                  name="nidNo"
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
              {/* salesDistributionCommission */}
              <Form.Item
                name="salesDistributionCommission"
                label="S&D Commission (%)"
                style={{
                  marginBottom: 0
                }}
              >
                <Input
                  type="text"
                  placeholder="S&D Commission (%)"
                  className={`form-control`}
                  name="salesDistributionCommission"
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
                    placeholder="Please select"
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
                    placeholder="Please select"
                    onChange={handleUnionChange}
                    options={unions}
                    value={selectedUnion}
                  />
                </Space>
              </Form.Item>
            </Col>
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

export default CreateRetailForm;
