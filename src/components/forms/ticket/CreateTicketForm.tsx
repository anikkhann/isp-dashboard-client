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
  Radio
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile, UploadFileStatus } from "antd/es/upload/interface";
// import { useAppSelector } from "@/store/hooks";

const categories = [
  {
    label: "customer",
    value: "customer"
  },
  {
    label: "parent",
    value: "parent"
  }
];

const CreateTicketForm = () => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [file, setFile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [selectCategory, setSelectCategory] = useState<any>(null);

  const [customers, setCustomers] = useState<any>([]);

  const [complainTypes, setComplainTypes] = useState<any>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedComplainType, setSelectedComplainType] = useState<any>(null);

  const [checkListItems, setCheckListItems] = useState<any>([]);

  const [assignedTo, setAssignedTo] = useState<any>(null);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState<any>(null);

  // const user = useAppSelector(state => state.auth.user);
  // console.log("user", user)

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ ticketCategory: value });
    setSelectCategory(value as any);
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

  const getCustomers = async () => {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      }
    };

    const res = await axios.post("/api/customer/get-list", body);
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setCustomers(items);
    }
  };

  // customerId
  const handleCustomerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerId: value });
    setSelectedCustomer(value as any);
  };

  const getAssignedTo = async (selectedCustomer: any) => {
    // console.log("selectedCustomer", selectedCustomer)
    const res = await axios.get(
      `/api/ticket/get-assigned-to/${selectedCustomer}`
    );
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.name,
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
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
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
  };

  const getChecklists = async () => {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
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
    getCustomers();
    getComplainTypes();
    getChecklists();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      getAssignedTo(selectedCustomer);
    }
  }, [selectedCustomer]);

  const onSubmit = (data: any) => {
    console.log(data);
    // Filter keys to keep only those starting with "checklist-"
    // Filter keys to keep only those starting with "checklist-"
    const filteredData = Object.keys(data).reduce((acc: any, key) => {
      if (key.startsWith("checklist-")) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    console.log(filteredData);

    // Remove "checklist-" prefix and set key-value pairs
    const cleanedChecklistData = Object.keys(filteredData).reduce(
      (acc: any, key: any) => {
        const cleanedKey = key.replace("checklist-", ""); // Remove "checklist-" prefix
        acc[cleanedKey] = data[key];
        return acc;
      },
      {}
    );

    // Convert to JSON format
    const checkListJson = JSON.stringify(cleanedChecklistData, null, 2);

    const formData = new FormData();
    if (file) {
      formData.append("attachment", file);
    }
    formData.append("ticketCategory", selectCategory);
    formData.append("customerId", selectedCustomer);
    formData.append("complainTypeId", selectedComplainType);
    formData.append("complainDetails", data.complainDetails);
    formData.append("checkList", checkListJson);
    formData.append("assignedTo", selectedAssignedTo);

    try {
      axios
        .post("/api/ticket/create", formData)
        .then(res => {
          const { data } = res;
          MySwal.fire({
            title: "Success",
            text: data.message || "Added successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/complaint/customer-ticket");
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
            ticketCategory: "",
            customerId: "",
            complainTypeId: "",
            complainDetails: "",
            assignedTo: ""
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
              {/* ticketCategory */}
              <Form.Item
                label="Category"
                name="ticketCategory"
                rules={[
                  {
                    required: true,
                    message: "Please select Category!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
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
              {/* customerId */}
              <Form.Item
                label="Customer"
                name="customerId"
                rules={[
                  {
                    required: true,
                    message: "Please select!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={handleCustomerChange}
                    options={customers}
                    value={selectedCustomer}
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
              {/* complainTypeId */}
              <Form.Item
                label="Complain Type"
                name="complainTypeId"
                rules={[
                  {
                    required: true,
                    message: "Please select!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={handleComplainTypeChange}
                    options={complainTypes}
                    value={selectedComplainType}
                  />
                </Space>
              </Form.Item>
            </Col>
            {selectCategory == "customer" && selectedCustomer != null && (
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
                <Form.Item
                  label="Assigned To"
                  name="assignedTo"
                  rules={[
                    {
                      required: true,
                      message: "Please select!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      onChange={handleAssignedToChange}
                      options={assignedTo}
                      value={selectedAssignedTo}
                    />
                  </Space>
                </Form.Item>
              </Col>
            )}

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* complainDetails */}
              <Form.Item
                label="Complain Details"
                style={{
                  marginBottom: 0
                }}
                name="complainDetails"
                rules={[
                  {
                    required: true,
                    message: "Please input your complain Details!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Complain Details"
                  className={`form-control`}
                  name="complainDetails"
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
            ></Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            ></Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            ></Col>
          </Row>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify="space-between"
          >
            <Col>
              <Form.Item
                label="Attachment"
                style={{
                  marginBottom: 0,
                  width: "100%",
                  textAlign: "center"
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
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col>
              {/* checklist */}
              {checkListItems.map((itemData: any, index: any) => (
                <Form.Item
                  key={index}
                  label={itemData.title}
                  name={`checklist-${itemData.title}`}
                  rules={[
                    {
                      required: true,
                      message: "Please select!"
                    }
                  ]}
                  style={{
                    marginBottom: 0,
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
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
                </Form.Item>
              ))}
            </Col>
          </Row>

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

export default CreateTicketForm;
