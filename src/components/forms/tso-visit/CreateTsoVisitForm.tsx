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
  Upload
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined
} from "@ant-design/icons";

import type { UploadProps } from "antd/es/upload";
import type { UploadFile, UploadFileStatus } from "antd/es/upload/interface";
import AppImageLoader from "@/components/loader/AppImageLoader";

const statuses = [
  {
    label: "yes",
    value: true
  },
  {
    label: "no",
    value: false
  }
];

const frequentComplains = [
  {
    label: "option1",
    value: "option1"
  },
  {
    label: "option2",
    value: "option2"
  }
];

interface FromData {
  retailerId: string | undefined;
  totalSalesInLastWeek: string | undefined;
  gpsLocation: string | undefined;
  isCompetitionPresent: string | undefined;
  hotspotFrequency: string | undefined;
  internetSpeed: string | undefined;
  totalComplainsSinceLastVisit: string | undefined;
  frequentComplains: string | undefined;
  fiberCut: string | undefined;
  laserIssues: string | undefined;
  powerIssues: string | undefined;
  powerBackup: string | undefined;
  sunShedBannerPresent: string | undefined;
  lavelOneSupportShown: string | undefined;
  rateCardFestoonDisplayed: string | undefined;

  packageSaleLine: LineDataProps[];
  otherProductSaleLine: OtherProductSaleLineDataProps[];
  competitorInfoLine: CompetitorInfoLineProps[];
}

interface LineDataProps {
  pricingPlanId: string | undefined;
  amount: string | undefined;
}
interface OtherProductSaleLineDataProps {
  otherProductId: string | undefined;
  amount: string | undefined;
}

interface CompetitorInfoLineProps {
  contactNo: string | undefined;
  hotspotFrequency: string | undefined;
  frequentComplains: string | undefined;
  internetSpeed: string | undefined;
}

const CreateTsoVisitForm = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [linesValues, setLinesValues] = useState<LineDataProps[]>([]);
  const [otherProductSaleLinesValues, setOtherProductSaleLinesValues] =
    useState<OtherProductSaleLineDataProps[]>([]);

  const [file, setFile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [previous, setPrevious] = useState<any>(null);

  const [retailers, setRetailers] = useState<any[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState<any>(null);

  const [pricingPlans, setPricingPlans] = useState<any[]>([]);

  // const [allPricingPlans, setAllPricingPlans] = useState<any[]>([]);

  // isCompetitionPresent
  const [isCompetitionPresent, setIsCompetitionPresent] = useState<any>("no");

  // frequentComplains
  const [selectedfrequentComplains, setSelectedFrequentComplains] = useState<
    any[]
  >([]);

  const [otherProducts, setOtherProducts] = useState<any[]>([]);

  // powerBackup
  const [powerBackup, setPowerBackup] = useState<any>("no");

  // sunShedBannerPresent
  const [sunShedBannerPresent, setSunShedBannerPresent] = useState<any>("no");

  // rateCardFestoonDisplayed
  const [rateCardFestoonDisplayed, setRateCardFestoonDisplayed] =
    useState<any>("no");

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
    // console.log("Dummy action triggered. File:", file);

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

  const handlePricingPlanChange = (value: any, key: number) => {
    // make a new field in forms packageSaleLine list and set pricing plan id
    form.setFieldsValue({ [`packageSaleLine[${key}].pricingPlanId`]: value });

    if (value) {
      const newLinesValues = [...linesValues];
      newLinesValues[key] = {
        ...newLinesValues[key],
        pricingPlanId: value
      };
      setLinesValues(newLinesValues);
    }
  };

  const handleOtherProductSaleChange = (value: any, key: number) => {
    // make a new field in forms packageSaleLine list and set pricing plan id
    form.setFieldsValue({
      [`otherProductSaleLine[${key}].otherProductId`]: value
    });

    if (value) {
      const newOtherProductSale = [...otherProductSaleLinesValues];
      newOtherProductSale[key] = {
        ...newOtherProductSale[key],
        otherProductId: value
      };
      setOtherProductSaleLinesValues(newOtherProductSale);
    }
  };
  //functions for getting zone manger list data using POST request
  function getPricingPlan() {
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
    axios.post("/api-hotspot/pricing-plan/get-list", body).then(res => {
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

      setPricingPlans(list);
      // setAllPricingPlans(data.body);
    });
  }

  function getOtherProducts() {
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
    axios.post("/api-hotspot/other-product/get-list", body).then(res => {
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

      setOtherProducts(list);
    });
  }

  function getRetailers() {
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
        partnerType: "retailer",
        // subZoneManager: { id: selectedSubZone },
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

      setRetailers(list);
    });
  }

  const getPreviousData = async (retailerId: string | null) => {
    try {
      const res = await axios.get(
        `/api-hotspot/tso-visit/get-todays-data?retailerId=${retailerId}`
      );
      const { data } = res;

      if (data.status == 200) {
        setPrevious(data.body);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRetailers();
    getPreviousData(null);
    getOtherProducts();
    getPricingPlan();
  }, []);

  const handleStatusChange = (value: any) => {
    setIsCompetitionPresent(value);
    form.setFieldsValue({ isCompetitionPresent: value });
  };
  const handleRetailerChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ retailerId: value });
    setSelectedRetailer(value as any);
  };

  const handleFrequentComplainsChange = (value: any) => {
    setSelectedFrequentComplains(value);
    form.setFieldsValue({ frequentComplains: value });
  };

  const handlePowerBackupChange = (value: any) => {
    setPowerBackup(value);
    form.setFieldsValue({ powerBackup: value });
  };

  const handleSunShedBannerPresentChange = (value: any) => {
    setSunShedBannerPresent(value);
    form.setFieldsValue({ sunShedBannerPresent: value });
  };

  const handleRateCardFestoonDisplayedChange = (value: any) => {
    setRateCardFestoonDisplayed(value);
    form.setFieldsValue({ rateCardFestoonDisplayed: value });
  };

  const onSubmit = (data: FromData) => {
    setLoading(true);
    const {
      gpsLocation,
      hotspotFrequency,
      internetSpeed,
      totalComplainsSinceLastVisit,
      fiberCut,
      laserIssues,
      powerIssues,
      lavelOneSupportShown,
      competitorInfoLine,
      packageSaleLine,
      otherProductSaleLine
    } = data;

    const bodyData = {
      id: previous?.id,
      retailerId: selectedRetailer,
      gpsLocation: gpsLocation,
      isCompetitionPresent: isCompetitionPresent,
      hotspotFrequency: hotspotFrequency,
      internetSpeed: internetSpeed,
      totalComplainsSinceLastVisit: totalComplainsSinceLastVisit,
      frequentComplains: selectedfrequentComplains,
      fiberCut: fiberCut,
      laserIssues: laserIssues,
      powerIssues: powerIssues,
      powerBackup: powerBackup,
      sunShedBannerPresent: sunShedBannerPresent,
      rateCardFestoonDisplayed: rateCardFestoonDisplayed,
      lavelOneSupportShown: lavelOneSupportShown,
      packageSaleLine: packageSaleLine,
      otherProductSaleLine: otherProductSaleLine,
      competitorInfoLine: competitorInfoLine
    };

    const formData = new FormData();
    if (file) {
      formData.append("shopPhoto", file);
    }
    formData.append("body", JSON.stringify(bodyData));

    try {
      axios
        .post("/api-hotspot/tso-visit/submit-report", formData)
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
              text: data.message || "Created successfully",
              icon: "success"
            }).then(() => {
              router.replace("/admin/hotspot/tso-visit");
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
        <>
          <div className="mt-3">
            <Form
              // {...layout}
              layout="vertical"
              autoComplete="off"
              onFinish={onSubmit}
              form={form}
              initialValues={{
                totalComplainsSinceLastVisit: 0,
                fiberCut: 0,
                laserIssues: 0,
                powerIssues: 0,
                lavelOneSupportShown: 0
              }}
              style={{ maxWidth: "100%" }}
              name="wrap"
              colon={false}
              scrollToFirstError
            >
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* retailerId */}
                  <Form.Item
                    label="Retailer"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please Select Retailer"
                      }
                    ]}
                    name="retailerId"
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select Retailer"
                        onChange={handleRetailerChange}
                        options={retailers}
                        value={selectedRetailer}
                      />
                    </Space>
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
                  {/* gpsLocation */}
                  <Form.Item
                    label="GPS Location"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="gpsLocation"
                    rules={[
                      {
                        required: true,
                        message: "Please input GPS Location!"
                      }
                    ]}
                  >
                    <Input
                      placeholder="GPS Location"
                      className={`form-control`}
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
                  {/* isCompetitionPresent */}
                  <Form.Item
                    label="Is Competitor Available?"
                    name="isCompetitionPresent"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please select Is Competitor Available?!"
                      }
                    ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select Is Competitor Available?"
                        onChange={handleStatusChange}
                        options={statuses}
                        value={isCompetitionPresent}
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
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* hotspotFrequency */}
                  <Form.Item
                    label="Hotspot Frequency"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="hotspotFrequency"
                    rules={[
                      {
                        required: true,
                        message: "Please input Hotspot Frequency!"
                      }
                    ]}
                  >
                    <Input placeholder="Hotspot Frequency" />
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
                  {/* internetSpeed */}
                  <Form.Item
                    label="Internet Speed"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="internetSpeed"
                    rules={[
                      {
                        required: true,
                        message: "Please input Internet Speed!"
                      }
                    ]}
                  >
                    <Input placeholder="Internet Speed" />
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
                  {/* totalComplainsSinceLastVisit */}
                  <Form.Item
                    label="Total Complains Since Last Visit"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="totalComplainsSinceLastVisit"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please input Total Complains Since Last Visit!"
                      }
                    ]}
                  >
                    <Input placeholder="Total Complains Since Last Visit" />
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
                  {/* frequentComplains */}
                  <Form.Item
                    label="Frequent Complains"
                    name="frequentComplains"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please select!"
                    //   }
                    // ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select Frequent Complains"
                        onChange={handleFrequentComplainsChange}
                        options={frequentComplains}
                        value={selectedfrequentComplains}
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
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* fiberCut */}
                  <Form.Item
                    label="Fiber Cut"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="fiberCut"
                    rules={[
                      {
                        required: true,
                        message: "Please input fiberCut!"
                      }
                    ]}
                  >
                    <Input placeholder="fiberCut" />
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
                  {/* laserIssues */}
                  <Form.Item
                    label="Laser Issues"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="laserIssues"
                    rules={[
                      {
                        required: true,
                        message: "Please input Laser Issues!"
                      }
                    ]}
                  >
                    <Input placeholder="Laser Issues" />
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
                  {/* powerIssues */}
                  <Form.Item
                    label="Power Issues"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="powerIssues"
                    rules={[
                      {
                        required: true,
                        message: "Please input Power Issues!"
                      }
                    ]}
                  >
                    <Input placeholder="Power Issues" />
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
                  {/* lavelOneSupportShown */}
                  <Form.Item
                    label="Level-1 Support Shown"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    name="lavelOneSupportShown"
                    rules={[
                      {
                        required: true,
                        message: "Please input Level-1 Support Shown!"
                      }
                    ]}
                  >
                    <Input placeholder="Level-1 Support Shown" />
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
                  {/* powerBackup */}
                  <Form.Item
                    label="Power Backup"
                    name="powerBackup"
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
                        placeholder="Please select Power Backup"
                        onChange={handlePowerBackupChange}
                        options={statuses}
                        value={powerBackup}
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
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* sunShedBannerPresent */}
                  <Form.Item
                    label="Is Sun Shed Banner Present?"
                    name="sunShedBannerPresent"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please select Is Sun Shed Banner Present?!"
                      }
                    ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select Is Sun Shed Banner Present?"
                        onChange={handleSunShedBannerPresentChange}
                        options={statuses}
                        value={sunShedBannerPresent}
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
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                >
                  {/* rateCardFestoonDisplayed */}
                  <Form.Item
                    label="Is Rate Card Festoon Displayed"
                    name="rateCardFestoonDisplayed"
                    style={{
                      marginBottom: 0,
                      fontWeight: "bold"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please select Is Rate Card Festoon Displayed!"
                      }
                    ]}
                  >
                    <Space style={{ width: "100%" }} direction="vertical">
                      <Select
                        allowClear
                        style={{ width: "100%", textAlign: "start" }}
                        placeholder="Please select Is Rate Card Festoon Displayed"
                        onChange={handleRateCardFestoonDisplayedChange}
                        options={statuses}
                        value={rateCardFestoonDisplayed}
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
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="gutter-row"
                ></Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col>
                  <Form.List name="packageSaleLine">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              label="Package"
                              name={[name, "pricingPlanId"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Package"
                                }
                              ]}
                            >
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select Package"
                                onChange={value =>
                                  handlePricingPlanChange(value, key)
                                }
                                options={pricingPlans}
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
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="Amount"
                              name={[name, "amount"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Amount"
                                }
                              ]}
                            >
                              <Input placeholder="Amount" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add field (Package Sale)
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col>
                  <Form.List name="otherProductSaleLine">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              label="Other Product"
                              name={[name, "otherProductId"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Select
                                allowClear
                                style={{ width: "100%", textAlign: "start" }}
                                placeholder="Please select Other Product"
                                onChange={value =>
                                  handleOtherProductSaleChange(value, key)
                                }
                                options={otherProducts}
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
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="Amount"
                              name={[name, "amount"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Amount"
                                }
                              ]}
                            >
                              <Input placeholder="Amount" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add field (other ProductSale)
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col>
                  <Form.List name="competitorInfoLine">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              label="Contact"
                              name={[name, "contactNo"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Contact"
                                }
                              ]}
                            >
                              <Input placeholder="Contact" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="hotspotFrequency"
                              name={[name, "hotspotFrequency"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Input placeholder="hotspotFrequency" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="frequentComplains"
                              name={[name, "frequentComplains"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Input placeholder="frequentComplains" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="internetSpeed"
                              name={[name, "internetSpeed"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input"
                                }
                              ]}
                            >
                              <Input placeholder="internetSpeed" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        {isCompetitionPresent != "no" && (
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add field (Competitor Info)
                            </Button>
                          </Form.Item>
                        )}
                      </>
                    )}
                  </Form.List>
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
                    name="attachment"
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
                  <Form.Item style={{ margin: "0 8px" }}>
                    <div style={{ marginTop: 24 }}>
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

export default CreateTsoVisitForm;
