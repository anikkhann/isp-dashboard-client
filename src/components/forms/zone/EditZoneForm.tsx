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
import { useAppSelector } from "@/store/hooks";
// import AppImageLoader from "@/components/loader/AppImageLoader";

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
  wsdCommission: number;
  bankName: string;
  bankAccountNumber: number;
  bkashNumber: number;
  nagadNumber: number;
  bankAccountName: string;
  bankBranchName: string;
  bankRoutingNumber: string;
  bankAccountCode: string;
}

const EditZoneForm = ({ item }: any) => {
  const authUser = useAppSelector(state => state.auth.user);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [divisions, setDivisions] = useState<any[]>([]);
  const [selectedDivision, setSelectedDivision] = useState(null);

  const [districts, setDistricts] = useState<any[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [upazillas, setUpazillas] = useState<any[]>([]);
  const [selectedUpazilla, setSelectedUpazilla] = useState<any>(null);

  const [unions, setUnions] = useState<any[]>([]);
  const [selectedUnion, setSelectedUnion] = useState<any>(null);

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

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,

        username: item.username,
        password: item.password,
        email: item.email,
        address: item.address,

        altContactNumber: item.altContactNumber,
        contactNumber: item.contactNumber,
        districtId: item.districtId,
        divisionId: item.divisionId,
        upazillaId: item.upazillaId,
        unionId: item.unionId,
        contactPerson: item.contactPerson,
        nidNo: item.nidNo,
        salesDistributionCommission: item.salesDistributionCommission,
        wsdCommission: item.wsdCommission,
        bankName: item.bankName,
        bankAccountNumber: item.bankAccountNumber,
        bkashNumber: item.bkashNumber,
        nagadNumber: item.nagadNumber,
        bankAccountName: item.bankAccountName,
        bankBranchName: item.bankBranchName,
        bankRoutingNumber: item.bankRoutingNumber,
        bankAccountCode: item.bankAccountCode
      });

      setSelectedDivision(item.divisionId);
      setSelectedDistrict(item.districtId);
      setSelectedUpazilla(item.upazillaId);
      setSelectedUnion(item.unionId);
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

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
        salesDistributionCommission,
        wsdCommission,
        bankName,
        bankAccountNumber,
        bkashNumber,
        nagadNumber,
        bankAccountName,
        bankBranchName,
        bankRoutingNumber,
        bankAccountCode
      } = data;

      const formData = {
        id: item.id,
        partnerType: "zone",
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
        wsdCommission: wsdCommission,
        bankName: bankName,
        bankAccountNumber: bankAccountNumber,
        bkashNumber: bkashNumber,
        nagadNumber: nagadNumber,
        bankAccountName: bankAccountName,
        bankBranchName: bankBranchName,
        bankRoutingNumber: bankRoutingNumber,
        bankAccountCode: bankAccountCode,

        isActive: isActive
      };

      try {
        await axios
          .put("/api/partner/update", formData)
          .then(res => {
            // console.log(res);
            const { data } = res;

            if (data.status === 200) {
              MySwal.fire({
                title: "Success",
                text: data.message || "Updated successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/zone/zone-in-charge");
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
            salesDistributionCommission: "",
            wsdCommission: "",
            bankName: "",
            bankAccountNumber: "",
            bkashNumber: "",
            nagadNumber: "",
            bankAccountName: "",
            bankBranchName: "",
            bankRoutingNumber: "",
            bankAccountCode: ""
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
              {/* username */}
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
                    pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                    message:
                      "Only letters, numbers, underscores and hyphens allowed"
                  }
                ]}
              >
                <Input
                  disabled
                  type="text"
                  addonBefore={
                    <span
                      style={{ backgroundColor: "#cfcdca", color: "black" }}
                    >
                      {authUser ? authUser.clientPrefix + "_" : "Not Available"}
                    </span>
                  }
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
              {/* name */}
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
              {/* email */}
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
              {/* contact Person */}
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
              {/* contactNumber */}
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
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
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
                  name="altContactNumber"
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
              {/* nidNo */}
              <Form.Item
                name="nidNo"
                label="NID No"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
              >
                <Input
                  type="text"
                  placeholder="NID No"
                  className={`form-control`}
                  name="nidNo"
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
              {/* salesDistributionCommission */}
              <Form.Item
                name="salesDistributionCommission"
                label="S&D Commission (%)"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
              >
                <Input
                  type="text"
                  placeholder="S&D Commission (%)"
                  className={`form-control`}
                  name="salesDistributionCommission"
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
              {/* divisionId */}
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
              {/* districtId */}
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

            {/* upazillaId*/}
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
                    placeholder="Please select"
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

            {/* unionId*/}
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
            >
              <Form.Item
                label="BKash Number"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="bkashNumber"
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
                  name="bkashNumber"
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

export default EditZoneForm;
