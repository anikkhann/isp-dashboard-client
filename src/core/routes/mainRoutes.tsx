import {
  DashboardOutlined,
  DeploymentUnitOutlined,
  ShopOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { BiCartAdd } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import {
  MdOutlineAddShoppingCart,
  MdCategory,
  MdOutlineCurrencyExchange
} from "react-icons/md";
import { TbCategory, TbReportAnalytics, TbTruckReturn } from "react-icons/tb";
import { AiOutlineBgColors, AiOutlineAreaChart } from "react-icons/ai";
import { SiBrandfolder, SiOrigin } from "react-icons/si";
import { GiReturnArrow } from "react-icons/gi";
import { HiOutlineDocumentReport } from "react-icons/hi";

const mainRoutes = [
  {
    key: "/admin",
    label: "Main Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard"
  },

  {
    key: "/admin/purchase",
    label: "Purchase Dashboard",
    path: "/admin/purchase",
    icon: <ShopOutlined />,
    permission: "dashboard"
  },
  {
    key: "purchase",
    label: "Purchase",
    path: "purchase",
    icon: <ShoppingCartOutlined />,
    permission: "dashboard",
    children: [
      {
        key: "/admin/purchase/purchase/create",
        label: "New Purchase",
        path: "/admin/purchase/purchase/create",
        icon: <BiCartAdd />,
        permission: "purchase.view"
      },
      {
        key: "/admin/purchase/purchase",
        label: "Purchase List",
        path: "/admin/purchase/purchase",
        icon: <ShoppingCartOutlined />,
        permission: "purchase.view"
      }
    ]
  },
  {
    key: "purchase-setup",
    label: "Purchase Setup",
    path: "purchase-setup",
    icon: <FiSettings />,
    permission: "purchase.setup",
    children: [
      {
        key: "/admin/purchase/item",
        label: "Item",
        path: "/admin/purchase/item",
        icon: <MdOutlineAddShoppingCart />,
        permission: "item.view"
      },

      {
        key: "/admin/purchase/category",
        label: "Category",
        path: "/admin/purchase/category",
        icon: <TbCategory />,
        permission: "category.view"
      },
      {
        key: "/admin/purchase/sub-category",
        label: "sub-category",
        path: "/admin/purchase/sub-category",
        icon: <TbCategory />,
        permission: "category.view"
      },
      {
        key: "/admin/purchase/material",
        label: "Material",
        path: "/admin/purchase/material",
        icon: <MdCategory />,
        permission: "material.view"
      },
      {
        key: "/admin/purchase/color",
        label: "Color",
        path: "/admin/purchase/color",
        icon: <AiOutlineBgColors />,
        permission: "color.view"
      },
      {
        key: "/admin/purchase/brand",
        label: "Brand",
        path: "/admin/purchase/brand",
        icon: <SiBrandfolder />,
        permission: "brand.view"
      },
      {
        key: "/admin/purchase/product-origin",
        label: "Product Origin",
        path: "/admin/purchase/product-origin",
        icon: <SiOrigin />,
        permission: "productOrigin.view"
      },
      {
        key: "/admin/purchase/currency",
        label: "Currency",
        path: "/admin/purchase/currency",
        icon: <MdOutlineCurrencyExchange />,
        permission: "currency.view"
      },
      {
        key: "/admin/purchase/margin",
        label: "Default Margin",
        path: "/admin/purchase/margin",
        icon: <AiOutlineAreaChart />,
        permission: "margin.view"
      },

      {
        key: "/admin/purchase/unit",
        label: "Unit",
        path: "/admin/purchase/unit",
        icon: <DeploymentUnitOutlined />,
        permission: "unit.view"
      }
    ]
  },
  {
    key: "purchase-return",
    label: "Purchase Return",
    path: "/admin/purchase",
    icon: <GiReturnArrow />,
    permission: "purchaseReturn.view",
    children: [
      {
        key: "/admin/purchase/purchase-return/create",
        label: "New Return",
        path: "/admin/purchase/purchase-return/create",
        icon: <TbTruckReturn />,
        permission: "purchaseReturn.view"
      },

      {
        key: "/admin/purchase/purchase-return",
        label: "Return List",
        path: "/admin/purchase/purchase-return",
        icon: <GiReturnArrow />,
        permission: "purchaseReturn.view"
      }
    ]
  },
  {
    key: "purchase-report",
    label: "Purchase Report",
    path: "/admin/purchase",
    icon: <TbReportAnalytics />,
    permission: "purchaseReport.view",
    children: [
      {
        key: "/admin/purchase/report/summary-report",
        label: "Summary Report",
        path: "/admin/purchase/report/summary-report",
        icon: <TbReportAnalytics />,
        permission: "purchaseReport.view"
      },

      {
        key: "/admin/purchase/report/details-report",
        label: "Details Report",
        path: "/admin/purchase/report/details-report",
        icon: <HiOutlineDocumentReport />,
        permission: "purchaseReport.view"
      },

      {
        key: "/admin/purchase/report/purchase-return-report",
        label: "Return Report",
        path: "/admin/purchase/report/purchase-return-report",
        icon: <GiReturnArrow />,
        permission: "purchaseReport.view"
      }
    ]
  }
];

export default mainRoutes;
