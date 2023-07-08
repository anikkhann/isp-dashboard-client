import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";

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
    icon: <UserOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/zone",
    label: "Zone In Charge",
    path: "/admin/zone",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/sub-zone",
    label: "Sub Zone In Charge",
    path: "/admin/sub-zone",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/retail",
    label: "Retail In Charge",
    path: "/admin/retail",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/device",
    label: "Device Management",
    path: "/admin/device",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/package",
    label: "Package Management",
    path: "/admin/package",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/customer",
    label: "Customer Management",
    path: "/admin/customer",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/complaint",
    label: "Complaint Management",
    path: "/admin/complaint",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/user",
    label: "Users Management",
    path: "/admin/user",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/top-up",
    label: "Top-Up Management",
    path: "/admin/top-up",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/customer-care",
    label: "Customer Care",
    path: "/admin/customer-care",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/notification",
    label: "Notification Management",
    path: "/admin/notification",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/payment",
    label: "Payment Gateway",
    path: "/admin/payment",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/accounting",
    label: "Accounting & Billing",
    path: "/admin/accounting",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default mainRoutes;
