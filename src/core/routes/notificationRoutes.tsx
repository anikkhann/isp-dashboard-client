import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const notificationRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/notification",
    label: "Notification Dashboard",
    path: "/admin/notification",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/notification/sms-setting",
    label: "SMS Settings",
    path: "/admin/notification/sms-setting",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/notification/sms-alert",
    label: "SMS Alert",
    path: "/admin/notification/sms-alert",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/notification/sms-template",
    label: "SMS (Single/Bulk)",
    path: "/admin/notification/sms-template",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/notification/email-setting",
    label: "Email Settings",
    path: "/admin/notification/email-setting",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/notification/email-template",
    label: "Email Template",
    path: "/admin/notification/email-template",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default notificationRoutes;
