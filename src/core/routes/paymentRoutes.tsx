import {
  DashboardOutlined,
  SettingOutlined,
  BarChartOutlined,
  CreditCardOutlined
} from "@ant-design/icons";
import Link from "next/link";
const paymentRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/payment",
    label: <Link href="/admin/payment">Payment Dashboard</Link>,
    path: "/admin/payment",
    icon: <BarChartOutlined />,
    permission: "payment.dashboard"
  },
  {
    key: "/admin/payment/payment-gateway",
    label: <Link href="/admin/payment/payment-gateway">Payment Gateway</Link>,
    path: "/admin/payment/payment-gateway",
    icon: <CreditCardOutlined />,
    permission: "paymentGateway.list"
  },
  {
    key: "/admin/payment/payment-gateway-config",
    label: (
      <Link href="/admin/payment/payment-gateway-config">
        Payment Gateway Config
      </Link>
    ),
    path: "/admin/payment/payment-gateway-config",
    icon: <SettingOutlined />,
    permission: "paymentGatewayConfig.list"
  }
];

export default paymentRoutes;
