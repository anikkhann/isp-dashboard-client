import {
  DashboardOutlined,
  BarChartOutlined,
  WifiOutlined,
  DownloadOutlined,
  TagOutlined,
  DollarCircleOutlined,
  HistoryOutlined,
  GiftOutlined,
  CustomerServiceOutlined,
  TransactionOutlined,
  UserSwitchOutlined,
  CalendarOutlined,
  AppstoreAddOutlined,
  DollarOutlined,
  IdcardOutlined
} from "@ant-design/icons";

const hotspotRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/hotspot",
    label: "Hotspot Dashboard",
    path: "/admin/hotspot",
    icon: <BarChartOutlined />,
    permission: "hotspot.dashboard"
  },

  {
    key: "/admin/hotspot/nas-device",
    label: "NAS Devices",
    path: "/admin/hotspot/nas-device",
    icon: <WifiOutlined />,
    permission: "nasDevice.list"
  },

  {
    key: "/admin/hotspot/ap-device",
    label: "AP Devices",
    path: "/admin/hotspot/ap-device",
    icon: <WifiOutlined />,
    permission: "apDevice.list"
  },

  {
    key: "/admin/hotspot/durjoy-requisition",
    label: "Client to Durjoy Requisition",
    path: "/admin/hotspot/durjoy-requisition",
    icon: <DownloadOutlined />,
    permission: "durjoyRequisition.list"
  },
  {
    key: "/admin/hotspot/client-requisition",
    label: "Zone Manager Requisition",
    path: "/admin/hotspot/client-requisition",
    icon: <DownloadOutlined />,
    permission: "clientRequisition.list"
  },
  {
    key: "/admin/hotspot/zone-tag",
    label: "ZM Tag/Remove",
    path: "/admin/hotspot/zone-tag",
    icon: <TagOutlined />,
    permission: "zoneTag.list"
  },
  {
    key: "/admin/hotspot/sub-zone-tag",
    label: "SZM Tag/Remove",
    path: "/admin/hotspot/sub-zone-tag",
    icon: <TagOutlined />,
    permission: "subzoneTag.list"
  },
  {
    key: "/admin/hotspot/retailer-tag",
    label: "Retailer Tag/Remove",
    path: "/admin/hotspot/retailer-tag",
    icon: <TagOutlined />,
    permission: "retailerTag.list"
  },
  {
    key: "/admin/hotspot/client-revenue",
    label: "Client Revenue",
    path: "/admin/hotspot/client-revenue",
    icon: <DollarCircleOutlined />,
    permission: "clientRevenue.list"
  },
  {
    key: "/admin/hotspot/zone-revenue",
    label: "ZM Revenue",
    path: "/admin/hotspot/zone-revenue",
    icon: <DollarCircleOutlined />,
    permission: "zoneRevenue.list"
  },
  {
    key: "/admin/hotspot/sub-zone-revenue",
    label: "SZM Revenue",
    path: "/admin/hotspot/sub-zone-revenue",
    icon: <DollarCircleOutlined />,
    permission: "subzoneRevenue.list"
  },
  {
    key: "/admin/hotspot/retailer-revenue",
    label: "Retailer Revenue",
    path: "/admin/hotspot/retailer-revenue",
    icon: <DollarCircleOutlined />,
    permission: "retailerRevenue.list"
  },
  {
    key: "/admin/hotspot/my-revenue",
    label: "My Revenue",
    path: "/admin/hotspot/my-revenue",
    icon: <DollarCircleOutlined />,
    permission: "myRevenue.list"
  },
  {
    key: "/admin/hotspot/otp-history",
    label: "OTP History",
    path: "/admin/hotspot/otp-history",
    icon: <HistoryOutlined />,
    permission: "otpHistory.list"
  },
  {
    key: "/admin/hotspot/unused-voucher",
    label: "Unused Voucher",
    path: "/admin/hotspot/unused-voucher",
    icon: <GiftOutlined />,
    permission: "unusedVoucher.list"
  },
  {
    key: "/admin/hotspot/used-voucher",
    label: "Used Voucher",
    path: "/admin/hotspot/used-voucher",
    icon: <GiftOutlined />,
    permission: "usedVoucher.list"
  },
  {
    key: "/admin/hotspot/customer-care",
    label: "Customer Care",
    path: "/admin/hotspot/customer-care",
    icon: <CustomerServiceOutlined />,
    permission: "HotspotCustomerCare.list"
  },
  {
    key: "/admin/hotspot/client-transaction",
    label: "Client Transaction",
    path: "/admin/hotspot/client-transaction",
    icon: <TransactionOutlined />,
    permission: "clientTransaction.list"
  },
  {
    key: "/admin/hotspot/zone-transaction",
    label: "ZM Transaction",
    path: "/admin/hotspot/zone-transaction",
    icon: <TransactionOutlined />,
    permission: "zoneTransaction.list"
  },
  {
    key: "/admin/hotspot/tso-visit",
    label: "TSO Visit",
    path: "/admin/hotspot/tso-visit",
    icon: <UserSwitchOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/reseller-visit",
    label: "SZM Visit",
    path: "/admin/hotspot/reseller-visit",
    icon: <TagOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/area-tagging",
    label: "Area Tagging",
    path: "/admin/hotspot/area-tagging",
    icon: <TagOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/retailer-tagging",
    label: "Retailer Tagging",
    path: "/admin/hotspot/retailer-tagging",
    icon: <GiftOutlined />,
    permission: "zone.list"
  },
  // {
  //   key: "/admin/hotspot/tso-tagging",
  //   label: "TSO tagging to area manager",
  //   path: "/admin/hotspot/tso-tagging",
  //   icon: <SettingOutlined />,
  //   permission: "zone.list"
  // },
  {
    key: "/admin/hotspot/monthly-target",
    label: "Monthly Target",
    path: "/admin/hotspot/monthly-target",
    icon: <CalendarOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/other-product",
    label: "Other Product",
    path: "/admin/hotspot/other-product",
    icon: <AppstoreAddOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/other-product-sale",
    label: "Other Product Sales",
    path: "/admin/hotspot/other-product-sale",
    icon: <DollarOutlined />,
    permission: "OtherProductSale.list"
  },
  {
    key: "/admin/hotspot/retailer-onboard",
    label: "Retailer Onboard",
    path: "/admin/hotspot/retailer-onboard",
    icon: <IdcardOutlined />,
    permission: "retailerOnboard.list"
  }
];

export default hotspotRoutes;
