/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
  Row,
  Col
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { ChecklistData } from "@/interfaces/ChecklistData";

interface FormData {
  title: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

interface PropData {
  item: ChecklistData;
}

const rootCategories = [
  {
    label: "zone",
    value: "zone"
  },
  {
    label: "client",
    value: "client"
  },
  {
    label: "customer",
    value: "customer"
  }
];

const EditChecklistForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [categories, setCategories] = useState<any>([]);
  const [selectCategory, setSelectCategory] = useState<any>(null);

  const [selectRootCategory, setSelectRootCategory] = useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ complainTypeId: value });
    setSelectCategory(value as any);
  };

  const handleChangeRoot = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ rootCauseCategory: value });
    setSelectRootCategory(value as any);
  };

  function getCategories() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      }
    };
    axios.post("/api/complain-type/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      const list = data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setCategories(list);
    });
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (item) {
      setSelectCategory(item.complainTypeId);
      form.setFieldsValue({
        title: item.title,
        complainTypeId: item.complainTypeId
      });
      setIsActive(item.isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: FormData) => {
    // console.log(data);
    const { title } = data;

    const formData = {
      id: item.id,
      complainTypeId: selectCategory,
      rootCauseCategory: selectRootCategory,
      title: title,
      isActive: isActive
    };

    try {
      axios
        .put("/api/checklist/update", formData)
        .then(res => {
          const { data } = res;
          MySwal.fire({
            title: "Success",
            text: data.message || "Added successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/complaint/checklist");
          });
        })
        .catch(err => {
          // console.log(err);
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
      {showError && <Alert message={errorMessages} type="error" showIcon />}

      <div className="mt-3">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            complainTypeId: "",
            rootCauseCategory: "",
            name: ""
          }}
          style={{ maxWidth: "100%" }}
          name="wrap"
          // labelCol={{ flex: "110px" }}
          // labelAlign="left"
          // labelWrap
          // wrapperCol={{ flex: 1 }}
          colon={false}
          scrollToFirstError
        >
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify="space-between"
          >
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* rootCauseCategory */}
              <Form.Item
                label="Complain Type"
                name="complainTypeId"
                rules={[
                  {
                    required: true,
                    message: "Please select Complain Type!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Complain Type"
                    onChange={handleChange}
                    options={categories}
                    value={selectCategory}
                  />
                </Space>
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* rootCauseCategory */}
              <Form.Item
                label="Root Cause Category"
                name="rootCauseCategory"
                rules={[
                  {
                    required: true,
                    message: "Please select Root Cause Category!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Root Cause Category"
                    onChange={handleChangeRoot}
                    options={rootCategories}
                    value={selectRootCategory}
                  />
                </Space>
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* Title */}
              <Form.Item
                label="Title"
                style={{
                  marginBottom: 0
                }}
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your Title!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Title"
                  className={`form-control`}
                  name="title"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* status */}
          <Form.Item
            label=""
            style={{
              marginBottom: 0
            }}
          >
            <Checkbox onChange={handleActive} checked={isActive}>
              Active
            </Checkbox>
          </Form.Item>

          {/* submit */}
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

export default EditChecklistForm;
