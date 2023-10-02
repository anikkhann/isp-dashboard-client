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
  Space,
  Row,
  Col,
  Upload,
  Input,
  Select
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { EmailTemplateData } from "@/interfaces/EmailTemplateData";
// import { useAppSelector } from "@/store/hooks";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile, UploadFileStatus } from "antd/es/upload/interface";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface PropData {
  item: EmailTemplateData;
}

interface FormData {
  brandOf: string;
  chequeInFavour: string;
  supportNumber: string;
  supportEmail: string;
  phone: string;
  address: string;
  mushak: string;
  website: string;
  cc: string;
  bcc: string;
}

const UpdateEmailTemplateForm = ({ item }: PropData) => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [emailSettings, setEmailSettings] = useState<any[]>([]);
  const [selectedEmailSettings, setSelectedEmailSettings] = useState<any>(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [file, setFile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const user = useAppSelector(state => state.auth.user);
  // console.log("user", user)

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleEmailSettingsChange = (value: any) => {
    setSelectedEmailSettings(value);
    form.setFieldsValue({
      emailSettingsId: value
    });
  };

  function getEmailSettings() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "smtpAccountName"
          }
        ]
      },
      body: {
        isActive: true
      }
    };
    axios.post("/api/email-settings/get-list", body).then(res => {
      // console.log(res);
      const { data } = res;

      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const list = data.body.map((item: any) => {
        return {
          label: item.smtpAccountName,
          value: item.id
        };
      });

      setEmailSettings(list);
    });
  }

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        brandOf: item.brandOf,
        chequeInFavour: item.chequeInFavour,
        supportNumber: item.supportNumber,
        supportEmail: item.supportEmail,
        phone: item.phone,
        address: item.address,
        mushak: item.mushak,
        website: item.website,
        cc: item.cc,
        bcc: item.bcc
      });

      // if (item.emailSettingsId) {
      //   setSelectedEmailSettings(item.emailSettingsId);
      //   form.setFieldsValue({
      //     emailSettingsId: item.emailSettingsId
      //   })
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    getEmailSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const {
      brandOf,
      chequeInFavour,
      supportNumber,
      supportEmail,
      phone,
      address,
      mushak,
      website,
      cc,
      bcc
    } = data;

    const bodyData = {
      id: item.id,
      brandOf: brandOf,
      chequeInFavour: chequeInFavour,
      supportNumber: supportNumber,
      supportEmail: supportEmail,
      phone: phone,
      address: address,
      mushak: mushak,
      website: website,
      emailSettingsId: selectedEmailSettings,
      cc: cc,
      bcc: bcc
    };

    const formData = new FormData();
    formData.append("_method", "put");
    if (file) {
      formData.append("logo", file);
    }
    formData.append("body", JSON.stringify(bodyData));

    try {
      axios
        .put("/api/email-template-settings/update", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
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
              text: data.message || "Updated successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/notification/email/email-template");
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
  };

  return (
    <>
      {loading && <AppImageLoader />}
      {showError && <Alert message={errorMessages} type="error" showIcon />}

      <div className="mt-3">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            brandOf: "",
            chequeInFavour: "",
            supportNumber: "",
            supportEmail: "",
            phone: "",
            address: "",
            mushak: "",
            website: "",
            cc: "",
            bcc: ""
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
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="gutter-row"
            >
              {/* brandOf */}
              <Form.Item
                label="Brand Of"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="brandOf"
                rules={[
                  {
                    required: true,
                    message: "Please input Brand of!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="brandOf"
                  className={`form-control`}
                  name="brandOf"
                  style={{ padding: "6px" }}
                />
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
              {/* chequeInFavour */}
              <Form.Item
                label="chequeInFavour"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="chequeInFavour"
                rules={[
                  {
                    required: true,
                    message: "Please input chequeInFavour!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="chequeInFavour"
                  className={`form-control`}
                  name="chequeInFavour"
                  style={{ padding: "6px" }}
                />
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
              {/* supportNumber */}
              <Form.Item
                label="supportNumber"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="supportNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input supportNumber!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="supportNumber"
                  className={`form-control`}
                  name="supportNumber"
                  style={{ padding: "6px" }}
                />
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
              {/* supportEmail */}
              <Form.Item
                label="supportEmail"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="supportEmail"
                rules={[
                  {
                    required: true,
                    message: "Please input supportEmail!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="supportEmail"
                  className={`form-control`}
                  name="supportEmail"
                  style={{ padding: "6px" }}
                />
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
              {/* phone */}
              <Form.Item
                label="phone"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input phone!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="phone"
                  className={`form-control`}
                  name="phone"
                  style={{ padding: "6px" }}
                />
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
              {/* address */}
              <Form.Item
                label="address"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input address!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="address"
                  className={`form-control`}
                  name="address"
                  style={{ padding: "6px" }}
                />
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
              {/* mushak */}
              <Form.Item
                label="mushak"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="mushak"
                rules={[
                  {
                    required: true,
                    message: "Please input mushak!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="mushak"
                  className={`form-control`}
                  name="mushak"
                  style={{ padding: "6px" }}
                />
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
              {/* website */}
              <Form.Item
                label="website"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="website"
                rules={[
                  {
                    required: true,
                    message: "Please input website!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="website"
                  className={`form-control`}
                  name="website"
                  style={{ padding: "6px" }}
                />
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
              {/* cc */}
              <Form.Item
                label="cc"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="cc"
                rules={[
                  {
                    required: true,
                    message: "Please input cc!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="cc"
                  className={`form-control`}
                  name="cc"
                  style={{ padding: "6px" }}
                />
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
              {/* bcc */}
              <Form.Item
                label="bcc"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="bcc"
                rules={[
                  {
                    required: true,
                    message: "Please input Bcc!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="bcc"
                  className={`form-control`}
                  name="bcc"
                  style={{ padding: "6px" }}
                />
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
              {/* emailSettingsId */}
              <Form.Item
                label="Email Settings"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="emailSettingsId"
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select"
                    onChange={handleEmailSettingsChange}
                    options={emailSettings}
                    value={selectedEmailSettings}
                  />
                </Space>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col>
              <Form.Item
                label="Logo"
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

export default UpdateEmailTemplateForm;
