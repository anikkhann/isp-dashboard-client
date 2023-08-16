/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
import AppImageLoader from "@/components/loader/AppImageLoader";
interface FormData {
  name: string;
  displayName: string;
  uploadLimit: string;
  uploadLimitUnit: string;
  downloadLimit: string;
  downloadLimitUnit: string;
  ipPoolName: string;
  nextExpiredPackageId: string;
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
  const [form] = Form.useForm();

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const {
      name,
      displayName,
      uploadLimit,
      uploadLimitUnit,
      downloadLimit,
      downloadLimitUnit,
      ipPoolName,
      nextExpiredPackageId,
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
      nextExpiredPackageId: nextExpiredPackageId,
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
      axios
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
          setShowError(true);
          setErrorMessages(err.response.data.message);
        });
    } catch (err: any) {
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
                  rules={[
                    {
                      required: true,
                      message: "Please input your Upload Limit!"
                    }
                  ]}
                >
                  <Input
                    type="text"
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
                      required: true,
                      message: "Please input your Download Limit!"
                    }
                  ]}
                >
                  <Input
                    type="text"
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
                      required: true,
                      message: "Please input your Validity!"
                    }
                  ]}
                >
                  <Input
                    type="text"
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
                  label="Vat (%)"
                  style={{
                    marginBottom: 0,
                    fontWeight: "bold"
                  }}
                  name="vat"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Vat (%)!"
                    }
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Vat (%)"
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
                      required: true,
                      message: "Please input your Total Price!"
                    }
                  ]}
                >
                  <Input
                    type="text"
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
                  <Input
                    type="text"
                    placeholder="Next Expired Package"
                    className={`form-control`}
                    name="nextExpiredPackageId"
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

export default EditPackageForm;
