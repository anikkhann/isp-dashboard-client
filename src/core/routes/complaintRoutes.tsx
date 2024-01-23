import {
  DashboardOutlined,
  SettingOutlined,
  BarChartOutlined,
  ExclamationCircleOutlined,
  CheckSquareOutlined,
  BranchesOutlined,
  MessageOutlined
  // UserWarningOutlined
} from "@ant-design/icons";

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
    icon: <BarChartOutlined />,
    permission: "complaint.dashboard"
  },

  {
    key: "/admin/complaint/complain-type",
    label: "Complain Type",
    path: "/admin/complaint/complain-type",
    icon: <ExclamationCircleOutlined />,
    permission: "complainType.list"
  },

  {
    key: "/admin/complaint/checklist",
    label: "Check List",
    path: "/admin/complaint/checklist",
    icon: <CheckSquareOutlined />,
    permission: "checklist.list"
  },
  {
    key: "/admin/complaint/root-cause",
    label: "Root Cause",
    path: "/admin/complaint/root-cause",
    icon: <BranchesOutlined />,
    permission: "rootCause.list"
  },
  {
    key: "/admin/complaint/customer-ticket",
    label: "Customer Ticket",
    path: "/admin/complaint/customer-ticket",
    icon: <MessageOutlined />,
    permission: "customerTicket.list"
  },
  {
    key: "/admin/complaint/admin-ticket",
    label: "Admin Ticket",
    path: "/admin/complaint/admin-ticket",
    icon: <SettingOutlined />,
    permission: "adminTicket.list"
  }
];

export default complaintRoutes;
