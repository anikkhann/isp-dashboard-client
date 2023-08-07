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
import { UserData } from "@/interfaces/UserData";

interface AdminFormData {
  name: string;
  email: string;
  username: string;
  phone: string;
}

interface PropData {
  item: UserData;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const EditUserForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [roles, setRoles] = useState<any[]>([]);
  const [checkedList, setCheckedList] = useState<any[]>([]);

  const handleRoleChange = (value: any[]) => {
    // console.log("checked = ", value);
    setCheckedList(value as any[]);
  };

  const getRoles = async () => {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      }
    };

    const res = await axios.post("/api/role/get-list", body);
    if (res.data.status == 200) {
      // console.log(res.data.data.roles);

      const items = res.data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setRoles(items);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (item) {
      const checked = item.userRoles.map((item: any) => {
        return item.roleId;
      });
      setCheckedList(checked);

      setIsActive(item.isActive);
    }
  }, [item]);

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  // userRoles

  const onSubmit = (data: AdminFormData) => {
    // console.log(data)
    const { name, email, username, phone } = data;

    const formData = {
      id: item.id,
      name: name,
      email: email,
      username: username,
      phone: phone,
      isActive: isActive,
      roleIds: checkedList
    };

    try {
      axios
        .put("/api/users/update", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status != 200) {
            setShowError(true);
            setErrorMessages(data.message);
            MySwal.fire({
              title: "Error",
              text: data.message || "Something went wrong",
              icon: "error"
            });
          }

          if (data.status == 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || "User Added successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/user/user");
            });
          }
        })
        .catch(err => {
          // console.log(err);
          setShowError(true);
          setErrorMessages(err.response.message);
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
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            name: item.name || "",
            email: item.email || "",
            username: item.username || "",
            phone: item.phone || ""
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
                  type="text"
                  placeholder="Username"
                  className={`form-control`}
                  name="username"
                  readOnly
                  disabled
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
              <Form.Item
                label="Phone"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone!"
                  },
                  {
                    pattern: new RegExp(/^(01)[0-9]{9}$/),
                    message: "Please enter correct BD Phone number."
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Phone"
                  className={`form-control`}
                  name="phone"
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
                label="Roles"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleRoleChange}
                    options={roles}
                    value={checkedList}
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
            ></Col>
          </Row>

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
          <Row justify="center">
            <Col>
              <Form.Item>
                {/* wrapperCol={{ ...layout.wrapperCol, offset: 4 }} */}
                <Button
                  type="primary"
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
          {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </div>
    </>
  );
};

export default EditUserForm;
