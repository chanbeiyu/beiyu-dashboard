import { IconName } from 'lucide-react/dynamic';

declare namespace App {
  type IconXT = IconName | string;

  // Layout Types
  namespace Layout {
    interface NavItem {
      title: string;
      url: string;
      disabled?: boolean;
      external?: boolean;
      shortcut?: [string, string];
      icon?: IconXT; //keyof typeof Icons | LucideIcon | TablerIcon;
      label?: string;
      description?: string;
      isActive?: boolean;
      items?: NavItem[];
    }

    interface NavItemWithChildren extends NavItem {
      items: NavItemWithChildren[];
    }

    interface NavItemWithOptionalChildren extends NavItem {
      items?: NavItemWithChildren[];
    }

    interface FooterItem {
      title: string;
      items: {
        title: string;
        href: string;
        external?: boolean;
      }[];
    }

    type MainNavItem = NavItemWithOptionalChildren;

    type SidebarNavItem = NavItemWithChildren;
  }

  namespace Biz {
    interface Tenant {
      id: string;
      name: string;
      logo: IconXT;
      plan: string;
    }

    interface Project {
      name: string;
      url: string;
      icon: IconXT;
    }

    interface Secondary {
      title: string;
      url: string;
      icon: IconXT;
    }

    interface SaleUser {
      id: number;
      name: string;
      email: string;
      amount: string;
      image: string;
      initials: string;
    }

    type App = {
      name: string;
      logo: IconXT;
      connected: boolean;
      desc: string;
    };

    type Product = {
      id: number;
      name: string;
      price: number;
      category: string;
      photo_url: string;
      description: string;
      created_at: string;
      updated_at: string;
    };
  }
}

export default App;
