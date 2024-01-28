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

const mainRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/client",
    label: "Client Management",
    path: "/admin/client",
    icon: <UsergroupAddOutlined />,

    permission: "client.dashboard"
  },

  {
    key: "/admin/zone",
    label: "Zone In Charge",
    path: "/admin/zone",
    icon: <EnvironmentOutlined />,
    permission: "zone.dashboard"
  },

  {
    key: "/admin/sub-zone",
    label: "Sub Zone In Charge",
    path: "/admin/sub-zone",
    icon: <EnvironmentOutlined />,
    permission: "subZone.dashboard"
  },

  {
    key: "/admin/retail",
    label: "Retail In Charge",
    path: "/admin/retail",
    icon: <ShopOutlined />,
    permission: "retail.dashboard"
  },

  {
    key: "/admin/device",
    label: "Device Management",
    path: "/admin/device",
    icon: <MobileOutlined />,
    permission: "device.dashboard"
  },

  {
    key: "/admin/package",
    label: "Package Management",
    path: "/admin/package",
    icon: <BoxPlotOutlined />,
    permission: "package.dashboard"
  },

  {
    key: "/admin/customer",
    label: "Customer Management",
    path: "/admin/customer",
    icon: <UserOutlined />,
    permission: "customer.dashboard"
  },

  {
    key: "/admin/complaint",
    label: "Complaint Management",
    path: "/admin/complaint",
    icon: <ExclamationCircleOutlined />,
    permission: "complaint.dashboard"
  },

  {
    key: "/admin/user",
    label: "Users Management",
    path: "/admin/user",
    icon: <TeamOutlined />,
    permission: "user.dashboard"
  },

  {
    key: "/admin/top-up",
    label: "Top-Up Management",
    path: "/admin/top-up",
    icon: <DollarOutlined />,
    permission: "topUp.dashboard"
  },

  {
    key: "/admin/customer-care",
    label: "Customer Care",
    path: "/admin/customer-care",
    icon: <CustomerServiceOutlined />,
    permission: "customerCare.dashboard"
  },

  {
    key: "/admin/notification",
    label: "Notification Management",
    path: "/admin/notification",
    icon: <NotificationOutlined />,
    permission: "notification.dashboard"
  },

  {
    key: "/admin/payment",
    label: "Payment Gateway",
    path: "/admin/payment",
    icon: <CreditCardOutlined />,
    permission: "payment.dashboard"
  },

  {
    key: "/admin/accounting",
    label: "Accounting & Billing",
    path: "/admin/accounting",
    icon: <AccountBookOutlined />,
    permission: "accounting.dashboard"
  },

  {
    key: "/admin/hotspot",
    label: "Wi-Fi Hotspot",
    path: "/admin/hotspot",
    icon: <WifiOutlined />,
    permission: "hotspot.dashboard"
  }
];

export default mainRoutes;
