// ** React Imports
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input } from "antd";
import AppAxios from "@/services/AppAxios";

interface RoleFormData {
  name: string;
}

interface PropData {
  item: ItemType;
}

interface ItemType {
  id: number;
  name: string;
  slug: string;
  base: {
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
  };
}

const schema = yup.object().shape({
  name: yup.string().max(200).required("Name is required")
});

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const EditBrandForm = ({ item }: PropData) => {
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const defaultValues = {
    name: item.name
  };

  useEffect(() => {
    if (item) {
      setIsActive(item.base.is_active);
    }
  }, [item]);

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
    const { name } = data;
    try {
      AppAxios.put(`/api/v1/subcategories/${item.id}`, {
        name: name,
        is_active: isActive
      })
        .then(res => {
          console.log(res);
          const { data } = res;

          MySwal.fire({
            title: "Success",
            text: data.data.message || "Item Updated successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/purchase/sub-category");
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

export default EditBrandForm;
