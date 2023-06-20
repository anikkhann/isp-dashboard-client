import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const paymentRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/payment",
    label: "Payment Gateway",
    path: "/admin/payment",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default paymentRoutes;
