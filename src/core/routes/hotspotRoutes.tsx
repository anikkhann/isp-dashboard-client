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
import Link from "next/link";
const hotspotRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/hotspot",
    label: <Link href="/admin/hotspot">Hotspot Dashboard</Link>,
    path: "/admin/hotspot",
    icon: <BarChartOutlined />,
    permission: "hotspot.dashboard"
  },
  {
    key: "/admin/hotspot/package",
    label: <Link href="/admin/hotspot/package">Package</Link>,
    path: "/admin/hotspot/package",
    icon: <IdcardOutlined />,
    permission: "hotspotPackage.list"
  },

  {
    key: "/admin/hotspot/nas-device",
    label: <Link href="/admin/hotspot/nas-device">NAS Devices</Link>,
    path: "/admin/hotspot/nas-device",
    icon: <WifiOutlined />,
    permission: "nasDevice.list"
  },

  {
    key: "/admin/hotspot/ap-device",
    label: <Link href="/admin/hotspot/ap-device">AP Devices</Link>,
    path: "/admin/hotspot/ap-device",
    icon: <WifiOutlined />,
    permission: "apDevice.list"
  },

  {
    key: "/admin/hotspot/durjoy-requisition",
    label: (
      <Link href="/admin/hotspot/durjoy-requisition">
        Client to Durjoy Requisition
      </Link>
    ),
    path: "/admin/hotspot/durjoy-requisition",
    icon: <DownloadOutlined />,
    permission: "durjoyRequisition.list"
  },
  {
    key: "/admin/hotspot/client-requisition",
    label: (
      <Link href="/admin/hotspot/client-requisition">
        Zone Manager Requisition
      </Link>
    ),
    path: "/admin/hotspot/client-requisition",
    icon: <DownloadOutlined />,
    permission: "clientRequisition.list"
  },
  {
    key: "/admin/hotspot/zone-tag",
    label: <Link href="/admin/hotspot/zone-tag">ZM Tag/Remove</Link>,
    path: "/admin/hotspot/zone-tag",
    icon: <TagOutlined />,
    permission: "zoneTag.list"
  },
  {
    key: "/admin/hotspot/sub-zone-tag",
    label: <Link href="/admin/hotspot/sub-zone-tag">SZM Tag/Remove</Link>,
    path: "/admin/hotspot/sub-zone-tag",
    icon: <TagOutlined />,
    permission: "subzoneTag.list"
  },
  {
    key: "/admin/hotspot/retailer-tag",
    label: <Link href="/admin/hotspot/retailer-tag">Retailer Tag/Remove</Link>,
    path: "/admin/hotspot/retailer-tag",
    icon: <TagOutlined />,
    permission: "retailerTag.list"
  },
  {
    key: "/admin/hotspot/client-revenue",
    label: <Link href="/admin/hotspot/client-revenue">Client Revenue</Link>,
    path: "/admin/hotspot/client-revenue",
    icon: <DollarCircleOutlined />,
    permission: "clientRevenue.list"
  },
  {
    key: "/admin/hotspot/zone-revenue",
    label: <Link href="/admin/hotspot/zone-revenue">ZM Revenue</Link>,
    path: "/admin/hotspot/zone-revenue",
    icon: <DollarCircleOutlined />,
    permission: "zoneRevenue.list"
  },
  {
    key: "/admin/hotspot/sub-zone-revenue",
    label: <Link href="/admin/hotspot/sub-zone-revenue">SZM Revenue</Link>,
    path: "/admin/hotspot/sub-zone-revenue",
    icon: <DollarCircleOutlined />,
    permission: "subzoneRevenue.list"
  },
  {
    key: "/admin/hotspot/retailer-revenue",
    label: <Link href="/admin/hotspot/retailer-revenue">Retailer Revenue</Link>,
    path: "/admin/hotspot/retailer-revenue",
    icon: <DollarCircleOutlined />,
    permission: "retailerRevenue.list"
  },
  {
    key: "/admin/hotspot/my-revenue",
    label: <Link href="/admin/hotspot/my-revenue">My Revenue</Link>,
    path: "/admin/hotspot/my-revenue",
    icon: <DollarCircleOutlined />,
    permission: "myRevenue.list"
  },
  {
    key: "/admin/hotspot/otp-history",
    label: <Link href="/admin/hotspot/otp-history">OTP History</Link>,
    path: "/admin/hotspot/otp-history",
    icon: <HistoryOutlined />,
    permission: "otpHistory.list"
  },
  {
    key: "/admin/hotspot/unused-voucher",
    label: <Link href="/admin/hotspot/unused-voucher">Unused Voucher</Link>,
    path: "/admin/hotspot/unused-voucher",
    icon: <GiftOutlined />,
    permission: "unusedVoucher.list"
  },
  {
    key: "/admin/hotspot/used-voucher",
    label: <Link href="/admin/hotspot/used-voucher">Used Voucher</Link>,
    path: "/admin/hotspot/used-voucher",
    icon: <GiftOutlined />,
    permission: "usedVoucher.list"
  },
  {
    key: "/admin/hotspot/customer-care",
    label: <Link href="/admin/hotspot/customer-care">Customer Care</Link>,
    path: "/admin/hotspot/customer-care",
    icon: <CustomerServiceOutlined />,
    permission: "HotspotCustomerCare.list"
  },
  {
    key: "/admin/hotspot/client-transaction",
    label: (
      <Link href="/admin/hotspot/client-transaction">Client Transaction</Link>
    ),
    path: "/admin/hotspot/client-transaction",
    icon: <TransactionOutlined />,
    permission: "clientTransaction.list"
  },
  {
    key: "/admin/hotspot/zone-transaction",
    label: <Link href="/admin/hotspot/zone-transaction">ZM Transaction</Link>,
    path: "/admin/hotspot/zone-transaction",
    icon: <TransactionOutlined />,
    permission: "zoneTransaction.list"
  },
  {
    key: "/admin/hotspot/tso-visit",
    label: <Link href="/admin/hotspot/tso-visit">TSO Visit</Link>,
    path: "/admin/hotspot/tso-visit",
    icon: <UserSwitchOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/reseller-visit",
    label: <Link href="/admin/hotspot/reseller-visit">SZM Visit</Link>,
    path: "/admin/hotspot/reseller-visit",
    icon: <TagOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/area-tagging",
    label: <Link href="/admin/hotspot/area-tagging">Area Tagging</Link>,
    path: "/admin/hotspot/area-tagging",
    icon: <TagOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/retailer-tagging",
    label: <Link href="/admin/hotspot/retailer-tagging">Retailer Tagging</Link>,
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
    label: <Link href="/admin/hotspot/monthly-target">Monthly Target</Link>,
    path: "/admin/hotspot/monthly-target",
    icon: <CalendarOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/other-product",
    label: <Link href="/admin/hotspot/other-product">Other Product</Link>,
    path: "/admin/hotspot/other-product",
    icon: <AppstoreAddOutlined />,
    permission: "zone.list"
  },
  {
    key: "/admin/hotspot/other-product-sale",
    label: (
      <Link href="/admin/hotspot/other-product-sale">Other Product Sales</Link>
    ),
    path: "/admin/hotspot/other-product-sale",
    icon: <DollarOutlined />,
    permission: "OtherProductSale.list"
  },
  {
    key: "/admin/hotspot/retailer-onboard",
    label: <Link href="/admin/hotspot/retailer-onboard">Retailer Onboard</Link>,
    path: "/admin/hotspot/retailer-onboard",
    icon: <IdcardOutlined />,
    permission: "retailerOnboard.list"
  }
];

export default hotspotRoutes;
