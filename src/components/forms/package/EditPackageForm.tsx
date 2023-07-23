/* eslint-disable @typescript-eslint/no-explicit-any */
// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Alert, Button, Checkbox, Form, Input, Select, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { PackageData } from "@/interfaces/PackageData";
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

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

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

interface PropData {
  item: PackageData;
}

const EditPackageForm = ({ item }: PropData) => {
  const [form] = Form.useForm();
  // ** States
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [isActive, setIsActive] = useState(true);

  const [autoRenew, setAutoRenew] = useState(true);
  const [isAssignedToZone, setIsAssignedToZone] = useState(true);
  const [isAssignedToSubZone, setIsAssignedToSubZone] = useState(true);

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [zones, setZones] = useState([]);

  const [selectedZone, setSelectedZone] = useState<any[]>([]);

  const [units, setUnits] = useState([]);

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

  const handleZoneChange = (value: any[]) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ zoneIds: value });
    setSelectedZone(value as any[]);
  };

  const handleUnitChange = (value: any) => {
    // console.log("checked = ", value);
    form.setFieldsValue({ validityUnitId: value });
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

  const getZones = async () => {
    const body = {
      meta: {
        sort: [
          {
            order: "asc",
            field: "name"
          }
        ]
      }
    };

    const res = await axios.post("/api/distribution-zone/get-list", body);
    if (res.data.status == 200) {
      // console.log(res.data.data.roles);

      const items = res.data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setZones(items);
    }
  };

  const getUnits = async () => {
    const res = await axios.get(
      "/api/lookup-details/get-by-master-key/data_validity_unit"
    );
    if (res.data.status == 200) {
      const items = res.data.body.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setUnits(items);
    }
  };

  useEffect(() => {
    getZones();
    getUnits();
  }, []);

  useEffect(() => {
    if (item) {
      const checked = item.distributionZones.map((itemData: any) => {
        return itemData.zoneId;
      });
      setSelectedZone(checked);

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
        unitPrice: item.unitPrice
      });

      setSelectedUnit(item.validityUnitId);
      setSelectedUploadUnit(item.uploadLimitUnit);
      setSelectedDownloadUnit(item.downloadLimitUnit);
      setAutoRenew(item.autoRenew);
      setIsAssignedToZone(item.isAssignedToZone);
      setIsAssignedToSubZone(item.isAssignedToSubZone);
      setIsActive(item.isActive);
    }
  }, [item]);

  const onSubmit = (data: FormData) => {
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
      zoneIds: selectedZone,
      name: name,
      displayName: displayName,
      uploadLimit: uploadLimit,
      uploadLimitUnit: uploadLimitUnit,
      downloadLimit: downloadLimit,
      downloadLimitUnit: downloadLimitUnit,
      ipPoolName: ipPoolName,
      nextExpiredPackageId: nextExpiredPackageId,
      validityUnitId: selectedUnit,
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

          MySwal.fire({
            title: "Success",
            text: data.message || "Update successfully",
            icon: "success"
          }).then(() => {
            router.replace("/admin/package/package");
          });
        })
        .catch(err => {
          // console.log(err);
          setShowError(true);
          setErrorMessages(err.response.data.message);
        });
    } catch (err: any) {
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
            validityUnitId: "",
            validity: "",
            vat: "",
            totalPrice: "",
            unitPrice: ""
          }}
          style={{ maxWidth: "100%" }}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          scrollToFirstError
        >
          {/* zoneIds */}
          <Form.Item
            label="zoneIds"
            style={{
              marginBottom: 0
            }}
            name="zoneIds"
            rules={[
              {
                required: true,
                message: "Please select"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleZoneChange}
                options={zones}
                value={selectedZone}
              />
            </Space>
          </Form.Item>

          {/* name */}
          <Form.Item
            label="Name"
            style={{
              marginBottom: 0
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
            />
          </Form.Item>

          {/* displayName */}
          <Form.Item
            label="displayName"
            style={{
              marginBottom: 0
            }}
            name="displayName"
            rules={[
              {
                required: true,
                message: "Please input your displayName!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="displayName"
              className={`form-control`}
              name="displayName"
            />
          </Form.Item>

          {/* uploadLimit */}
          <Form.Item
            label="uploadLimit"
            style={{
              marginBottom: 0
            }}
            name="uploadLimit"
            rules={[
              {
                required: true,
                message: "Please input your uploadLimit!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="uploadLimit"
              className={`form-control`}
              name="uploadLimit"
            />
          </Form.Item>

          {/* uploadLimitUnit */}
          <Form.Item
            label="uploadLimitUnit"
            style={{
              marginBottom: 0
            }}
            name="uploadLimitUnit"
            rules={[
              {
                required: true,
                message: "Please input your uploadLimitUnit!"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleUploadUnitChange}
                options={uploadUnits}
                value={selectedUploadUnit}
              />
            </Space>
          </Form.Item>

          {/* downloadLimit */}
          <Form.Item
            label="downloadLimit"
            style={{
              marginBottom: 0
            }}
            name="downloadLimit"
            rules={[
              {
                required: true,
                message: "Please input your downloadLimit!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="downloadLimit"
              className={`form-control`}
              name="downloadLimit"
            />
          </Form.Item>

          {/* downloadLimitUnit */}
          <Form.Item
            label="downloadLimitUnit"
            style={{
              marginBottom: 0
            }}
            name="downloadLimitUnit"
            rules={[
              {
                required: true,
                message: "Please input your downloadLimitUnit!"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleDownloadUnitChange}
                options={uploadUnits}
                value={selectedDownloadUnit}
              />
            </Space>
          </Form.Item>

          {/* ipPoolName */}
          <Form.Item
            label="ipPoolName"
            style={{
              marginBottom: 0
            }}
            name="ipPoolName"
            rules={[
              {
                required: true,
                message: "Please input your ipPoolName!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="ipPoolName"
              className={`form-control`}
              name="ipPoolName"
            />
          </Form.Item>

          {/* nextExpiredPackageId */}
          <Form.Item
            label="nextExpiredPackageId"
            style={{
              marginBottom: 0
            }}
            name="nextExpiredPackageId"
            rules={[
              {
                required: true,
                message: "Please input your nextExpiredPackageId!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="nextExpiredPackageId"
              className={`form-control`}
              name="nextExpiredPackageId"
            />
          </Form.Item>

          {/* validityUnitId */}
          <Form.Item
            label="validityUnitId"
            style={{
              marginBottom: 0
            }}
            name="validityUnitId"
            rules={[
              {
                required: true,
                message: "Please select"
              }
            ]}
          >
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleUnitChange}
                options={units}
                value={selectedUnit}
              />
            </Space>
          </Form.Item>

          {/* validity */}
          <Form.Item
            label="validity"
            style={{
              marginBottom: 0
            }}
            name="validity"
            rules={[
              {
                required: true,
                message: "Please input your validity!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="validity"
              className={`form-control`}
              name="validity"
            />
          </Form.Item>

          {/* vat */}
          <Form.Item
            label="vat"
            style={{
              marginBottom: 0
            }}
            name="vat"
            rules={[
              {
                required: true,
                message: "Please input your vat!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="vat"
              className={`form-control`}
              name="vat"
            />
          </Form.Item>

          {/* totalPrice */}
          <Form.Item
            label="totalPrice"
            style={{
              marginBottom: 0
            }}
            name="totalPrice"
            rules={[
              {
                required: true,
                message: "Please input your totalPrice!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="totalPrice"
              className={`form-control`}
              name="totalPrice"
            />
          </Form.Item>

          {/* unitPrice */}
          <Form.Item
            label="unitPrice"
            style={{
              marginBottom: 0
            }}
            name="unitPrice"
            rules={[
              {
                required: true,
                message: "Please input your unitPrice!"
              }
            ]}
          >
            <Input
              type="text"
              placeholder="unitPrice"
              className={`form-control`}
              name="unitPrice"
            />
          </Form.Item>

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
              isAssignedToZone
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
              isAssignedToSubZone
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

          {/* submit */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditPackageForm;
