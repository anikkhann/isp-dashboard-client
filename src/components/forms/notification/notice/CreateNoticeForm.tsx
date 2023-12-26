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
  Row,
  Col,
  DatePicker,
  Space,
  Select
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";

import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import dayjs from "dayjs";
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

const noticeTypes = [
  {
    label: "for_all",
    value: "for_all"
  },
  {
    label: "client_specific",
    value: "client_specific"
  },
  {
    label: "zone_manager_specific",
    value: "zone_manager_specific"
  },
  {
    label: "sub_zone_manager_specific",
    value: "sub_zone_manager_specific"
  },
  {
    label: "retailer_specific",
    value: "retailer_specific"
  },
  {
    label: "package_specific",
    value: "package_specific"
  },
  {
    label: "customer_specific",
    value: "customer_specific"
  }
];

// if noticeType = "for_all" hide below input
// if noticeType = "client_specific" then clientId is required
// if noticeType = "zone_manager_specific" then clientId, zoneManagerId is required
// if noticeType = "sub_zone_manager_specific" then clientId, subZoneManagerId is required
// if noticeType = "retailer_specific" then clientId, subZoneManagerId, retailerId is required
// if noticeType = "package_specific" then clientId, customerPackageId is required
// if noticeType = "customer_specific" then clientId, customerId is required

const CreateNoticeForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

  const [selectedNoticeType, setSelectedNoticeType] = useState<any>(null);

  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);

  const [subZones, setSubZones] = useState([]);
  const [selectedSubZone, setSelectedSubZone] = useState(null);

  const [retailers, setRetailers] = useState([]);
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const [customerPackages, setCustomerPackages] = useState([]);
  const [selectedCustomerPackage, setSelectedCustomerPackage] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [value, setValue] = useState("");

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  function getClients() {
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
        partnerType: "client",
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

      setClients(list);
    });
  }

  function getZoneManagers(selectedClient: string) {
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
          id: selectedClient
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

  function getSubZoneManagers(selectedClient: any, selectedZoneId: any) {
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
          id: selectedClient
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

  const getCustomerPackages = (selectedClient: any) => {
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
        client: {
          id: selectedClient
        },
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

  function getRetailers(selectedSubZone: any) {
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
        subZoneManager: { id: selectedSubZone },
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

  function getCustomers(
    clientParam: any,
    packageParam: any,
    zoneParam: any,
    subZoneParam: any,
    retailerParam: any
  ) {
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
        client: {
          id: clientParam
        },
        customerPackage: {
          id: packageParam
        },
        zoneManager: {
          id: zoneParam
        },
        subZoneManager: {
          id: subZoneParam
        },
        retailer: {
          id: retailerParam
        },
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

  useEffect(() => {
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedClient) {
      getZoneManagers(selectedClient);
      getCustomerPackages(selectedClient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClient]);

  useEffect(() => {
    if (selectedZone) {
      getSubZoneManagers(selectedClient, selectedZone);
    }
  }, [selectedZone]);

  useEffect(() => {
    if (selectedSubZone) {
      getRetailers(selectedSubZone);
    }
  }, [selectedSubZone]);

  useEffect(() => {
    getCustomers(
      selectedClient,
      selectedCustomerPackage,
      selectedZone,
      selectedSubZone,
      selectedRetailer
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedClient,
    selectedCustomerPackage,
    selectedZone,
    selectedSubZone,
    selectedRetailer
  ]);

  const handleClientChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedClient(value);
    form.setFieldsValue({
      clientId: value
    });
  };

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedZone(value);
    form.setFieldsValue({
      zoneManagerId: value
    });
  };

  const handleSubZoneChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedSubZone(value);
    form.setFieldsValue({
      subZoneManagerId: value
    });
  };

  const handleRetailerChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedRetailer(value);
    form.setFieldsValue({
      retailerId: value
    });
  };

  const handleCustomerPackageChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedCustomerPackage(value);
    form.setFieldsValue({
      customerPackageId: value
    });
  };

  const handleCustomerChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedCustomer(value);
    form.setFieldsValue({
      customerId: value
    });
  };

  const handleNoticeTypeChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedNoticeType(value);
    form.setFieldsValue({
      noticeType: value
    });
  };

  const handleStartDateChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedStartDate(value);
    form.setFieldsValue({
      startDate: value
    });
  };

  const handleEndDateChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedEndDate(value);
    form.setFieldsValue({
      endDate: value
    });
  };

  const handleMessageChange = (value: any) => {
    // console.log("checked = ", value);
    setValue(value);
    form.setFieldsValue({
      message: value
    });
  };

  const onSubmit = () => {
    setLoading(true);

    const formData = {
      noticeType: selectedNoticeType,
      clientId: selectedClient,
      zoneManagerId: selectedZone,
      subZoneManagerId: selectedSubZone,
      retailerId: selectedRetailer,
      customerPackageId: selectedCustomerPackage,
      customerId: selectedCustomer,
      message: value,
      startDate: selectedStartDate
        ? dayjs(selectedStartDate).format("Y-m-d")
        : null,
      endDate: selectedEndDate ? dayjs(selectedEndDate).format("Y-m-d") : null,
      isActive: isActive
    };

    try {
      axios
        .post("/api/notice-board/create", formData)
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
              router.replace("/admin/notification/notice");
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
            initialValues={{}}
            style={{ maxWidth: "100%" }}
            name="wrap"
            colon={false}
            scrollToFirstError
          >
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              justify="space-between"
            >
              {/* noticeType */}
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
                  label="Notice Type"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="noticeType"
                  rules={[
                    {
                      required: true,
                      message: "Please select Notice Type!"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Notice Type"
                    onChange={handleNoticeTypeChange}
                    options={noticeTypes}
                    value={selectedNoticeType}
                  />
                </Form.Item>
              </Col>

              {/* clientId */}
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
                  label="Client"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="clientId"
                  rules={[
                    {
                      required:
                        selectedNoticeType == "client_specific" ||
                        selectedNoticeType == "zone_manager_specific" ||
                        selectedNoticeType == "sub_zone_manager_specific" ||
                        selectedNoticeType == "retailer_specific" ||
                        selectedNoticeType == "package_specific" ||
                        selectedNoticeType == "customer_specific"
                          ? true
                          : false,
                      message: "Please select Client!"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Client"
                    onChange={handleClientChange}
                    options={clients}
                    value={selectedClient}
                  />
                </Form.Item>
              </Col>

              {/* zoneManagerId */}
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
                  label="Zone Manager"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="zoneManagerId"
                  rules={[
                    {
                      required:
                        selectedNoticeType == "zone_manager_specific" ||
                        selectedNoticeType == "sub_zone_manager_specific" ||
                        selectedNoticeType == "retailer_specific"
                          ? true
                          : false,
                      message: "Please select Zone Manager!"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Zone Manager"
                    onChange={handleZoneChange}
                    options={zones}
                    value={selectedZone}
                  />
                </Form.Item>
              </Col>

              {/* subZoneManagerId */}
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
                  label="Sub Zone Manager"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="subZoneManagerId"
                  rules={[
                    {
                      required:
                        selectedNoticeType == "sub_zone_manager_specific" ||
                        selectedNoticeType == "retailer_specific"
                          ? true
                          : false,
                      message: "Please select Sub Zone Manager!"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Sub Zone Manager"
                    onChange={handleSubZoneChange}
                    options={subZones}
                    value={selectedSubZone}
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
                <Form.Item
                  label="Retailer"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="retailerId"
                  rules={[
                    {
                      required:
                        selectedNoticeType == "retailer_specific"
                          ? true
                          : false,
                      message: "Please select Retailer!"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Retailer"
                    onChange={handleRetailerChange}
                    options={retailers}
                    value={selectedRetailer}
                  />
                </Form.Item>
              </Col>

              {/* customerPackageId */}
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
                  rules={[
                    {
                      required:
                        selectedNoticeType == "package_specific" ? true : false,
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
                {/* customerId */}
                <Form.Item
                  label="Customer"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required:
                        selectedNoticeType == "customer_specific"
                          ? true
                          : false,
                      message: "Please select Customer!"
                    }
                  ]}
                  name="customerId"
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Customer"
                      onChange={handleCustomerChange}
                      options={customers}
                      value={selectedCustomer}
                    />
                  </Space>
                </Form.Item>
              </Col>
            </Row>

            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              justify="space-between"
            >
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                className="gutter-row"
              >
                {/* message */}
                <Form.Item
                  label="message"
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
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={handleMessageChange}
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
                {/* startDate */}
                <Form.Item
                  label="startDate"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="startDate"
                  rules={[
                    {
                      required: true,
                      message: "Please input your startDate!"
                    }
                  ]}
                >
                  <DatePicker
                    className={`form-control`}
                    style={{
                      padding: "6px",
                      width: "100%"
                    }}
                    format={dateFormat}
                    onChange={handleStartDateChange}
                    value={selectedStartDate}
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
                {/* endDate */}
                <Form.Item
                  label="endDate"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="endDate"
                  rules={[
                    {
                      required: true,
                      message: "Please input your endDate!"
                    }
                  ]}
                >
                  <DatePicker
                    className={`form-control`}
                    style={{
                      padding: "6px",
                      width: "100%"
                    }}
                    format={dateFormat}
                    onChange={handleEndDateChange}
                    value={selectedEndDate}
                  />
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

export default CreateNoticeForm;
