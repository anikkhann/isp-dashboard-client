import {
  DashboardOutlined,
  LineChartOutlined,
  UserOutlined,
  ScheduleOutlined,
  FileTextOutlined
} from "@ant-design/icons";

const subZoneRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/sub-zone",
    label: "Sub Zone Dashboard",
    path: "/admin/sub-zone",
    icon: <LineChartOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/sub-zone/sub-zone-in-charge",
    label: "Sub Zone In Charge",
    path: "/admin/sub-zone/sub-zone-in-charge",
    icon: <UserOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/sub-zone/daily-task",
    label: "Daily Task Assign to Reseller",
    path: "/admin/sub-zone/daily-task",
    icon: <ScheduleOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/sub-zone/daily-task-report",
    label: "Daily Task Report to Reseller",
    path: "/admin/sub-zone/daily-task-report",
    icon: <FileTextOutlined />,
    permission: "dashboard.view"
  }
];

export default subZoneRoutes;
