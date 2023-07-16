import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const zoneRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/zone",
    label: "Zone Dashboard",
    path: "/admin/zone",
    icon: <SettingOutlined />,
    permission: "zone.dashboard"
  },

  {
    key: "/admin/zone/zone-in-charge",
    label: "Zone In Charge",
    path: "/admin/zone/zone-in-charge",
    icon: <SettingOutlined />,
    permission: "zone.list"
  }
];

export default zoneRoutes;
