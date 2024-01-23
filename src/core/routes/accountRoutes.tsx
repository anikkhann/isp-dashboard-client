import {
  DollarCircleOutlined,
  TransactionOutlined,
  BarChartOutlined,
  FileTextOutlined,
  DashboardOutlined
} from "@ant-design/icons";

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
    icon: <BarChartOutlined />,
    permission: "accounting.dashboard"
  },
  {
    key: "/admin/accounting/invoice",
    label: "Customer Invoice",
    path: "/admin/accounting/invoice",
    icon: <FileTextOutlined />,
    permission: "invoice.list"
  },
  {
    key: "/admin/accounting/customer-transaction",
    label: "Customer Transaction",
    path: "/admin/accounting/customer-transaction",
    icon: <TransactionOutlined />,
    permission: "customerTransaction.list"
  },
  {
    key: "/admin/accounting/agent-transaction",
    label: "Agent Transaction",
    path: "/admin/accounting/agent-transaction",
    icon: <TransactionOutlined />,
    permission: "agentTransaction.list"
  },
  {
    key: "/admin/accounting/zone-transaction",
    label: "Zone Transaction",
    path: "/admin/accounting/zone-transaction",
    icon: <TransactionOutlined />,
    permission: "zoneTransaction.list"
  },
  {
    key: "/admin/accounting/zone-revenue-disbursement",
    label: "Zone Revenue Disbursement",
    path: "/admin/accounting/zone-revenue-disbursement",
    icon: <DollarCircleOutlined />,
    permission: "zoneRevenueDisbursement.list"
  },

  {
    key: "/admin/accounting/subZone-revenue-disbursement",
    label: "SubZone Revenue Disbursement",
    path: "/admin/accounting/subZone-revenue-disbursement",
    icon: <DollarCircleOutlined />,
    permission: "subZoneRevenueDisbursement.list"
  },

  {
    key: "/admin/accounting/retailer-revenue-disbursement",
    label: "Retailer Revenue Disbursement",
    path: "/admin/accounting/retailer-revenue-disbursement",
    icon: <DollarCircleOutlined />,
    permission: "retailerRevenueDisbursement.list"
  },
  {
    key: "/admin/accounting/zone-revenue",
    label: "Zone Revenue",
    path: "/admin/accounting/zone-revenue",
    icon: <DollarCircleOutlined />,
    permission: "accountingZoneRevenue.list"
  },

  {
    key: "/admin/accounting/subZone-revenue",
    label: "SubZone Revenue",
    path: "/admin/accounting/subZone-revenue",
    icon: <DollarCircleOutlined />,
    permission: "accountingSubZoneRevenue.list"
  },
  {
    key: "/admin/accounting/retailer-revenue",
    label: "Retailer Revenue",
    path: "/admin/accounting/retailer-revenue",
    icon: <DollarCircleOutlined />,
    permission: "accountingRetailerRevenue.list"
  },
  {
    key: "/admin/accounting/my-revenue",
    label: "My Revenue",
    path: "/admin/accounting/my-revenue",
    icon: <DollarCircleOutlined />,
    permission: "accountingMyRevenue.list"
  }
];

export default accountRoutes;
