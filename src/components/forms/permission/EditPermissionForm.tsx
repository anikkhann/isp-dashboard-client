/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const tagsList = [
  {
    label: "Dashboard",
    value: "dashboard"
  },
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
    label: "Delete",
    value: "delete"
  },
  {
    label: "List",
    value: "list"
  },
  {
    label: "Approve",
    value: "approve"
  },
  {
    label: "Reject",
    value: "reject"
  },
  {
    label: "Cancel",
    value: "cancel"
  }
];

const EditPermissionForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

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
      form.setFieldsValue({
        actionTags: checked
      });
      setActionTags(checked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: PermissionFormData) => {
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
          // console.log(res);
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
          onFinish={onSubmit}
          form={form}
          style={{
            width: "100%"
          }}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          initialValues={{
            displayName: item.displayName || "",
            tag: item.tag || "",
            actionTags: item.actionTags || []
          }}
        >
          <Form.Item
            label="Display Name"
            style={{
              marginBottom: 0
            }}
            name="displayName"
            rules={[
              {
                required: true,
                message: "Please input your Display Name!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="displayName"
              className={`form-control`}
              name="displayName"
            />
          </Form.Item>

          <Form.Item
            label="Tag"
            style={{
              marginBottom: 0
            }}
            name="tag"
            rules={[
              {
                required: true,
                message: "Please input your Tag!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="Tag"
              className={`form-control`}
              name="tag"
            />
          </Form.Item>

          <Form.Item
            label="Action Tags"
            style={{
              marginBottom: 0
            }}
            name="actionTags"
            rules={[
              {
                required: true,
                message: "Please select actions"
              }
            ]}
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
