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
    label: "Setting Dashboard",
    path: "/admin/user",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "users",
    label: "Users",
    path: "users",
    icon: <UserOutlined />,
    permission: "user.view",
    children: [
      {
        key: "/admin/user/user",
        label: "Users",
        path: "/admin/user/user",
        icon: <UserOutlined />,
        permission: "user.view"
      },
      {
        key: "/admin/user/role",
        label: "Roles",
        path: "/admin/user/role",
        icon: <SlidersOutlined />,
        permission: "user.view"
      },

      {
        key: "/admin/user/permission",
        label: "Permissions",
        path: "/admin/user/permission",
        icon: <SlidersOutlined />,
        permission: "user.view"
      }
    ]
  }
];

export default userRoutes;
