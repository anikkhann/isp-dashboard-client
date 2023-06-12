// ** React Imports
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Col, Form, Input, Row } from "antd";
import AppAxios from "@/services/AppAxios";
import { CheckboxValueType } from "antd/es/checkbox/Group";

interface RoleFormData {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().max(200).required("Name is required")
});
const defaultValues = {
  name: ""
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const CreateRoleForm = () => {
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [permissions, setPermissions] = useState([]);

  const [checkedList, setCheckedList] = useState<any[]>([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const getPermissions = async () => {
    const res = await AppAxios.get("/api/v1/common/all-permissions");
    if (res.data.success) {
      console.log(res.data.data.permissions);

      const items = res.data.data.permissions.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setPermissions(items);
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
    setCheckedList(checkedValues as any[]);
  };

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
    console.log(data);
    const { name } = data;
    try {
      AppAxios.post("/api/v1/roles", {
        name: name,
        is_active: isActive,
        permissions: checkedList
      })
        .then(res => {
          console.log(res);
          const { data } = res;

          MySwal.fire({
            title: "Success",
            text: data.data.message || "Role created successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/settings/role");
          });
        })
        .catch(err => {
          console.log(err);
          setShowError(true);
          setErrorMessages(err.response.data.message);
        });
    } catch (err: any) {
      // console.log(err)
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
          onFinish={handleSubmit(onSubmit)}
          style={{ maxWidth: 800 }}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
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
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
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

          <Form.Item
            label=""
            style={{
              marginBottom: 0
            }}
          >
            <Checkbox onChange={handleActive} checked={isActive}>
              isActive
            </Checkbox>
          </Form.Item>

          <Form.Item
            label="Permissions"
            name="permissions"
            valuePropName="checked"
          >
            <Checkbox.Group onChange={onChange}>
              <Row>
                {permissions.map((item: any) => {
                  return (
                    <Col span={8} key={item.value}>
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
            </Checkbox.Group>
          </Form.Item>

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

export default CreateRoleForm;
