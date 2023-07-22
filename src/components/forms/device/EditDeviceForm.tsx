/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Select, Space } from "antd";
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

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

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
                message: "Please select"
              }
            ]}
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
            rules={[
              {
                required: true,
                message: "Please select"
              }
            ]}
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
                message: "Please select device Type"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleDeviceTypeChange}
                options={deviceTypeList}
                value={selectedDeviceType}
              />
            </Space>
          </Form.Item>

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
                message: "Please select"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleMonuitoringTypeChange}
                options={monitoringTypesList}
                value={selectedMonitoringType}
              />
            </Space>
          </Form.Item>

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
                message: "Please select"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleOltTypeChange}
                options={oltTypesList}
                value={selectedOltType}
              />
            </Space>
          </Form.Item>

          {/* location */}
          <Form.Item
            name="location"
            label="location"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your location!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="location"
              className={`form-control`}
              name="location"
            />
          </Form.Item>

          {/* secret */}
          <Form.Item
            name="secret"
            label="secret"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your secret!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="secret"
              className={`form-control`}
              name="secret"
            />
          </Form.Item>

          {/* incomingPort */}
          <Form.Item
            name="incomingPort"
            label="incomingPort"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your incomingPort!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="incomingPort"
              className={`form-control`}
              name="incomingPort"
            />
          </Form.Item>

          {/* ip */}
          <Form.Item
            name="ip"
            label="ip"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your ip!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="ip"
              className={`form-control`}
              name="ip"
            />
          </Form.Item>

          {/* totalEitherPort */}
          <Form.Item
            name="totalEitherPort"
            label="totalEitherPort"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your totalEitherPort!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="totalEitherPort"
              className={`form-control`}
              name="totalEitherPort"
            />
          </Form.Item>

          {/* totalPonPort */}
          <Form.Item
            name="totalPonPort"
            label="totalPonPort"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your totalPonPort!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="totalPonPort"
              className={`form-control`}
              name="totalPonPort"
            />
          </Form.Item>

          {/* apiPort */}
          <Form.Item
            name="apiPort"
            label="apiPort"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your apiPort!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="apiPort"
              className={`form-control`}
              name="apiPort"
            />
          </Form.Item>

          {/* apiUsername */}
          <Form.Item
            name="apiUsername"
            label="apiUsername"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your apiUsername!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="apiUsername"
              className={`form-control`}
              name="apiUsername"
            />
          </Form.Item>

          {/* apiPassword */}
          <Form.Item
            name="apiPassword"
            label="apiPassword"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your apiPassword!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="apiPassword"
              className={`form-control`}
              name="apiPassword"
            />
          </Form.Item>

          {/* snmpPortNo */}
          <Form.Item
            name="snmpPortNo"
            label="snmpPortNo"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your snmpPortNo!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="snmpPortNo"
              className={`form-control`}
              name="snmpPortNo"
            />
          </Form.Item>

          {/* snmpVersion */}
          <Form.Item
            name="snmpVersion"
            label="snmpVersion"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your snmpVersion!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="snmpVersion"
              className={`form-control`}
              name="snmpVersion"
            />
          </Form.Item>

          {/* snmpCommunity */}
          <Form.Item
            name="snmpCommunity"
            label="snmpCommunity"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your snmpCommunity!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="snmpCommunity"
              className={`form-control`}
              name="snmpCommunity"
            />
          </Form.Item>

          {/* telnetLoginName */}
          <Form.Item
            name="telnetLoginName"
            label="telnetLoginName"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your telnetLoginName!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="telnetLoginName"
              className={`form-control`}
              name="telnetLoginName"
            />
          </Form.Item>

          {/* telnetLoginPassword */}
          <Form.Item
            name="telnetLoginPassword"
            label="telnetLoginPassword"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your telnetLoginPassword!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="telnetLoginPassword"
              className={`form-control`}
              name="telnetLoginPassword"
            />
          </Form.Item>

          {/* telnetPrivilegedPassword */}
          <Form.Item
            name="telnetPrivilegedPassword"
            label="telnetPrivilegedPassword"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your telnetPrivilegedPassword!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="telnetPrivilegedPassword"
              className={`form-control`}
              name="telnetPrivilegedPassword"
            />
          </Form.Item>

          {/* telnetPonPortNumber */}
          <Form.Item
            name="telnetPonPortNumber"
            label="telnetPonPortNumber"
            style={{
              marginBottom: 0
            }}
            rules={[
              {
                required: true,
                message: "Please input your telnetPonPortNumber!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="telnetPonPortNumber"
              className={`form-control`}
              name="telnetPonPortNumber"
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

export default EditDeviceForm;
