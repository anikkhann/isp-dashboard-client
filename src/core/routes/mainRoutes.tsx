import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";
// import { GrUserSettings } from "react-icons/all";

const mainRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/client",
    label: "Client Management",
    path: "/admin/client",
    icon: <SettingOutlined />,

    permission: "client.dashboard"
  },

  {
    key: "/admin/zone",
    label: "Zone In Charge",
    path: "/admin/zone",
    icon: <SettingOutlined />,
    permission: "zone.dashboard"
  },

  {
    key: "/admin/sub-zone",
    label: "Sub Zone In Charge",
    path: "/admin/sub-zone",
    icon: <SettingOutlined />,
    permission: "subZone.dashboard"
  },

  {
    key: "/admin/retail",
    label: "Retail In Charge",
    path: "/admin/retail",
    icon: <SettingOutlined />,
    permission: "retail.dashboard"
  },

  {
    key: "/admin/device",
    label: "Device Management",
    path: "/admin/device",
    icon: <SettingOutlined />,
    permission: "device.dashboard"
  },

  {
    key: "/admin/package",
    label: "Package Management",
    path: "/admin/package",
    icon: <SettingOutlined />,
    permission: "package.dashboard"
  },

  {
    key: "/admin/customer",
    label: "Customer Management",
    path: "/admin/customer",
    icon: <SettingOutlined />,
    permission: "customer.dashboard"
  },

  {
    key: "/admin/complaint",
    label: "Complaint Management",
    path: "/admin/complaint",
    icon: <SettingOutlined />,
    permission: "complaint.dashboard"
  },

  {
    key: "/admin/user",
    label: "Users Management",
    path: "/admin/user",
    icon: <SettingOutlined />,
    permission: "user.dashboard"
  },

  {
    key: "/admin/top-up",
    label: "Top-Up Management",
    path: "/admin/top-up",
    icon: <SettingOutlined />,
    permission: "topUp.dashboard"
  },

  {
    key: "/admin/customer-care",
    label: "Customer Care",
    path: "/admin/customer-care",
    icon: <SettingOutlined />,
    permission: "customerCare.dashboard"
  },

  {
    key: "/admin/notification",
    label: "Notification Management",
    path: "/admin/notification",
    icon: <SettingOutlined />,
    permission: "notification.dashboard"
  },

  {
    key: "/admin/payment",
    label: "Payment Gateway",
    path: "/admin/payment",
    icon: <SettingOutlined />,
    permission: "payment.dashboard"
  },

  {
    key: "/admin/accounting",
    label: "Accounting & Billing",
    path: "/admin/accounting",
    icon: <SettingOutlined />,
    permission: "accounting.dashboard"
  }
];

export default mainRoutes;
