/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Space, Row, Col, Upload, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { TicketData } from "@/interfaces/TicketData";
// import { useAppSelector } from "@/store/hooks";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile, UploadFileStatus } from "antd/es/upload/interface";
// import AppImageLoader from "@/components/loader/AppImageLoader";

interface PropData {
  item: TicketData;
}

const EditAdminTicketForm = ({ item }: PropData) => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [file, setFile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const user = useAppSelector(state => state.auth.user);
  // console.log("user", user)

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    if (item) {
    }
  }, [item]);

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
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setTimeout(async () => {
      const { note } = data;

      const bodyData = {
        ticketId: item.id,
        note: note
      };

      const formData = new FormData();
      if (file) {
        formData.append("attachment", file);
      }
      formData.append("body", JSON.stringify(bodyData));

      try {
        await axios
          .post("/api/ticket-details/reply", formData)
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
                router.replace("/admin/complaint/admin-ticket");
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

      <div className="mt-3">
        <Form
          // {...layout}
          layout="vertical"
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
          initialValues={{
            notes: ""
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
            <Col xs={24} className="gutter-row">
              {/* note */}
              <Form.Item
                label="Note"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="note"
                rules={[
                  {
                    required: true,
                    message: "Please input your note!"
                  }
                ]}
              >
                <Input.TextArea
                  rows={4}
                  cols={16}
                  placeholder="note"
                  className={`form-control`}
                  name="note"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
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
  );
};

export default EditAdminTicketForm;
