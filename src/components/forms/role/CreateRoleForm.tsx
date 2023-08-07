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
  Card,
  Space
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import axios from "axios";
import Cookies from "js-cookie";

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

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const CreateRoleForm = () => {
  const [form] = Form.useForm();
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

  const onSubmit = (data: RoleFormData) => {
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
        .post("/api/role/create", {
          name: name,
          is_active: isActive,
          rolePermissions: rolePermissions
        })
        .then(res => {
          // console.log(res);
          const { data } = res;

          MySwal.fire({
            title: "Success",
            text: data.message || "Role created successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/user/role");
          });
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

      <div className="mt-3 flex justify-center items-center">
        <Form
          // {...layout}
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          style={{ maxWidth: 800 }}
          name="wrap"
          // labelCol={{ flex: "110px" }}
          // labelAlign="left"
          // labelWrap
          // wrapperCol={{ flex: 1 }}
          colon={false}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
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
                      // convert checkNameList to lowercase
                      const convertCheckNameList = checkNameList.map(item =>
                        item.toLowerCase()
                      );
                      // convert value to lowercase
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
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label=""
            style={{
              marginBottom: 0
            }}
          >
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
              textAlign: "left"
            }}
          >
            <Checkbox
              indeterminate={
                checkedList.length > 0 && checkedList.length < totalPermissions
              }
              checked={checkedList.length === totalPermissions}
              onChange={handleCheckAllChange}
            >
              Check All
            </Checkbox>
          </Space>

          <Form.Item label="" name="permissions" valuePropName="permissions">
            <Checkbox.Group onChange={onChange} value={checkedList}>
              <Row>
                {permissions &&
                  permissions.length > 0 &&
                  permissions.map((permission: any) => {
                    return (
                      <Col span={24} key={permission.id}>
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

                        <Row>
                          {permission.children &&
                            permission.children.length > 0 &&
                            permission.children.map((item: any) => {
                              return (
                                <Col lg={4} md={12} sm={12} key={item.value}>
                                  <Space>
                                    <Card
                                      hoverable
                                      style={{
                                        // backgroundColor: "#FFC857",
                                        // fontWeight: "bold",
                                        // fontSize: "10px"
                                        backgroundColor: "#F15F22"
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
                                        {item.label}
                                      </Checkbox>
                                    </Card>
                                  </Space>
                                </Col>
                              );
                            })}
                        </Row>
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
                >
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

export default CreateRoleForm;
