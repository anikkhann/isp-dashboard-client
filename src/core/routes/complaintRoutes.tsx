import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const complaintRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/complaint",
    label: "Complaint Dashboard",
    path: "/admin/complaint",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/complaint/ticket-category",
    label: "Ticket Category",
    path: "/admin/complaint/ticket-category",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/complaint/complain-type",
    label: "Complain Type",
    path: "/admin/complaint/complain-type",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/complaint/checklist",
    label: "Check List",
    path: "/admin/complaint/checklist",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/complaint/root-cause",
    label: "Root Cause",
    path: "/admin/complaint/root-cause",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  },
  {
    key: "/admin/complaint/ticket",
    label: "Ticket",
    path: "/admin/complaint/ticket",
    icon: <SettingOutlined />,
    permission: "dashboard.view"
  }
];

export default complaintRoutes;
