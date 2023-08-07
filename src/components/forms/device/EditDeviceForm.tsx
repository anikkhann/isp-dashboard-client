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
  Input,
  Select,
  Space,
  Row,
  Col
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";

interface FormData {
  name: string;
  deviceType: string;
  monitoringType: string;
  location: string;
  secret: string;
  incomingPort: string;
  ip: string;
  totalPort: string;
  mac: string;
  brandName: string;
  oltType: any;
  totalEitherPort: string;
  totalPonPort: string;
  apiPort: string;
  apiUsername: string;
  apiPassword: any;
  snmpPortNo: any;
  snmpVersion: any;
  snmpCommunity: any;
  telnetLoginName: any;
  telnetLoginPassword: string;
  telnetPrivilegedPassword: string;
  telnetPonPortNumber: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const deviceTypeList = [
  {
    label: "NAS",
    value: "NAS"
  },
  {
    label: "Switch",
    value: "Switch"
  },
  {
    label: "Router",
    value: "Router"
  },
  {
    label: "ONU",
    value: "ONU"
  },
  {
    label: "OLT",
    value: "OLT"
  }
];

const monitoringTypesList = [
  {
    label: "API",
    value: "API"
  },
  {
    label: "Telnet",
    value: "Telnet"
  },
  {
    label: "SNMP",
    value: "SNMP"
  }
];

const oltTypesList = [
  {
    label: "EPON",
    value: "EPON"
  },
  {
    label: "GPON",
    value: "GPON"
  },
  {
    label: "XPON",
    value: "XPON"
  }
];

const EditDeviceForm = ({ item }: any) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [selectedDeviceType, setSelectedDeviceType] = useState(null);
  const [selectedMonitoringType, setSelectedMonitoringType] = useState(null);
  const [selectedOltType, setSelectedOltType] = useState(null);

  const [distributionZones, setDistributionZones] = useState<any[]>([]);
  const [selectedDistributionZone, setSelectedDistributionZone] = useState<
    any[]
  >([]);

  const [distributionPops, setDistributionPops] = useState<any[]>([]);
  const [selectedDistributionPop, setSelectedDistributionPop] = useState<any[]>(
    []
  );

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleDeviceTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ deviceType: value });
    setSelectedDeviceType(value as any);
  };

  const handleMonuitoringTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ monitoringType: value });
    setSelectedMonitoringType(value as any);
  };

  const handleOltTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ oltType: value });
    setSelectedOltType(value as any);
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

  function getDistributionZones() {
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
    axios.post("/api/distribution-zone/get-list", body).then(res => {
      // console.log(res);
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
    axios.post("/api/distribution-pop/get-list", body).then(res => {
      // console.log(res);
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

  useEffect(() => {
    getDistributionPops();
    getDistributionZones();
  }, []);

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        deviceType: item.deviceType,
        monitoringType: item.monitoringType,
        location: item.location,
        secret: item.secret,
        incomingPort: item.incomingPort,
        ip: item.ip,
        totalPort: item.totalPort,
        mac: item.mac,
        brandName: item.brandName,
        oltType: item.oltType,
        totalEitherPort: item.totalEitherPort,
        totalPonPort: item.totalPonPort,
        apiPort: item.apiPort,
        apiUsername: item.apiUsername,
        apiPassword: item.apiPassword,
        snmpPortNo: item.snmpPortNo,
        snmpVersion: item.snmpVersion,
        snmpCommunity: item.snmpCommunity,
        telnetLoginName: item.telnetLoginName,
        telnetLoginPassword: item.telnetLoginPassword,
        telnetPrivilegedPassword: item.telnetPrivilegedPassword,
        telnetPonPortNumber: item.telnetPonPortNumber
      });

      setIsActive(item.isActive);
      setSelectedDeviceType(item.deviceType);
      setSelectedMonitoringType(item.monitoringType);
      setSelectedOltType(item.oltType);
      setSelectedDistributionZone(item.distributionZoneId);
      setSelectedDistributionPop(item.distributionPopId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: FormData) => {
    console.log(data);

    const {
      name,
      deviceType,
      monitoringType,
      location,
      secret,
      incomingPort,
      ip,
      totalPort,
      mac,
      brandName,
      oltType,
      totalEitherPort,
      totalPonPort,
      apiPort,
      apiUsername,
      apiPassword,
      snmpPortNo,
      snmpVersion,
      snmpCommunity,
      telnetLoginName,
      telnetLoginPassword,
      telnetPrivilegedPassword,
      telnetPonPortNumber
    } = data;

    const formData = {
      id: item.id,
      name: name,
      distributionZoneId: selectedDistributionZone,
      distributionPopId: selectedDistributionPop,
      deviceType: deviceType,
      monitoringType: monitoringType,
      location: location,
      secret: secret,
      incomingPort: incomingPort,
      ip: ip,
      totalPort: totalPort,
      mac: mac,
      brandName: brandName,
      oltType: oltType,
      totalEitherPort: totalEitherPort,
      totalPonPort: totalPonPort,
      apiPort: apiPort,
      apiUsername: apiUsername,
      apiPassword: apiPassword,
      snmpPortNo: snmpPortNo,
      snmpVersion: snmpVersion,
      snmpCommunity: snmpCommunity,
      telnetLoginName: telnetLoginName,
      telnetLoginPassword: telnetLoginPassword,
      telnetPrivilegedPassword: telnetPrivilegedPassword,
      telnetPonPortNumber: telnetPonPortNumber,
      isActive: isActive
    };

    try {
      axios
        .put("/api/device/update", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status === 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || "Added successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/device/device");
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
            deviceType: "",
            monitoringType: "",
            location: "",
            secret: "",
            incomingPort: "",
            ip: "",
            totalPort: "",
            mac: "",
            brandName: "",
            oltType: "",
            totalEitherPort: "",
            totalPonPort: "",
            apiPort: "",
            apiUsername: "",
            apiPassword: "",
            snmpPortNo: "",
            snmpVersion: "",
            snmpCommunity: "",
            telnetLoginName: "",
            telnetLoginPassword: "",
            telnetPrivilegedPassword: "",
            telnetPonPortNumber: ""
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
              {/* distributionZoneId */}
              <Form.Item
                label="Distribution Zone"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="distributionZoneId"
                rules={[
                  {
                    required: true,
                    message: "Please select Distribution Zone!"
                  }
                ]}
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
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="distributionPopId"
                rules={[
                  {
                    required: true,
                    message: "Please select Distribution Pop!"
                  }
                ]}
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

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* deviceTypeList */}
              <Form.Item
                label="Device Type"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="deviceType"
                rules={[
                  {
                    required: true,
                    message: "Please select Device Type!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Device Type"
                    onChange={handleDeviceTypeChange}
                    options={deviceTypeList}
                    value={selectedDeviceType}
                  />
                </Space>
              </Form.Item>
            </Col>
            {selectedDeviceType == "NAS" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* secret */}
                <Form.Item
                  name="secret"
                  label="Secret"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Secret!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Secret"
                    className={`form-control`}
                    name="secret"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedDeviceType == "NAS" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* incomingPort */}
                <Form.Item
                  name="incomingPort"
                  label="Incoming Port"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Incoming Port!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Incoming Port"
                    className={`form-control`}
                    name="incomingPort"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedDeviceType == "OLT" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* totalEitherPort */}
                <Form.Item
                  name="totalEitherPort"
                  label="Total Either Port"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Total Either Port!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Total Either Port"
                    className={`form-control`}
                    name="totalEitherPort"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedDeviceType == "OLT" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* totalPonPort */}
                <Form.Item
                  name="totalPonPort"
                  label="Total Pon Port"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Total Pon Port!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Total Pon Port"
                    className={`form-control`}
                    name="totalPonPort"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedDeviceType == "OLT" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* oltTypesList */}
                <Form.Item
                  label="OLT Type"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="oltType"
                  rules={[
                    {
                      required: true,
                      message: "Please select OLT Type!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select OLT Type"
                      onChange={handleOltTypeChange}
                      options={oltTypesList}
                      value={selectedOltType}
                    />
                  </Space>
                </Form.Item>
              </Col>
            )}
            {/* mac */}
            {selectedDeviceType == "ONU" && (
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
                  label="Mac"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="mac"
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
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {/* brandName */}
            {selectedDeviceType == "ONU" && (
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
                  label="Brand Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="brandName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Brand Name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Brand Name"
                    className={`form-control`}
                    name="brandName"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {/* totalPort */}
            {selectedDeviceType == "Router" && (
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
                  label="Total Port"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="totalPort"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Total Port!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Total Port"
                    className={`form-control`}
                    name="totalPort"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedDeviceType == "Switch" && (
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
                  label="Total Port"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="totalPort"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Total Port!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Total Port"
                    className={`form-control`}
                    name="totalPort"
                    style={{ padding: "6px" }}
                  />
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
              {/* monitoringTypesList */}
              <Form.Item
                label="Monitoring Type"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="monitoringType"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select Monitoring Type!"
                //   }
                // ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Monitoring Type"
                    onChange={handleMonuitoringTypeChange}
                    options={monitoringTypesList}
                    value={selectedMonitoringType}
                  />
                </Space>
              </Form.Item>
            </Col>
            {selectedMonitoringType == "API" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* apiPort */}
                <Form.Item
                  name="apiPort"
                  label="Api Port"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Api Port!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Api Port"
                    className={`form-control`}
                    name="apiPort"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedMonitoringType == "API" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* apiUsername */}
                <Form.Item
                  name="apiUsername"
                  label="Api Username"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Api Username!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Api Username"
                    className={`form-control`}
                    name="apiUsername"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedMonitoringType == "API" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* apiPassword */}
                <Form.Item
                  name="apiPassword"
                  label="Api Password"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Api Password!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Api Password"
                    className={`form-control`}
                    name="apiPassword"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}

            {selectedMonitoringType == "Telnet" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* telnetLoginName */}
                <Form.Item
                  name="telnetLoginName"
                  label="Telnet Login Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Telnet Login Name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Telnet Login Name"
                    className={`form-control`}
                    name="telnetLoginName"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedMonitoringType == "Telnet" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* telnetLoginPassword */}
                <Form.Item
                  name="telnetLoginPassword"
                  label="Telnet Login Password"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Telnet Login Password!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Telnet Login Password"
                    className={`form-control`}
                    name="telnetLoginPassword"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedMonitoringType == "Telnet" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* telnetPrivilegedPassword */}
                <Form.Item
                  name="telnetPrivilegedPassword"
                  label="Telnet Privileged Password"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Telnet Privileged Password!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Telnet Privileged Password"
                    className={`form-control`}
                    name="telnetPrivilegedPassword"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedMonitoringType == "Telnet" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* telnetPonPortNumber */}
                <Form.Item
                  name="telnetPonPortNumber"
                  label="Telnet Port Number"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Telnet Port Number!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Telnet Port Number"
                    className={`form-control`}
                    name="telnetPonPortNumber"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedMonitoringType == "SNMP" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* snmpPortNo */}
                <Form.Item
                  name="snmpPortNo"
                  label="Snmp Port No"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Snmp Port No!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Snmp Port No"
                    className={`form-control`}
                    name="snmpPortNo"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedMonitoringType == "SNMP" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* snmpVersion */}
                <Form.Item
                  name="snmpVersion"
                  label="Snmp Version"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Snmp Version!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Snmp Version"
                    className={`form-control`}
                    name="snmpVersion"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {selectedMonitoringType == "SNMP" && (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
                className="gutter-row"
              >
                {/* snmpCommunity */}
                <Form.Item
                  name="snmpCommunity"
                  label="Snmp Community"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Snmp Community!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Snmp Community"
                    className={`form-control`}
                    name="snmpCommunity"
                    style={{ padding: "6px" }}
                  />
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
              {/* location */}
              <Form.Item
                name="location"
                label="Location"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Location!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Location"
                  className={`form-control`}
                  name="location"
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
              {/* ip */}
              <Form.Item
                name="ip"
                label="IP"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your IP!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="IP"
                  className={`form-control`}
                  name="ip"
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
              {/* latitude */}
              <Form.Item
                name="latitude"
                label="Latitude"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Latitude!"
                  }
                ]}
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
              {/* longitude */}
              <Form.Item
                name="longitude"
                label="Longitude"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Longitude!"
                  }
                ]}
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
                {/*  wrapperCol={{ ...layout.wrapperCol, offset: 4 }} */}
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
    </>
  );
};

export default EditDeviceForm;
