import {
  DashboardOutlined,
  ToolOutlined,
  BarChartOutlined,
  UserOutlined,
  SolutionOutlined,
  FileDoneOutlined
} from "@ant-design/icons";
import Link from "next/link";
// import { FaUsersCog } from "react-icons/fa";

const accountRoutes = [
  {
    key: "/admin",
    // label: "Main Dashboard",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/client",
    label: "Client Dashboard",
    path: "/admin/client",
    // icon: <FaUsersCog />,
    icon: <BarChartOutlined />,
    permission: "client.dashboard"
  },

  {
    key: "/admin/client/client",
    label: "Client",
    path: "/admin/client/client",
    icon: <UserOutlined />,
    permission: "client.list"
  },

  {
    key: "/admin/client/subscription",
    label: "Subscription",
    path: "/admin/client/subscription",
    icon: <SolutionOutlined />,
    permission: "subscription.list"
  },

  {
    key: "/admin/client/survey",
    label: "Troubleshoot & Survey",
    path: "/admin/client/survey",
    icon: <ToolOutlined />,
    permission: "survey.list"
  },

  {
    key: "/admin/client/survey-report",
    label: "Survey Report",
    path: "/admin/client/survey-report",
    icon: <FileDoneOutlined />,
    permission: "surveyReport.list"
  },
  {
    key: "/admin/client/radius-ip",
    label: "Radius IP",
    path: "/admin/client/radius-ip",
    icon: <FileDoneOutlined />,
    permission: "radiusIp.list"
  }
];

export default accountRoutes;
