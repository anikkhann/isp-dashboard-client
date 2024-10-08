import {
  DollarCircleOutlined,
  TransactionOutlined,
  BarChartOutlined,
  FileTextOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import Link from "next/link";

const accountRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/accounting",
    label: <Link href="/admin/accounting">Accounting Dashboard</Link>,
    path: "/admin/accounting",
    icon: <BarChartOutlined />,
    permission: "accounting.dashboard"
  },
  {
    key: "/admin/accounting/invoice",
    label: <Link href="/admin/accounting/invoice">Customer Invoice</Link>,
    path: "/admin/accounting/invoice",
    icon: <FileTextOutlined />,
    permission: "invoice.list"
  },
  {
    key: "/admin/accounting/customer-transaction",
    label: (
      <Link href="/admin/accounting/customer-transaction">
        Customer Transaction
      </Link>
    ),
    path: "/admin/accounting/customer-transaction",
    icon: <TransactionOutlined />,
    permission: "customerTransaction.list"
  },
  {
    key: "/admin/accounting/agent-transaction",
    label: (
      <Link href="/admin/accounting/agent-transaction">Agent Transaction</Link>
    ),
    path: "/admin/accounting/agent-transaction",
    icon: <TransactionOutlined />,
    permission: "agentTransaction.list"
  },
  {
    key: "/admin/accounting/zone-transaction",
    label: (
      <Link href="/admin/accounting/zone-transaction">Zone Transaction</Link>
    ),
    path: "/admin/accounting/zone-transaction",
    icon: <TransactionOutlined />,
    permission: "zoneTransaction.list"
  },
  {
    key: "/admin/accounting/zone-revenue-disbursement",
    label: (
      <Link href="/admin/accounting/zone-revenue-disbursement">
        Zone Revenue Disbursement
      </Link>
    ),
    path: "/admin/accounting/zone-revenue-disbursement",
    icon: <DollarCircleOutlined />,
    permission: "zoneRevenueDisbursement.list"
  },

  {
    key: "/admin/accounting/subZone-revenue-disbursement",
    label: (
      <Link href="/admin/accounting/subZone-revenue-disbursement">
        SubZone Revenue Disbursement
      </Link>
    ),
    path: "/admin/accounting/subZone-revenue-disbursement",
    icon: <DollarCircleOutlined />,
    permission: "subZoneRevenueDisbursement.list"
  },

  {
    key: "/admin/accounting/retailer-revenue-disbursement",
    label: (
      <Link href="/admin/accounting/retailer-revenue-disbursement">
        Retailer Revenue Disbursement
      </Link>
    ),
    path: "/admin/accounting/retailer-revenue-disbursement",
    icon: <DollarCircleOutlined />,
    permission: "retailerRevenueDisbursement.list"
  },
  {
    key: "/admin/accounting/zone-revenue",
    label: <Link href="/admin/accounting/zone-revenue">Zone Revenue</Link>,
    path: "/admin/accounting/zone-revenue",
    icon: <DollarCircleOutlined />,
    permission: "accountingZoneRevenue.list"
  },

  {
    key: "/admin/accounting/subZone-revenue",
    label: (
      <Link href="/admin/accounting/subZone-revenue">SubZone Revenue</Link>
    ),
    path: "/admin/accounting/subZone-revenue",
    icon: <DollarCircleOutlined />,
    permission: "accountingSubZoneRevenue.list"
  },
  {
    key: "/admin/accounting/retailer-revenue",
    label: (
      <Link href="/admin/accounting/retailer-revenue">Retailer Revenue</Link>
    ),
    path: "/admin/accounting/retailer-revenue",
    icon: <DollarCircleOutlined />,
    permission: "accountingRetailerRevenue.list"
  },
  {
    key: "/admin/accounting/my-revenue",
    label: <Link href="/admin/accounting/my-revenue">My Revenue</Link>,
    path: "/admin/accounting/my-revenue",
    icon: <DollarCircleOutlined />,
    permission: "accountingMyRevenue.list"
  },
  {
    key: "/admin/accounting/account-head",
    label: <Link href="/admin/accounting/account-head">Account Head</Link>,
    path: "/admin/accounting/account-head",
    icon: <DollarCircleOutlined />,
    permission: "accountHead.list"
  },
  {
    key: "/admin/accounting/daily-income-expense",
    label: (
      <Link href="/admin/accounting/daily-income-expense">
        Daily Income/Expense
      </Link>
    ),
    path: "/admin/accounting/daily-income-expense",
    icon: <DollarCircleOutlined />,
    permission: "daily_income_expense.list"
  },
  {
    key: "/admin/accounting/income-expense-report",
    label: (
      <Link href="/admin/accounting/income-expense-report">
        Income/Expense Report
      </Link>
    ),
    path: "/admin/accounting/income-expense-report",
    icon: <DollarCircleOutlined />,
    permission: "income_expense_report.list"
  }
];

export default accountRoutes;
