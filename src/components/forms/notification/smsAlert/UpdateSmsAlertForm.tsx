/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Input, Row, Col, Switch } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
// import AppImageLoader from "@/components/loader/AppImageLoader";
const dataArray = [
  {
    heading: "Username",
    username: "[username]:",
    description: "To include username of the customer"
  },
  {
    heading: "Password",
    username: "[password]:",
    description: "To include password of the customer"
  },
  {
    heading: "Due Date",
    username: "[due_date]:",
    description: "To include due date of dubscription"
  },
  {
    heading: "Due Amount",
    username: "[due_amount]:",
    description: "To include due amount to be paid"
  },
  {
    heading: "Expiration Time",
    username: "[expiration_time]:",
    description: "To include expiration date time"
  },
  {
    heading: "Paid Amount",
    username: "[paid_amount]:",
    description: "To include paid amount"
  },
  {
    heading: "SAF OTP",
    username: "[saf_otp]:",
    description: "To include saf verification code"
  },
  {
    heading: "Ticket No",
    username: "[ticket_no]:",
    description: "To include ticket number"
  },
  {
    heading: "Date Adjustment",
    username: "[date_adjusted]:",
    description: `To incldue "Your expiration date has been adjusted to reflect the <adjusted day> days you have taken in advance." in the message`
  }
];
const UpdateSmsAlertForm = () => {
  const [form] = Form.useForm();
  // const { Panel } = Collapse;
  const [loading, setLoading] = useState(false);

  const [dynamicFields, setDynamicFields] = useState<any[]>([]);

  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  function getList() {
    const body = {
      // FOR PAGINATION - OPTIONAL
      meta: {},
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        // isActive: true
      }
    };
    axios.post("/api/client-sms-alert-config/get-list", body).then(res => {
      const { data } = res;
      if (data.status != 200) {
        MySwal.fire({
          title: "Error",
          text: data.message || "Something went wrong",
          icon: "error"
        });
      }

      if (!data.body) return;

      const dynamic = data.body.map((item: any) => {
        return {
          id: item.id,
          subject: item.subject,
          template: item.template,
          placeholder: item.placeholder,
          isActive: item.isActive
        };
      });

      setDynamicFields(dynamic);
    });
  }

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      const formData = dynamicFields.map((item: any) => {
        return {
          id: item.id,
          template: item.template,
          // placeholder: item.placeholder,
          isActive: item.isActive
        };
      });

      const body = {
        smsAlertConfigs: formData
      };

      try {
        await axios
          .put("/api/client-sms-alert-config/update", body)
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
                router.replace("/admin/notification/sms/client-sms-alert");
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
          initialValues={{}}
          style={{ maxWidth: "100%" }}
          name="wrap"
          colon={false}
          scrollToFirstError
        >
          {dynamicFields &&
            dynamicFields.map((item: any, index: number) => {
              return (
                <>
                  <Row
                    justify="space-between"
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    key={index}
                  >
                    <Col
                      xs={24}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      xxl={6}
                      className="gutter-row"
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#0e8fdc"
                      }}
                    >
                      {item.subject}
                    </Col>

                    <Col
                      xs={24}
                      sm={18}
                      md={18}
                      lg={18}
                      xl={18}
                      xxl={18}
                      className="gutter-row"
                      style={{ textAlign: "right" }}
                    >
                      <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        style={{
                          flexDirection: "column",
                          textAlign: "left"
                        }}
                      >
                        <Col>
                          <span
                            style={{ fontWeight: "bold", color: "#F15F22" }}
                          >
                            Status &nbsp; &nbsp;
                          </span>
                          <Switch
                            checked={item.isActive}
                            onChange={() => {
                              const newDynamicFields = [...dynamicFields];
                              newDynamicFields[index].isActive =
                                !dynamicFields[index].isActive;
                              setDynamicFields(newDynamicFields);
                            }}
                          />
                        </Col>

                        <Col
                          xs={16}
                          sm={16}
                          md={16}
                          lg={16}
                          xl={16}
                          xxl={16}
                          className="gutter-row"
                        >
                          {/* message */}
                          <Form.Item
                            label="Message"
                            style={{
                              marginBottom: 0,
                              fontWeight: "bold"
                            }}
                          >
                            <Input.TextArea
                              placeholder="message"
                              className={`form-control`}
                              name="message"
                              style={{ padding: "6px" }}
                              rows={6}
                              cols={20}
                              maxLength={500}
                              value={item.template}
                              defaultValue={item.template}
                              onChange={e => {
                                const { value } = e.target;
                                const newDynamicFields = [...dynamicFields];
                                newDynamicFields[index].template = value;
                                setDynamicFields(newDynamicFields);
                              }}
                            />
                          </Form.Item>
                        </Col>

                        {/* placeholder */}
                        <Col
                          xs={16}
                          sm={16}
                          md={16}
                          lg={16}
                          xl={16}
                          xxl={16}
                          className="gutter-row"
                        >
                          {/* message */}
                          <p>
                            <span className="font-bold">Placeholder:</span>
                            {item.placeholder}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </>
              );
            })}

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
          <Row
            justify="space-between"
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              xxl={24}
              className="gutter-row"
              // style={{ textAlign: "right" }}
            >
              <h1 className="text-center text-lg font-bold bg-success p-5">
                Use following Placeholder to include some information in SMS
              </h1>
              {/* <Collapse accordion> */}
              {dataArray.map((data, index) => (
                <div className="text-left" key={index}>
                  <Row
                    style={{
                      marginTop: "2px"
                    }}
                    justify={"center"}
                  >
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "start"
                      }}
                      className="w-1/2"
                    >
                      <span className="font-bold text-base">
                        {data.username}
                      </span>
                    </Col>
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "start"
                      }}
                      className="w-1/2"
                    >
                      <span className="mx-1 text-base">{data.description}</span>
                    </Col>
                  </Row>
                </div>
              ))}
              {/* </Collapse> */}

              {/* {dataArray.map((data, index) => (
                <div key={index}>
                  <div className="flex flex-wrap place-content-center">
                    <p className="">{data.username}</p>
                    <p className="px-3">{data.description}</p>
                  </div>
                </div>
              ))} */}
            </Col>
          </Row>
        </Form>
      </div>
      {/* )} */}
    </>
  );
};

export default UpdateSmsAlertForm;
