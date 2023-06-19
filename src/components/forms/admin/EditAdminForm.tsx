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

import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Upload
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { basename } from "path";
import axios from "axios";

interface PropData {
  item: DataType;
}

interface AdminFormData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone: string;
}

interface DataType {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  roles: any[];
  base: {
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
  };
}

const schema = yup.object().shape({
  first_name: yup.string().max(200).required("First Name is required"),
  last_name: yup.string().max(200).required("Last Name is required"),
  email: yup.string().email().required("Email is required"),

  username: yup.string().max(200).required("Username is required"),
  phone: yup.string().max(200).required("Phone is required")
});

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const EditAdminForm = ({ item }: PropData) => {
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [roles, setRoles] = useState<any[]>([]);

  const [checkedList, setCheckedList] = useState<any[]>([]);

  const [isActive, setIsActive] = useState(true);

  const [fileList, setFileList] = useState<any[]>([]);

  const [selectImage, setSelectImage] = useState<any>(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const defaultValues = {
    first_name: item.first_name || "",
    last_name: item.last_name || "",
    email: item.email,
    password: "",
    confirm_password: "",
    username: item.username,
    phone: item.phone
  };

  const handleChangeImage = (info: any) => {
    console.log(info);
    const fileList = [...info.fileList];
    setFileList(fileList);
    setSelectImage(info.file.originFileObj);
    // setSelectImage(info.file);
  };

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const getRoles = async () => {
    const res = await axios.get("/api/v1/common/all-roles");
    if (res.data.success) {
      console.log(res.data.data.roles);

      const items = res.data.data.roles.map((item: any) => {
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
      const checked = item.roles.map((item: any) => {
        return item.id;
      });
      setCheckedList(checked);

      setIsActive(item.base.is_active);
      if (item.avatar) {
        setFileList([
          {
            uid: "-1",
            name: basename(item.avatar),
            status: "done",
            url: item.avatar
          }
        ]);
      }
    }
  }, [item]);

  const handleChange = (value: any[]) => {
    console.log("checked = ", value);
    setCheckedList(value as any[]);
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

  const onSubmit = (data: AdminFormData) => {
    // console.log(data);
    const { first_name, last_name, email, username } = data;

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("phone", data.phone);
    formData.append("is_active", JSON.stringify(isActive));
    formData.append("roles", JSON.stringify(checkedList));

    if (selectImage) {
      formData.append("file", selectImage, selectImage.name);
    }

    try {
      axios
        .post(`/api/v1/admins/${item.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
          const { data } = res;

          MySwal.fire({
            title: "Success",
            text: data.data.message || "Admin Updated successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/settings/admin");
          });
        })
        .catch((err: any) => {
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
          method="post"
          encType="multipart/form-data"
        >
          <Form.Item
            label="First Name"
            style={{
              marginBottom: 0
            }}
          >
            <Controller
              name="first_name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="text"
                  placeholder="First Name"
                  className={`form-control ${
                    errors.first_name ? "is-invalid" : ""
                  }`}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="first_name"
                />
              )}
            />
            {errors.first_name && (
              <div className="text-danger">{errors.first_name.message}</div>
            )}
          </Form.Item>

          <Form.Item
            label="Last Name"
            style={{
              marginBottom: 0
            }}
          >
            <Controller
              name="last_name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="text"
                  placeholder="Last Name"
                  className={`form-control ${
                    errors.last_name ? "is-invalid" : ""
                  }`}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="last_name"
                />
              )}
            />
            {errors.last_name && (
              <div className="text-danger">{errors.last_name.message}</div>
            )}
          </Form.Item>

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
                onChange={handleChange}
                options={roles}
              />
            </Space>
          </Form.Item>

          <Form.Item
            label="Username"
            style={{
              marginBottom: 0
            }}
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="text"
                  placeholder="Username"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="username"
                />
              )}
            />
            {errors.username && (
              <div className="text-danger">{errors.username.message}</div>
            )}
          </Form.Item>

          <Form.Item
            label="Email"
            style={{
              marginBottom: 0
            }}
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="email"
                  placeholder="Email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="email"
                />
              )}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </Form.Item>

          <Form.Item
            label="Phone"
            style={{
              marginBottom: 0
            }}
          >
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="text"
                  placeholder="Phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="phone"
                />
              )}
            />
            {errors.phone && (
              <div className="text-danger">{errors.phone.message}</div>
            )}
          </Form.Item>

          <Form.Item
            label=""
            style={{
              marginBottom: 0
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={handleChangeImage}
                fileList={fileList}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
            </Space>
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

export default EditAdminForm;
