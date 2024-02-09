import {
  DashboardOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  BankOutlined,
  FormOutlined
} from "@ant-design/icons";
import Link from "next/link";
const topUpRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/top-up",
    label: <Link href="/admin/top-up">Top Up Dashboard</Link>,
    path: "/admin/top-up",
    icon: <BarChartOutlined />,
    permission: "topUp.dashboard"
  },

  {
    key: "/admin/top-up/agent-top-up",
    label: <Link href="/admin/top-up/agent-top-up">Agent Topup</Link>,
    path: "/admin/top-up/agent-top-up",
    icon: <CreditCardOutlined />,
    permission: "agentTopUp.list"
  },
  {
    key: "/admin/top-up/zone-top-up",
    label: <Link href="/admin/top-up/zone-top-up">Zone Topup</Link>,
    path: "/admin/top-up/zone-top-up",
    icon: <BankOutlined />,
    permission: "zoneTopUp.list"
  },
  {
    key: "/admin/top-up/zone-top-up-request",
    label: (
      <Link href="/admin/top-up/zone-top-up-request">Zone Topup Request</Link>
    ),
    path: "/admin/top-up/zone-top-up-request",
    icon: <FormOutlined />,
    permission: "zoneTopUpRequest.list"
  }
];

export default topUpRoutes;
