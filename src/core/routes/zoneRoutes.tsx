import {
  DashboardOutlined,
  AreaChartOutlined,
  UserOutlined
} from "@ant-design/icons";
import Link from "next/link";
const zoneRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/zone",
    label: <Link href="/admin/zone">Zone Dashboard</Link>,
    path: "/admin/zone",
    icon: <AreaChartOutlined />,
    permission: "zone.dashboard"
  },

  {
    key: "/admin/zone/zone-in-charge",
    label: <Link href="/admin/zone/zone-in-charge">Zone In Charge</Link>,
    path: "/admin/zone/zone-in-charge",
    icon: <UserOutlined />,
    permission: "zone.list"
  }
];

export default zoneRoutes;
