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

const customerRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/customer",
    label: "Customer Dashboard",
    path: "/admin/customer",
    icon: <LineChartOutlined />,
    permission: "customer.dashboard"
  },

  {
    key: "/admin/customer/customer-type",
    label: "Customer Type",
    path: "/admin/customer/customer-type",
    icon: <TeamOutlined />,
    permission: "customerType.view"
  },
  {
    key: "/admin/customer/distribution-zone",
    label: "Distribution Zone",
    path: "/admin/customer/distribution-type",
    icon: <EnvironmentOutlined />,
    permission: "distributionZone.view"
  },
  {
    key: "/admin/customer/distribution-pop",
    label: "Distribution POP",
    path: "/admin/customer/distribution-pop",
    icon: <ShopOutlined />,
    permission: "distributionPop.view"
  },
  {
    key: "/admin/customer/customer-onboarding-req",
    label: "Customer Onboarding Req",
    path: "/admin/customer/customer-onboarding-req",
    icon: <UserAddOutlined />,
    permission: "customerOnboardingReq.view"
  },
  {
    key: "/admin/customer/approved-customer-onboarding-req",
    label: "Approved Customer Req",
    path: "/admin/customer/approved-customer-onboarding-req",
    icon: <UserSwitchOutlined />,
    permission: "approvedCustomerOnboardingReq.view"
  },
  {
    key: "/admin/customer/customer",
    label: "Customer",
    path: "/admin/customer/customer",
    icon: <UserOutlined />,
    permission: "customer.view"
  },
  // Import CSV
  {
    key: "/admin/customer/import-csv",
    label: "Import CSV",
    path: "/admin/customer/import-csv",
    icon: <UserOutlined />,
    permission: "customerImportCsv.view"
  }
];

export default customerRoutes;
