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
import { ClientData } from "@/interfaces/ClientData";
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
  licenseTypeId: any;
  btrcLicenseNo: any;
  licenseExpireDate: any;
  radiusIpId: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const tagsList = [
  {
    label: "Tri Cycle",
    value: "tri_cycle"
  },
  {
    label: "Quad Cycle",
    value: "quad_cycle"
  }
];
interface PropData {
  item: ClientData;
}

const EditClientForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [clientLevel, setClientLevel] = useState<any>(null);

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [radiusIps, setRadiusIps] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  const [selectedRadiusIp, setSelectedRadiusIp] = useState<any>(null);

  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleChange = (value: any) => {
    console.log("checked = ", value);
    form.setFieldsValue({ clientLevel: value });
    setClientLevel(value as any);
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

  const handleRadiusIpChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ radiusIpId: value });
    setSelectedRadiusIp(value as any);
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

  function getRadiusIps() {
    axios.get("/api/lookup-details/get-by-master-key/radius_ip").then(res => {
      const { data } = res;
      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
      setRadiusIps(list);
    });
  }

  useEffect(() => {
    getDivisions();
    getRadiusIps();
  }, []);

  useEffect(() => {
    if (item) {
      setClientLevel(item.clientLevel);
      form.setFieldsValue({
        name: item.name,
        username: item.username,
        /*  password: item.password, */
        email: item.email,
        address: item.address,
        altContactNumber: item.altContactNumber,
        contactNumber: item.contactNumber,
        districtId: item.districtId,
        divisionId: item.divisionId,
        contactPerson: item.contactPerson,
        radiusIpId: item.radiusIpId,
        clientLevel: item.clientLevel
      });
      setSelectedDivision(item.divisionId);
      setSelectedDistrict(item.districtId);
      setSelectedRadiusIp(item.radiusIpId);
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    if (selectedDivision) {
      getDistricts(selectedDivision);
    }
  }, [selectedDivision]);

  const onSubmit = (data: FormData) => {
    const {
      clientLevel,
      name,
      username,
      email,
      address,
      altContactNumber,
      contactNumber,
      districtId,
      divisionId,
      contactPerson,
      radiusIpId
    } = data;

    if (!item) {
      MySwal.fire({
        title: "Error",
        text: "Please select a client",
        icon: "error"
      });
    }

    const formData = {
      id: item ? item.id : null,
      partnerType: "client",
      clientLevel: clientLevel,
      name: name,
      username: username,
      contactPerson: contactPerson,
      contactNumber: contactNumber,
      altContactNumber: altContactNumber,
      email: email,
      address: address,
      divisionId: divisionId,
      districtId: districtId,
      radiusIpId: radiusIpId,
      isActive: isActive
    };

    try {
      axios
        .put("/api/partner/update", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status === 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || "Client Update successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/client/client");
            });
          } else {
            MySwal.fire({
              title: "Error",
              text: data.message || "Client Added Failed",
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

      <div className="mt-3">
        <Form
          // {...layout}
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            name: "",
            email: "",
            password: "",
            username: "",
            clientLevel: "",
            contactPerson: "",
            contactNumber: "",
            altContactNumber: "",
            divisionId: "",
            districtId: "",
            upazillaId: "",
            unionId: "",
            licenseTypeId: "",
            btrcLicenseNo: "",
            licenseExpireDate: "",
            radiusIpId: "",
            address: ""
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
          {/* client level */}

          <Form.Item
            label="Client Level"
            style={{
              marginBottom: 0
            }}
            name="clientLevel"
            rules={[
              {
                required: true,
                message: "Please select actions"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleChange}
                options={tagsList}
                value={clientLevel}
              />
            </Space>
          </Form.Item>

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

          {/* altContactNumber */}
          <Form.Item
            name="altContactNumber"
            label="Alt Contact Number"
            style={{
              marginBottom: 0
            }}
          >
            <Input
              type="text"
              placeholder="Alt Contact Number"
              className={`form-control`}
              name="altContactNumber"
            />
          </Form.Item>

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

          {/* radiusIpId */}
          <Form.Item
            label="Radius Ip"
            style={{
              marginBottom: 0
            }}
            name="radiusIpId"
            rules={[
              {
                required: true,
                message: "Please select Radius Ip"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleRadiusIpChange}
                options={radiusIps}
                value={selectedRadiusIp}
              />
            </Space>
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

export default EditClientForm;
