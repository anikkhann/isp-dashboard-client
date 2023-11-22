import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const subZoneRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/sub-zone",
    label: "Sub Zone Dashboard",
    path: "/admin/sub-zone",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/sub-zone/sub-zone-in-charge",
    label: "Sub Zone In Charge",
    path: "/admin/sub-zone/sub-zone-in-charge",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/sub-zone/daily-task",
    label: "Daily Task Assign to reseller",
    path: "/admin/sub-zone/daily-task",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/sub-zone/daily-task-report",
    label: "Daily Task Report to reseller",
    path: "/admin/sub-zone/daily-task-report",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default subZoneRoutes;
