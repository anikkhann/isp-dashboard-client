import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const packageRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/package",
    label: "Package Dashboard",
    path: "/admin/package",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/package/package",
    label: "Package",
    path: "/admin/package/package",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default packageRoutes;
