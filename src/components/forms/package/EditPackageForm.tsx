/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAppSelector } from "@/store/hooks";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Row,
  Col
} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { PackageData } from "@/interfaces/PackageData";
// import AppImageLoader from "@/components/loader/AppImageLoader";
interface FormData {
  name: string;
  displayName: string;
  uploadLimit: string;
  uploadLimitUnit: string;
  downloadLimit: string;
  downloadLimitUnit: string;
  ipPoolName: string;
  nextExpiredPackageId: any;
  validity: string;
  vat: string;
  totalPrice: string;
  unitPrice: string;
}

const uploadUnits = [
  {
    label: "Mbps",
    value: "Mbps"
  },
  {
    label: "Kbps",
    value: "Kbps"
  }
];

const validityUnits = [
  {
    label: "Day",
    value: "Day"
  },
  {
    label: "Month",
    value: "Month"
  }
];

interface PropData {
  item: PackageData;
}

const EditPackageForm = ({ item }: PropData) => {
  console.log("item", item);
  const [form] = Form.useForm();
  const authUser = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(false);

  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const [autoRenew, setAutoRenew] = useState(true);
  const [isAssignedToZone, setIsAssignedToZone] = useState(false);
  const [isAssignedToSubZone, setIsAssignedToSubZone] = useState(false);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [selectedUnit, setSelectedUnit] = useState<any>(null);

  const [selectedUploadUnit, setSelectedUploadUnit] = useState<any>(null);

  const [selectedDownloadUnit, setSelectedDownloadUnit] = useState<any>(null);

  const [nextExpired, setNextExpired] = useState<any[]>([]);
  const [nextExpiredId, setNextExpiredId] = useState<any>(null);

  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleActive = (e: any) => {
    setIsActive(e.target.checked ? true : false);
  };

  const handleAutoRenew = (e: any) => {
    setAutoRenew(e.target.checked ? true : false);
  };

  const handleIsAssignedToZone = (e: any) => {
    setIsAssignedToZone(e.target.checked ? true : false);
  };

  const handleIsAssignedToSubZone = (e: any) => {
    setIsAssignedToSubZone(e.target.checked ? true : false);
  };

  const handleUnitChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ validityUnit: value });
    setSelectedUnit(value as any);
  };

  const handleUploadUnitChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ uploadLimitUnit: value });
    setSelectedUploadUnit(value as any);
  };

  const handleDownloadUnitChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ downloadLimitUnit: value });
    setSelectedDownloadUnit(value as any);
  };
  //handle nextExpiredPackageId
  const handleNextExpiredPackageId = (value: any) => {
    form.setFieldsValue({ nextExpiredPackageId: value });
    setNextExpiredId(value as any);
  };
  // NextExpiredPackageId
  function getNextExpiredPackageId() {
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
        // partnerType: "zone",
        // deviceType: "OLT",
        // name: "30Mbps Unlimited"
        isActive: true
      }
    };
    axios.post("/api/customer-package/get-list", body).then(res => {
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

      setNextExpired(list);
    });
  }
  useEffect(() => {
    getNextExpiredPackageId();
  }, []);
  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        displayName: item.displayName,
        uploadLimit: item.uploadLimit,
        uploadLimitUnit: item.uploadLimitUnit,
        downloadLimit: item.downloadLimit,
        downloadLimitUnit: item.downloadLimitUnit,
        ipPoolName: item.ipPoolName,
        validity: item.validity,
        vat: item.vat,
        totalPrice: item.totalPrice,
        unitPrice: item.unitPrice,
        validityUnit: item.validityUnit
      });

      setSelectedUnit(item.validityUnit);
      setSelectedUploadUnit(item.uploadLimitUnit);
      setSelectedDownloadUnit(item.downloadLimitUnit);
      setAutoRenew(item.autoRenew);
      setIsAssignedToZone(item.isAssignedToZone);
      setIsAssignedToSubZone(item.isAssignedToSubZone);
      setIsActive(item.isActive);

      if (item && item.nextExpiredPackageId) {
        setNextExpiredId(item.nextExpiredPackageId);
        form.setFieldsValue({
          nextExpiredPackageId: item.nextExpiredPackageId
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setTimeout(async () => {
      const {
        name,
        displayName,
        uploadLimit,
        uploadLimitUnit,
        downloadLimit,
        downloadLimitUnit,
        ipPoolName,
        // nextExpiredPackageId,
        validity,
        vat,
        totalPrice,
        unitPrice
      } = data;

      const formData = {
        id: item.id,
        // zoneIds: selectedZone,
        name: name,
        displayName: displayName,
        uploadLimit: uploadLimit,
        uploadLimitUnit: uploadLimitUnit,
        downloadLimit: downloadLimit,
        downloadLimitUnit: downloadLimitUnit,
        ipPoolName: ipPoolName,
        // nextExpiredPackageId: nextExpiredPackageId,
        nextExpiredPackageId: nextExpiredId,
        validityUnit: selectedUnit,
        validity: validity,
        vat: vat,
        totalPrice: totalPrice,
        unitPrice: unitPrice,
        autoRenew: autoRenew,
        isAssignedToZone: isAssignedToZone,
        isAssignedToSubZone: isAssignedToSubZone,
        isActive: isActive
      };

      try {
        await axios
          .put("/api/customer-package/update", formData)
          .then(res => {
            // console.log(res);
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
                router.replace("/admin/package/package");
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
            name: "",
            displayName: "",
            uploadLimit: "",
            uploadLimitUnit: "",
            downloadLimit: "",
            downloadLimitUnit: "",
            ipPoolName: "",
            nextExpiredPackageId: "",
            validityUnit: "",
            validity: "",
            vat: "",
            totalPrice: "",
            unitPrice: ""
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
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            >
              {/* name */}
              <Form.Item
                label="Name"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!"
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Name"
                  className={`form-control`}
                  name="name"
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
              {/* displayName */}
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
                  placeholder="Display Name"
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
              {/* uploadLimit */}
              <Form.Item
                label="Upload Limit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="uploadLimit"
                // rules={[
                //   {
                //     required: true
                //     // message: "Please input your Upload Limit!"
                //   },
                //   {
                //     validator: async (_, value) => {
                //       if (!value) {
                //         return Promise.reject("Please input Upload Limit!");
                //       }
                //       const intValue = parseInt(value, 10);
                //       if (isNaN(intValue)) {
                //         return Promise.reject("Please enter a valid number.");
                //       }
                //       if (intValue < 0 || intValue > 10240) {
                //         return Promise.reject(
                //           "Upload Limit must be >= 0 and <= 10240"
                //         );
                //       }
                //       return Promise.resolve();
                //     }
                //   }
                // ]}
                rules={[
                  {
                    required: true
                    // message: "Please input Upload Limit!"
                  },
                  {
                    validator: async (_, value) => {
                      if (value === undefined || value === null) {
                        return Promise.reject("Please input Upload Limit!");
                      }
                      const intValue = parseInt(value, 10);
                      if (isNaN(intValue)) {
                        return Promise.reject("Please enter a valid number.");
                      }
                      if (intValue < 0 || intValue > 10240) {
                        return Promise.reject(
                          "Upload Limit must be >=0 and <= 10240"
                        );
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="Upload Limit"
                  className={`form-control`}
                  name="uploadLimit"
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
              {/* uploadLimitUnit */}
              <Form.Item
                label="Upload Limit Unit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="uploadLimitUnit"
                rules={[
                  {
                    required: true,
                    message: "Please input your Upload Limit Unit!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Upload Limit Unit"
                    onChange={handleUploadUnitChange}
                    options={uploadUnits}
                    value={selectedUploadUnit}
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
              {/* downloadLimit */}
              <Form.Item
                label="Download Limit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="downloadLimit"
                rules={[
                  {
                    required: true
                    // message: "Please input your Upload Limit!"
                  },
                  {
                    validator: async (_, value) => {
                      if (value === undefined || value === null) {
                        return Promise.reject("Please input Download Limit!");
                      }
                      const intValue = parseInt(value, 10);
                      if (isNaN(intValue)) {
                        return Promise.reject("Please enter a valid number.");
                      }
                      if (intValue < 0 || intValue > 10240) {
                        return Promise.reject(
                          "Download Limit must be >=0 and <= 10240"
                        );
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="Download Limit"
                  className={`form-control`}
                  name="downloadLimit"
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
              {/* downloadLimitUnit */}
              <Form.Item
                label="Download Limit Unit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="downloadLimitUnit"
                rules={[
                  {
                    required: true,
                    message: "Please input your Download Limit Unit!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Download Limit Unit"
                    onChange={handleDownloadUnitChange}
                    options={uploadUnits}
                    value={selectedDownloadUnit}
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
              {/* validity */}
              <Form.Item
                label="Validity"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="validity"
                rules={[
                  {
                    required: true
                    // message: "Please input your Upload Limit!"
                  },
                  {
                    validator: async (_, value) => {
                      if (value === undefined || value === null) {
                        return Promise.reject("Please input Validity Limit!");
                      }
                      const intValue = parseInt(value, 10);
                      if (isNaN(intValue)) {
                        return Promise.reject("Please enter a valid number.");
                      }
                      if (intValue < 0 || intValue > 10240) {
                        return Promise.reject(
                          "Validity Limit must be >=0 and <= 10240"
                        );
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="Validity"
                  className={`form-control`}
                  name="validity"
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
              {/* validityUnit */}
              <Form.Item
                label="Validity Unit"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="validityUnit"
                rules={[
                  {
                    required: true,
                    message: "Please select Validity Unit!"
                  }
                ]}
              >
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Validity Unit"
                    onChange={handleUnitChange}
                    options={validityUnits}
                    value={selectedUnit}
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
              {/* vat */}
              <Form.Item
                label="VAT (%)"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="vat"
                rules={[
                  {
                    required: true
                    // message: "Please input your Upload Limit!"
                  },
                  {
                    validator: async (_, value) => {
                      if (value === undefined || value === null) {
                        return Promise.reject("Please input VAT!");
                      }
                      const intValue = parseInt(value, 10);
                      if (isNaN(intValue)) {
                        return Promise.reject("Please enter a valid number.");
                      }
                      if (intValue < 0 || intValue > 100) {
                        return Promise.reject("VAT must be >=0 and <= 100");
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="VAT (%)"
                  className={`form-control`}
                  name="vat"
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
              {/* totalPrice */}
              <Form.Item
                label="Total Price"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="totalPrice"
                rules={[
                  {
                    required: true
                    // message: "Please input your Upload Limit!"
                  },
                  {
                    validator: async (_, value) => {
                      if (value === undefined || value === null) {
                        return Promise.reject("Please input Total Price!");
                      }
                      const intValue = parseInt(value, 10);
                      if (isNaN(intValue)) {
                        return Promise.reject("Please enter a valid number.");
                      }
                      if (intValue < 0 || intValue > 100000) {
                        return Promise.reject(
                          "Total Price must be >=0 and <= 100000"
                        );
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input
                  type="number"
                  placeholder="Total Price"
                  className={`form-control`}
                  name="totalPrice"
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
              {/* nextExpiredPackageId */}
              <Form.Item
                label="Next Expired Package"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="nextExpiredPackageId"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your Next Expired Package!"
                //   }
                // ]}
              >
                {/* <Input
                    type="text"
                    placeholder="Next Expired Package"
                    className={`form-control`}
                    name="nextExpiredPackageId"
                    style={{ padding: "6px" }}
                  /> */}
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    allowClear
                    style={{ width: "100%", textAlign: "start" }}
                    placeholder="Please select Next Expired Package!"
                    onChange={handleNextExpiredPackageId}
                    options={nextExpired}
                    value={nextExpiredId}
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
              {/* ipPoolName */}
              <Form.Item
                label="IP Pool Name"
                style={{
                  marginBottom: 0,
                  fontWeight: "bold"
                }}
                name="ipPoolName"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your IP Pool Name!"
                //   }
                // ]}
              >
                <Input
                  type="text"
                  placeholder="IP Pool Name"
                  className={`form-control`}
                  name="ipPoolName"
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
            ></Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
            ></Col>
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
          <Space
            size={[8, 8]}
            wrap
            style={{
              marginTop: "2rem",
              marginBottom: "2rem"
            }}
          >
            {/* autoRenew */}
            <Form.Item
              label=""
              style={{
                marginBottom: 0
              }}
            >
              <Checkbox onChange={handleAutoRenew} checked={autoRenew}>
                Auto Renew
              </Checkbox>
            </Form.Item>

            {/* isAssignedToZone */}
            {authUser &&
              authUser?.clientLevel != "tri_cycle" &&
              authUser?.clientLevel != "tri_cycle_hotspot" &&
              authUser?.clientLevel != "tri_cycle_isp_hotspot" && (
                <Form.Item
                  label=""
                  style={{
                    marginBottom: 0
                  }}
                >
                  <Checkbox
                    onChange={handleIsAssignedToZone}
                    checked={isAssignedToZone}
                  >
                    Assigned To Zone
                  </Checkbox>
                </Form.Item>
              )}

            {/* isAssignedToSubZone */}
            <Form.Item
              label=""
              style={{
                marginBottom: 0
              }}
            >
              <Checkbox
                onChange={handleIsAssignedToSubZone}
                checked={isAssignedToSubZone}
              >
                Assigned To SubZone
              </Checkbox>
            </Form.Item>

            {/* status */}
            <Form.Item
              label=""
              style={{
                marginBottom: 0
              }}
            >
              <Checkbox onChange={handleActive} checked={isActive}>
                Active
              </Checkbox>
            </Form.Item>
          </Space>
          <div className="bg-gray-400 flex flex-col gap-1 my-5">
            <div className="rounded-sm w-full grid grid-cols-12 bg-white shadow p-6 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform">
              <div className="col-span-11 xl:-ml-5">
                <p className="text-blue-600 font-semibold text-left text-lg">
                  <span className="text-danger">
                    * 0 means unlimited for upload and download limit
                  </span>
                </p>
              </div>
            </div>
          </div>
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

export default EditPackageForm;
