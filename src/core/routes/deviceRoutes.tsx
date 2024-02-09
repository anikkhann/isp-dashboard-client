import {
  DashboardOutlined,
  AreaChartOutlined,
  MobileOutlined,
  GlobalOutlined,
  CloudServerOutlined
} from "@ant-design/icons";
import Link from "next/link";
const deviceRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/device",
    label: <Link href="/admin/device">Device Dashboard</Link>,
    path: "/admin/device",
    icon: <AreaChartOutlined />,
    permission: "device.dashboard"
  },

  {
    key: "/admin/device/device",
    label: <Link href="/admin/device/device">Device</Link>,
    path: "/admin/device/device",
    icon: <MobileOutlined />,
    permission: "device.list"
  },

  {
    key: "/admin/device/network",
    label: <Link href="/admin/device/network">Network</Link>,
    path: "/admin/device/network",
    icon: <GlobalOutlined />,
    permission: "network.list"
  },

  {
    key: "/admin/device/ip-management",
    label: <Link href="/admin/device/ip-management">IP Management</Link>,
    path: "/admin/device/ip-management",
    icon: <CloudServerOutlined />,
    permission: "ip.list"
  }
];

export default deviceRoutes;
