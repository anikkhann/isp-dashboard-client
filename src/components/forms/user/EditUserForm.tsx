/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { UserData } from "@/interfaces/UserData";

interface AdminFormData {
  name: string;
  email: string;
  username: string;
  phone: string;
}

interface PropData {
  item: UserData;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const EditUserForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const onSubmit = (data: AdminFormData) => {
    // console.log(data)
    const { name, email, username, phone } = data;

    const formData = {
      id: item.id,
      name: name,
      email: email,
      username: username,
      phone: phone,
      isActive: isActive
    };

    try {
      axios
        .put("/api/users/update", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          MySwal.fire({
            title: "Success",
            text: data.message || "Admin Updated successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/user/user");
          });
        })
        .catch(err => {
          // console.log(err);
          setShowError(true);
          setErrorMessages(err.response.message);
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

      <div className="mt-3">
        <Form
          // {...layout}
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            name: item.name || "",
            email: item.email || "",
            username: item.username || "",
            phone: item.phone || ""
          }}
          style={{ maxWidth: "100%" }}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          scrollToFirstError
        >
          <Form.Item
            label="Name"
            style={{
              marginBottom: 0
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
            />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            style={{
              marginBottom: 0
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
              placeholder="Username"
              className={`form-control`}
              name="username"
              readOnly
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Email"
            style={{
              marginBottom: 0
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
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            style={{
              marginBottom: 0
            }}
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone!"
              },
              {
                pattern: new RegExp(/^(01)[0-9]{9}$/),
                message: "Please enter correct BD Phone number."
              }
            ]}
          >
            <Input
              type="text"
              placeholder="Phone"
              className={`form-control`}
              name="phone"
            />
          </Form.Item>

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

export default EditUserForm;
