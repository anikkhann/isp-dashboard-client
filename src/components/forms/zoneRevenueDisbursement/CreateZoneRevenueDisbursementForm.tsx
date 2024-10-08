/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
// import AppImageLoader from "@/components/loader/AppImageLoader";
import { useAppSelector } from "@/store/hooks";
interface FormData {
  amount: number;
  note: string;
}

const CreateZoneRevenueDisbursementForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const authUser = useAppSelector(state => state.auth.user);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [zones, setZones] = useState<any>([]);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const ZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ zoneManagerId: value });
    setSelectedZone(value as any);
  };

  function getZoneManagers() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {
        sort: [
          {
            order: "asc",
            field: "username"
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
          label: item.username,
          value: item.id
        };
      });

      setZones(list);
    });
  }

  useEffect(() => {
    getZoneManagers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { amount, note } = data;

      const formData = {
        zoneManagerId: selectedZone,
        note: note,
        amount: amount
      };

      try {
        await axios
          .post("/api/zone-revenue-disbursement/create", formData)
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
                router.replace("/admin/accounting/zone-revenue-disbursement");
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
                label="Zone Manager"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="zoneManagerId"
                rules={[
                  {
                    required: true,
                    message: "Please select Zone Manager!"
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

export default CreateZoneRevenueDisbursementForm;
