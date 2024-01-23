import {
  DashboardOutlined,
  LineChartOutlined,
  UserOutlined,
  TeamOutlined,
  KeyOutlined,
  WifiOutlined
} from "@ant-design/icons";

const userRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/user",
    label: "User Dashboard",
    path: "/admin/user",
    icon: <LineChartOutlined />,
    permission: "user.dashboard"
  },
  {
    key: "/admin/user/user",
    label: "Users",
    path: "/admin/user/user",
    icon: <UserOutlined />,
    permission: "user.list"
  },
  {
    key: "/admin/user/role",
    label: "Roles",
    path: "/admin/user/role",
    icon: <TeamOutlined />,
    permission: "role.list"
  },

  {
    key: "/admin/user/permission",
    label: "Permissions",
    path: "/admin/user/permission",
    icon: <KeyOutlined />,
    permission: "permission.list"
  },

  {
    key: "/admin/user/bw-nttn-provider",
    label: "BW NTTN Providers",
    path: "/admin/user/bw-nttn-provider",
    icon: <WifiOutlined />,
    permission: "bwNttnProvider.list"
  }
];

export default userRoutes;
