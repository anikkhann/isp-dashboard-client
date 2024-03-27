import {
  DashboardOutlined,
  SettingOutlined,
  MailOutlined,
  MessageOutlined,
  FileTextOutlined,
  BellOutlined
} from "@ant-design/icons";
import Link from "next/link";
const notificationRoutes = [
  {
    key: "/admin",
    label: <Link href="/admin">Main Dashboard</Link>,
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/notification",
    label: <Link href="/admin/notification">Notification Dashboard</Link>,
    path: "/admin/notification",
    icon: <SettingOutlined />,
    permission: "notification.dashboard"
  },
  {
    key: "email-management",
    label: "Email",
    path: "email-management",
    icon: <SettingOutlined />,
    permission: "emailNotification.list",
    children: [
      {
        key: "/admin/notification/email/email-setting",
        label: (
          <Link href="/admin/notification/email/email-setting">
            Email Setting
          </Link>
        ),
        path: "/admin/notification/email/email-setting",
        icon: <SettingOutlined />,
        permission: "emailNotification.list"
      },
      {
        key: "/admin/notification/email/email-template",
        label: (
          <Link href="/admin/notification/email/email-template">
            Email Template
          </Link>
        ),
        path: "/admin/notification/email/email-template",
        icon: <MailOutlined />,
        permission: "emailTemplate.list"
      }
    ]
  },

  {
    key: "sms-management",
    label: "SMS",
    path: "sms-management",
    icon: <SettingOutlined />,
    permission: "smsNotification.list",
    children: [
      {
        key: "/admin/notification/sms/gateway",
        label: <Link href="/admin/notification/sms/gateway">Gateway</Link>,
        path: "/admin/notification/sms/gateway",
        icon: <SettingOutlined />,
        permission: "smsGateway.list"
      },
      {
        key: "/admin/notification/sms/send-sms-single",
        label: (
          <Link href="/admin/notification/sms/send-sms-single">
            Send Single SMS
          </Link>
        ),
        path: "/admin/notification/sms/send-sms-single",
        icon: <MessageOutlined />,
        permission: "smsSingle.list"
      },
      {
        key: "/admin/notification/sms/send-sms-bulk",
        label: (
          <Link href="/admin/notification/sms/send-sms-bulk">
            Send Bulk SMS
          </Link>
        ),
        path: "/admin/notification/sms/send-sms-bulk",
        icon: <MessageOutlined />,
        permission: "smsBulk.list"
      },
      {
        key: "/admin/notification/sms/system-sms-template",
        label: (
          <Link href="/admin/notification/sms/system-sms-template">
            System SMS Template
          </Link>
        ),
        path: "/admin/notification/sms/system-sms-template",
        icon: <FileTextOutlined />,
        permission: "systemSmsTemplate.list"
      },
      {
        key: "/admin/notification/sms/client-gateway-setting",
        label: (
          <Link href="/admin/notification/sms/client-gateway-setting">
            Client Gateway Setting
          </Link>
        ),
        path: "/admin/notification/sms/client-gateway-setting",
        icon: <SettingOutlined />,
        permission: "clientGatewaySetting.list"
      },
      {
        key: "/admin/notification/sms/client-sms-alert",
        label: (
          <Link href="/admin/notification/sms/client-sms-alert">
            Client SMS Alert
          </Link>
        ),
        path: "/admin/notification/sms/client-sms-alert",
        icon: <BellOutlined />,
        permission: "clientSmsAlert.list"
      },
      {
        key: "/admin/notification/sms/client-sms-template",
        label: (
          <Link href="/admin/notification/sms/client-sms-template">
            Client SMS Template
          </Link>
        ),
        path: "/admin/notification/sms/client-sms-template",
        icon: <FileTextOutlined />,
        permission: "clientSmsTemplate.list"
      }
    ]
  },
  {
    key: "/admin/notification/notice",
    label: <Link href="/admin/notification/notice">Notice Borard</Link>,
    path: "/admin/notification/notice",
    icon: <SettingOutlined />,
    permission: "notice.list"
  }
];

export default notificationRoutes;
