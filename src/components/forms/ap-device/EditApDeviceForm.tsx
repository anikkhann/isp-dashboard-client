/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Select, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Col, Row } from "antd";
// import AppImageLoader from "@/components/loader/AppImageLoader";
import { useAppSelector } from "@/store/hooks";
import { ApDeviceData } from "@/interfaces/ApDeviceData";
interface FormData {
  name: string;
  mapLocation: string;
  locationDescription: string;
  ip: string;
  macAddress: string;
  vlanId: string;
  snmpVersion: string;
  snmpPort: string;
  snmpCommunity: string;
}
const snmpList = [
  {
    label: "v1",
    value: "v1"
  },
  {
    label: "v2c",
    value: "v2c"
  },
  {
    label: "v3",
    value: "v3"
  }
];
interface PropData {
  item: ApDeviceData;
}

const EditApDeviceForm = ({ item }: PropData) => {
  console.log("item", item);
  const [form] = Form.useForm();

  const authUser = useAppSelector(state => state.auth.user);

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<any>(null);

  const [isActive, setIsActive] = useState<boolean>(true);
  const [isSnmpActive, setIsSnmpActive] = useState<boolean>(false);

  const [nasDevices, setNasDevices] = useState<any[]>([]);
  const [selectedNasDevice, setSelectedNasDevice] = useState<any>(null);

  // const [snmpVersion, setSnmpVersion] = useState<any>(null);
  const [selectedSnmpVersion, setSelectedSnmpVersion] = useState<any>(
    item.snmpVersion
  );

  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const [subZones, setSubZones] = useState<any[]>([]);
  const [selectedSubZone, setSelectedSubZone] = useState<any>(null);

  const [retailers, setRetailers] = useState<any[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState<any>(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleIsSnmpActive = (e: any) => {
    setIsSnmpActive(e.target.checked ? true : false);
  };

  // nasDevices
  function getNasDevices(clientId: any) {
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
        // partnerType: "zone",
        // deviceType: "ONU",
        client: clientId ? { id: clientId } : { id: authUser?.partnerId },
        isActive: true
      }
    };
    axios.post("/api-hotspot/nas-device/get-list", body).then(res => {
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

      setNasDevices(list);
    });
  }

  function getZoneManagers() {
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
        partnerType: "zone",
        client: item ? { id: item.clientId } : { id: authUser?.partnerId },
        // client: {
        //   id: authUser?.partnerId
        // },
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
          label: item.username,
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
            field: "username"
          }
        ]
      },
      body: {
        partnerType: "reseller",
        zoneManager: { id: selectedZoneId },
        // client: {
        //   id: authUser?.partnerId
        // },
        client: item ? { id: item.clientId } : { id: authUser?.partnerId },
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
          label: item.username,
          value: item.id
        };
      });

      setSubZones(list);
    });
  }

  function getRetailers(selectedSubZoneId: any) {
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
        partnerType: "retailer",
        subZoneManager: { id: selectedSubZoneId },
        // client: item ? { id: item.clientId } : { id: authUser?.partnerId },
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
          label: item.username,
          value: item.id
        };
      });

      setRetailers(list);
    });
  }

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

  const handleNasDeviceChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ nasDeviceId: value });
    setSelectedNasDevice(value as any);
  };
  const handleSnmpChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ snmpVersion: value });
    setSelectedSnmpVersion(value as any);
  };
  useEffect(() => {
    getZoneManagers();
    getSubZoneManagers(null);
    // getRetailers(null);
    // getNasDevices();
  }, []);
  useEffect(() => {
    // if (selectedZone) {
    getNasDevices(item?.clientId);
    // }
  }, []);
  useEffect(() => {
    if (selectedZone) {
      getSubZoneManagers(selectedZone);
    }
  }, [selectedZone]);
  useEffect(() => {
    if (selectedSubZone) {
      getRetailers(selectedSubZone);
    }
  }, [selectedSubZone]);

  useEffect(() => {
    if (item) {
      setSelectedNasDevice(item.nasDeviceId);
      setSelectedZone(item.zoneManagerId);
      setSelectedSubZone(item.subZoneManagerId);
      setSelectedRetailer(item.retailerId);
      setIsActive(item.isActive);
      // setSnmpVersion(item.snmpVersion);
      setIsSnmpActive(item.isSnmpActive);
      // setSelectedSnmpVersion(item.snmpVersion);
      form.setFieldsValue({
        name: item.name,
        mapLocation: item.mapLocation,
        locationDescription: item.locationDescription,
        ip: item.ip,
        macAddress: item.macAddress,
        vlanId: item.vlanId,
        snmpVersion: item.snmpVersion,
        snmpPort: item.snmpPort,
        snmpCommunity: item.snmpCommunity
      });
    }
  }, [item]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const {
        name,
        mapLocation,
        locationDescription,
        ip,
        macAddress,
        vlanId,
        // snmpVersion,
        snmpPort,
        snmpCommunity
      } = data;

      const formData = {
        id: item.id,
        nasDeviceId: selectedNasDevice,
        name: name,
        mapLocation: mapLocation,
        locationDescription: locationDescription,
        ip: ip,
        macAddress: macAddress,
        vlanId: vlanId,
        isSnmpActive: isSnmpActive,
        snmpVersion: selectedSnmpVersion,
        snmpPort: snmpPort,
        snmpCommunity: snmpCommunity,
        zoneManagerId: selectedZone,
        subZoneManagerId: selectedSubZone,
        retailerId: selectedRetailer,
        isActive: isActive
      };

      try {
        await axios
          .put("/api-hotspot/ap-device/update", formData)
          .then(res => {
            // console.log(res);
            const { data } = res;

            if (data.status === 200) {
              MySwal.fire({
                title: "Success",
                text: data.message || "Added successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/hotspot/ap-device");
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
      <div className="my-6">
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
            {authUser &&
              authUser?.clientLevel != "tri_cycle" &&
              authUser?.clientLevel != "tri_cycle_hotspot" &&
              authUser?.clientLevel != "tri_cycle_isp_hotspot" && (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
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
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
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
            {/* nasDeviceId */}
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* nasDeviceId */}
              <Form.Item
                label="Nas Device"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="nasDeviceId"
                rules={[
                  {
                    required: !selectedNasDevice,
                    message: "Please select nas device!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleNasDeviceChange}
                    options={nasDevices}
                    value={selectedNasDevice}
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
                name="name"
                label="Name"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input name!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="name"
                  className={`form-control`}
                  style={{ padding: "6px" }}
                  maxLength={32}
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
                name="mapLocation"
                label="Map Location"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input mapLocation!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="map location"
                  className={`form-control`}
                  style={{ padding: "6px" }}
                  maxLength={100}
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
                name="locationDescription"
                label="Location Description"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input locationDescription!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Location Description"
                  className={`form-control`}
                  style={{ padding: "6px" }}
                  maxLength={100}
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
                name="ip"
                label="IP"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input ip!"
                //   }
                // ]}
              >
                <Input
                  type="text"
                  placeholder="ip"
                  className={`form-control`}
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
                name="macAddress"
                label="MAC Address"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input macAddress!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="mac address"
                  className={`form-control`}
                  style={{ padding: "6px" }}
                  maxLength={17}
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
                name="vlanId"
                label="VLAN Info"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input Vlan ID!"
                //   }
                // ]}
              >
                <Input
                  type="text"
                  placeholder="VLAN Info"
                  className={`form-control`}
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
          </Row>
          <Row justify={"center"}>
            <Col>
              <Form.Item
                name="isSnmpActive"
                label=""
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
              >
                <Checkbox
                  onChange={handleIsSnmpActive}
                  checked={isSnmpActive}
                  className="gutter-row"
                >
                  Is SNMP Active?
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify="space-between"
          >
            {isSnmpActive != false && (
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
                  label="SNMP Version"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="snmpVersion"
                  rules={[
                    {
                      required: true,
                      message: "Please select SNMP Version!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select SNMP Version"
                      onChange={handleSnmpChange}
                      options={snmpList}
                      value={selectedSnmpVersion}
                    />
                  </Space>
                </Form.Item>
              </Col>
            )}
            {isSnmpActive != false && (
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
                  name="snmpPort"
                  label="SNMP Port"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true
                      // message: "Please input your snmpPort!"
                    },
                    {
                      validator: async (_, value) => {
                        if (!value) {
                          return Promise.reject("Please input your SNMP Port!");
                        }
                        const intValue = parseInt(value, 10);
                        if (isNaN(intValue)) {
                          return Promise.reject("Please enter a valid number.");
                        }
                        if (intValue <= 20 || intValue > 65535) {
                          return Promise.reject(
                            "SNMP Port number must be greater than 20 and less than or equal to 65535."
                          );
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="snmpPort"
                    className={`form-control`}
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            )}
            {isSnmpActive != false && (
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
                  name="snmpCommunity"
                  label="SNMP Community"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
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
                    placeholder="snmp community"
                    className={`form-control`}
                    style={{ padding: "6px" }}
                    maxLength={20}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Form.Item>
            <Checkbox
              onChange={handleActive}
              checked={isActive}
              className="gutter-row"
            >
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

export default EditApDeviceForm;
