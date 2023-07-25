/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Col, Form, Input, Row, Divider } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import axios from "axios";
import Cookies from "js-cookie";

interface RoleFormData {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().max(200).required("Name is required")
});
const defaultValues = {
  name: ""
};

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const CreateRoleForm = () => {
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [permissions, setPermissions] = useState<any[]>([]);

  const [checkedList, setCheckedList] = useState<any[]>([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
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

    const items = res.data.body.map((item: any) => {
      return {
        id: item.id,
        displayName: item.displayName,
        children: item.actionTags.map((child: any) => {
          return {
            value: item.id + "__" + child,
            label: child
          };
        })
      };
    });

    setPermissions(items);
  };
  useEffect(() => {
    getPermissions();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

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

    // console.log(rolePermissions);
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
      {showError &&
        errorMessages.length > 0 &&
        errorMessages.map((error, index) => (
          <Alert message={error} type="error" showIcon key={index} />
        ))}

      <div className="mt-3 flex justify-center items-center">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={handleSubmit(onSubmit)}
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
                  marginBottom: 0
                }}
              >
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      type="text"
                      placeholder="Name"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      name="name"
                    />
                  )}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name.message}</div>
                )}
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

          <Form.Item label="" name="permissions" valuePropName="permissions">
            <Checkbox.Group onChange={onChange}>
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
                              textAlign: "left"
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
                                  <Checkbox
                                    value={item.value}
                                    style={{
                                      display: "flex",
                                      justifyContent: "left"
                                    }}
                                  >
                                    {item.label}
                                  </Checkbox>
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

export default CreateRoleForm;
