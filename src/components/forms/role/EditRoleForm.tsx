/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { CheckboxChangeEvent } from "antd/lib/checkbox";

import {
  Alert,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Divider,
  Space
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import axios from "axios";
import { RoleData } from "@/interfaces/RoleData";
import Cookies from "js-cookie";
import { Card } from "antd";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface RoleFormData {
  name: string;
}

interface PropData {
  item: RoleData;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const EditRoleForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
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

  const onChange = (checkedValues: CheckboxValueType[]) => {
    // console.log("checked = ", checkedValues);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCheckedList(checkedValues as any[]);
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name
      });
      const checked: any = [];
      item.rolePermissions.map((item: any) => {
        if (item.permission === null) return;
        item.actionTags.map((actionTag: any) => {
          const value = item.permissionId + "__" + actionTag;
          checked.push(value);
        });
      });

      setCheckedList(checked);
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: RoleFormData) => {
    setLoading(true);

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
      axios
        .put(`/api/role/update`, {
          id: item.id,
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
      // // console.log(err)
      setShowError(true);
      setErrorMessages(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <AppImageLoader />}
      {showError && <Alert message={errorMessages} type="error" showIcon />}
      {!loading && (
        <div className="mt-3 flex justify-center items-center">
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            className="max-w-screen-lg w-full"
            name="wrap"
            colon={false}
          >
            <Row gutter={[8, 16]} justify="center">
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="px-5">
                <Form.Item
                  label="Name"
                  style={{ marginBottom: 0, fontWeight: "bold" }}
                  name="name"
                  rules={[{ required: true, message: "Please input name!" }]}
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
            </Row>

            <Form.Item label="">
              <Checkbox onChange={handleActive} checked={isActive}>
                Status
              </Checkbox>
            </Form.Item>

            <Space
              direction="vertical"
              style={{
                display: "flex",
                justifyContent: "left",
                textTransform: "capitalize",
                marginBottom: 10,
                textAlign: "left",
                paddingLeft: "15px",
                paddingRight: "15px"
              }}
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

            <Form.Item name="permissions" valuePropName="permissions">
              <Checkbox.Group onChange={onChange} value={checkedList}>
                <Row gutter={[8, 16]} justify="space-between">
                  {permissions &&
                    permissions.length > 0 &&
                    permissions.map((permission: any) => (
                      <Col
                        span={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        key={permission.id}
                      >
                        <Card className="hover:shadow-md transition duration-300 ease-in-out">
                          <Divider orientation="left">
                            <h5
                              style={{
                                fontWeight: "bold",
                                marginBottom: 10,
                                marginLeft: 10,
                                fontSize: 14,
                                textTransform: "uppercase",
                                textAlign: "left",
                                color: "#0e8fdc"
                              }}
                            >
                              {permission.displayName}
                            </h5>
                          </Divider>

                          <Row gutter={[8, 16]}>
                            {permission.children &&
                              permission.children.length > 0 &&
                              permission.children.map((item: any) => (
                                <Col
                                  span={24}
                                  sm={12}
                                  md={8}
                                  lg={8}
                                  className="gutter-row"
                                  key={item.value}
                                >
                                  <Card
                                    hoverable
                                    style={{
                                      backgroundColor: "#F15F22",
                                      overflowX: "hidden"
                                    }}
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
                              ))}
                          </Row>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Row justify="center">
              <Col>
                <Form.Item>
                  <Button
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
      )}
    </>
  );
};

export default EditRoleForm;
