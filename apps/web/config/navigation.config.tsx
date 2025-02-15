import { Calendar, CreditCard, Home, List, User } from 'lucide-react';
import { z } from 'zod';

import { NavigationConfigSchema } from '@kit/ui/navigation-schema';

import pathsConfig from '~/config/paths.config';

const iconClasses = 'w-5 h-5';

const routes = [
  {
    label: 'common:routes.application',
    children: [
      {
        label: 'common:routes.home',
        path: pathsConfig.app.home,
        Icon: <Home className={iconClasses} />,
        IconActive: <Home className={iconClasses} />,
        end: true,
      },
      {
        label: 'common:routes.planner',
        path: pathsConfig.app.planner,
        Icon: <Calendar className={iconClasses} />,
        IconActive: <Calendar className={iconClasses} />,
      },
      {
        label: 'common:routes.transactions',
        path: pathsConfig.app.transactions,
        Icon: <List className={iconClasses} />,
        IconActive: <List className={iconClasses} />,
      },
      {
        label: 'common:routes.accounts',
        path: pathsConfig.app.accounts,
        Icon: <CreditCard className={iconClasses} />,
        IconActive: <CreditCard className={iconClasses} />,
      },
    ],
  },
  {
    label: 'common:routes.settings',
    children: [
      {
        label: 'common:routes.profile',
        path: pathsConfig.app.profileSettings,
        Icon: <User className={iconClasses} />,
        IconActive: <User className={iconClasses} />,
      },
    ],
  },
] satisfies z.infer<typeof NavigationConfigSchema>['routes'];

export const navigationConfig = NavigationConfigSchema.parse({
  routes,
  style: process.env.NEXT_PUBLIC_NAVIGATION_STYLE,
  sidebarCollapsed: process.env.NEXT_PUBLIC_HOME_SIDEBAR_COLLAPSED,
});
