import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const retailRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/retail",
    label: "Retail Dashboard",
    path: "/admin/retail",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/retail/retail",
    label: "Retail",
    path: "/admin/retail/retail",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default retailRoutes;
