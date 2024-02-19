/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useState } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface PermissionFormData {
  displayName: string;
  tag: string;
}

// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 18 }
// };

const tagsList = [
  {
    label: "Dashboard",
    value: "dashboard"
  },
  {
    label: "Create",
    value: "create"
  },
  {
    label: "View",
    value: "view"
  },
  {
    label: "Update",
    value: "update"
  },
  {
    label: "Delete",
    value: "delete"
  },
  {
    label: "List",
    value: "list"
  },
  {
    label: "Approve",
    value: "approve"
  },
  {
    label: "Reject",
    value: "reject"
  },
  {
    label: "ReInitiate",
    value: "reinitiate"
  },
  {
    label: "Basic Search",
    value: "basicSearch"
  },
  {
    label: "Advanced Search",
    value: "advancedSearch"
  },
  {
    label: "Top Up",
    value: "topUp"
  },
  {
    label: "Renew",
    value: "renew"
  },
  {
    label: "Disconnect",
    value: "disconnect"
  },

  {
    label: "Cancel",
    value: "cancel"
  },
  {
    label: "Customer",
    value: "customer"
  },
  {
    label: "Client Gateway Setting",
    value: "clientGatewaySetting"
  },
  {
    label: "Client Sms Alert",
    value: "clientSmsAlert"
  },
  {
    label: "Client Sms Template",
    value: "clientSmsTemplate"
  },
  {
    label: "Customer Transaction",
    value: "customerTransaction"
  },
  {
    label: "Agent Transaction",
    value: "agentTransaction"
  },
  {
    label: "Zone Transaction",
    value: "zoneTransaction"
  },
  {
    label: "Zone Revenue",
    value: "zoneRevenue"
  },
  {
    label: "SubZone Revenue",
    value: "subZoneRevenue"
  },
  {
    label: "Retailer Revenue",
    value: "retailerRevenue"
  },
  {
    label: "My Revenue",
    value: "myRevenue"
  },
  {
    label: "Mac Binding",
    value: "macBinding"
  },
  {
    label: "Download",
    value: "download"
  },
  {
    label: "email",
    value: "email"
  },
  {
    label: "mobile",
    value: "mobile"
  },
  {
    label: "dateRange",
    value: "dateRange"
  },
  {
    label: "retailer",
    value: "retailer"
  },
  {
    label: "subZone",
    value: "subZone"
  },
  {
    label: "zone",
    value: "zone"
  },
  {
    label: "client",
    value: "client"
  },
  {
    label: "package",
    value: "package"
  },
  {
    label: "distributionPop",
    value: "distributionPop"
  },
  {
    label: "distributionZone",
    value: "distributionZone"
  },
  {
    label: "Expire Date",
    value: "expireDate"
  },
  {
    label: "Zone Manager Tag",
    value: "zoneManagerTag"
  },
  {
    label: "Sub Zone Manager Tag",
    value: "subZoneManagerTag"
  },
  {
    label: "Retailer Tag",
    value: "retailerTag"
  },
  {
    label: "Package Update",
    value: "packageUpdate"
  },
  {
    label: "Status Update",
    value: "statusUpdate"
  },

  {
    label: "Distribution Zone Update",
    value: "distributionZoneUpdate"
  },

  {
    label: "Distribution Pop Update",
    value: "distributionPopUpdate"
  },

  {
    label: "Password Update",
    value: "passwordUpdate"
  },
  {
    label: "Mac Update",
    value: "macUpdate"
  },
  {
    label: "Static IP Assign",
    value: "staticIpAssign"
  },
  {
    label: "Package Migration",
    value: "packageMigration"
  },
  {
    label: "createTicket",
    value: "createTicket"
  },
  {
    label: "Download SAF Form",
    value: "downloadSafForm"
  },
  {
    label: "Live Bandwidth",
    value: "liveBandwidth"
  },
  {
    label: "Used Voucher Download",
    value: "usedVoucherDownload"
  },
  {
    label: "Unused Voucher Download",
    value: "unUsedVoucherDownload"
  },
  {
    label: "Success List",
    value: "successList"
  },
  {
    label: "Failed List",
    value: "failedList"
  },
  {
    label: "process",
    value: "process"
  }
];

const CreatePermissionForm = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [actionTags, setActionTags] = useState<any[]>([]);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const handleChange = (value: any[]) => {
    // console.log("checked = ", value);
    setActionTags(value as any[]);
    form.setFieldsValue({
      actionTags: value
    });
  };

  const onSubmit = (data: PermissionFormData) => {
    setLoading(true);
    const { displayName, tag } = data;
    try {
      const token = Cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("/api/permission/create", {
          displayName: displayName,
          tag: tag,
          actionTags: actionTags
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
              text: data.message || "Permission created successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/user/permission");
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
      //  console.log(err)
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
      {!loading && (
        <div className="my-6">
          <Form
            // {...layout}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            style={{
              width: "100%"
            }}
            name="wrap"
            // labelCol={{ flex: "110px" }}
            // labelAlign="left"
            // labelWrap
            // wrapperCol={{ flex: 1 }}
            colon={false}
            scrollToFirstError
            initialValues={{
              displayName: "",
              tag: "",
              actionTags: []
            }}
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
                  label="Display Name"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="displayName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Display Name!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="displayName"
                    className={`form-control`}
                    name="displayName"
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
                <Form.Item
                  label="Tag"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="tag"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Tag!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Tag"
                    className={`form-control`}
                    name="tag"
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
                <Form.Item
                  label="Action Tags"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="actionTags"
                  rules={[
                    {
                      required: true,
                      message: "Please select actions"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select"
                      onChange={handleChange}
                      options={tagsList}
                      value={actionTags}
                    />
                  </Space>
                </Form.Item>
              </Col>
            </Row>
            {/* <Row>
            <Col></Col>
          </Row> */}

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
      )}
    </>
  );
};

export default CreatePermissionForm;
