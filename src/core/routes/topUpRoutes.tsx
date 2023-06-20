import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const topUpRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/top-up",
    label: "Setting Dashboard",
    path: "/admin/top-up",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/top-up/approved-territory-top-up",
    label: "Approved Territory Top Up",
    path: "/admin/top-up/approved-territory-top-up",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/top-up/req-territory-top-up",
    label: "Territory Top Up Req",
    path: "/admin/top-up/req-territory-top-up",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/top-up/approved-users-top-up",
    label: "Approved Users Top-UP Req",
    path: "/admin/top-up/approved-users-top-up",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/top-up/req-users-top-up",
    label: "Users Top Up Req",
    path: "/admin/top-up/req-users-top-up",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default topUpRoutes;
