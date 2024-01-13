/* eslint-disable @typescript-eslint/no-explicit-any */

import DetailsTicket from "@/components/details/ticket/DetailsTicket";
import { TicketData } from "@/interfaces/TicketData";
import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useQueries } from "@tanstack/react-query";
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Space
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { DownOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const statuses = [
  {
    label: "On Progress",
    value: "on_progress"
  },
  {
    label: "Pending",
    value: "pending"
  },
  {
    label: "Closed",
    value: "closed"
  }
];

const DetailsCustomerTicket = ({ id }: any) => {
  const MySwal = withReactContent(Swal);

  const [form] = Form.useForm();
  const [item, setItem] = useState<TicketData | null>(null);
  const [replys, setReplys] = useState<any | []>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [statusModal, setStatusModal] = useState(false);
  const [ownerModal, setOwnerModal] = useState(false);

  const [checkLists, setCheckLists] = useState<any[]>([]);

  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const [assignToList, setAssignToList] = useState<any[]>([]);
  const [selectedAssignTo, setSelectedAssignTo] = useState<any>(null);

  const [rootCauseList, setRootCauseList] = useState<any[]>([]);
  const [selectedRootCause, setSelectedRootCause] = useState<any>(null);

  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // const getCheckList = async () => {
  //   const token = Cookies.get("token");
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //   const body = {
  //     body: {
  //       // complainTypeId: item?.complainType?.id
  //     }
  //   };
  //   const response = await axios.post(`/api/checklist/get-list`, body);
  //   setCheckLists(response.data.body);
  // };

  // console.log("checkLists", checkLists)
  const changeStatus = () => {
    form.resetFields();
    setStatusModal(true);
  };

  const changeOwner = () => {
    form.resetFields();
    setOwnerModal(true);
  };

  const reply = () => {
    router.push(`/admin/complaint/customer-ticket/${id}/reply`);
  };

  const getRootCauseList = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      body: {
        rootCauseCategory: item?.ticketCategory,
        isActive: true
      }
    };
    const response = await axios.post(`/api/root-cause/get-list`, body);
    const list = response.data.body.map((item: any) => {
      return {
        label: item.title,
        value: item.id
      };
    });
    setRootCauseList(list);
  };
  // ;
  const getAssignedTo = async () => {
    // console.log("selectedCustomer", selectedCustomer)
    const res = await axios.get(
      `/api/ticket/get-assigned-to/${item?.customerId}`
    );
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.title,
          value: item.id
        };
      });
      setAssignToList(items);
    }
  };

  const handleStatusChange = (value: any) => {
    // console.log(value);
    setSelectedStatus(value);
    form.setFieldsValue({
      status: value
    });
  };

  const handleAssignToChange = (value: any) => {
    // console.log(value);
    setSelectedAssignTo(value);
    form.setFieldsValue({
      assignedToId: value
    });
  };

  // rootCauseId
  const handleRootCauseChange = (value: any) => {
    // console.log(value);
    form.setFieldsValue({
      rootCauseId: value
    });
    setSelectedRootCause(value);
  };

  const handleStatusSubmit = async () => {
    await form.validateFields([
      "status",
      // "rootCauseId",
      "remarks"
    ]);

    const status = form.getFieldValue("status");
    const rootCauseId = form.getFieldValue("rootCauseId");
    const remarks = form.getFieldValue("remarks");

    const formData = {
      id: id,
      action: "status_change",
      status: status,
      rootCauseId: rootCauseId,
      remarks: remarks
    };

    try {
      axios
        .put("/api/ticket/update", formData)
        .then(res => {
          const { data } = res;
          MySwal.fire({
            title: "Success",
            text: data.message || "Added successfully",
            icon: "success"
          }).then(() => {
            form.resetFields();
            router.reload();
            setStatusModal(false);
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

  const handleOwnerSubmit = async () => {
    await form.validateFields(["assignedToId", "remarks"]);

    const assignedToId = form.getFieldValue("assignedToId");
    const remarks = form.getFieldValue("remarks");

    const formData = {
      id: id,
      action: "owner_change",
      assignedToId: assignedToId,
      remarks: remarks
    };

    try {
      axios
        .put("/api/ticket/update", formData)
        .then(res => {
          const { data } = res;
          MySwal.fire({
            title: "Success",
            text: data.message || "Added successfully",
            icon: "success"
          }).then(() => {
            form.resetFields();
            router.reload();
            setOwnerModal(false);
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

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: <div onClick={() => reply()}>Reply</div>
    },
    {
      key: 2,
      label: <div onClick={() => changeStatus()}>Change Status</div>
    },

    {
      key: 3,
      label: <div onClick={() => changeOwner()}>Change Owner</div>
    }
  ];

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(`/api/ticket/get-by-id/${id}`);
    return response;
  };

  const fetchReplayData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const body = {
      meta: {
        /*  "page": 0,
          "limit": 10, */
        sort: [
          {
            order: "desc",
            field: "createdOn"
          }
        ]
      },
      body: {
        ticket: {
          id: id
        }
      }
    };
    const response = await axios.post(`/api/ticket-details/get-list`, body);
    return response;
  };

  const [ticketQuery, replayQuery] = useQueries<any>({
    queries: [
      {
        queryKey: ["customer-ticket-list", id],
        queryFn: async () => {
          const { data } = await fetchData();
          return data;
        },
        onSuccess(data: any) {
          if (data) {
            setItem(data.body);
          }
        },
        onError(error: any) {
          console.log("error", error);
        }
      },
      {
        queryKey: ["reply-ticket-list", id],
        queryFn: async () => {
          const { data } = await fetchReplayData();
          return data;
        },
        onSuccess(data: any) {
          if (data) {
            /*  const filters = data.body.filter(
              (item: any) => item.ticketId === id
             ); */
            setReplys(data.body);
            // setReplys(filters);
          }
        },
        onError(error: any) {
          console.log("error", error);
        }
      }
    ]
  });

  useEffect(() => {
    if (item) {
      // getCheckList();
      getAssignedTo();
      getRootCauseList();

      if (item.checkList) {
        const convertData = item?.checkList;
        // convertData = convertData.replaceAll('"', "&quot;");
        // convertData = convertData.replaceAll("'", '"');

        const checklists = JSON.parse(convertData);

        // convert checkList to array
        const checkListData = checklists.map(
          (checklist: any, index: number) => {
            return {
              key: index,
              title: checklist.title,
              status: checklist.status
            };
          }
        );

        setCheckLists(checkListData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  return (
    <>
      <AppRowContainer>
        <Breadcrumb
          style={{
            margin: "10px 30px",
            textAlign: "left",
            width: "100%"
          }}
          items={[
            {
              title: <Link href="/admin">Home</Link>
            },
            {
              title: <Link href="/admin/complaint">Complain Dashboard</Link>
            },
            {
              title: (
                <Link href="/admin/complaint/customer-ticket">
                  Customer Ticket
                </Link>
              )
            },
            {
              title: "Customer Ticket"
            }
          ]}
        />

        {item && (
          <div
            style={{
              margin: "10px 40px",
              textAlign: "left",
              display: "flex",
              justifyContent: "right",
              width: "100%"
            }}
          >
            <Button
              onClick={showModal}
              style={{
                marginLeft: "auto",
                marginRight: "20px"
              }}
            >
              CheckList
            </Button>
            {item.status != "closed" && (
              <Dropdown
                menu={{ items }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <Button type="primary">
                  <Space>
                    Actions
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            )}
          </div>
        )}

        <Modal
          title="Check Lists"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleOk}
        >
          <List
            itemLayout="horizontal"
            dataSource={checkLists}
            renderItem={(checkListData, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={<UnorderedListOutlined />}
                  title={
                    <span className=" text-base capitalize">
                      {checkListData.title} : {checkListData.status}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </Modal>

        <Modal
          title="Change Status"
          open={statusModal}
          onCancel={() => setStatusModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setStatusModal(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleStatusSubmit}>
              Submit
            </Button>
          ]}
        >
          <Card
            // hoverable
            style={{
              width: "90%",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "3rem",
              marginBottom: "3rem"
            }}
          >
            {showError && errorMessages && (
              <Alert
                message={errorMessages}
                type="error"
                showIcon
                closable
                onClose={() => setShowError(false)}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              style={{ maxWidth: "100%" }}
              name="wrap"
              colon={false}
              scrollToFirstError
            >
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                justify="space-between"
              >
                <Col xs={24} className="gutter-row">
                  <Form.Item
                    name="status"
                    label="Status"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Select Status!"
                      }
                    ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        placeholder="Select Status"
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        onChange={handleStatusChange}
                        options={statuses}
                        value={selectedStatus}
                      />
                    </Space>
                  </Form.Item>

                  {selectedStatus === "closed" && (
                    <>
                      <Form.Item
                        name="rootCauseId"
                        label="Root Cause"
                        style={{
                          marginBottom: 0,
                          fontWeight: "bold"
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Select root Cause!"
                          }
                        ]}
                      >
                        <Space style={{ width: "100%" }} direction="vertical">
                          <Select
                            placeholder="Select root Cause"
                            allowClear
                            style={{ width: "100%", textAlign: "start" }}
                            onChange={handleRootCauseChange}
                            options={rootCauseList}
                            value={selectedRootCause}
                          />
                        </Space>
                      </Form.Item>
                    </>
                  )}

                  <Form.Item
                    name="remarks"
                    label="Remarks"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Enter Remarks!"
                      }
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Enter Remarks"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Modal>

        <Modal
          title="Change Owner"
          open={ownerModal}
          onCancel={() => setOwnerModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setOwnerModal(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOwnerSubmit}>
              Submit
            </Button>
          ]}
        >
          <Card
            // hoverable
            style={{
              width: "90%",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              margin: "0 auto",
              textAlign: "center",
              marginTop: "3rem",
              marginBottom: "3rem"
            }}
          >
            {showError && errorMessages && (
              <Alert
                message={errorMessages}
                type="error"
                showIcon
                closable
                onClose={() => setShowError(false)}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              style={{ maxWidth: "100%" }}
              name="wrap"
              colon={false}
              scrollToFirstError
            >
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                justify="space-between"
              >
                <Col xs={24} className="gutter-row">
                  <Form.Item
                    name="assignedToId"
                    label="Assigned To"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Select Assigned To Id!"
                      }
                    ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        placeholder="Select assignedToId"
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        onChange={handleAssignToChange}
                        options={assignToList}
                        value={selectedAssignTo}
                      />
                    </Space>
                  </Form.Item>

                  <Form.Item
                    name="remarks"
                    label="Remarks"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Enter Remarks!"
                      }
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Enter Remarks"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Modal>
        <div
          style={{
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            // border: "1px solid #F15F22",
            textAlign: "center"
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              color: "#F15F22"
            }}
          >
            Customer Ticket
          </h1>
        </div>
        <Card
          // title="Customer Ticket"
          hoverable
          style={{
            width: "90%",
            backgroundColor: "#ECF0F1",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem"
          }}
        >
          {ticketQuery.isLoading &&
            ticketQuery.isFetching &&
            replayQuery.isLoading &&
            replayQuery.isFetching && <AppLoader />}

          {!ticketQuery.isLoading &&
            !replayQuery.isLoading &&
            item &&
            replys && <DetailsTicket item={item} replys={replys} />}
        </Card>
      </AppRowContainer>
    </>
  );
};

export default DetailsCustomerTicket;
