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
  Input,
  Row,
  Col,
  Space,
  Select,
  Switch
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";
import { useAppSelector } from "@/store/hooks";
interface FormData {
  subject: string;
  message: string;
}

const customerStatuses = [
  {
    label: "active",
    value: "active"
  },
  {
    label: "inactive",
    value: "inactive"
  },
  {
    label: "all",
    value: "all"
  }
];

const subscriptionStatuses = [
  {
    label: "registered",
    value: "registered"
  },
  {
    label: "expired",
    value: "expired"
  },
  {
    label: "all",
    value: "all"
  }
];

const CreateBulkSmsForm = () => {
  const [form] = Form.useForm();
  const authUser = useAppSelector(state => state.auth.user);

  const [loading, setLoading] = useState(false);

  const [useTemplate, setUseTemplate] = useState(false);
  const [templateList, setTemplateList] = useState([]);

  const [templateData, setTemplateData] = useState<any>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [selectedCustomerStatus, setSelectedCustomerStatus] = useState(null);

  const [selectedSubscriptionStatus, setSelectedSubscriptionStatus] =
    useState(null);

  const [distributionZones, setDistributionZones] = useState([]);
  const [distributionPops, setDistributionPops] = useState([]);

  const [selectedDistributionZone, setSelectedDistributionZone] =
    useState(null);
  const [selectedDistributionPop, setSelectedDistributionPop] = useState(null);

  const [customerPackages, setCustomerPackages] = useState([]);
  const [selectedCustomerPackage, setSelectedCustomerPackage] = useState(null);

  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);

  const [subZones, setSubZones] = useState([]);
  const [selectedSubZone, setSelectedSubZone] = useState(null);

  const [retailers, setRetailers] = useState([]);
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const changeTemplate = () => {
    setUseTemplate(!useTemplate);
  };

  const handleTemplateChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedTemplate(value as any);

    if (value) {
      const template = templateData.find((item: any) => item.id == value);

      form.setFieldsValue({ subject: template.subject });
      form.setFieldsValue({ message: template.template });
    } else {
      form.setFieldsValue({ subject: "" });
      form.setFieldsValue({ message: "" });
    }
  };

  function getTemplatesList() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "subject"
          }
        ]
      },
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        isActive: true
      }
    };
    axios.post("/api/client-sms-template/get-list", body).then(res => {
      const { data } = res;
      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;
      // console.log(data.body)

      setTemplateData(data.body);

      const list = data.body.map((item: any) => {
        return {
          label: item.subject,
          value: item.id
        };
      });
      setTemplateList(list);
    });
  }

  useEffect(() => {
    getTemplatesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCustomerStatusChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerStatus: value });
    setSelectedCustomerStatus(value as any);
  };

  const handleSubscriptionStatusChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ subscriptionStatus: value });
    setSelectedSubscriptionStatus(value as any);
  };

  const handleDistributionZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ distributionZoneId: value });
    setSelectedDistributionZone(value as any);

    if (!value) {
      setSelectedDistributionPop(null);
      setDistributionPops([]);
    }
  };

  const handleDistributionPopChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ distributionPopId: value });
    setSelectedDistributionPop(value as any);
  };

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ zoneManagerId: value });
    setSelectedZone(value as any);
  };

  const handleSubZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ subZoneManagerId: value });
    setSelectedSubZone(value as any);
  };

  const handleRetailerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ retailerId: value });
    setSelectedRetailer(value as any);
  };

  const handleCustomerPackageChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerPackageId: value });
    setSelectedCustomerPackage(value as any);
  };

  function getDistributionZones() {
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

    axios.post("/api/distribution-zone/get-list", body).then(res => {
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
      setDistributionZones(list);
    });
  }

  function getDistributionPops(selectedDistributionZone: string) {
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
        zone: { id: selectedDistributionZone },
        isActive: true
      }
    };

    axios.post("/api/distribution-pop/get-list", body).then(res => {
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
      setDistributionPops(list);
    });
  }

  function getZoneManagers() {
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
        partnerType: "zone",
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

      setZones(list);
    });
  }

  function getSubZoneManagers(selectedZoneId: any) {
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
        zoneManager: { id: selectedZoneId },
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

  function getRetailers() {
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
        partnerType: "retailer",
        // subZoneManager: { id: selectedSubZone },
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

      setRetailers(list);
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
    getDistributionZones();
    getCustomerPackages();
    getZoneManagers();

    getSubZoneManagers(null);
    getRetailers();
  }, []);
  // getSubZoneManagers();
  useEffect(() => {
    if (selectedDistributionZone) {
      getDistributionPops(selectedDistributionZone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistributionZone]);

  useEffect(() => {
    if (selectedZone) {
      getSubZoneManagers(selectedZone);
    }
  }, [selectedZone]);

  const onSubmit = (data: FormData) => {
    setLoading(true);

    const { subject, message } = data;

    const formData = {
      distributionZoneId: selectedDistributionZone,
      distributionPopId: selectedDistributionPop,
      zoneManagerId: selectedZone,
      subZoneManagerId: selectedSubZone,
      retailerId: selectedRetailer,
      customerPackageId: selectedCustomerPackage,
      customerStatus: selectedCustomerStatus,
      subscriptionStatus: selectedSubscriptionStatus,
      subject: subject,
      message: message
    };

    try {
      axios
        .post("/api/bulk-sms/create", formData)
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
              text: data.message || "Added successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/notification/sms/send-sms-bulk");
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
        <div className="mt-3">
          <Form
            // {...layout}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{
              mobileNo: "",
              subject: "",
              message: ""
            }}
            style={{ maxWidth: "100%" }}
            name="wrap"
            colon={false}
            scrollToFirstError
          >
            <Row
              justify="space-between"
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
                style={{ textAlign: "left" }}
              >
                <Form.Item name="template" label="Use Template">
                  <Switch checked={useTemplate} onChange={changeTemplate} />
                </Form.Item>
              </Col>
              {useTemplate && (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  className="gutter-row"
                >
                  <Form.Item
                    label="Templates"
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
                        onChange={handleTemplateChange}
                        options={templateList}
                        value={selectedTemplate}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              )}
            </Row>

            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              justify="space-between"
            >
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* distributionZoneId */}
                <Form.Item
                  label="Distribution Zone"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="distributionZoneId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
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
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* distributionPopId */}
                <Form.Item
                  label="Distribution Pop"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="distributionPopId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Distribution Pop"
                      onChange={handleDistributionPopChange}
                      options={distributionPops}
                      value={selectedDistributionPop}
                    />
                  </Space>
                </Form.Item>
              </Col>

              {authUser && authUser.userType == "client" && (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  className="gutter-row"
                >
                  {/* zoneManagerId */}
                  <Form.Item
                    label="Zone Manager"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="zoneManagerId"
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select"
                        onChange={handleZoneChange}
                        options={zones}
                        value={selectedZone}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              )}

              {authUser &&
                (authUser.userType == "client" ||
                  authUser.userType == "zone") && (
                  <Col
                    xs={24}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    className="gutter-row"
                  >
                    {/* subZoneManagerId */}
                    <Form.Item
                      label="SubZone Manager"
                      style={{
                        marginBottom: 0,
                        fontWeight: "bold"
                      }}
                      name="subZoneManagerId"
                    >
                      <Space style={{ width: "100%" }} direction="vertical">
                        <Select
                          allowClear
                          style={{ width: "100%", textAlign: "start" }}
                          placeholder="Please select"
                          onChange={handleSubZoneChange}
                          options={subZones}
                          value={selectedSubZone}
                        />
                      </Space>
                    </Form.Item>
                  </Col>
                )}

              {authUser && authUser.userType == "subZone" && (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  className="gutter-row"
                >
                  {/* retailerId */}
                  <Form.Item
                    label="Retailer"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="retailerId"
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select"
                        onChange={handleRetailerChange}
                        options={retailers}
                        value={selectedRetailer}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              )}
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* customerPackageId */}
                <Form.Item
                  label="Customer Package"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
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
                    />
                  </Space>
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* customerStatus */}
                <Form.Item
                  label="Customer Status"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select Customer Status!"
                    }
                  ]}
                  name="customerStatus"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Customer Status"
                      onChange={handleCustomerStatusChange}
                      options={customerStatuses}
                      value={selectedCustomerStatus}
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
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* subscriptionStatus */}
                <Form.Item
                  label="Subscription Status"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="subscriptionStatus"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Customer Status"
                      onChange={handleSubscriptionStatusChange}
                      options={subscriptionStatuses}
                      value={selectedSubscriptionStatus}
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
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* subject */}
                <Form.Item
                  label="Subject"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="subject"
                  rules={[
                    {
                      required: true,
                      message: "Please input your subject!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="subject"
                    className={`form-control`}
                    name="subject"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* message */}
                <Form.Item
                  label="Message"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please input your message!"
                    }
                  ]}
                >
                  <Input.TextArea
                    placeholder="message"
                    className={`form-control`}
                    name="message"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
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

export default CreateBulkSmsForm;
