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
  latitude: string;
  longitude: string;
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

const CreateDeviceForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [selectedDeviceType, setSelectedDeviceType] = useState("NAS");
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

  const onSubmit = (data: FormData) => {
    console.log(data);

    const {
      name,
      deviceType,
      monitoringType,
      location,
      latitude,
      longitude,
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
      name: name,
      distributionZoneId: selectedDistributionZone,
      distributionPopId: selectedDistributionPop,
      deviceType: deviceType,
      monitoringType: monitoringType,
      location: location,
      latitude: latitude,
      longitude: longitude,
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
        .post("/api/device/create", formData)
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
            latitude: "",
            longitude: "",
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
              {/* distributionZoneId */}
              <Form.Item
                label="Distribution Zone"
                style={{
                  marginBottom: 0
                }}
                name="distributionZoneId"
                rules={[
                  {
                    required: true,
                    message: "Please select Distribution Zone!"
                  }
                ]}
              >
                <Space
                  style={{ width: "100%", textAlign: "start" }}
                  direction="vertical"
                >
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
                rules={[
                  {
                    required: true,
                    message: "Please select Distribution Pop!"
                  }
                ]}
              >
                <Space
                  style={{ width: "100%", textAlign: "start" }}
                  direction="vertical"
                >
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
                  marginBottom: 0
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
                  marginBottom: 0
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
              {/* incomingPort */}
              <Form.Item
                name="incomingPort"
                label="Incoming Port"
                style={{
                  marginBottom: 0
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your IncomingPort!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="IncomingPort"
                  className={`form-control`}
                  name="incomingPort"
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
              {/* totalEitherPort */}
              <Form.Item
                name="totalEitherPort"
                label="Total Either Port"
                style={{
                  marginBottom: 0
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
              {/* totalPonPort */}
              <Form.Item
                name="totalPonPort"
                label="Total Pon Port"
                style={{
                  marginBottom: 0
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
              {/* monitoringTypesList */}
              <Form.Item
                label="Monitoring Type"
                style={{
                  marginBottom: 0
                }}
                name="monitoringType"
                rules={[
                  {
                    required: true,
                    message: "Please select Monitoring Type!"
                  }
                ]}
              >
                <Space
                  style={{ width: "100%", textAlign: "start" }}
                  direction="vertical"
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select Monitoring Type"
                    onChange={handleMonuitoringTypeChange}
                    options={monitoringTypesList}
                    value={selectedMonitoringType}
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
              {/* apiPort */}
              <Form.Item
                name="apiPort"
                label="Api Port"
                style={{
                  marginBottom: 0
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
              {/* apiUsername */}
              <Form.Item
                name="apiUsername"
                label="Api Username"
                style={{
                  marginBottom: 0
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
              {/* apiPassword */}
              <Form.Item
                name="apiPassword"
                label="Api Password"
                style={{
                  marginBottom: 0
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
              {/* snmpPortNo */}
              <Form.Item
                name="snmpPortNo"
                label="Snmp Port No"
                style={{
                  marginBottom: 0
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
              {/* snmpVersion */}
              <Form.Item
                name="snmpVersion"
                label="Snmp Version"
                style={{
                  marginBottom: 0
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
              {/* snmpCommunity */}
              <Form.Item
                name="snmpCommunity"
                label="Snmp Community"
                style={{
                  marginBottom: 0
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
              {/* telnetLoginName */}
              <Form.Item
                name="telnetLoginName"
                label="Telnet Login Name"
                style={{
                  marginBottom: 0
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
              {/* telnetLoginPassword */}
              <Form.Item
                name="telnetLoginPassword"
                label="Telnet Login Password"
                style={{
                  marginBottom: 0
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
              {/* telnetPrivilegedPassword */}
              <Form.Item
                name="telnetPrivilegedPassword"
                label="Telnet Privileged Password"
                style={{
                  marginBottom: 0
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
              {/* telnetPonPortNumber */}
              <Form.Item
                name="telnetPonPortNumber"
                label="Telnet Port Number"
                style={{
                  marginBottom: 0
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
              {/* oltTypesList */}
              <Form.Item
                label="OLT Type"
                style={{
                  marginBottom: 0
                }}
                name="oltType"
                rules={[
                  {
                    required: true,
                    message: "Please select OLT Type!"
                  }
                ]}
              >
                <Space
                  style={{ width: "100%", textAlign: "start" }}
                  direction="vertical"
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select OLT Type"
                    onChange={handleOltTypeChange}
                    options={oltTypesList}
                    value={selectedOltType}
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
              {/* location */}
              <Form.Item
                name="location"
                label="Location"
                style={{
                  marginBottom: 0
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
                  marginBottom: 0
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
                  marginBottom: 0
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
                  marginBottom: 0
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

export default CreateDeviceForm;
