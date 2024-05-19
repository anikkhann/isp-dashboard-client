/* eslint-disable react-hooks/exhaustive-deps */
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
interface FormData {
  amount: string;
  type: string;
  remarks: string;
}

const types = [
  {
    label: "credit (deposit)",
    value: "credit"
  },
  {
    label: "debit (deduct)",
    value: "debit"
  }
];

const CreateAgentTopForm = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [selectType, setSelectType] = useState<any>("credit");

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [agentList, setAgentList] = useState([]);
  const [agentId, setagentId] = useState(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ type: value });
    setSelectType(value as any);
  };

  const handleZoneChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ agentId: value });
    setagentId(value as any);
  };

  function getagentList() {
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
        // SEND FIELD NAME WITH DATA TO SEARCH
        isActive: true
      }
    };
    axios.post("/api/users/get-list-for-table", body).then(res => {
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
      setAgentList(list);
    });
  }

  useEffect(() => {
    getagentList();
    form.setFieldsValue({ type: selectType });
  }, []);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const { amount, type, remarks } = data;

      const formData = {
        agentId: agentId,
        amount: amount,
        type: type,
        remarks: remarks
      };

      try {
        await axios
          .post("/api/agent-topup/create", formData)
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
                router.replace("/admin/top-up/agent-top-up");
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
            agentId: "",
            type: "",
            remarks: ""
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
              {/* agentId */}
              <Form.Item
                label="Agent"
                name="agentId"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
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
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Agent"
                    onChange={handleZoneChange}
                    options={agentList}
                    value={agentId}
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
                  type="text"
                  placeholder="Amount"
                  className={`form-control`}
                  name="amount"
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
              {/* remarks */}
              <Form.Item
                label="Remarks"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="remarks"
                rules={[
                  {
                    required: true,
                    message: "Please input your remarks!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Remarks"
                  className={`form-control`}
                  name="remarks"
                  style={{ padding: "6px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* submit */}
          <Row justify="center">
            <Form.Item>
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
          </Row>
        </Form>
      </div>
      {/* )} */}
    </>
  );
};

export default CreateAgentTopForm;
