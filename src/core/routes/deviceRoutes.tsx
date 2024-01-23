import {
  DashboardOutlined,
  AreaChartOutlined,
  MobileOutlined,
  GlobalOutlined,
  CloudServerOutlined
} from "@ant-design/icons";

const deviceRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/device",
    label: "Device Dashboard",
    path: "/admin/device",
    icon: <AreaChartOutlined />,
    permission: "device.dashboard"
  },

  {
    key: "/admin/device/device",
    label: "Device",
    path: "/admin/device/device",
    icon: <MobileOutlined />,
    permission: "device.list"
  },

  {
    key: "/admin/device/network",
    label: "Network",
    path: "/admin/device/network",
    icon: <GlobalOutlined />,
    permission: "network.list"
  },

  {
    key: "/admin/device/ip-management",
    label: "IP Management",
    path: "/admin/device/ip-management",
    icon: <CloudServerOutlined />,
    permission: "ip.list"
  }
];

export default deviceRoutes;
