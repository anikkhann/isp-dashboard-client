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
    label: "Payment Dashboard",
    path: "/admin/payment",
    icon: <SettingOutlined />,
    permission: "payment.dashboard"
  },
  {
    key: "/admin/payment/payment-gateway",
    label: "Payment Gateway",
    path: "/admin/payment/payment-gateway",
    icon: <SettingOutlined />,
    permission: "paymentGateway.list"
  },
  {
    key: "/admin/payment/payment-gateway-config",
    label: "Payment Gateway Config",
    path: "/admin/payment/payment-gateway-config",
    icon: <SettingOutlined />,
    permission: "paymentGatewayConfig.list"
  }
];

export default paymentRoutes;
