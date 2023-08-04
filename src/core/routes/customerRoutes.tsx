import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

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
    icon: <SettingOutlined />,
    permission: "customer.dashboard"
  },

  {
    key: "/admin/customer/customer-type",
    label: "Customer Type",
    path: "/admin/customer/customer-type",
    icon: <SettingOutlined />,
    permission: "customerType.view"
  },
  {
    key: "/admin/customer/distribution-zone",
    label: "Distribution Zone",
    path: "/admin/customer/distribution-type",
    icon: <SettingOutlined />,
    permission: "distributionZone.view"
  },
  {
    key: "/admin/customer/distribution-pop",
    label: "Distribution POP",
    path: "/admin/customer/distribution-pop",
    icon: <SettingOutlined />,
    permission: "distributionPop.view"
  },
  {
    key: "/admin/customer/customer-onboarding-req",
    label: "Customer Onboarding Req",
    path: "/admin/customer/customer-onboarding-req",
    icon: <SettingOutlined />,
    permission: "customerOnboardingReq.view"
  },
  {
    key: "/admin/customer/approved-customer-onboarding-req",
    label: "Approved Customer Req",
    path: "/admin/customer/approved-customer-onboarding-req",
    icon: <SettingOutlined />,
    permission: "approvedCustomerOnboardingReq.view"
  },
  {
    key: "/admin/customer/customer",
    label: "Customer",
    path: "/admin/customer/customer",
    icon: <SettingOutlined />,
    permission: "customer.view"
  }
];

export default customerRoutes;
