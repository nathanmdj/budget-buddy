'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationConfig } from '~/config/navigation.config';

interface LinkProps {
  path: string;
  Icon: React.ReactNode;
  IconActive?: React.ReactNode;
  pathname: string;
}

const MobileBottomNav = () => {
  const pathname = usePathname();
  const Links = navigationConfig.routes.map((item) => {
    if ('children' in item) {
      return item.children.map((child) => {
        if (!('IconActive' in child) || child.path === '/home/settings') {
          return null;
        }

        return (
          <BottomNavItem
            key={child.path}
            Icon={child.Icon}
            IconActive={child.IconActive}
            path={child.path}
            pathname={pathname}
          />
        );
      });
    }
  });
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-20 border-t border-border bg-background lg:hidden">
      <ul className="flex h-16 items-center justify-around">{Links}</ul>
    </nav>
  );
};

export default MobileBottomNav;

const BottomNavItem = ({ Icon, IconActive, path, pathname }: LinkProps) => {
  const isHome = path === '/home';
  const isActive = isHome ? pathname === '/home' : pathname.startsWith(path);

  return (
    <li key={path}>
      <Link
        href={path}
        className={`flex flex-col items-center p-2 ${
          isActive ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        {isActive ? IconActive : Icon}
      </Link>
    </li>
  );
};
