import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Areas',
    url: '/area',
    icon: 'icon-home'
  },
  {
    name: 'Items',
    url: '/item',
    icon: 'icon-home'
  },
  
];
