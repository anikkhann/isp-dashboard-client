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
  Input,
  Select,
  Space,
  Row,
  Col,
  TimePicker
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import AppImageLoader from "@/components/loader/AppImageLoader";

const statuses = [
  {
    label: "yes",
    value: true
  },
  {
    label: "no",
    value: false
  }
];

interface FromData {
  oltPower: string | undefined;
  illegalHotspotDetails: string | undefined;
  bwCongestionFrom: string | undefined;
  bwCongestionTo: string | undefined;
  gamingLatency: string | undefined;
  tiktokLatency: string | undefined;
  youtubeLatency: string | undefined;
  facebookLatency: string | undefined;
  totalComplaints: string | undefined;

  competitorInfoLine: CompetitorInfoLineProps[];
  proActiveCallingInfoLine: ProActiveCallingInfoLineDataProps[];
}

interface ProActiveCallingInfoLineDataProps {
  customerId: string | undefined;
  status: string | undefined;
  note: string | undefined;
}

interface CompetitorInfoLineProps {
  divisionId: string | undefined;
  districtId: string | undefined;
  upazillaId: string | undefined;
  unionId: string | undefined;
  village: string | undefined;
  provider: string | undefined;
  totalCustomer: string | undefined;
  isHotspot: boolean | undefined;
  totalHotspot: string | undefined;
}

const CreateDailyTaskForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [illegalHotspot, setIllegalHotspot] = useState<boolean>(false);

  const [bwCongestion, setBwCongestion] = useState<boolean>(false);

  const [customers, setCustomers] = useState<any[]>([]);

  const [divisions, setDivisions] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [upazillas, setUpazillas] = useState<any[]>([]);
  const [unions, setUnions] = useState<any[]>([]);
  console.log(unions);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazilla, setSelectedUpazilla] = useState(null);
  // const [selectedUnions, setSelectedUnions] = useState(null);

  const [competitorInfoLineValues, setcompetitorInfoLineValues] = useState<
    CompetitorInfoLineProps[]
  >([]);
  const [
    proActiveCallingInfoLineDataPropsValues,
    setProActiveCallingInfoLineDataPropsValues
  ] = useState<ProActiveCallingInfoLineDataProps[]>([]);

  const [previous, setPrevious] = useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleIllegalHotspotChange = (value: any) => {
    setIllegalHotspot(value);
    form.setFieldsValue({ illegalHotspot: value });
  };

  const handleBwCongestionChange = (value: any) => {
    setBwCongestion(value);
    form.setFieldsValue({ bwCongestion: value });
    form.setFieldsValue({
      bwCongestionFrom: undefined,
      bwCongestionTo: undefined
    });
  };

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
      },
      body: {
        isActive: true
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
            order: "desc",
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
            order: "desc",
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

  const handleCustomerIdChange = (value: any, key: number) => {
    form.setFieldsValue({
      [`proActiveCallingInfoLine[${key}].customerId`]: value
    });

    if (value) {
      const newProActiveCallingInfoLineDataPropsValues = [
        ...proActiveCallingInfoLineDataPropsValues
      ];
      newProActiveCallingInfoLineDataPropsValues[key] = {
        ...newProActiveCallingInfoLineDataPropsValues[key],
        customerId: value
      };
      setProActiveCallingInfoLineDataPropsValues(
        newProActiveCallingInfoLineDataPropsValues
      );
    }
  };

  const handleStatusChange = (value: any, key: number) => {
    form.setFieldsValue({
      [`proActiveCallingInfoLine[${key}].status`]: value
    });

    if (value) {
      const newProActiveCallingInfoLineDataPropsValues = [
        ...proActiveCallingInfoLineDataPropsValues
      ];
      newProActiveCallingInfoLineDataPropsValues[key] = {
        ...newProActiveCallingInfoLineDataPropsValues[key],
        status: value
      };
      setProActiveCallingInfoLineDataPropsValues(
        newProActiveCallingInfoLineDataPropsValues
      );
    }
  };

  const handleDivisionChange = (value: any, key: number) => {
    form.setFieldsValue({
      [`competitorInfoLine[${key}].divisionId`]: value
    });
    setSelectedDivision(value as any);
    if (value) {
      const newCompetitorInfoLineValues = [...competitorInfoLineValues];
      newCompetitorInfoLineValues[key] = {
        ...newCompetitorInfoLineValues[key],
        divisionId: value
      };
      setcompetitorInfoLineValues(newCompetitorInfoLineValues);
    }
  };

  const handleDistrictChange = (value: any, key: number) => {
    form.setFieldsValue({
      [`competitorInfoLine[${key}].districtId`]: value
    });
    setSelectedDistrict(value as any);
    if (value) {
      const newCompetitorInfoLineValues = [...competitorInfoLineValues];
      newCompetitorInfoLineValues[key] = {
        ...newCompetitorInfoLineValues[key],
        districtId: value
      };
      setcompetitorInfoLineValues(newCompetitorInfoLineValues);
    }
  };

  const handleUpazillaChange = (value: any, key: number) => {
    form.setFieldsValue({
      [`competitorInfoLine[${key}].upazillaId`]: value
    });
    setSelectedUpazilla(value as any);
    if (value) {
      const newCompetitorInfoLineValues = [...competitorInfoLineValues];
      newCompetitorInfoLineValues[key] = {
        ...newCompetitorInfoLineValues[key],
        upazillaId: value
      };
      setcompetitorInfoLineValues(newCompetitorInfoLineValues);
    }
  };

  const handleUnionChange = (value: any, key: number) => {
    form.setFieldsValue({
      [`competitorInfoLine[${key}].unionId`]: value
    });
    // setSelectedUnions(value as any);
    if (value) {
      const newCompetitorInfoLineValues = [...competitorInfoLineValues];
      newCompetitorInfoLineValues[key] = {
        ...newCompetitorInfoLineValues[key],
        unionId: value
      };
      setcompetitorInfoLineValues(newCompetitorInfoLineValues);
    }
  };

  const getPreviousData = async () => {
    try {
      const res = await axios.get(`/api/reseller-daily-report/get-todays-data`);
      const { data } = res;

      if (data.status == 200) {
        setPrevious(data.body);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPreviousData();
    getDivisions();
    // getDistricts();
    // getUpazillas();
    // getUnions();
    getCustomers();
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

  const onSubmit = (data: FromData) => {
    setLoading(true);
    const {
      oltPower,
      illegalHotspotDetails,
      bwCongestionFrom,
      bwCongestionTo,
      gamingLatency,
      tiktokLatency,
      youtubeLatency,
      facebookLatency,
      totalComplaints,

      competitorInfoLine,
      proActiveCallingInfoLine
    } = data;

    const formData = {
      id: previous?.id,
      oltPower: oltPower,
      illegalHotspot: illegalHotspot,
      illegalHotspotDetails: illegalHotspotDetails,

      bwCongestion: bwCongestion,
      bwCongestionFrom: bwCongestionFrom,
      bwCongestionTo: bwCongestionTo,
      gamingLatency: gamingLatency,
      tiktokLatency: tiktokLatency,
      youtubeLatency: youtubeLatency,
      facebookLatency: facebookLatency,
      totalComplaints: totalComplaints,
      competitorInfoLine: competitorInfoLine,
      proActiveCallingInfoLine: proActiveCallingInfoLine
    };

    try {
      axios
        .post("/api/reseller-daily-report/submit-report", formData)
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
              router.replace("/admin/sub-zone/daily-task");
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
        <>
          <div className="mt-3">
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
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* oltPower */}
                  <Form.Item
                    label="OLT Power"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="oltPower"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input oltPower!"
                    //   }
                    // ]}
                  >
                    <Input placeholder="OLT Power" className={`form-control`} />
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
                  {/* illegalHotspot */}
                  <Form.Item
                    label="Illegal Hotspot"
                    name="illegalHotspot"
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
                        onChange={handleIllegalHotspotChange}
                        options={statuses}
                        value={illegalHotspot}
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

                {illegalHotspot == true && (
                  <Col xs={12} className="gutter-row">
                    {/* illegalHotspotDetails */}
                    <Form.Item
                      label="Illegal Hotspot Details"
                      style={{
                        marginBottom: 0,
                        fontWeight: "bold"
                      }}
                      name="illegalHotspotDetails"
                      rules={[
                        {
                          required: true,
                          message: "Please input Illegal Hotspot Details!"
                        }
                      ]}
                    >
                      <Input placeholder="Illegal Hotspot Details" />
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
                >
                  {/* bwCongestion */}
                  <Form.Item
                    label="BW Congestion"
                    name="bwCongestion"
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
                        onChange={handleBwCongestionChange}
                        options={statuses}
                        value={bwCongestion}
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

                {bwCongestion == true && (
                  <>
                    <Col xs={12} className="gutter-row">
                      {/* bwCongestionFrom */}
                      <Form.Item
                        label="BW CongestionFrom"
                        style={{
                          marginBottom: 0,
                          fontWeight: "bold"
                        }}
                        name="bwCongestionFrom"
                        rules={[
                          {
                            required: true,
                            message: "Please input BW Congestion From!"
                          }
                        ]}
                      >
                        <TimePicker
                          style={{ width: "100%" }}
                          format="HH:mm:ss"
                          placeholder="Select Time"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={12} className="gutter-row">
                      {/* bwCongestionTo */}
                      <Form.Item
                        label="BW Congestion To"
                        style={{
                          marginBottom: 0,
                          fontWeight: "bold"
                        }}
                        name="bwCongestionTo"
                        rules={[
                          {
                            required: true,
                            message: "Please input BW Congestion To!"
                          }
                        ]}
                      >
                        <TimePicker
                          style={{ width: "100%" }}
                          format="HH:mm:ss"
                          placeholder="Select Time"
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}

                <Col xs={12} className="gutter-row">
                  {/* gamingLatency */}
                  <Form.Item
                    label="Gaming Latency"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="gamingLatency"
                    rules={[
                      {
                        required: true,
                        message: "Please input Gaming Latency!"
                      }
                    ]}
                  >
                    <Input placeholder="Gaming Latency" />
                  </Form.Item>
                </Col>
                <Col xs={12} className="gutter-row">
                  {/* tiktokLatency */}
                  <Form.Item
                    label="Tiktok Latency"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="tiktokLatency"
                    rules={[
                      {
                        required: true,
                        message: "Please input Tiktok Latency!"
                      }
                    ]}
                  >
                    <Input placeholder="Tiktok Latency" />
                  </Form.Item>
                </Col>
                <Col xs={12} className="gutter-row">
                  {/* youtubeLatency */}
                  <Form.Item
                    label="Youtube Latency"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="youtubeLatency"
                    rules={[
                      {
                        required: true,
                        message: "Please input Youtube Latency!"
                      }
                    ]}
                  >
                    <Input placeholder="Youtube Latency" />
                  </Form.Item>
                </Col>
                <Col xs={12} className="gutter-row">
                  {/* facebookLatency */}
                  <Form.Item
                    label="Facebook Latency"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="facebookLatency"
                    rules={[
                      {
                        required: true,
                        message: "Please input Facebook Latency!"
                      }
                    ]}
                  >
                    <Input placeholder="Facebook Latency" />
                  </Form.Item>
                </Col>
                <Col xs={12} className="gutter-row">
                  {/* totalComplaints */}
                  <Form.Item
                    label="Total Complaints"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="totalComplaints"
                    rules={[
                      {
                        required: true,
                        message: "Please input Total Complaints!"
                      }
                    ]}
                  >
                    <Input placeholder="Total Complaints" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col>
                  <Form.List name="proActiveCallingInfoLine">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            {/* customerId */}
                            <Form.Item
                              label="Customer"
                              style={{
                                marginBottom: 0,
                                marginRight: "0px",
                                fontWeight: "bold"
                              }}
                              name="customerId"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select Customer!"
                                }
                              ]}
                            >
                              <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                              >
                                <Select
                                  allowClear
                                  style={{ width: "100%", textAlign: "start" }}
                                  placeholder="Please select Customer"
                                  onChange={value =>
                                    handleCustomerIdChange(value, key)
                                  }
                                  options={customers}
                                />
                              </Space>
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              label="Status"
                              name={[name, "status"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                              style={{ marginBottom: 0, fontWeight: "bold" }}
                            >
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select"
                                onChange={value =>
                                  handleStatusChange(value, key)
                                }
                                options={statuses}
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
                            </Form.Item>

                            {/* note */}
                            <Form.Item
                              {...restField}
                              label="Note"
                              name={[name, "note"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                              style={{ marginBottom: 0, fontWeight: "bold" }}
                            >
                              <Input placeholder="Note" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add field (Proactive call list)
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col>
                  <Form.List name="competitorInfoLine">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                              overflowX: "auto"
                            }}
                            align="baseline"
                          >
                            {/* divisionId */}
                            <Form.Item
                              label="Division"
                              style={{
                                marginBottom: 0,
                                marginRight: "0px",
                                fontWeight: "bold"
                              }}
                              name="divisionId"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Please select Division!"
                              //   }
                              // ]}
                            >
                              <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                              >
                                <Select
                                  allowClear
                                  style={{
                                    width: "100%",
                                    textAlign: "start"
                                  }}
                                  placeholder="Please select Division"
                                  onChange={value =>
                                    handleDivisionChange(value, key)
                                  }
                                  options={divisions}
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

                            {/* districtId */}
                            <Form.Item
                              label="District"
                              style={{
                                marginBottom: 0,
                                marginRight: "0px",
                                fontWeight: "bold"
                              }}
                              name="districtId"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Please select District!"
                              //   }
                              // ]}
                            >
                              <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                              >
                                <Select
                                  allowClear
                                  style={{
                                    width: "100%",
                                    textAlign: "start"
                                  }}
                                  placeholder="Please select District"
                                  onChange={value =>
                                    handleDistrictChange(value, key)
                                  }
                                  options={districts}
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

                            {/* upazillaId */}
                            <Form.Item
                              label="Upazilla"
                              style={{
                                marginBottom: 0,
                                marginRight: "0px",
                                fontWeight: "bold"
                              }}
                              name="upazillaId"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Please select Upazilla!"
                              //   }
                              // ]}
                            >
                              <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                              >
                                <Select
                                  allowClear
                                  style={{
                                    width: "100%",
                                    textAlign: "start"
                                  }}
                                  placeholder="Please select Upazilla"
                                  onChange={value =>
                                    handleUpazillaChange(value, key)
                                  }
                                  options={upazillas}
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

                            {/* unionId */}
                            <Form.Item
                              label="Union"
                              style={{
                                marginBottom: 0,
                                marginRight: "0px",
                                fontWeight: "bold"
                              }}
                              name="unionId"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Please select Union!"
                              //   }
                              // ]}
                            >
                              <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                              >
                                <Select
                                  allowClear
                                  style={{
                                    width: "100%",
                                    textAlign: "start"
                                  }}
                                  placeholder="Please select Union"
                                  onChange={value =>
                                    handleUnionChange(value, key)
                                  }
                                  options={unions}
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

                            {/* village */}
                            <Form.Item
                              {...restField}
                              label="Village"
                              name={[name, "village"]}
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Please input"
                              //   }
                              // ]}
                              style={{ marginBottom: 0, fontWeight: "bold" }}
                            >
                              <Input placeholder="Village" />
                            </Form.Item>

                            {/* provider */}
                            <Form.Item
                              {...restField}
                              label="Provider"
                              name={[name, "provider"]}
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Please input"
                              //   }
                              // ]}
                              style={{ marginBottom: 0, fontWeight: "bold" }}
                            >
                              <Input placeholder="Provider" />
                            </Form.Item>

                            {/* totalCustomer */}
                            <Form.Item
                              {...restField}
                              label="Total Customer"
                              name={[name, "totalCustomer"]}
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Please input"
                              //   }
                              // ]}
                              style={{ marginBottom: 0, fontWeight: "bold" }}
                            >
                              <Input placeholder="Total Customer" />
                            </Form.Item>

                            {/* totalHotspot */}
                            <Form.Item
                              {...restField}
                              label="Total Hotspot"
                              name={[name, "totalHotspot"]}
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Please input"
                              //   }
                              // ]}
                              style={{ marginBottom: 0, fontWeight: "bold" }}
                            >
                              <Input placeholder="Total Hotspot" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add field (Competitor Info)
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
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
      )}
    </>
  );
};

export default CreateDailyTaskForm;
