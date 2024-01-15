/* eslint-disable react-hooks/exhaustive-deps */
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
  Grid,
  Input,
  Select,
  Space,
  Card,
  Row,
  Col,
  Radio,
  DatePicker,
  Steps
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";
import { CustomerData } from "@/interfaces/CustomerData";

import type { RadioChangeEvent } from "antd";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const dateFormat = "YYYY-MM-DD";

interface FormData {
  subscriberName: string;
  contactPerson: string;
  identificationNo: string;
  dateOfBirth: string;
  gender: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  connectionAddress: string;
  flatNo: string;
  houseNo: string;
  roadNo: string;
  area: string;
  connectionAddressDivisionId: string;
  connectionAddressDistrictId: string;
  connectionAddressUpazillaId: string;
  connectionAddressPostCode: string;
  permanentAddress: string;
  permanentAddressDivisionId: string;
  permanentAddressDistrictId: string;
  permanentAddressUpazillaId: string;
  permanentAddressPostCode: string;
  mobileNumber: string;
  phoneNumber: string;
  altMobileNo: string;
  email: string;
  occupation: string;
}

const occupations = [
  {
    label: "Government Service",
    value: "Government Service"
  },
  {
    label: "Private Service",
    value: "Private Service"
  },
  {
    label: "Business",
    value: "Business"
  },
  {
    label: "Student",
    value: "Student"
  },
  {
    label: "Business",
    value: "Business"
  },
  {
    label: "Others",
    value: "Others"
  }
];

const steps = [
  {
    title: "Step1",
    content: "step1"
  },
  {
    title: "Step2",
    content: "step2"
  },

  {
    title: "Step3",
    content: "step3"
  }
];

interface PropData {
  item: CustomerData;
}

const CreateSafVerificationForm = ({ item }: PropData) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [previous, setPrevious] = useState<any>(null);

  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [selectedOccupation, setSelectedOccupation] = useState(null);

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazilla, setSelectedUpazilla] = useState(null);

  const [parmanentAddressDivisions, setParmanentAddressDivisions] = useState(
    []
  );
  const [parmanentAddressDistricts, setParmanentAddressDistricts] = useState(
    []
  );
  const [parmanentAddressUpazillas, setParmanentAddressUpazillas] = useState(
    []
  );

  const [
    selectedParmanentAddressDivision,
    setSelectedParmanentAddressDivision
  ] = useState(null);
  const [
    selectedParmanentAddressDistrict,
    setSelectedParmanentAddressDistrict
  ] = useState(null);
  const [
    selectedParmanentAddressUpazilla,
    setSelectedParmanentAddressUpazilla
  ] = useState(null);

  // typeOfCustomer
  const [typeOfCustomer, setTypeOfCustomer] = useState("");

  // gender
  const [gender, setGender] = useState("");

  // dateOfBirth
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState<any>(null);

  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [formValues, setFormValues] = useState<FormData>({
    subscriberName: "",
    contactPerson: "",
    identificationNo: "",
    dateOfBirth: "",
    gender: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    connectionAddress: "",
    flatNo: "",
    houseNo: "",
    roadNo: "",
    area: "",
    connectionAddressDivisionId: "",
    connectionAddressDistrictId: "",
    connectionAddressUpazillaId: "",
    connectionAddressPostCode: "",
    permanentAddress: "",
    permanentAddressDivisionId: "",
    permanentAddressDistrictId: "",
    permanentAddressUpazillaId: "",
    permanentAddressPostCode: "",
    mobileNumber: "",
    phoneNumber: "",
    altMobileNo: "",
    email: "",
    occupation: ""
  });

  // steps
  const items = steps.map(item => ({ key: item.title, title: item.title }));
  // steps
  const [current, setCurrent] = useState(0);

  const next = async () => {
    try {
      if (current === 0) {
        await form.validateFields([
          "typeOfCustomer",
          "subscriberName",
          "contactPerson",
          "identificationNo",
          "dateOfBirth",
          "gender",
          "fatherName",
          "motherName",
          "connectionAddress"
        ]);

        setFormValues({
          ...formValues,
          subscriberName: form.getFieldValue("subscriberName"),
          contactPerson: form.getFieldValue("contactPerson"),
          identificationNo: form.getFieldValue("identificationNo"),
          fatherName: form.getFieldValue("fatherName"),
          motherName: form.getFieldValue("motherName"),
          connectionAddress: form.getFieldValue("connectionAddress")
        });
      } else if (current === 1) {
        await form.validateFields([
          "houseNo",
          "area",
          "connectionAddressDivisionId",
          "connectionAddressDistrictId",
          "connectionAddressUpazillaId",
          "connectionAddressPostCode",
          "permanentAddress",
          "permanentAddressDivisionId"
        ]);

        setFormValues({
          ...formValues,
          flatNo: form.getFieldValue("flatNo"),
          houseNo: form.getFieldValue("houseNo"),
          roadNo: form.getFieldValue("roadNo"),
          area: form.getFieldValue("area"),

          connectionAddressPostCode: form.getFieldValue(
            "connectionAddressPostCode"
          ),
          permanentAddress: form.getFieldValue("permanentAddress")
        });
      } else if (current === 2) {
        await form.validateFields([
          "permanentAddressDivisionId",
          "permanentAddressDistrictId",
          "permanentAddressUpazillaId",
          "permanentAddressPostCode",
          "mobileNumber",
          "phoneNumber",
          "email"
        ]);

        setFormValues({
          ...formValues,

          permanentAddressPostCode: form.getFieldValue(
            "permanentAddressPostCode"
          ),
          mobileNumber: form.getFieldValue("mobileNumber"),
          phoneNumber: form.getFieldValue("phoneNumber"),
          altMobileNo: form.getFieldValue("altMobileNo"),
          email: form.getFieldValue("email"),
          occupation: form.getFieldValue("occupation")
        });
      }

      setCurrent(current + 1);
    } catch {
      //return some msg...
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onTypeOfCustomerChange = (e: RadioChangeEvent) => {
    // console.log('radio checked', e.target.value);
    setTypeOfCustomer(e.target.value);
  };

  const onGenderChange = (e: RadioChangeEvent) => {
    // console.log('radio checked', e.target.value);
    setGender(e.target.value);
  };

  const handleDateChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedDateOfBirth(value);
    form.setFieldsValue({
      dateOfBirth: value
    });
  };

  const handleDivisionChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ connectionAddressDivisionId: value });
    setSelectedDivision(value as any);
  };

  const handleDistrictChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ connectionAddressDistrictId: value });
    setSelectedDistrict(value as any);
  };

  const handleUpazillaChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ connectionAddressUpazillaId: value });
    setSelectedUpazilla(value as any);
  };

  const handleParmanentAddressDivisionChange = (value: any) => {
    form.setFieldsValue({ permanentAddressDivisionId: value });
    setSelectedParmanentAddressDivision(value as any);
  };

  const handleParmanentAddressDistrictChange = (value: any) => {
    form.setFieldsValue({ permanentAddressDistrictId: value });
    setSelectedParmanentAddressDistrict(value as any);
  };

  const handleParmanentAddressUpazillaChange = (value: any) => {
    form.setFieldsValue({ permanentAddressUpazillaId: value });
    setSelectedParmanentAddressUpazilla(value as any);
  };

  const handleOccupationChange = (value: any) => {
    // console.log("checked = ", value);
    setSelectedOccupation(value as any);
    form.setFieldsValue({ occupation: value });
  };

  const getPreviousData = async (customerId: string) => {
    // saf-verification/get-by-customer-id
    const response = await axios.get(
      `/api/saf-verification/get-by-customer-id/${customerId}`
    );
    // console.log(response);

    const { data } = response;

    if (data.body) {
      setPrevious(data.body);
    }
  };

  function getDivisions() {
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
        isActive: true
      }
    };
    axios.post("/api/division/get-list", body).then(res => {
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

      setDivisions(list);
    });
  }

  function getDistricts(selectedDivision: string) {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        division: { id: selectedDivision },
        isActive: true
      }
    };

    axios.post("/api/district/get-list", body).then(res => {
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
      setDistricts(list);
    });
  }

  function getUpazillas(selectedDistrict: string) {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        district: { id: selectedDistrict },
        isActive: true
      }
    };

    axios.post("/api/upazilla/get-list", body).then(res => {
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
      setUpazillas(list);
    });
  }

  function getPernamentAddressDivisions() {
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
        isActive: true
      }
    };
    axios.post("/api/division/get-list", body).then(res => {
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

      setParmanentAddressDivisions(list);
    });
  }

  function getPernamentAddressDistricts(selectedDivision: string) {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        division: { id: selectedDivision },
        isActive: true
      }
    };

    axios.post("/api/district/get-list", body).then(res => {
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
      setParmanentAddressDistricts(list);
    });
  }

  function getPernamentAddressUpazillas(selectedDistrict: string) {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      },
      // FOR SEARCHING DATA - OPTIONAL
      body: {
        // SEND FIELD NAME WITH DATA TO SEARCH
        district: { id: selectedDistrict },
        isActive: true
      }
    };

    axios.post("/api/upazilla/get-list", body).then(res => {
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
      setParmanentAddressUpazillas(list);
    });
  }

  useEffect(() => {
    if (item) {
      getPreviousData(item.id);

      form.setFieldsValue({
        area: item.area
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    if (previous) {
      setSelectedDivision(previous.connectionAddressDivisionId);
      setSelectedDistrict(previous.connectionAddressDistrictId);
      setSelectedUpazilla(previous.connectionAddressUpazillaId);

      form.setFieldsValue({
        connectionAddressDivisionId: previous.connectionAddressDivisionId,
        connectionAddressDistrictId: previous.connectionAddressDistrictId,
        connectionAddressUpazillaId: previous.connectionAddressUpazillaId
      });
    }
  }, [previous]);

  // call on page load
  useEffect(() => {
    getDivisions();
    getPernamentAddressDivisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      getDistricts(selectedDivision);
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      getUpazillas(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedParmanentAddressDivision) {
      getPernamentAddressDistricts(selectedParmanentAddressDivision);
    }
  }, [selectedParmanentAddressDivision]);

  useEffect(() => {
    if (selectedParmanentAddressDistrict) {
      getPernamentAddressUpazillas(selectedParmanentAddressDistrict);
    }
  }, [selectedParmanentAddressDistrict]);

  const onSubmit = () => {
    setLoading(true);
    const {
      subscriberName,
      contactPerson,
      identificationNo,
      dateOfBirth,
      gender,
      fatherName,
      motherName,
      spouseName,
      connectionAddress,
      flatNo,
      houseNo,
      roadNo,
      area,
      connectionAddressDivisionId,
      connectionAddressDistrictId,
      connectionAddressUpazillaId,
      connectionAddressPostCode,
      permanentAddress,
      permanentAddressDivisionId,
      permanentAddressDistrictId,
      permanentAddressUpazillaId,
      permanentAddressPostCode,
      mobileNumber,
      phoneNumber,
      altMobileNo,
      email,
      occupation
    } = formValues;
    //
    const formData = {
      id: previous.id,
      customerId: item.id,
      typeOfCustomer: typeOfCustomer,
      subscriberName: subscriberName,
      contactPerson: contactPerson,
      identificationNo: identificationNo,
      dateOfBirth: dateOfBirth ? dayjs(dateOfBirth).format("YYYY-MM-DD") : null,
      gender: gender,
      fatherName: fatherName,
      motherName: motherName,
      spouseName: spouseName,
      connectionAddress: connectionAddress,
      flatNo: flatNo,
      houseNo: houseNo,
      roadNo: roadNo,
      area: area,
      connectionAddressDivisionId: connectionAddressDivisionId,
      connectionAddressDistrictId: connectionAddressDistrictId,
      connectionAddressUpazillaId: connectionAddressUpazillaId,
      connectionAddressPostCode: connectionAddressPostCode,
      permanentAddress: permanentAddress,
      permanentAddressDivisionId: permanentAddressDivisionId,
      permanentAddressDistrictId: permanentAddressDistrictId,
      permanentAddressUpazillaId: permanentAddressUpazillaId,
      permanentAddressPostCode: permanentAddressPostCode,
      mobileNumber: mobileNumber,
      phoneNumber: phoneNumber,
      altMobileNo: altMobileNo,
      email: email,
      occupation: occupation
    };

    try {
      axios
        .put("/api/saf-verification/update", formData)
        .then(res => {
          // console.log(res);
          const { data } = res;

          if (data.status === 200) {
            MySwal.fire({
              title: "Success",
              text: data.message || " Updated successfully",
              icon: "success"
            }).then(() => {
              router.replace(`/admin/customer-care/${item.id}`);
            });
          } else {
            MySwal.fire({
              title: "Error",
              text: data.message || "Updated Failed",
              icon: "error"
            });
          }
        })
        .catch(err => {
          // console.log(err);
          MySwal.fire({
            title: "Error",
            text: err.response.data.message || "Updated Failed",
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
        <>
          <div>
            <div className="flex justify-content-between mb-10 ">
              <Steps
                size="small"
                current={current}
                items={items}
                direction="horizontal"
              />
            </div>
          </div>
          <div className="mt-3">
            <Form
              // {...layout}
              // layout="vertical"
              autoComplete="off"
              onFinish={onSubmit}
              form={form}
              initialValues={{}}
              style={{ maxWidth: "100%" }}
              name="wrap"
              colon={false}
              scrollToFirstError
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 12 }}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
            >
              {current === 0 && (
                <>
                  <Card
                    hoverable
                    style={{
                      width: "90%",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      margin: "0 auto",
                      textAlign: "center",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "1px solid #F15F22"
                    }}
                  >
                    <Row
                      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                      justify="space-between"
                    >
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        xxl={24}
                        className="gutter-row"
                      >
                        {/* typeOfCustomer */}
                        <Form.Item
                          label="Type Of Customer"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold",
                            alignItems: "flex-start"
                          }}
                          name="typeOfCustomer"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Type Of Customer!"
                            }
                          ]}
                        >
                          <Radio.Group
                            onChange={onTypeOfCustomerChange}
                            value={typeOfCustomer}
                            style={{
                              alignItems: "flex-start"
                            }}
                          >
                            <Radio value="individual">Individual</Radio>
                            <Radio value="organization">Organization</Radio>
                          </Radio.Group>
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
                        {/* subscriberName */}
                        <Form.Item
                          name="subscriberName"
                          label="Subscriber Name"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Subscriber Name!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Subscriber Name"
                            className={`form-control`}
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
                        {/* contactPerson */}
                        <Form.Item
                          name="contactPerson"
                          label="Contact Person"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Please input your contactPerson!"
                          //   }
                          // ]}
                        >
                          <Input
                            type="text"
                            placeholder="Contact Person"
                            className={`form-control`}
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
                        {/* identificationNo */}
                        <Form.Item
                          name="identificationNo"
                          label="Identification No"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Identification No!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Identification No"
                            className={`form-control`}
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
                        {/* dateOfBirth */}
                        <Form.Item
                          name="dateOfBirth"
                          label="Date Of Birth"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Date Of Birth!"
                            }
                          ]}
                        >
                          <DatePicker
                            style={{ width: "100%", padding: "6px" }}
                            className={`form-control`}
                            placeholder="Date Of Birth"
                            onChange={handleDateChange}
                            format={dateFormat}
                            value={selectedDateOfBirth}
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
                        {/* gender */}
                        <Form.Item
                          label="Gender"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          name="gender"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Gender!"
                            }
                          ]}
                        >
                          <Radio.Group onChange={onGenderChange} value={gender}>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                          </Radio.Group>
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
                        {/* contactNumber */}
                        <Form.Item
                          name="fatherName"
                          label="Father Name"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Father Name!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Father Name"
                            className={`form-control`}
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
                        {/* motherName */}
                        <Form.Item
                          name="motherName"
                          label="Mother Name"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Mother Name!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Mother Name"
                            className={`form-control`}
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
                        {/* spouseName */}
                        <Form.Item
                          name="spouseName"
                          label="Spouse Name"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                        >
                          <Input
                            type="text"
                            placeholder="Spouse Name"
                            className={`form-control`}
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
                        {/* connectionAddress */}
                        <Form.Item
                          name="connectionAddress"
                          label="Connection Address"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Connection Address!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Connection Address"
                            className={`form-control`}
                            style={{ padding: "6px" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </>
              )}

              {current === 1 && (
                <>
                  <Card
                    hoverable
                    style={{
                      width: "90%",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      margin: "0 auto",
                      textAlign: "center",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "1px solid #F15F22"
                    }}
                  >
                    <Row
                      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                      justify="space-between"
                    >
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        xxl={24}
                        className="gutter-row"
                      >
                        {/* flatNo */}
                        <Form.Item
                          name="flatNo"
                          label="Flat No"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                        >
                          <Input
                            type="text"
                            placeholder="Flat No"
                            className={`form-control`}
                            name="flatNo"
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
                        {/* houseNo */}
                        <Form.Item
                          name="houseNo"
                          label="House No"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your House No!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="House No"
                            className={`form-control`}
                            name="houseNo"
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
                        {/* roadNo */}
                        <Form.Item
                          name="roadNo"
                          label="Road No"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                        >
                          <Input
                            type="text"
                            placeholder="Road No"
                            className={`form-control`}
                            name="roadNo"
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
                        {/* area */}
                        <Form.Item
                          name="area"
                          label="Area"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Area!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Area"
                            className={`form-control`}
                            name="area"
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
                        {/* connectionAddressDivisionId */}
                        <Form.Item
                          label="Connection Address (Division)"
                          style={{
                            marginBottom: 0,
                            marginRight: lg ? "10px" : "0px",
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please select Division!"
                            }
                          ]}
                          name="connectionAddressDivisionId"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select Division"
                              onChange={handleDivisionChange}
                              options={divisions}
                              value={selectedDivision}
                            />
                          </Space>
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
                        {/* connectionAddressDistrictId */}
                        <Form.Item
                          label="Connection Address (District)"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please select District!"
                            }
                          ]}
                          name="connectionAddressDistrictId"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select District"
                              onChange={handleDistrictChange}
                              options={districts}
                              value={selectedDistrict}
                            />
                          </Space>
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
                        {/* connectionAddressUpazillaId */}
                        <Form.Item
                          label="Connection Address (Upazilla)"
                          rules={[
                            {
                              required: true,
                              message: "Please select Upazilla!"
                            }
                          ]}
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          name="connectionAddressUpazillaId"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select Upazilla"
                              onChange={handleUpazillaChange}
                              options={upazillas}
                              value={selectedUpazilla}
                            />
                          </Space>
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
                        {/* connectionAddressPostCode */}
                        <Form.Item
                          name="connectionAddressPostCode"
                          label="Connection Address (PostCode)"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message:
                                "Please input your connectionAddressPostCode!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Connection Address (PostCode)"
                            className={`form-control`}
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
                        {/* permanentAddress */}
                        <Form.Item
                          name="permanentAddress"
                          label="Permanent Address"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Permanent Address!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Permanent Address"
                            className={`form-control`}
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
                        {/* permanentAddressDivisionId */}
                        <Form.Item
                          label="Permanent Address (Division)"
                          style={{
                            marginBottom: 0,
                            marginRight: lg ? "10px" : "0px",
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please select Division!"
                            }
                          ]}
                          name="permanentAddressDivisionId"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select Division"
                              onChange={handleParmanentAddressDivisionChange}
                              options={parmanentAddressDivisions}
                              value={selectedParmanentAddressDivision}
                            />
                          </Space>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </>
              )}

              {current === 2 && (
                <>
                  <Card
                    hoverable
                    style={{
                      width: "90%",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      margin: "0 auto",
                      textAlign: "center",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      border: "1px solid #F15F22"
                    }}
                  >
                    <Row
                      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                      justify="space-between"
                    >
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        xxl={24}
                        className="gutter-row"
                      >
                        {/* permanentAddressDistrictId */}
                        <Form.Item
                          label="Permanent Address (District)"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please select District!"
                            }
                          ]}
                          name="permanentAddressDistrictId"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select District"
                              onChange={handleParmanentAddressDistrictChange}
                              options={parmanentAddressDistricts}
                              value={selectedParmanentAddressDistrict}
                            />
                          </Space>
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
                        {/* permanentAddressUpazillaId */}
                        <Form.Item
                          label="Permanent Address (Upazilla)"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please select Upazilla!"
                            }
                          ]}
                          name="permanentAddressUpazillaId"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select Upazilla"
                              onChange={handleParmanentAddressUpazillaChange}
                              options={parmanentAddressUpazillas}
                              value={selectedParmanentAddressUpazilla}
                            />
                          </Space>
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
                        {/* permanentAddressPostCode */}
                        <Form.Item
                          name="permanentAddressPostCode"
                          label="Permanent Address (PostCode)"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message:
                                "Please input your Permanent Address PostCode!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Permanent Address (PostCode)"
                            className={`form-control`}
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
                        {/* mobileNumber */}
                        <Form.Item
                          name="mobileNumber"
                          label="Mobile Number"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Mobile Number!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Mobile Number"
                            className={`form-control`}
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
                        {/* phoneNumber */}
                        <Form.Item
                          name="phoneNumber"
                          label="Phone Number"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your Phone Number!"
                            }
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Phone Number"
                            className={`form-control`}
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
                        {/* altMobileNo */}
                        <Form.Item
                          name="altMobileNo"
                          label="Alt Mobile No"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Please input your Alt Mobile No!"
                          //   }
                          // ]}
                        >
                          <Input
                            type="text"
                            placeholder="Alt Mobile No"
                            className={`form-control`}
                            style={{ padding: "6px" }}
                          />
                        </Form.Item>
                      </Col>
                      {/* email */}
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        xxl={24}
                        className="gutter-row"
                      >
                        <Form.Item
                          label="Email"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          name="email"
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!"
                            },
                            {
                              required: true,
                              message: "Please input your E-mail!"
                            },
                            {
                              pattern: new RegExp(/^[A-Za-z0-9_\-@.]+$/),
                              message:
                                "Only letters, numbers, underscores and hyphens allowed"
                            }
                          ]}
                        >
                          <Input
                            type="email"
                            placeholder="Email"
                            className={`form-control`}
                            name="email"
                            style={{ padding: "6px" }}
                          />
                        </Form.Item>
                      </Col>
                      {/* occupation */}
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        xxl={24}
                        className="gutter-row"
                      >
                        {/* occupation */}
                        <Form.Item
                          label="Occupation"
                          style={{
                            marginBottom: 0,
                            fontWeight: "bold"
                          }}
                          name="occupation"
                        >
                          <Space style={{ width: "100%" }} direction="vertical">
                            <Select
                              allowClear
                              style={{ width: "100%", textAlign: "start" }}
                              placeholder="Please select Occupation"
                              onChange={handleOccupationChange}
                              options={occupations}
                              value={selectedOccupation}
                            />
                          </Space>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </>
              )}

              {/* submit */}
              <Row justify="center">
                <Col>
                  <div style={{ marginTop: 24 }}>
                    {current > 0 && (
                      <Button
                        style={{
                          margin: "0 8px",
                          fontWeight: "bold",
                          color: "#FFFFFF"
                        }}
                        onClick={() => prev()}
                        shape="round"
                        type="primary"
                      >
                        Previous
                      </Button>
                    )}
                    {current < steps.length - 1 && (
                      <Button
                        // type="primary"
                        shape="round"
                        onClick={() => next()}
                        style={{
                          backgroundColor: "#F15F22",
                          color: "#FFFFFF",
                          fontWeight: "bold"
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </div>

                  <Form.Item style={{ margin: "0 8px" }}>
                    <div style={{ marginTop: 24 }}>
                      {current === steps.length - 1 && (
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
                      )}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default CreateSafVerificationForm;
