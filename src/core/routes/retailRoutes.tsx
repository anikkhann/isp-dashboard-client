import {
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined
} from "@ant-design/icons";
import Link from "next/link";
const retailRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/retail",
    label: <Link href="/admin/retail">Retail Dashboard</Link>,
    path: "/admin/retail",
    icon: <BarChartOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/retail/retail",
    label: <Link href="/admin/retail/retail">Retail</Link>,
    path: "/admin/retail/retail",
    icon: <UserOutlined />,
    permission: "dashboard.view"
  }
];

export default retailRoutes;
