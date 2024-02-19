import {
  DashboardOutlined,
  LineChartOutlined,
  UserOutlined
  // ScheduleOutlined
} from "@ant-design/icons";
import Link from "next/link";
const subZoneRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/sub-zone",
    label: <Link href="/admin/sub-zone">Sub Zone Dashboard</Link>,
    path: "/admin/sub-zone",
    icon: <LineChartOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/sub-zone/sub-zone-in-charge",
    label: (
      <Link href="/admin/sub-zone/sub-zone-in-charge">Sub Zone In Charge</Link>
    ),
    path: "/admin/sub-zone/sub-zone-in-charge",
    icon: <UserOutlined />,
    permission: "dashboard.view"
  }
  // {
  //   key: "/admin/sub-zone/daily-task",
  //   label: (
  //     <Link href="/admin/sub-zone/daily-task">
  //       Daily Task Assign to Reseller
  //     </Link>
  //   ),
  //   path: "/admin/sub-zone/daily-task",
  //   icon: <ScheduleOutlined />,
  //   permission: "dailyTask.list"
  // }
  // {
  //   key: "/admin/sub-zone/daily-task-report",
  //   label: (
  //     <Link href="/admin/sub-zone/daily-task-report">
  //       Daily Task Report to Reseller
  //     </Link>
  //   ),
  //   path: "/admin/sub-zone/daily-task-report",
  //   icon: <FileTextOutlined />,
  //   permission: "dailyTaskReport.list"
  // }
];

export default subZoneRoutes;
