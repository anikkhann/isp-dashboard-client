/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface FormData {
  amount: number;
  note: string;
}

const CreateSubZoneRevenueDisbursementForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [zones, setZones] = useState<any>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const ZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ subZoneManagerId: value });
    setSelectedZone(value as any);
  };

  function getSubZoneManagers() {
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
        partnerType: "sub_zone",
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

  useEffect(() => {
    getSubZoneManagers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const { amount, note } = data;

    const formData = {
      subZoneManagerId: selectedZone,
      note: note,
      amount: amount
    };

    try {
      axios
        .post("/api/sub-zone-revenue-disbursement/create", formData)
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
              router.replace("/admin/accounting/subZone-revenue-disbursement");
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
              amount: "",
              note: ""
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
                <Form.Item
                  label="SubZone Manager"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="subZoneManagerId"
                  rules={[
                    {
                      required: true,
                      message: "Please select SubZone Manager!"
                    }
                  ]}
                >
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      allowClear
                      style={{ width: "100%", textAlign: "start" }}
                      placeholder="Please select"
                      onChange={ZoneChange}
                      options={zones}
                      value={selectedZone}
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
                {/* amount */}
                <Form.Item
                  label="Amount"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="amount"
                  rules={[
                    {
                      required: true,
                      message: "Please input your amount!"
                    }
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="amount"
                    className={`form-control`}
                    name="amount"
                    style={{ padding: "6px" }}
                  />
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                className="gutter-row"
              >
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
                    rows={6}
                    placeholder="note"
                    className={`form-control`}
                    name="note"
                    style={{ padding: "6px" }}
                  />
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

export default CreateSubZoneRevenueDisbursementForm;
