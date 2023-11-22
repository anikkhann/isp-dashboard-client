import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";
import { FaUsersCog } from "react-icons/fa";

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
    icon: <FaUsersCog />,
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
    permission: "subscription.list"
  },

  {
    key: "/admin/client/survey",
    label: "Troubleshoot & Survey",
    path: "/admin/client/survey",
    icon: <SettingOutlined />,
    permission: "subscription.list"
  },

  {
    key: "/admin/client/survey-report",
    label: "Survey Report",
    path: "/admin/client/survey-report",
    icon: <SettingOutlined />,
    permission: "subscription.list"
  }
];

export default accountRoutes;
