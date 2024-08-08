import {
  DashboardOutlined,
  LineChartOutlined,
  UserOutlined,
  TeamOutlined,
  KeyOutlined,
  WifiOutlined
} from "@ant-design/icons";
import Link from "next/link";
const userRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/user",
    label: <Link href="/admin/user">User Dashboard</Link>,
    path: "/admin/user",
    icon: <LineChartOutlined />,
    permission: "user.dashboard"
  },
  {
    key: "/admin/user/user",
    label: <Link href="/admin/user/user">Users</Link>,
    path: "/admin/user/user",
    icon: <UserOutlined />,
    permission: "user.list"
  },
  {
    key: "/admin/user/role",
    label: <Link href="/admin/user/role">Roles</Link>,
    path: "/admin/user/role",
    icon: <TeamOutlined />,
    permission: "role.list"
  },

  {
    key: "/admin/user/permission",
    label: <Link href="/admin/user/permission">Permissions</Link>,
    path: "/admin/user/permission",
    icon: <KeyOutlined />,
    permission: "permission.list"
  },

  {
    key: "/admin/user/bw-nttn-provider",
    label: <Link href="/admin/user/bw-nttn-provider">BW NTTN Providers</Link>,
    path: "/admin/user/bw-nttn-provider",
    icon: <WifiOutlined />,
    permission: "bwNttnProvider.list"
  },
  {
    key: "/admin/user/vendors",
    label: <Link href="/admin/user/vendors">Vendors</Link>,
    path: "/admin/user/vendors",
    icon: <UserOutlined />,
    permission: "vendors.list"
  }
];

export default userRoutes;
