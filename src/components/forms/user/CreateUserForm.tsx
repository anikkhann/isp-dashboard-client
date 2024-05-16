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
// import AppImageLoader from "@/components/loader/AppImageLoader";
import { useAppSelector } from "@/store/hooks";
import { UserData } from "@/interfaces/UserData";

interface AdminFormData {
  name: string;
  email: string;
  password: string;
  username: string;
  phone: string;
}

const categories = [
  {
    label: "agent",
    value: "agent"
  },
  {
    label: "sales manager",
    value: "sales_manager"
  },
  {
    label: "area manager",
    value: "area_manager"
  },
  {
    label: "tso",
    value: "tso"
  }
];

const CreateUserForm = () => {
  const [form] = Form.useForm();

  const authUser = useAppSelector(state => state.auth.user);

  const [loading, setLoading] = useState<boolean>(false);
  // ** States
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<any>(null);

  const [isActive, setIsActive] = useState<boolean>(true);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [saleManagers, setSaleManagers] = useState<any[]>([]);
  const [selectedSaleManager, setSelectedSaleManager] = useState<any>(null);

  const [areaManagers, setAreaManagers] = useState<any[]>([]);
  const [selectedAreaManager, setSelectedAreaManager] = useState<any>(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [roles, setRoles] = useState<any[]>([]);
  const [checkedList, setCheckedList] = useState<any>(null);

  const handleRoleChange = (value: any) => {
    // console.log("checked = ", value);
    setCheckedList(value as any);
  };

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleCategoryChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ userCategory: value });
    setSelectedCategory(value);
  };

  const handleSaleManagerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ salesManagerId: value });
    setSelectedSaleManager(value);
  };

  const handleAreaManagerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ areaManagerId: value });
    setSelectedAreaManager(value);
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

  const getSaleManagersList = async () => {
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
        // SEND FIELD NAME WITH DATA TO SEARCH
        userType: "duronto",
        userCategory: "sales_manager",
        isActive: true
      }
    };
    axios.post("/api/users/get-list", body).then(res => {
      const { data } = res;
      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const list = data.body.map((item: UserData) => {
        return {
          label: item.username,
          value: item.id
        };
      });
      setSaleManagers(list);
    });
  };

  const getAreaManagersList = async (saleManager: string) => {
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
        // SEND FIELD NAME WITH DATA TO SEARCH
        userType: "duronto",
        userCategory: "area_manager",
        salesManager: {
          id: saleManager
        },
        isActive: true
      }
    };
    axios.post("/api/users/get-list", body).then(res => {
      const { data } = res;
      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const list = data.body.map((item: UserData) => {
        return {
          label: item.username,
          value: item.id
        };
      });
      setAreaManagers(list);
    });
  };

  useEffect(() => {
    getSaleManagersList();
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedSaleManager) {
      getAreaManagersList(selectedSaleManager);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSaleManager]);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const onSubmit = async (data: AdminFormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { name, email, password, username, phone } = data;

      // convert to array
      const roleId = [checkedList];

      const formData = {
        name: name,
        email: email,
        password: password,
        username: username,
        phone: phone,
        isActive: isActive,
        roleIds: roleId,
        userCategory: selectedCategory,
        salesManagerId: selectedSaleManager,
        areaManagerId: selectedAreaManager
      };

      try {
        await axios
          .post("/api/users/create", formData)
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
            setErrorMessages(err.response.data.message);
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
            name: "",
            email: "",
            password: "",
            username: "",
            phone: ""
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
                  addonBefore={
                    <span
                      style={{
                        backgroundColor: "#cfcdca",
                        color: "black"
                      }}
                    >
                      {authUser ? authUser.clientPrefix + "_" : "Not Available"}
                    </span>
                  }
                  placeholder="Username"
                  className={`form-control`}
                  name="username"
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
                name="password"
                label="Password"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
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
                      "Only letters, numbers, underscores, @ and hyphens allowed"
                  }
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Password"
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
                name="confirm"
                label="Confirm Password"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                // placeholder="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
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
                    // mode="multiple"

                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleRoleChange}
                    options={roles}
                  />
                </Space>
              </Form.Item>
            </Col>

            {authUser && authUser.userType == "durjoy" && (
              <>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* userCategory */}

                  <Form.Item
                    label="User Category"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="userCategory"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please select!"
                    //   }
                    // ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select"
                        onChange={handleCategoryChange}
                        options={categories}
                        value={selectedCategory}
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
                  {/* salesManagerId */}

                  <Form.Item
                    label="Sale Manager"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="salesManagerId"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please select!"
                    //   }
                    // ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select"
                        onChange={handleSaleManagerChange}
                        options={saleManagers}
                        value={selectedSaleManager}
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
                  {/* areaManagerId */}

                  <Form.Item
                    label="Area Manager"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="areaManagerId"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please select!"
                    //   }
                    // ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select"
                        onChange={handleAreaManagerChange}
                        options={areaManagers}
                        value={selectedAreaManager}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              </>
            )}
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
                  // type="primary"
                  htmlType="submit"
                  shape="round"
                  style={{
                    backgroundColor: "#F15F22",
                    color: "#FFFFFF",
                    fontWeight: "bold"
                  }}
                  loading={loading}
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

export default CreateUserForm;
