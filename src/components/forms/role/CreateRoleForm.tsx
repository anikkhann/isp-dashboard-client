/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { type CheckboxChangeEvent } from "antd/es/checkbox";
// import { CheckboxChangeEvent } from "antd/lib/checkbox";

import {
  Alert,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Divider,
  Card,
  Space
} from "antd";
// import { CheckboxValueType } from "antd/es/checkbox/Group";
import { type CheckboxValueType } from "antd/es/checkbox/Group";
import axios from "axios";
import Cookies from "js-cookie";
// import AppImageLoader from "@/components/loader/AppImageLoader";

interface RoleFormData {
  name: string;
}
// "Super Admin, Zone Manager, Quard Cycle, Tri Cycle, Sub Zone Manager, Retail In Charge"

const checkNameList = [
  "Super Admin",
  "Zone Manager",
  "Quard Cycle",
  "Tri Cycle",
  "Sub Zone Manager",
  "Retail In Charge"
];

const CreateRoleForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [loading, setLoading] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [permissions, setPermissions] = useState<any[]>([]);

  const [checkedList, setCheckedList] = useState<any[]>([]);

  const [isActive, setIsActive] = useState(true);

  const [totalPermissions, setTotalPermissions] = useState(0);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      // Add all permission to the checkedPermissions array
      const allCheckedPermission = permissions.reduce(
        (acc, permission) => [
          ...acc,
          ...permission.children.map((child: any) => child.value)
        ],
        []
      );
      setCheckedList(allCheckedPermission);
    } else {
      // Clear the checkedPermissions array
      setCheckedList([]);
    }
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
    setCheckedList(checkedValues as any[]);
  };

  // console.log('checkedList', checkedList)

  const getPermissions = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const res = await axios.get(
      "/api/permission/get-loggedin-user-permissions"
    );

    let totalPermissions = 0;
    const items = res.data.body.map((item: any) => {
      return {
        id: item.id,
        displayName: item.displayName,
        children: item.actionTags.map((child: any) => {
          totalPermissions++;
          return {
            value: item.id + "__" + child,
            label: child
          };
        })
      };
    });

    setTotalPermissions(totalPermissions);

    setPermissions(items);
  };
  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: RoleFormData) => {
    setLoading(true);

    setTimeout(async () => {
      const rolePermissions: { permissionId: any; actionTags: any[] }[] = [];

      checkedList.forEach(permission => {
        const [permissionId, actionTag] = permission.split("__");
        const existingPermission = rolePermissions.find(
          perm => perm.permissionId === permissionId
        );

        if (existingPermission) {
          existingPermission.actionTags.push(actionTag);
        } else {
          rolePermissions.push({
            permissionId,
            actionTags: [actionTag]
          });
        }
      });

      const { name } = data;
      try {
        await axios
          .post("/api/role/create", {
            name: name,
            is_active: isActive,
            rolePermissions: rolePermissions
          })
          .then(res => {
            // console.log(res);
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
                text: data.message || "Role created successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/user/role");
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
      <div className="mt-3 flex justify-center items-center ">
        <Form
          // {...layout}
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          style={{ maxWidth: 800 }}
          name="wrap"
          colon={false}
        >
          <Row justify="center">
            <Col
              xs={10}
              sm={16}
              md={16}
              lg={12}
              xl={10}
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
                    message: "Name is required"
                  },
                  {
                    validator: async (rule, value) => {
                      const convertCheckNameList = checkNameList.map(item =>
                        item.toLowerCase()
                      );
                      const convertValue = value.toLowerCase();
                      if (convertCheckNameList.includes(convertValue)) {
                        throw new Error(
                          "This name is already taken. Please try another name."
                        );
                      }
                    }
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
          </Row>
          <Row justify="center">
            <Col
              xs={10}
              sm={16}
              md={16}
              lg={12}
              xl={10}
              xxl={8}
              className="gutter-row"
            >
              <Form.Item label="" style={{ marginBottom: 0, padding: "6px" }}>
                <Checkbox onChange={handleActive} checked={isActive}>
                  Active
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Col
              xs={10}
              sm={16}
              md={16}
              lg={12}
              xl={10}
              xxl={8}
              className="gutter-row"
            >
              <Space
                direction="vertical"
                className="flex justify-start text-capitalize mb-10 text-left"
              >
                <Checkbox
                  indeterminate={
                    checkedList.length > 0 &&
                    checkedList.length < totalPermissions
                  }
                  checked={checkedList.length === totalPermissions}
                  onChange={handleCheckAllChange}
                >
                  Check All
                </Checkbox>
              </Space>
            </Col>
          </Row>

          {/* </Col> */}

          <Form.Item label="" name="permissions" valuePropName="permissions">
            <Checkbox.Group onChange={onChange} value={checkedList}>
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                justify="space-between"
              >
                {permissions &&
                  permissions.length > 0 &&
                  permissions.map((permission: any) => {
                    return (
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        className="gutter-row"
                        key={permission.id}
                      >
                        <Card
                          style={{ width: "100%", overflow: "auto" }}
                          className="bg-white  hover:shadow-md transition duration-300 ease-in-out"
                        >
                          <Divider orientation="left">
                            <h5
                              style={{
                                fontWeight: "bold",
                                marginBottom: "10px",
                                marginLeft: "50px",
                                // margin: "0 auto",
                                // fontSize: 14,
                                textTransform: "uppercase",
                                textAlign: "center",
                                color: "#0e8fdc",
                                // fontSize: "0.875rem",
                                lineHeight: "1.25rem"
                              }}
                              // className="text-sm"
                            >
                              {permission.displayName}
                            </h5>
                          </Divider>

                          <Row gutter={[8, 16]}>
                            {permission.children &&
                              permission.children.length > 0 &&
                              permission.children.map((item: any) => {
                                return (
                                  <>
                                    <Col
                                      span={24}
                                      sm={12}
                                      md={12}
                                      lg={12}
                                      className="gutter-row"
                                      key={item.value}
                                      style={{ padding: "0 5rem" }}
                                    >
                                      <Card
                                        hoverable
                                        style={{
                                          backgroundColor: "#F15F22"
                                        }}
                                        className="hover:shadow-xl transition duration-300 ease-in-out"
                                      >
                                        <Checkbox
                                          value={item.value}
                                          style={{
                                            display: "flex",
                                            justifyContent: "left",
                                            fontSize: "15px",
                                            color: "#FFFFFF",
                                            fontWeight: "bold"
                                          }}
                                        >
                                          <span
                                            style={{
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              whiteSpace: "nowrap"
                                            }}
                                          >
                                            {item.label}
                                          </span>
                                        </Checkbox>
                                      </Card>
                                    </Col>
                                  </>
                                );
                              })}
                          </Row>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </Checkbox.Group>
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

export default CreateRoleForm;
