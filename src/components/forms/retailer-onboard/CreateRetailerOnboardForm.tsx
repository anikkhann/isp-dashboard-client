/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

// import AppImageLoader from "@/components/loader/AppImageLoader";
import { useAppSelector } from "@/store/hooks";

interface FromData {
  name: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  altContactNumber: string;
  nidNo: string;
  wsdCommission: string;
  bkashNumber: string;
  nagadNumber: string;
  latitude: string;
  longitude: string;
  tsoComment: string;
}

const CreateRetailerOnboardForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const authUser = useAppSelector(state => state.auth.user);

  const [subZones, setSubZones] = useState<any[]>([]);
  const [selectedSubZone, setSelectedSubZone] = useState<any>(null);

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [unions, setUnions] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazilla, setSelectedUpazilla] = useState(null);
  const [selectedUnion, setSelectedUnion] = useState(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  function getSubZoneManagers() {
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
        partnerType: "reseller",
        client: {
          id: authUser?.partnerId
        },
        isActive: true
      }
    };

    axios.post("/api/partner/get-list", body).then(res => {
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

      setSubZones(list);
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

  useEffect(() => {
    getSubZoneManagers();
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

  const handleSubZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ subZoneManagerId: value });
    setSelectedSubZone(value as any);
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

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FromData) => {
    setLoading(true);
    setTimeout(async () => {
      const {
        name,
        address,
        contactPerson,
        contactNumber,
        altContactNumber,
        nidNo,
        wsdCommission,
        bkashNumber,
        nagadNumber,
        latitude,
        longitude,
        tsoComment
      } = data;

      const formData = {
        name: name,
        address: address,
        contactPerson: contactPerson,
        contactNumber: contactNumber,
        altContactNumber: altContactNumber,
        nidNo: nidNo,
        wsdCommission: wsdCommission,
        divisionId: selectedDivision,
        districtId: selectedDistrict,
        upazillaId: selectedUpazilla,
        unionId: selectedUnion,
        subZoneManagerId: selectedSubZone,
        bkashNumber: bkashNumber,
        nagadNumber: nagadNumber,
        latitude: latitude,
        longitude: longitude,
        tsoComment: tsoComment
      };
      try {
        await axios
          .post("/api-hotspot/retailer-on-board/create", formData)
          .then(res => {
            const { data } = res;

            if (data.status != 200) {
              MySwal.fire({
                title: "Error",
                text: data.message || "Something went wrong",
                icon: "error"
              });
            }

            if (data.status == 200) {
              MySwal.fire({
                title: "Success",
                text: data.message || "Created successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/hotspot/retailer-onboard");
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
      <>
        <div className="mt-3">
          <Form
            // {...layout}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{
              wsdCommission: 0
            }}
            style={{ maxWidth: "100%" }}
            name="wrap"
            colon={false}
            scrollToFirstError
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* subZoneManagerId */}
                <Form.Item
                  label="SubZone Manager"
                  name="subZoneManagerId"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select"
                      onChange={handleSubZoneChange}
                      options={subZones}
                      value={selectedSubZone}
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
                {/* name */}
                <Form.Item
                  label="Customer Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input customer name!"
                    }
                  ]}
                >
                  <Input
                    placeholder="Customer Name"
                    className={`form-control`}
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
                {/* contactPerson */}
                <Form.Item
                  label="Contact Person"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="contactPerson"
                  rules={[
                    {
                      required: true,
                      message: "Please input Contact Person!"
                    }
                  ]}
                >
                  <Input placeholder="Contact Person" />
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
                  label="Address"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input address!"
                    }
                  ]}
                >
                  <Input placeholder="Address" />
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
                  label="Contact No"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="contactNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input Contact No!"
                    }
                  ]}
                >
                  <Input placeholder="Contact No" />
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
                  label="Alt Contact Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="altContactNumber"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input Alt Contact Number!"
                  //   }
                  // ]}
                >
                  <Input placeholder="Alt Contact Number" />
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
                    marginRight: "10px",
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select Division!"
                    }
                  ]}
                  name="divisionId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
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
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select District!"
                    }
                  ]}
                  name="districtId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
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
                {/* nidNo */}
                <Form.Item
                  label="NID No"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="nidNo"
                  rules={[
                    {
                      required: true,
                      message: "Please input NID No!"
                    }
                  ]}
                >
                  <Input placeholder="NID No" />
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
                {/* wsdCommission */}
                <Form.Item
                  label="WSD Commission (%)"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="wsdCommission"
                  rules={[
                    {
                      required: true,
                      message: "Please input WSD Commission (%!"
                    }
                  ]}
                >
                  <Input placeholder="WSD Commission (%" />
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
                {/* bkashNumber */}
                <Form.Item
                  label="Bkash Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="bkashNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input Bkash Number!"
                    }
                  ]}
                >
                  <Input placeholder="Bkash Number" />
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
                {/* nagadNumber */}
                <Form.Item
                  label="Nagad Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="nagadNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input Nagad Number!"
                    }
                  ]}
                >
                  <Input placeholder="Nagad Number" />
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
                {/* latitude */}
                <Form.Item
                  label="Latitude"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="latitude"
                  rules={[
                    {
                      required: true,
                      message: "Please input Latitude!"
                    }
                  ]}
                >
                  <Input placeholder="Latitude" />
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
                {/* longitude */}
                <Form.Item
                  label="Longitude"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="longitude"
                  rules={[
                    {
                      required: true,
                      message: "Please input Longitude!"
                    }
                  ]}
                >
                  <Input placeholder="Longitude" />
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
                {/* tsoComment */}
                <Form.Item
                  label="TSO Comment"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="tsoComment"
                  rules={[
                    {
                      required: true,
                      message: "Please input tsoComment!"
                    }
                  ]}
                >
                  <Input placeholder="TSO Comment" />
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
                <Form.Item style={{ margin: "0 8px" }}>
                  <div style={{ marginTop: 24 }}>
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
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default CreateRetailerOnboardForm;
