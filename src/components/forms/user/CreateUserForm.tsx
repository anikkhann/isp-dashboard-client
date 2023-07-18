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
  Input,
  Select,
  Space
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";

interface AdminFormData {
  name: string;
  email: string;
  password: string;
  username: string;
  phone: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const CreateUserForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

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

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const onSubmit = (data: AdminFormData) => {
    // console.log(data)
    const { name, email, password, username, phone } = data;

    const formData = {
      name: name,
      email: email,
      password: password,
      username: username,
      phone: phone,
      isActive: isActive,
      roleIds: checkedList
    };

    try {
      axios
        .post("/api/users/create", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status !== 200) {
            setShowError(true);
            setErrorMessages(data.message);
            return;
          } else {
            MySwal.fire({
              title: "Success",
              text: data.message || "Admin Added successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/user/user");
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
      {showError &&
        errorMessages.length > 0 &&
        errorMessages.map((error, index) => (
          <Alert message={error} type="error" showIcon key={index} />
        ))}

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
            phone: ""
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
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="gutter-row"
            >
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
            </Col>
          </Row>
          {/* <Form.Item
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
          </Form.Item> */}
          {/* <Form.Item
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
          </Form.Item> */}
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
                label="Phone"
                style={{
                  marginBottom: 0
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
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Form.Item
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
          </Form.Item> */}
          {/* <Form.Item
            label="Phone"
            style={{
              marginBottom: 0
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
            />
          </Form.Item> */}
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
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    min: 6,
                    message: "Password must be minimum 6 characters."
                  },
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                    message:
                      "Only letters, numbers, underscores and hyphens allowed"
                  }
                ]}
                hasFeedback
              >
                <Input.Password />
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
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                    message:
                      "Only letters, numbers, underscores and hyphens allowed"
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "confirm password that you entered do not match with password!"
                        )
                      );
                    }
                  })
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          {/* <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              },
              {
                min: 6,
                message: "Password must be minimum 6 characters."
              },
              {
                pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                message:
                  "Only letters, numbers, underscores and hyphens allowed"
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item> */}
          {/* <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                message:
                  "Only letters, numbers, underscores and hyphens allowed"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "confirm password that you entered do not match with password!"
                    )
                  );
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item> */}
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify="space-between"
          >
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="gutter-row"
            >
              <Form.Item
                label="Roles"
                style={{
                  marginBottom: 0
                }}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={handleRoleChange}
                    options={roles}
                  />
                </Space>
              </Form.Item>
            </Col>
          </Row>
          {/* <Form.Item
            label="Roles"
            style={{
              marginBottom: 0
            }}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleRoleChange}
                options={roles}
              />
            </Space>
          </Form.Item> */}
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

export default CreateUserForm;
