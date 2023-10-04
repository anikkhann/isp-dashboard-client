import {
  DashboardOutlined,
  SettingOutlined,
  SlidersOutlined,
  UserOutlined
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
    icon: <SettingOutlined />,
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
    icon: <SlidersOutlined />,
    permission: "role.list"
  },

  {
    key: "/admin/user/permission",
    label: "Permissions",
    path: "/admin/user/permission",
    icon: <SlidersOutlined />,
    permission: "permission.list"
  },

  {
    key: "/admin/user/bw-nttn-provider",
    label: "BW NTTN Providers",
    path: "/admin/user/bw-nttn-provider",
    icon: <SlidersOutlined />,
    permission: "bwNttnProvider.list"
  }
];

export default userRoutes;
