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
    label: "Top Up Dashboard",
    path: "/admin/top-up",
    icon: <SettingOutlined />,
    permission: "topUp.dashboard"
  },

  {
    key: "/admin/top-up/agent-top-up",
    label: "Agent Topup",
    path: "/admin/top-up/agent-top-up",
    icon: <SettingOutlined />,
    permission: "agentTopUp.list"
  },
  {
    key: "/admin/top-up/zone-top-up",
    label: "Zone Topup",
    path: "/admin/top-up/zone-top-up",
    icon: <SettingOutlined />,
    permission: "zoneTopUp.list"
  },
  {
    key: "/admin/top-up/zone-top-up-request",
    label: "Zone Topup Request",
    path: "/admin/top-up/zone-top-up-request",
    icon: <SettingOutlined />,
    permission: "zoneTopUpRequest.list"
  }
];

export default topUpRoutes;
