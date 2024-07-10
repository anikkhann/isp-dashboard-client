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
import {
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined
} from "@ant-design/icons";
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
// interface Item {
//   id: number;
//   name: string;
// }

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

  const [optionsValue, setOptionsValue] = useState<OptionData[]>([]);
  console.log("options", optionsValue);

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
      const setString = item.options;
      const jsonString = setString.replace(/{|}/g, "").replace(/'/g, '"');
      const arrayString = `[${jsonString}]`;

      try {
        const parsedArray = JSON.parse(arrayString);
        const optionsArray = parsedArray.map((option: string) => ({ option }));
        setOptionsValue(optionsArray);
      } catch (error) {
        console.error("Failed to parse options:", error);
      }
      // convert options to array
      // const options = item.options
      //   .slice(1, -1) // Remove the curly braces
      //   .split(",")
      //   .map(option => option.replace(/'/g, "").trim());

      // const newOptions = options.map((option: any, index: number) => {
      //   return {
      //     option: option,
      //     index: index
      //   };
      // });

      // setOptionsValue(newOptions);

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
    console.log("data", data);
    setLoading(true);
    setTimeout(async () => {
      const { title, type, options } = data;
      // Ensure options is an array
      const optionsArray = Array.isArray(options) ? options : [];
      // Combine existing options with newly added options
      const allOptions = [...optionsValue, ...optionsArray];

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
  // const deleteItem = (index: number) => {
  //   setOptionsValue(prevItems => prevItems.filter((item, i) => i !== index));
  // };
  // const deleteItem = (id: number) => {
  //   setItems(prevItems => prevItems.filter(item => item.id !== id));
  // };
  const handleDeleteOption = (index: number) => {
    const updatedOptions = [...optionsValue];
    updatedOptions.splice(index, 1);
    setOptionsValue(updatedOptions);
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
                {/*  initialValue={optionsValue} */}
                <Form.List name="options">
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
                {/* <div>
                  <h1>Items</h1>
                  <ul>
                    {optionsValue.map((item, index) => (
                      <li key={index}>
                        {item.option}
                        <button onClick={() => deleteItem(index)}>
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </Col>
            </Row>
          )}

          {/*  */}
          {/*  */}
          {/* mx-auto */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              xxl={24}
              className="gutter-row"
            >
              <Form.Item
                label="Options"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
              >
                <div className="max-w-7xl  mt-10">
                  {/* space-y-4 flex flex-col md:flex-row md:justify-between justify-between */}
                  {optionsValue?.length > 0 && (
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {optionsValue.map((option, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center p-2 bg-white shadow rounded-md hover:bg-gray-50"
                        >
                          <span className="text-gray-700">
                            {option.option.trim()}
                          </span>
                          <button
                            onClick={() => handleDeleteOption(index)}
                            className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                          >
                            {/* <svg
                       className="h-6 w-6"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth="2"
                         d="M6 18L18 6M6 6l12 12"
                       />
                     </svg> */}
                            <DeleteOutlined className="cursor-pointer" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
