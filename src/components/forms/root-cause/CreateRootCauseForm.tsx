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
  /*  Select,
   Space, */
  Row,
  Col
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppSelector } from "@/store/hooks";
// import AppImageLoader from "@/components/loader/AppImageLoader";
import { Space, Select } from "antd";
interface FormData {
  title: string;
}
const complainCategoryList = [
  {
    label: "Customer",
    value: "customer"
  },
  {
    label: "Service",
    value: "parent"
  }
];
const CreateRootCauseForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [selectCategory, setSelectCategory] = useState<any>(null);

  const authUser = useAppSelector(state => state.auth.user);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };
  const handleCategoryChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ complainCategory: value });
    setSelectCategory(value as any);
  };
  useEffect(() => {
    if (authUser) {
      if (authUser.userType == "durjoy") {
        setSelectCategory("parent");
      }
      // else {
      //   setSelectCategory("customer");
      // }
    }
  }, [authUser]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { title } = data;

      const formData = {
        rootCauseCategory: selectCategory,
        title: title,
        isActive: isActive
      };

      try {
        await axios
          .post("/api/root-cause/create", formData)
          .then(res => {
            const { data } = res;

            if (data.status != 200) {
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
                router.replace("/admin/complaint/root-cause");
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
        // console.log(err)
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
          initialValues={{
            rootCauseCategory: "",
            name: ""
          }}
          style={{ maxWidth: "100%" }}
          name="wrap"
          colon={false}
          scrollToFirstError
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            {authUser && authUser.userType != "durjoy" && (
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
                  label="Ticket Category"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="complainCategory"
                  rules={[
                    {
                      required: true,
                      message: "Please select Ticket Category"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Ticket Category"
                      onChange={handleCategoryChange}
                      options={complainCategoryList}
                      value={selectCategory}
                      showSearch
                      filterOption={(input, option) => {
                        if (typeof option?.label === "string") {
                          return (
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }
                        return false;
                      }}
                    />
                  </Space>
                </Form.Item>
              </Col>
            )}
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="gutter-row"
            >
              {/* title */}
              <Form.Item
                label="Root Cause"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your Root Cause!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Root Cause"
                  className={`form-control`}
                  name="title"
                  style={{ padding: "6px" }}
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
                <Button
                  // type="primary"
                  htmlType="submit"
                  shape="round"
                  style={{
                    backgroundColor: "#F15F22",
                    color: "#FFFFFF",
                    fontWeight: "bold"
                  }}
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

export default CreateRootCauseForm;
