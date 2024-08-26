/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Alert,
  Button,
  Form,
  Row,
  Col,
  Input,
  Checkbox,
  Space,
  Select
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
// import AppImageLoader from "@/components/loader/AppImageLoader";

interface AccountHeadFormData {
  title: string;
  type: string;
  description: string;

  isActive: boolean;
}

const types = [
  {
    label: "Income",
    value: "income"
  },
  {
    label: "Expense",
    value: "expense"
  }
];

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

interface PropData {
  item: any;
}

const EditAccountHeadForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [selectType, setSelectType] = useState<string>(item.type);
  const [isActive, setIsActive] = useState<boolean>(true);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    setIsActive(item.isActive);
    if (item) {
      form.setFieldsValue({
        title: item.title,
        type: item.type,
        description: item.description
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({
      type: value
    });
    setSelectType(value as any);
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const onSubmit = async (data: AccountHeadFormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { title, description } = data;

      const formData = {
        id: item.id,
        title: title,
        type: selectType,
        description: description,

        isActive: isActive
      };

      try {
        await axios
          .put("/api/account-head/update", formData)
          .then(res => {
            // console.log(res);
            const { data } = res;

            if (data.status != 200) {
              setShowError(true);
              setErrorMessages(data.message);
              MySwal.fire({
                title: "Error",
                text: data.message || "Something went wrong",
                icon: "error"
              });
            }

            if (data.status == 200) {
              MySwal.fire({
                title: "Success",
                text: data.message || "Added successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/accounting/account-head");
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
    }, 2000);
  };

  return (
    <>
      {/* {loading && <AppImageLoader />} */}

      {showError && <Alert message={errorMessages} type="error" showIcon />}

      {/* {!loading && ( */}
      <div className="mt-3">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{}}
          style={{ maxWidth: "100%" }}
          name="wrap"
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
              <Form.Item
                label="Account Head"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your Account Head!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Account Head"
                  className={`form-control`}
                  name="title"
                  style={{ padding: "6px" }}
                />
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
              {/* type */}
              <Form.Item
                label="Account Head Type"
                name="type"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                rules={[
                  {
                    required: true,
                    message: "Please select Account Head Type!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={types}
                    value={selectType}
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
              {/* description */}
              <Form.Item
                label="Description"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="description"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input description!"
                //   }
                // ]}
              >
                <Input.TextArea
                  rows={4}
                  cols={16}
                  className={`form-control`}
                  name="description"
                  placeholder="Description"
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
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      {/* )} */}
    </>
  );
};

export default EditAccountHeadForm;
