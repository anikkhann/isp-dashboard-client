import { AccountBookOutlined, DashboardOutlined } from "@ant-design/icons";

const accountRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/accounting",
    label: "Accounting Dashboard",
    path: "/admin/accounting",
    icon: <AccountBookOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/accounting/invoice",
    label: "Invoice",
    path: "/admin/accounting/invoice",
    icon: <AccountBookOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/accounting/transaction",
    label: "Gateway Transaction",
    path: "/admin/accounting/transaction",
    icon: <AccountBookOutlined />,
    permission: "dashboard.view"
  }
];

export default accountRoutes;
