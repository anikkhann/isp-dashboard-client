import {
  DashboardOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SlidersOutlined,
  UserOutlined
} from "@ant-design/icons";
import { BiCartAdd } from "react-icons/bi";

const mainRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "client",
    label: "Client Management",
    path: "client",
    icon: <ShopOutlined />,
    permission: "dashboard.view",
    children: [
      {
        key: "/admin/client",
        label: "Dashboard",
        path: "/admin/client",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      },
      {
        key: "/admin/client/client",
        label: "Client",
        path: "/admin/client/client",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      },
      {
        key: "/admin/client/subscription",
        label: "Subscription",
        path: "/admin/client/subscription",
        icon: <ShoppingCartOutlined />,
        permission: "dashboard.view"
      }
    ]
  },

  {
    key: "zone-in-charge",
    label: "Zone In Charge",
    path: "zone-in-charge",
    icon: <ShopOutlined />,
    permission: "dashboard.view",
    children: [
      {
        key: "/admin/zone-in-charge",
        label: "Dashboard",
        path: "/admin/zone-in-charge",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      },
      {
        key: "/admin/zone-in-charge/zone-in-charge",
        label: "Zone In Charge",
        path: "/admin/zone-in-charge/zone-in-charge",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      }
    ]
  },
  {
    key: "sub-zone-in-charge",
    label: "Sub Zone In Charge",
    path: "sub-zone-in-charge",
    icon: <ShopOutlined />,
    permission: "dashboard.view",
    children: [
      {
        key: "/admin/sub-zone-in-charge",
        label: "Dashboard",
        path: "/admin/sub-zone-in-charge",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      },
      {
        key: "/admin/sub-zone-in-charge/sub-zone-in-charge",
        label: "Zone In Charge",
        path: "/admin/sub-zone-in-charge/sub-zone-in-charge",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      }
    ]
  },

  {
    key: "device-management",
    label: "Device Management",
    path: "device-management",
    icon: <ShoppingCartOutlined />,
    permission: "dashboard.view",
    children: [
      {
        key: "/admin/device-management/device",
        label: "Device",
        path: "/admin/device-management/device",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      },
      {
        key: "/admin/device-management/network",
        label: "Network",
        path: "/admin/device-management/network",
        icon: <ShoppingCartOutlined />,
        permission: "dashboard.view"
      },
      {
        key: "/admin/device-management/ip-management",
        label: "IP Management",
        path: "/admin/device-management/ip-management",
        icon: <ShoppingCartOutlined />,
        permission: "dashboard.view"
      }
    ]
  },

  {
    key: "ticket",
    label: "Ticket",
    path: "ticket",
    icon: <ShoppingCartOutlined />,
    permission: "dashboard.view",
    children: [
      {
        key: "/admin/ticket/ticket",
        label: "Ticket List",
        path: "/admin/ticket/ticket",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      },
      {
        key: "/admin/ticket/complain-type",
        label: "Complain Type List",
        path: "/admin/ticket/complain-type",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      },
      {
        key: "/admin/ticket/root-cause",
        label: "Root Cause List",
        path: "/admin/ticket/root-cause",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      }
    ]
  },
  {
    key: "admins",
    label: "Users & Roles Management",
    path: "/admin/settings/admin",
    icon: <SettingOutlined />,
    permission: "setting.view",
    children: [
      {
        key: "/admin/settings/admin",
        label: "Admins",
        path: "/admin/settings/admin",
        icon: <UserOutlined />,
        permission: "admin.view"
      },
      {
        key: "/admin/settings/role",
        label: "Roles",
        path: "/admin/settings/role",
        icon: <SlidersOutlined />,
        permission: "user.view"
      },

      {
        key: "/admin/settings/permission",
        label: "Permissions",
        path: "/admin/settings/permission",
        icon: <SlidersOutlined />,
        permission: "user.view"
      }
    ]
  },
  {
    key: "accounts",
    label: "Accounting & Billing",
    path: "/admin/accounts",
    icon: <SettingOutlined />,
    permission: "setting.view",
    children: [
      {
        key: "/admin/accounts/invoice",
        label: "Invoice",
        path: "/admin/settings/invoice",
        icon: <UserOutlined />,
        permission: "setting.view"
      },
      {
        key: "/admin/accounts/transaction",
        label: "Gateway Transaction",
        path: "/admin/settings/transaction",
        icon: <SlidersOutlined />,
        permission: "setting.view"
      }
    ]
  }
];

export default mainRoutes;
