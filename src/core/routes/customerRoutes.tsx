import {
  DashboardOutlined,
  LineChartOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  UserOutlined
} from "@ant-design/icons";
import Link from "next/link";
const customerRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/customer",
    label: <Link href="/admin/customer">Customer Dashboard</Link>,
    path: "/admin/customer",
    icon: <LineChartOutlined />,
    permission: "customer.dashboard"
  },

  {
    key: "/admin/customer/customer-type",
    label: <Link href="/admin/customer/customer-type">Customer Type</Link>,
    path: "/admin/customer/customer-type",
    icon: <TeamOutlined />,
    permission: "customerType.list"
  },
  {
    key: "/admin/customer/distribution-zone",
    label: (
      <Link href="/admin/customer/distribution-zone">Distribution Zone</Link>
    ),
    path: "/admin/customer/distribution-type",
    icon: <EnvironmentOutlined />,
    permission: "distributionZone.list"
  },
  {
    key: "/admin/customer/distribution-pop",
    label: (
      <Link href="/admin/customer/distribution-pop">Distribution POP</Link>
    ),
    path: "/admin/customer/distribution-pop",
    icon: <ShopOutlined />,
    permission: "distributionPop.list"
  },
  {
    key: "/admin/customer/customer-onboarding-req",
    label: (
      <Link href="/admin/customer/customer-onboarding-req">
        Customer Onboarding Req
      </Link>
    ),
    path: "/admin/customer/customer-onboarding-req",
    icon: <UserAddOutlined />,
    permission: "customerOnboardingReq.list"
  },
  {
    key: "/admin/customer/approved-customer-onboarding-req",
    label: (
      <Link href="/admin/customer/approved-customer-onboarding-req">
        Approved Customer Req
      </Link>
    ),
    path: "/admin/customer/approved-customer-onboarding-req",
    icon: <UserSwitchOutlined />,
    permission: "approvedCustomerOnboardingReq.list"
  },
  {
    key: "/admin/customer/customer",
    label: <Link href="/admin/customer/customer">Customer</Link>,
    path: "/admin/customer/customer",
    icon: <UserOutlined />,
    permission: "customer.list"
  },
  // Import CSV
  {
    key: "/admin/customer/import-csv",
    label: <Link href="/admin/customer/import-csv">Customer Import</Link>,
    path: "/admin/customer/import-csv",
    icon: <UserOutlined />,
    permission: "customerImportCsv.list"
  }
];

export default customerRoutes;
