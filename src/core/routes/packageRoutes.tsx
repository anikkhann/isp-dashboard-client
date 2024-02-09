import {
  DashboardOutlined,
  LineChartOutlined,
  BoxPlotOutlined
} from "@ant-design/icons";
import Link from "next/link";
const packageRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/package",
    label: <Link href="/admin/package">Package Dashboard</Link>,
    path: "/admin/package",
    icon: <LineChartOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/package/package",
    label: <Link href="/admin/package/package">Package</Link>,
    path: "/admin/package/package",
    icon: <BoxPlotOutlined />,
    permission: "dashboard.view"
  }
];

export default packageRoutes;
