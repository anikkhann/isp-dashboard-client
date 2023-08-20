import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const customerCareRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/customer-care",
    label: "Customer Care",
    path: "/admin/customer-care",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },

  {
    key: "/admin/customer-top-up",
    label: "Customer TOP-UP",
    path: "/admin/customer-top-up",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },

  {
    key: "/admin/expire-date-extend-deduction",
    label: "Expire Date Extend/Deduction",
    path: "/admin/expired-date-extend-deduction",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },
  {
    key: "/admin/zonal-manager-tag-or-remove",
    label: "Zone Manager Tag Or Remove",
    path: "/admin/zonal-manager-tag-or-remove",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },
  {
    key: "/admin/sub-zone-manager-tag-or-remove",
    label: "Sub Zone Manager Tag or Remove",
    path: "/admin/sub-zone-manager-tag-or-remove",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },
  {
    key: "/admin/retailer-tag-or-remove",
    label: "Retailer Tag or Remove",
    path: "/admin/retailer-tag-or-remove",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },
  {
    key: "/admin/customer-package-update",
    label: "Customer Package Update",
    path: "/admin/customer-package-update",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },
  {
    key: "/admin/customer-status-update",
    label: "Customer Status Update",
    path: "/admin/customer-status-update",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },
  {
    key: "/admin/customer-zone-or-pop-update",
    label: "Customer Zone or POP Update ",
    path: "/admin/customer-zone-or-pop-update",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },
  {
    key: "/admin/customer-password-change",
    label: "Customer Password Change",
    path: "/admin/customer-password-change",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  },
  {
    key: "/admin/customer-mac-bind-or-remove",
    label: "Customer MAC Bind or Remove",
    path: "/admin/customer-mac-bind-or-remove",
    icon: <SettingOutlined />,
    permission: "customerCare.list"
  }
];

export default customerCareRoutes;
