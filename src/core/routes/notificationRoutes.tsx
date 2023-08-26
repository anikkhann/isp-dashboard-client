import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const notificationRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard.view"
  },

  {
    key: "/admin/notification",
    label: "Notification Dashboard",
    path: "/admin/notification",
    icon: <SettingOutlined />,
    permission: "notification.dashboard"
  },
  {
    key: "/admin/notification/email",
    label: "Email",
    path: "/admin/notification/email",
    icon: <SettingOutlined />,
    permission: "emailNotification.list",
    children: [
      {
        key: "/admin/notification/email/email-setting",
        label: "Email Setting",
        path: "/admin/notification/email/email-setting",
        icon: <SettingOutlined />,
        permission: "emailNotification.list"
      }
    ]
  },

  {
    key: "/admin/notification/sms",
    label: "SMS",
    path: "/admin/notification/sms",
    icon: <SettingOutlined />,
    permission: "smsNotification.list",
    children: [
      {
        key: "/admin/notification/sms/gateway",
        label: "Gateway",
        path: "/admin/notification/sms/gateway",
        icon: <SettingOutlined />,
        permission: "smsGateway.list"
      },
      {
        key: "/admin/notification/sms/send-sms-single",
        label: "Send SMS Single",
        path: "/admin/notification/sms/send-sms-single",
        icon: <SettingOutlined />,
        permission: "smsSingle.list"
      },
      {
        key: "/admin/notification/sms/send-sms-bulk",
        label: "Send SMS Bulk",
        path: "/admin/notification/sms/send-sms-bulk",
        icon: <SettingOutlined />,
        permission: "smsBulk.list"
      },
      {
        key: "/admin/notification/sms/system-sms-template",
        label: "System SMS Template",
        path: "/admin/notification/sms/system-sms-template",
        icon: <SettingOutlined />,
        permission: "systemSmsTemplate.list"
      },
      {
        key: "/admin/notification/sms/client-sms",
        label: "Client SMS",
        path: "/admin/notification/sms/client-sms",
        icon: <SettingOutlined />,
        permission: "clientsms.list"
      }
    ]
  }
];

export default notificationRoutes;
