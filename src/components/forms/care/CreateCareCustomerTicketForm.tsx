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
  Input,
  Select,
  Space,
  Row,
  Col,
  Upload,
  Radio,
  Steps
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile, UploadFileStatus } from "antd/es/upload/interface";
import { CustomerData } from "@/interfaces/CustomerData";
// import AppImageLoader from "@/components/loader/AppImageLoader";
// import { useAppSelector } from "@/store/hooks";

const steps = [
  {
    title: "Complaint",
    content: "complain"
  },
  {
    title: "Attachments",
    content: "attachments"
  },
  {
    title: "Assign",
    content: "assign"
  }
];
// const steps = [
//   {
//     title: "customer",
//     content: "customer"
//   },
//   {
//     title: "Complain",
//     content: "complain"
//   },
//   {
//     title: "Attachments",
//     content: "attachments"
//   },
//   {
//     title: "Assign",
//     content: "assign"
//   }
// ];

interface PropData {
  item: CustomerData;
}

const CreateCareCustomerTicketForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [file, setFile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const [customers, setCustomers] = useState<any>([]);

  // const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [complainTypes, setComplainTypes] = useState<any>([]);

  const [selectedComplainType, setSelectedComplainType] = useState<any>(null);

  const [checkListItems, setCheckListItems] = useState<any>([]);

  const [assignedTo, setAssignedTo] = useState<any>(null);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState<any>(null);

  const [checkListDataJson, setCheckListDataJson] = useState<any>(null);

  // const user = useAppSelector(state => state.auth.user);
  // console.log("user", user)

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [formValues, setFormValues] = useState<any>({
    complainTypeId: "",
    complainDetails: "",
    assignedTo: ""
  });

  // steps
  const items = steps.map(item => ({ key: item.title, title: item.title }));
  // steps
  const [current, setCurrent] = useState(0);

  const next = async () => {
    try {
      if (current === 0) {
        const fieldsToValidate = ["complainTypeId"];
        // await form.validateFields(["complainTypeId"]);
        // Assuming `checkListItems` is the array containing your checklist items
        checkListItems.forEach((itemData: any) => {
          fieldsToValidate.push(`checklist-${itemData.title}`);
        });
        await form.validateFields(fieldsToValidate);
        const fields = form.getFieldsValue();

        const filteredData = Object.keys(fields).reduce((acc: any, key) => {
          if (key.startsWith("checklist-")) {
            const cleanedKey = key.replace("checklist-", "");
            acc[cleanedKey] = fields[key];
          }
          return acc;
        }, {});

        const formatCheckList = Object.keys(filteredData).map(key => {
          return {
            title: key,
            status: filteredData[key]
          };
        });

        setCheckListDataJson(formatCheckList);

        setFormValues({
          ...formValues,
          complainTypeId: form.getFieldValue("complainTypeId")
        });

        setCurrent(current + 1);
      } else if (current === 1) {
        await form.validateFields(["complainDetails"]);

        setFormValues({
          ...formValues,
          complainDetails: form.getFieldValue("complainDetails")
        });
        // Proceed to the next step
        setCurrent(current + 1);
      } else if (current === 2) {
        await form.validateFields(["assignedTo"]);

        setFormValues({
          ...formValues,
          assignedTo: form.getFieldValue("assignedTo")
        });
      }

      setCurrent(current + 1);
    } catch (error: any) {
      console.error("Error during form submission:", error.message);

      // You can handle the error here, e.g., display an error message to the user
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleFileChange: UploadProps["onChange"] = ({
    fileList: newFileList
  }) => {
    // only remove the files that are not uploaded
    const filteredList = newFileList.filter(
      file =>
        file.status !== "removed" &&
        file.status !== "error" &&
        file.status !== "uploading"
    ) as UploadFile[];

    setFileList(filteredList);
  };

  const dummyAction = (options: any) => {
    const { file } = options;
    console.log("Dummy action triggered. File:", file);

    fileList.push({
      uid: file.uid,
      name: file.name,
      status: "done" as UploadFileStatus
    });
    setFile(file);
  };

  const uploadButton = (
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  );

  const getAssignedTo = async (selectedCustomer: any) => {
    // console.log("selectedCustomer", selectedCustomer)
    const res = await axios.get(
      `/api/ticket/get-assigned-to/${selectedCustomer}`
    );
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.title,
          value: item.id
        };
      });
      setAssignedTo(items);
    }
  };

  // assignedTo
  const handleAssignedToChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ assignedTo: value });
    setSelectedAssignedTo(value as any);
  };

  const getComplainTypes = async () => {
    const body = {
      meta: {
        // sort: [
        //   {
        //     order: "asc",
        //     field: "name"
        //   }
        // ]
      },
      body: {
        complainCategory: "customer",
        isActive: true
      }
    };

    const res = await axios.post("/api/complain-type/get-list", body);
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setComplainTypes(items);
    }
  };

  // complainTypeId
  const handleComplainTypeChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ complainTypeId: value });
    setSelectedComplainType(value as any);

    if (!value) {
      setCheckListItems([]);
    }
  };

  const getChecklists = async (complainId: string) => {
    const body = {
      meta: {
        // sort: [
        //   {
        //     order: "asc",
        //     field: "name"
        //   }
        // ]
      },
      body: {
        complainType: {
          id: complainId
        },
        isActive: true
      }
    };

    const res = await axios.post("/api/checklist/get-list", body);
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          title: item.title,
          value: "yes"
        };
      });
      setCheckListItems(items);
    }
  };

  useEffect(() => {
    getComplainTypes();
  }, []);

  useEffect(() => {
    if (selectedComplainType) {
      getChecklists(selectedComplainType);
    }
  }, [selectedComplainType]);

  useEffect(() => {
    if (item) {
      getAssignedTo(item.id);
    }
  }, [item]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async () => {
    setLoading(true);
    // Filter keys to keep only those starting with "checklist-"
    setTimeout(async () => {
      // Convert to JSON format
      const checkListJson = JSON.stringify(checkListDataJson, null, 2);

      // const checkListArray = JSON.parse(checkListJson);

      const bodyData = {
        ticketCategory: "customer",
        customerId: item.id,
        complainTypeId: selectedComplainType,
        complainDetails: formValues.complainDetails,
        checkList: checkListJson,
        assignedToId: selectedAssignedTo
      };

      const formData = new FormData();
      if (file) {
        formData.append("attachment", file);
      }
      formData.append("body", JSON.stringify(bodyData));

      try {
        await axios
          .post("/api/ticket/create", formData)
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
                text: data.message || "Created successfully",
                icon: "success"
              }).then(() => {
                router.replace("/admin/customer-care");
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
      <>
        <div>
          <div className="flex justify-content-between mb-10 ">
            <Steps
              size="small"
              current={current}
              items={items}
              direction="horizontal"
            />
          </div>
        </div>

        <div className="mt-3">
          <Form
            // {...layout}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{
              ticketCategory: "",
              customerId: "",
              complainTypeId: "",
              complainDetails: "",
              assignedTo: ""
            }}
            style={{ maxWidth: "100%" }}
            name="wrap"
            colon={false}
            scrollToFirstError
          >
            {/* {current === 0 && (
              <>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  justify="center"
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
                      label="Customer"
                      name="customerId"
                      style={{
                        marginBottom: 0,
                        fontWeight: "bold"
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please select Customer!"
                        }
                      ]}
                    >
                      <Space style={{ width: "100%" }} direction="vertical">
                        <Select
                          allowClear
                          style={{ width: "100%", textAlign: "start" }}
                          placeholder="Please select Customer"
                          onChange={handleCustomerChange}
                          options={customers}
                          value={selectedCustomer}
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
                </Row>
              </>
            )} */}

            {current === 0 && (
              <>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  justify="center"
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
                    {/* complainTypeId */}
                    <Form.Item
                      label="Ticket Type"
                      name="complainTypeId"
                      style={{
                        marginBottom: 0,
                        fontWeight: "bold"
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please select Ticket Type!"
                        }
                      ]}
                    >
                      <Space style={{ width: "100%" }} direction="vertical">
                        <Select
                          allowClear
                          style={{ width: "100%", textAlign: "start" }}
                          placeholder="Please select Ticket Type"
                          onChange={handleComplainTypeChange}
                          options={complainTypes}
                          value={selectedComplainType}
                        />
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
                {checkListItems.length > 0 && (
                  <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    justify="center"
                  >
                    <Col>
                      {/* checklist */}
                      {checkListItems.map((itemData: any, index: any) => (
                        <Form.Item
                          key={index}
                          // label={itemData.title}
                          name={`checklist-${itemData.title}`}
                          rules={[
                            {
                              required: true,
                              message: "Please select an option!"
                            }
                          ]}
                        >
                          <div
                            style={{
                              marginBottom: 0,
                              display: "flex",
                              width: "100%",
                              flexDirection: "row",
                              border: "2px solid #000000",
                              padding: "10px",
                              borderRadius: "4px"
                            }}
                          >
                            <span
                              style={{
                                width: "100%",
                                textAlign: "start",
                                marginRight: "10px"
                              }}
                            >
                              <span style={{ color: "red", marginLeft: "5px" }}>
                                *
                              </span>
                              {itemData.title}
                            </span>
                            <Radio.Group
                              style={{
                                display: "flex",
                                justifyContent: "start"
                              }}
                              key={index}
                            >
                              <Radio value="yes">Yes</Radio>
                              <Radio value="no">No</Radio>
                            </Radio.Group>
                          </div>
                        </Form.Item>
                      ))}
                    </Col>
                  </Row>
                )}
              </>
            )}

            {current === 1 && (
              <>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  justify="center"
                >
                  <Col xs={24} className="gutter-row">
                    {/* complainDetails */}
                    <Form.Item
                      label="Note"
                      style={{
                        marginBottom: 0,
                        fontWeight: "bold"
                      }}
                      name="complainDetails"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Ticket Details!"
                        }
                      ]}
                    >
                      <Input.TextArea
                        rows={4}
                        cols={16}
                        placeholder="Ticket Details"
                        className={`form-control`}
                        name="complainDetails"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  justify="center"
                >
                  <Col>
                    <Form.Item
                      label="Attachment"
                      style={{
                        marginBottom: 0,
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "bold"
                      }}
                    >
                      <Space style={{ width: "100%" }} direction="vertical">
                        <Upload
                          customRequest={dummyAction}
                          onChange={handleFileChange}
                          maxCount={1}
                          listType="picture"
                          fileList={fileList}
                        >
                          {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            {current === 2 && (
              <>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  justify="center"
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
                    {/* assignedTo */}
                    <Form.Item label="Assigned To" name="assignedTo">
                      <Space style={{ width: "100%" }} direction="vertical">
                        <Select
                          allowClear
                          style={{ width: "100%", textAlign: "start" }}
                          placeholder="Please select Assigned To"
                          onChange={handleAssignedToChange}
                          options={assignedTo}
                          value={selectedAssignedTo}
                        />
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            {/* submit */}
            <Row justify="center">
              <Col>
                <div style={{ marginTop: 24 }}>
                  {current > 0 && (
                    <Button
                      style={{
                        margin: "0 8px",
                        fontWeight: "bold",
                        color: "#FFFFFF"
                      }}
                      onClick={() => prev()}
                      shape="round"
                      type="primary"
                    >
                      Previous
                    </Button>
                  )}
                  {current < steps.length - 1 && (
                    <Button
                      // type="primary"
                      shape="round"
                      onClick={() => next()}
                      style={{
                        backgroundColor: "#F15F22",
                        color: "#FFFFFF",
                        fontWeight: "bold"
                      }}
                    >
                      Next
                    </Button>
                  )}
                </div>

                <Form.Item style={{ margin: "0 8px" }}>
                  <div style={{ marginTop: 24 }}>
                    {current === steps.length - 1 && (
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
                    )}
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div className="bg-gray-400 flex flex-col gap-1 ">
            <div className="rounded-sm w-full grid grid-cols-12 bg-white shadow p-6 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform">
              <div className="col-span-11 xl:-ml-5">
                <p className="text-blue-600 font-semibold text-left text-lg">
                  <span className="text-danger">
                    * Attachment must be either JPG or PNG format and should not
                    exceed 10 MB in size.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default CreateCareCustomerTicketForm;
