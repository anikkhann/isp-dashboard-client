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
// import { useAppSelector } from "@/store/hooks";
// import AppImageLoader from "@/components/loader/AppImageLoader";

interface AdminFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  phone: string;
}

interface PropData {
  item: UserData;
}

const EditUserForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  // const authUser = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(false);

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
      },
      body: {
        isForSystem: false,
        isActive: true
      }
    };

    const res = await axios.post("/api/role/get-list", body);
    if (res.data.status == 200) {
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

      form.setFieldsValue({
        name: item.name,
        email: item.email,
        username: item.username,
        phone: item.phone
      });
    }
  }, [item]);

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  // userRoles
  const onSubmit = async (data: AdminFormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { name, email, password, confirmPassword, username, phone } = data;

      const formData = {
        id: item.id,
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        username: username,
        phone: phone,
        isActive: isActive,
        roleIds: checkedList
      };

      try {
        await axios
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
            MySwal.fire({
              title: "Error",
              text: err.response.data.message || "Something went wrong",
              icon: "error"
            });
            setShowError(true);
            setErrorMessages(err.response.message);
          });
      } catch (err: any) {
        // // console.log(err)
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
            password: item.password || "",
            confirmPassword: item.confirmPassword || "",
            username: item.username || "",
            phone: item.phone || ""
          }}
          style={{ maxWidth: "100%" }}
          name="wrap"
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
                  // addonBefore={
                  //   <span
                  //     style={{
                  //       backgroundColor: "#cfcdca",
                  //       color: "black"
                  //     }}
                  //   >
                  //     {authUser ? authUser.clientPrefix + "_" : "Not Available"}
                  //   </span>
                  // }
                  placeholder="Username"
                  className={`form-control`}
                  name="username"
                  readOnly
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
              {/* password */}
              <Form.Item
                name="password"
                label="Password"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    // required: true,
                    message: "Please input your password!"
                  },
                  {
                    min: 6,
                    message: "Password must be minimum 6 characters."
                  },
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                    message:
                      "Only letters, numbers, underscores, @ and hyphens allowed"
                  }
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Password"
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
              {/* confirm password */}
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    // required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    min: 6,
                    message: "Password must be minimum 6 characters."
                  },
                  {
                    pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                    message:
                      "Only letters, numbers, underscores, @ and hyphens allowed"
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
                <Input.Password
                  placeholder="Confirm Password"
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
                label="Mobile"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Mobile!"
                  },
                  {
                    pattern: new RegExp(/^(01)[0-9]{9}$/),
                    message:
                      "Please enter correct BD Number starting with (01) and containing a total of 11 digits."
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="01XXXXXXXXX"
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
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
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
      {/* )} */}
    </>
  );
};

export default EditUserForm;
