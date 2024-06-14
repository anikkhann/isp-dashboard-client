import {
  DashboardOutlined,
  UsergroupAddOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  MobileOutlined,
  BoxPlotOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  DollarOutlined,
  CustomerServiceOutlined,
  NotificationOutlined,
  CreditCardOutlined,
  AccountBookOutlined,
  WifiOutlined
} from "@ant-design/icons";
// import { GrUserSettings } from "react-icons/all";
import Link from "next/link";
const mainRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/client",
    label: <Link href="/admin/client">Client Management</Link>,
    path: "/admin/client",
    icon: <UsergroupAddOutlined />,

    permission: "client.dashboard"
  },

  {
    key: "/admin/zone",
    label: <Link href="/admin/zone">Zone In Charge</Link>,
    path: "/admin/zone",
    icon: <EnvironmentOutlined />,
    permission: "zone.dashboard"
  },

  {
    key: "/admin/sub-zone",
    label: <Link href="/admin/sub-zone">Sub Zone In Charge</Link>,
    path: "/admin/sub-zone",
    icon: <EnvironmentOutlined />,
    permission: "subZone.dashboard"
  },

  {
    key: "/admin/retail",
    label: <Link href="/admin/retail">Retail In Charge</Link>,
    path: "/admin/retail",
    icon: <ShopOutlined />,
    permission: "retail.dashboard"
  },

  {
    key: "/admin/device",
    label: <Link href="/admin/device">Device Management</Link>,
    path: "/admin/device",
    icon: <MobileOutlined />,
    permission: "device.dashboard"
  },

  {
    key: "/admin/package",
    label: <Link href="/admin/package">Package Management</Link>,
    path: "/admin/package",
    icon: <BoxPlotOutlined />,
    permission: "package.dashboard"
  },

  {
    key: "/admin/customer",
    label: <Link href="/admin/customer">Customer Management</Link>,
    path: "/admin/customer",
    icon: <UserOutlined />,
    permission: "customer.dashboard"
  },

  {
    key: "/admin/complaint",
    label: <Link href="/admin/complaint">Complaint Management</Link>,
    path: "/admin/complaint",
    icon: <ExclamationCircleOutlined />,
    permission: "complaint.dashboard"
  },

  {
    key: "/admin/user",
    label: <Link href="/admin/user">Users Management</Link>,
    path: "/admin/user",
    icon: <TeamOutlined />,
    permission: "user.dashboard"
  },

  {
    key: "/admin/top-up",
    label: <Link href="/admin/top-up">Top-Up Management</Link>,
    path: "/admin/top-up",
    icon: <DollarOutlined />,
    permission: "topUp.dashboard"
  },

  {
    key: "/admin/customer-care",
    label: <Link href="/admin/customer-care">Customer Care</Link>,
    path: "/admin/customer-care",
    icon: <CustomerServiceOutlined />,
    permission: "customerCare.dashboard"
  },

  {
    key: "/admin/notification",
    label: <Link href="/admin/notification">Notification Management</Link>,
    path: "/admin/notification",
    icon: <NotificationOutlined />,
    permission: "notification.dashboard"
  },

  {
    key: "/admin/payment",
    label: <Link href="/admin/payment">Payment Gateway</Link>,
    path: "/admin/payment",
    icon: <CreditCardOutlined />,
    permission: "payment.dashboard"
  },

  {
    key: "/admin/accounting",
    label: <Link href="/admin/accounting">Accounting & Billing</Link>,
    path: "/admin/accounting",
    icon: <AccountBookOutlined />,
    permission: "accounting.dashboard"
  },

  {
    key: "/admin/hotspot",
    label: <Link href="/admin/hotspot">Wi-Fi Hotspot</Link>,
    path: "/admin/hotspot",
    icon: <WifiOutlined />,
    permission: "hotspot.dashboard"
  },
  {
    key: "/admin/monitoring",
    label: <Link href="/admin/monitoring">Monitoring</Link>,
    path: "/admin/monitoring",
    icon: <WifiOutlined />,
    permission: "hotspot.dashboard"
  }
];

export default mainRoutes;
