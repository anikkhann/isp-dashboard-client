// import { Menu } from 'antd'
import { useRouter } from "next/router";
// import Link from 'next/link'
// import { Can } from '@/services/guard/Can'
import ability from "@/services/guard/ability";
import { StyledVerticalNav } from "./style/menu.styled";
import notificationRoutes from "@/core/routes/notificationRoutes";
import { useEffect, useState } from "react";

interface MenuLayoutProps {
  style?: React.CSSProperties;
  closeDrawer: () => void;
}

const MenuLayout = ({ style, closeDrawer }: MenuLayoutProps) => {
  const router = useRouter();
  const currentPath = router.route;

  const [loading, setLoading] = useState(true);
  const [defaultOpen, setDefaultOpen] = useState<string[]>([]);

  // filter routes that user can't access
  const routes = notificationRoutes.filter(route => {
    if (route.children) {
      route.children = route.children.filter(child => {
        if (ability.can(child.permission, child.key)) {
          return child;
        }
      });
    }

    if (ability.can(route.permission, route.key)) {
      return route;
    }
  });

  useEffect(() => {
    if (!router.isReady) return;

    const { asPath } = router;
    // check is current path has role permission or admin
    const routeSegments = asPath.split("/").filter(i => i);
    //  remove first segment
    routeSegments.shift();

    if (routeSegments.includes("email")) {
      setDefaultOpen(["email-management"]);
    }

    if (routeSegments.includes("sms")) {
      setDefaultOpen(["sms-management"]);
    }

    setLoading(false);
  }, [router]);

  return !loading ? (
    <StyledVerticalNav
      theme="light"
      mode="inline"
      selectedKeys={[currentPath]}
      defaultSelectedKeys={[currentPath]}
      defaultOpenKeys={defaultOpen}
      // defaultOpenKeys={["user-management"]}
      selectable
      style={{
        ...style
      }}
      onClick={({ key }) => {
        closeDrawer();
        router.push(key);
      }}
      items={routes}
    />
  ) : null;
};

export default MenuLayout;
