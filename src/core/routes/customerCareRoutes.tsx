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
    permission: "dashboard.view"
  }
];

export default customerCareRoutes;
