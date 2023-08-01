/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Form, Select, Space, Row, Col } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { TicketData } from "@/interfaces/TicketData";
// import { useAppSelector } from "@/store/hooks";

const actionLists = [
  {
    label: "Owner Change",
    value: "owner_change"
  },
  {
    label: "Status Change",
    value: "status_change"
  },
  {
    label: "Reply",
    value: "reply"
  }
];

interface PropData {
  item: TicketData;
}

const EditTicketForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [selectedAction, setSelectedAction] = useState<any>(null);

  const [assignedTo, setAssignedTo] = useState<any>(null);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState<any>(null);

  // const user = useAppSelector(state => state.auth.user);
  // console.log("user", user)

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ action: value });
    setSelectedAction(value as any);
  };

  const getAssignedTo = async (selectedCustomer: any) => {
    console.log("selectedCustomer", selectedCustomer);
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

  useEffect(() => {
    if (item) {
      // customerId
      getAssignedTo(item.customerId);
    }
  }, [item]);

  const onSubmit = () => {
    // console.log(data);
    const formData = {
      id: item.id,
      action: selectedAction,
      assignedToId: selectedAssignedTo
    };

    try {
      axios
        .put("/api/ticket/update", formData)
        .then(res => {
          const { data } = res;
          MySwal.fire({
            title: "Success",
            text: data.message || "Updated successfully",
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
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="gutter-row"
            >
              {/* action */}
              <Form.Item
                label="Action"
                name="action"
                rules={[
                  {
                    required: true,
                    message: "Please select Action!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Action"
                    onChange={handleChange}
                    options={actionLists}
                    value={selectedAction}
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
              {/* assignedToId */}
              <Form.Item
                label="Assigned To"
                name="assignedToId"
                rules={[
                  {
                    required: true,
                    message: "Please select Assigned To!"
                  }
                ]}
              >
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

export default EditTicketForm;
