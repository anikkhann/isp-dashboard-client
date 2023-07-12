import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const accountRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/client",
    label: "Client Dashboard",
    path: "/admin/client",
    icon: <SettingOutlined />,
    permission: "client.dashboard"
  },

  {
    key: "/admin/client/client",
    label: "Client",
    path: "/admin/client/client",
    icon: <SettingOutlined />,
    permission: "client.list"
  },

  {
    key: "/admin/client/subscription",
    label: "Subscription",
    path: "/admin/client/subscription",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default accountRoutes;
