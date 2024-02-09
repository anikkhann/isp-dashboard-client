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
import Link from "next/link";
const complaintRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/complaint",
    label: <Link href="/admin/complaint">Complaint Dashboard</Link>,
    path: "/admin/complaint",
    icon: <BarChartOutlined />,
    permission: "complaint.dashboard"
  },

  {
    key: "/admin/complaint/complain-type",
    label: <Link href="/admin/complaint/complain-type">Complain Type</Link>,
    path: "/admin/complaint/complain-type",
    icon: <ExclamationCircleOutlined />,
    permission: "complainType.list"
  },

  {
    key: "/admin/complaint/checklist",
    label: <Link href="/admin/complaint/checklist">Check List</Link>,
    path: "/admin/complaint/checklist",
    icon: <CheckSquareOutlined />,
    permission: "checklist.list"
  },
  {
    key: "/admin/complaint/root-cause",
    label: <Link href="/admin/complaint/root-cause">Root Cause</Link>,
    path: "/admin/complaint/root-cause",
    icon: <BranchesOutlined />,
    permission: "rootCause.list"
  },
  {
    key: "/admin/complaint/customer-ticket",
    label: <Link href="/admin/complaint/customer-ticket">Customer Ticket</Link>,
    path: "/admin/complaint/customer-ticket",
    icon: <MessageOutlined />,
    permission: "customerTicket.list"
  },
  {
    key: "/admin/complaint/admin-ticket",
    label: <Link href="/admin/complaint/admin-ticket">Admin Ticket</Link>,
    path: "/admin/complaint/admin-ticket",
    icon: <SettingOutlined />,
    permission: "adminTicket.list"
  }
];

export default complaintRoutes;
