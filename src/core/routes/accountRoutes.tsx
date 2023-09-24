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
    permission: "accounting.dashboard"
  },
  {
    key: "/admin/accounting/customer-transaction",
    label: "Customer Transaction",
    path: "/admin/accounting/customer-transaction",
    icon: <AccountBookOutlined />,
    permission: "accounting.customerTransaction"
  },
  {
    key: "/admin/accounting/agent-transaction",
    label: "agent Transaction",
    path: "/admin/accounting/agent-transaction",
    icon: <AccountBookOutlined />,
    permission: "accounting.agentTransaction"
  },
  {
    key: "/admin/accounting/zone-transaction",
    label: "zone Transaction",
    path: "/admin/accounting/zone-transaction",
    icon: <AccountBookOutlined />,
    permission: "accounting.zoneTransaction"
  },
  {
    key: "/admin/accounting/zone-revenue-disbursement",
    label: "zone revenue disbursement",
    path: "/admin/accounting/zone-revenue-disbursement",
    icon: <AccountBookOutlined />,
    permission: "zoneRevenueDisbursement.list"
  },

  {
    key: "/admin/accounting/subZone-revenue-disbursement",
    label: "subZone revenue disbursement",
    path: "/admin/accounting/subZone-revenue-disbursement",
    icon: <AccountBookOutlined />,
    permission: "subZoneRevenueDisbursement.list"
  },

  {
    key: "/admin/accounting/retailer-revenue-disbursement",
    label: "retailer revenue disbursement",
    path: "/admin/accounting/retailer-revenue-disbursement",
    icon: <AccountBookOutlined />,
    permission: "retailerRevenueDisbursement.list"
  },
  {
    key: "/admin/accounting/zone-revenue",
    label: "zone revenue",
    path: "/admin/accounting/zone-revenue",
    icon: <AccountBookOutlined />,
    permission: "accounting.zoneRevenue"
  },

  {
    key: "/admin/accounting/subZone-revenue",
    label: "subZone revenue",
    path: "/admin/accounting/subZone-revenue",
    icon: <AccountBookOutlined />,
    permission: "accounting.subZoneRevenue"
  },
  {
    key: "/admin/accounting/retailer-revenue",
    label: "retailer revenue",
    path: "/admin/accounting/retailer-revenue",
    icon: <AccountBookOutlined />,
    permission: "accounting.retailerRevenue"
  },
  {
    key: "/admin/accounting/my-revenue",
    label: "my revenue",
    path: "/admin/accounting/my-revenue",
    icon: <AccountBookOutlined />,
    permission: "accounting.myRevenue"
  }
];

export default accountRoutes;
