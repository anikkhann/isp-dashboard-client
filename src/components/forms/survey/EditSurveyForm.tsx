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
// import AppImageLoader from "@/components/loader/AppImageLoader";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SurveyData } from "@/interfaces/SurveyData";
interface FormData {
  options: OptionData[];
  type: string;
  title: string;
}

interface OptionData {
  option: string;
}

const types = [
  {
    label: "Troubleshoot",
    value: "Troubleshoot"
  },
  {
    label: "Survey",
    value: "Survey"
  }
];

interface PropData {
  item: SurveyData;
}

const EditSurveyForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [type, setType] = useState<any>(null);

  const [optionsValue, setOptionsValue] = useState<any[]>([]);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleChange = (value: any) => {
    form.setFieldsValue({ type: value });
    setType(value as any);
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        type: item.type,
        title: item.title
      });

      // convert options to array
      const options = item.options
        .slice(1, -1) // Remove the curly braces
        .split(",")
        .map(option => option.replace(/'/g, "").trim());

      const newOptions = options.map((option: any, index: number) => {
        return {
          option: option,
          index: index
        };
      });

      setOptionsValue(newOptions);

      setType(item.type);

      setIsActive(item.isActive);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      // const { title, type, options } = data;
      const { title, type, options: newOptions } = data;

      // Combine existing options with newly added options
      const allOptions = [...optionsValue, ...newOptions];

      // Extract values from the array of objects
      // const values = options.map((obj: { option: any }) => obj.option);
      // Extract values from the array of objects
      const values = allOptions.map((obj: { option: any }) => obj.option);
      // Create a string by joining the values with commas and formatting
      const resultString = `{${values
        .map((value: any) => `'${value}'`)
        .join(",")}}`;

      const formData = {
        id: item.id,
        type: type,
        title: title,
        options: resultString,
        isActive: isActive
      };

      try {
        await axios
          .put("/api/troubleshoot-survey/update", formData)
          .then(res => {
            // console.log(res);
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
                text: data.message || "subscription Added successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/client/survey");
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
            type: "",
            title: ""
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
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="gutter-row"
            >
              {/* type*/}

              <Form.Item
                label="Type"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please select type!"
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
                    value={type}
                  />
                </Space>
              </Form.Item>
            </Col>
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
                label="Title"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your title!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="title"
                  className={`form-control`}
                  name="title"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                label="Options"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                // name="options"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your title!"
                //   }
                // ]}
              >
                <div className="text-left ">
                  {/* Parse item.options to extract individual options */}
                  {item.options && item.options.length > 0 && (
                    <div className="flex">
                      {item.options
                        .replace(/^\{|\}$/g, "") // Remove surrounding curly braces
                        .replace(/'/g, "") // Remove double quotes
                        .split(/,(?=(?:(?:[^']*'){2})*[^']*$)/) // Split by comma excluding commas inside single quotes

                        .map((option, index, array) => (
                          <div className="square" key={option.trim()}>
                            <p className="">
                              {option.trim()}
                              {index !== array.length - 1 ? ", " : ""}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>

          {!loading && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                <Form.List name="options" initialValue={optionsValue}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: "flex",

                            marginBottom: 8,
                            width: "90%"
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            label="Options"
                            name={[name, "option"]}
                            rules={[
                              { required: true, message: "Missing option" }
                            ]}
                            style={{
                              width: "100%",
                              marginBottom: 0,
                              fontWeight: "bold"
                            }}
                          >
                            <Input placeholder="Option" />
                          </Form.Item>

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}

                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
          )}

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

export default EditSurveyForm;
