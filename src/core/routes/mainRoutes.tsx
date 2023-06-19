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
    key: "/admin/client",
    label: "Client",
    path: "/admin/client",
    icon: <ShopOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/subscription",
    label: "Subscription",
    path: "/admin/subscription",
    icon: <ShopOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/zone-manager",
    label: "Zone Manager",
    path: "/admin/zone-manager",
    icon: <ShopOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/sub-zone-manager",
    label: "Sub Zone Manager",
    path: "/admin/sub-zone-manager",
    icon: <ShopOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "customer",
    label: "Customer",
    path: "customer",
    icon: <ShoppingCartOutlined />,
    permission: "dashboard.view",
    children: [
      {
        key: "/admin/customer/customer-type",
        label: "Customer Type",
        path: "/admin/customer/customer-type",
        icon: <BiCartAdd />,
        permission: "dashboard.view"
      },
      {
        key: "/admin/customer/customer",
        label: "customer List",
        path: "/admin/customer/customer",
        icon: <ShoppingCartOutlined />,
        permission: "dashboard.view"
      }
    ]
  },
  {
    key: "/admin/top-up",
    label: "Top Up",
    path: "/admin/top-up",
    icon: <ShopOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/packages",
    label: "Packages",
    path: "/admin/packages",
    icon: <ShopOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/distribution-zone",
    label: "Distribution Zone",
    path: "/admin/distribution-zone",
    icon: <ShopOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/distribution-pop",
    label: "Distribution pop",
    path: "/admin/distribution-pop",
    icon: <ShopOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/devices",
    label: "Devices",
    path: "/admin/devices",
    icon: <ShopOutlined />,
    permission: "dashboard.view"
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
    key: "settings",
    label: "Settings",
    path: "/admin/settings/admin",
    icon: <SettingOutlined />,
    permission: "admin_module",
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
        permission: "role.view"
      },

      {
        key: "/admin/settings/permission",
        label: "Permissions",
        path: "/admin/settings/permission",
        icon: <SlidersOutlined />,
        permission: "permission.view"
      }
    ]
  }
];

export default mainRoutes;
