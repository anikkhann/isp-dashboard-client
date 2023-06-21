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

import { Alert, Button, Form, Input, Select, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

interface PermissionData {
  createdOn: number;
  updatedOn: number;
  id: string;
  displayName: string;
  tag: string;
  actionTags: string[];
}
interface PropData {
  item: PermissionData;
}

interface PermissionFormData {
  displayName: string;
  tag: string;
}

const schema = yup.object().shape({
  displayName: yup.string().max(200).required("Display Name is required"),
  tag: yup.string().max(200).required("Tag is required")
});

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const tagsList = [
  {
    label: "Create",
    value: "create"
  },
  {
    label: "View",
    value: "view"
  },
  {
    label: "Update",
    value: "update"
  },
  {
    label: "List",
    value: "list"
  }
];

const EditPermissionForm = ({ item }: PropData) => {
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [actionTags, setActionTags] = useState<any[]>([]);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const handleChange = (value: any[]) => {
    // console.log("checked = ", value);
    setActionTags(value as any[]);
  };

  useEffect(() => {
    if (item) {
      const checked = item.actionTags;
      setActionTags(checked);
    }
  }, [item]);

  const defaultValues = {
    displayName: item.displayName || "",
    tag: item.tag || ""
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

  const onSubmit = (data: PermissionFormData) => {
    // console.log(data, actionTags);

    const { displayName, tag } = data;
    try {
      const token = Cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("/api/permission/update", {
          id: item.id,
          displayName: displayName,
          tag: tag,
          actionTags: actionTags
        })
        .then(res => {
          console.log(res);
          const { data } = res;

          MySwal.fire({
            title: "Success",
            text: data.message || "Permission created successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/user/permission");
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

      <div className="mt-3">
        <Form
          // {...layout}
          autoComplete="off"
          onFinish={handleSubmit(onSubmit)}
          style={{
            width: "100%"
          }}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
        >
          <Form.Item
            label="Display Name"
            style={{
              marginBottom: 0
            }}
            name="displayName"
          >
            <Controller
              name="displayName"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="text"
                  placeholder="Display Name"
                  className={`form-control ${
                    errors.displayName ? "is-invalid" : ""
                  }`}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="displayName"
                />
              )}
            />
            {errors.displayName && (
              <div className="text-danger">{errors.displayName.message}</div>
            )}
          </Form.Item>

          <Form.Item
            label="Tag"
            style={{
              marginBottom: 0
            }}
            name="tag"
          >
            <Controller
              name="tag"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="text"
                  placeholder="Tag"
                  className={`form-control ${errors.tag ? "is-invalid" : ""}`}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="tag"
                />
              )}
            />
            {errors.tag && (
              <div className="text-danger">{errors.tag.message}</div>
            )}
          </Form.Item>

          <Form.Item
            label="Action Tags"
            style={{
              marginBottom: 0
            }}
            name="actionTags"
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleChange}
                options={tagsList}
                value={actionTags}
              />
            </Space>
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

export default EditPermissionForm;
