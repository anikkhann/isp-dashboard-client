import {
  DashboardOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  DollarCircleOutlined,
  ClockCircleOutlined,
  TagsOutlined,
  UserSwitchOutlined,
  GlobalOutlined,
  LockOutlined,
  DisconnectOutlined,
  SwapOutlined
} from "@ant-design/icons";
import Link from "next/link";
const customerCareRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/customer-care",
    label: <Link href="/admin/customer-care">Customer Care</Link>,
    path: "/admin/customer-care",
    icon: <CustomerServiceOutlined />,
    permission: "customerCare.customer"
  },

  {
    key: "/admin/customer-top-up",
    label: <Link href="/admin/customer-top-up">Customer TOP-UP</Link>,
    path: "/admin/customer-top-up",
    icon: <DollarCircleOutlined />,
    permission: "customerCare.topUp"
  },

  {
    key: "/admin/expire-date-extend-deduction",
    label: (
      <Link href="/admin/expire-date-extend-deduction">
        Expiry Date Adjustment
      </Link>
    ),
    path: "/admin/expired-date-extend-deduction",
    icon: <ClockCircleOutlined />,
    permission: "customerCare.expireDate"
  },
  {
    key: "/admin/zone-manager-tag-or-remove",
    label: <Link href="/admin/zone-manager-tag-or-remove">ZM Tag/Remove</Link>,
    path: "/admin/zone-manager-tag-or-remove",
    icon: <TagsOutlined />,
    permission: "customerCare.zoneManagerTag"
  },
  {
    key: "/admin/sub-zone-manager-tag-or-remove",
    label: (
      <Link href="/admin/sub-zone-manager-tag-or-remove">SZM Tag/Remove</Link>
    ),
    path: "/admin/sub-zone-manager-tag-or-remove",
    icon: <TagsOutlined />,
    permission: "customerCare.subZoneManagerTag"
  },
  {
    key: "/admin/retailer-tag-or-remove",
    label: (
      <Link href="/admin/retailer-tag-or-remove">Retailer Tag/Remove</Link>
    ),
    path: "/admin/retailer-tag-or-remove",
    icon: <TagsOutlined />,
    permission: "customerCare.retailerTag"
  },
  {
    key: "/admin/customer-package-update",
    label: (
      <Link href="/admin/customer-package-update">Customer Package Update</Link>
    ),
    path: "/admin/customer-package-update",
    icon: <SettingOutlined />,
    permission: "customerCare.packageUpdate"
  },
  {
    key: "/admin/customer-status-update",
    label: (
      <Link href="/admin/customer-status-update">Customer Status Update</Link>
    ),
    path: "/admin/customer-status-update",
    icon: <UserSwitchOutlined />,
    permission: "customerCare.statusUpdate"
  },
  {
    key: "/admin/customer-zone-or-pop-update",
    label: (
      <Link href="/admin/customer-zone-or-pop-update">Zone/POP Update</Link>
    ),
    path: "/admin/customer-zone-or-pop-update",
    icon: <GlobalOutlined />,
    permission: "customerCare.distributionZoneUpdate"
  },
  {
    key: "/admin/customer-password-change",
    label: <Link href="/admin/customer-password-change">Password Update</Link>,
    path: "/admin/customer-password-change",
    icon: <LockOutlined />,
    permission: "customerCare.passwordUpdate"
  },
  {
    key: "/admin/customer-mac-bind-or-remove",
    label: (
      <Link href="/admin/customer-mac-bind-or-remove">MAC Bind/Remove</Link>
    ),
    path: "/admin/customer-mac-bind-or-remove",
    icon: <DisconnectOutlined />,
    permission: "customerCare.macUpdate"
  },
  {
    key: "/admin/static-ip-assign",
    label: <Link href="/admin/static-ip-assign">Static IP Assign/Remove</Link>,
    path: "/admin/static-ip-assign",
    icon: <GlobalOutlined />,
    permission: "customerCare.staticIpAssign"
  },
  {
    key: "/admin/package-migration",
    label: <Link href="/admin/package-migration">Package Migration</Link>,
    path: "/admin/package-migration",
    icon: <SwapOutlined />,
    permission: "customerCare.packageMigration"
  }
];

export default customerCareRoutes;
