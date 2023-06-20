// import { Menu } from 'antd'
import { useRouter } from "next/router";
// import Link from 'next/link'
// import { Can } from '@/services/guard/Can'
import ability from "@/services/guard/ability";
import { StyledVerticalNav } from "./style/menu.styled";
import packageRoutes from "@/core/routes/packageRoutes";

interface MenuLayoutProps {
  style?: React.CSSProperties;
  closeDrawer: () => void;
}

const MenuLayout = ({ style, closeDrawer }: MenuLayoutProps) => {
  const router = useRouter();
  const currentPath = router.route;
  // console.log('', ability.can('read', 'Post'))

  // filter routes that user can't access
  const routes = packageRoutes.filter(route => {
    if (ability.can(route.permission, route.key)) {
      return route;
    }
  });

  return (
    <StyledVerticalNav
      theme="light"
      mode="inline"
      selectedKeys={[currentPath]}
      defaultOpenKeys={[currentPath]}
      style={{
        ...style
      }}
      onClick={({ key }) => {
        closeDrawer();
        router.replace(key);
      }}
      items={routes}
    />
  );
};

export default MenuLayout;
