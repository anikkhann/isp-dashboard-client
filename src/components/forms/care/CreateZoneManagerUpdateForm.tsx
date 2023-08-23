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
  Checkbox
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";
import { useAppSelector } from "@/store/hooks";

interface FormData {
  comment: string;
}

const types = [
  {
    label: "tag",
    value: "tag"
  },
  {
    label: "remove",
    value: "remove"
  }
];

const CreateZoneManagerUpdateForm = () => {
  const [form] = Form.useForm();

  const authUser = useAppSelector(state => state.auth.user);

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [customers, setCustomers] = useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any[]>([]);

  const [selectType, setSelectType] = useState<any>(null);

  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);

  const [isRemoveChildTag, setIsRemoveChildTag] = useState(false);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ type: value });
    setSelectType(value as any);
  };

  const handleRemoveChildTag = (e: any) => {
    setIsRemoveChildTag(e.target.checked ? true : false);
  };

  const getCustomers = async () => {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        isActive: true
      }
    };

    const res = await axios.post("/api/customer/get-list", body);
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.username,
          value: item.id
        };
      });

      setCustomers(items);
    }
  };

  // customerIds
  const handleCustomerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ customerIds: value });
    setSelectedCustomer(value as any[]);
  };

  function getZoneManagers() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      body: {
        partnerType: "zone",
        client: {
          id: authUser?.partnerId
        },
        isActive: true
      }
    };
    axios.post("/api/partner/get-list", body).then(res => {
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
          label: item.name,
          value: item.id
        };
      });

      setZones(list);
    });
  }

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ zoneManagerId: value });
    setSelectedZone(value as any);
  };

  useEffect(() => {
    getCustomers();
    getZoneManagers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const { comment } = data;

    const formData = {
      customerIds: selectedCustomer,
      action: selectType,
      zoneManagerId: selectedZone,
      isRemoveChildTag: isRemoveChildTag,
      comment: comment
    };

    try {
      axios
        .post("/api/customer/zone-manager-assign", formData)
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
              router.replace(`/admin/zone-manager-tag-or-remove`);
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
      {!loading && (
        <div className="mt-3">
          <Form
            // {...layout}
            layout="vertical"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={{
              type: "",
              comment: ""
            }}
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
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* customerIds */}
                <Form.Item
                  label="Customer"
                  name="customerIds"
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
                      mode="multiple"
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

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                className="gutter-row"
              >
                {/* type */}
                <Form.Item
                  label="Type"
                  name="type"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select Type!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select Type"
                      onChange={handleChange}
                      options={types}
                      value={selectType}
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

              {selectType == "tag" && (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  className="gutter-row"
                >
                  {/* zoneManagerId */}
                  <Form.Item
                    label="Zone Manager"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please select Zone Manager!"
                      }
                    ]}
                    name="zoneManagerId"
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select"
                        onChange={handleZoneChange}
                        options={zones}
                        value={selectedZone}
                        showSearch
                        // filterOption={(input, option) => {
                        //   if (typeof option?.label === "string") {
                        //     return (
                        //       option.label
                        //         .toLowerCase()
                        //         .indexOf(input.toLowerCase()) >= 0
                        //     );
                        //   }
                        //   return false;
                        // }}
                      />
                    </Space>
                  </Form.Item>
                </Col>
              )}

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                className="gutter-row"
              >
                {/* comment */}
                <Form.Item
                  label="Remarks"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="comment"
                  /*  rules={[
                 {
                   required: true,
                   message: "Please input your comment!"
                 }
               ]} */
                >
                  <Input.TextArea
                    placeholder="Remarks"
                    className={`form - control`}
                    name="comment"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Space
              size={[8, 8]}
              wrap
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              {/* isRemoveChildTag */}
              <Form.Item
                label=""
                style={{
                  marginBottom: 0
                }}
              >
                <Checkbox
                  onChange={handleRemoveChildTag}
                  checked={isRemoveChildTag}
                >
                  Remove Child Tag
                </Checkbox>
              </Form.Item>
            </Space>

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
                  >
                    Submit
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

export default CreateZoneManagerUpdateForm;
