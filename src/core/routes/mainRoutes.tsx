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
    key: "/client",
    label: "Client Dashboard",
    path: "/client",
    icon: <UserOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/user",
    label: "User Dashboard",
    path: "/user",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default mainRoutes;
