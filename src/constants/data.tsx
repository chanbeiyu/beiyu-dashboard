import App from '@/types/app';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: App.Layout.NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'layout-dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'bring-to-front',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Apps',
    url: '/dashboard/apps',
    icon: 'drafting-compass',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Tasks',
    url: '/dashboard/tasks',
    icon: 'check',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'badge-dollar-sign',
    isActive: false,
    items: [
      {
        title: 'Users',
        url: '/dashboard/users',
        icon: 'user',
        shortcut: ['m', 'm']
      },
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'user-pen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'log-in'
      }
    ]
  },
  {
    title: 'Errors',
    url: '#',
    icon: 'bug',
    isActive: false,
    items: [
      {
        title: 'Forbidden (403)',
        url: '/dashboard/errors/forbidden',
        icon: 'door-closed-locked'
      },
      {
        title: 'Unauthorized (401)',
        url: '/dashboard/errors/unauthorized',
        icon: 'shield-x'
      },
      {
        title: 'Not Found (404)',
        url: '/dashboard/errors/not-found',
        icon: 'eye-closed'
      },
      {
        title: 'Maintenance Error (503)',
        url: '/dashboard/errors/maintenance',
        icon: 'circle-x'
      },
      {
        title: 'Internal Server Error (500)',
        url: '/dashboard/errors/general',
        icon: 'monitor-x'
      }
    ]
  },
  {
    title: 'Settings',
    url: '#',
    icon: 'settings',
    isActive: false,
    items: [
      {
        title: 'Profile',
        url: '/dashboard/settings',
        icon: 'user-pen'
      },
      {
        title: 'Account',
        url: '/dashboard/settings/account',
        icon: 'circle-user'
      },
      {
        title: 'Appearance',
        url: '/dashboard/settings/appearance',
        icon: 'sun-moon'
      },
      {
        title: 'Notifications',
        url: '/dashboard/settings/notifications',
        icon: 'bell-dot'
      },
      {
        title: 'Display',
        url: '/dashboard/settings/display',
        icon: 'contrast'
      }
    ]
  }
];

export const tenants: App.Biz.Tenant[] = [
  {
    id: '1',
    name: 'Acme Inc',
    logo: 'gallery-vertical-end',
    plan: 'Enterprise'
  },
  {
    id: '2',
    name: 'Acme Corp.',
    logo: 'audio-waveform',
    plan: 'Startup'
  },
  {
    id: '3',
    name: 'Evil Corp.',
    logo: 'command',
    plan: 'Free'
  }
];
export const projects: App.Biz.Project[] = [
  {
    name: 'Design Engineering',
    url: '#',
    icon: 'frame'
  },
  {
    name: 'Sales & Marketing',
    url: '#',
    icon: 'pie-chart'
  },
  {
    name: 'Travel',
    url: '#',
    icon: 'map'
  }
];

export const navSecondary: App.Biz.Secondary[] = [
  {
    title: 'Support',
    url: '#',
    icon: 'life-buoy'
  },
  {
    title: 'Feedback',
    url: '/dashboard/feedback',
    icon: 'send'
  }
];

export const apps: App.Biz.App[] = [
  {
    name: 'Telegram',
    logo: 'logos:telegram',
    connected: false,
    desc: 'Connect with Telegram for real-time communication.'
  },
  {
    name: 'Notion',
    logo: 'logos:notion-icon',
    connected: true,
    desc: 'Effortlessly sync Notion pages for seamless collaboration.'
  },
  {
    name: 'Figma',
    logo: 'logos:figma',
    connected: true,
    desc: 'View and collaborate on Figma designs in one place.'
  },
  {
    name: 'Trello',
    logo: 'logos:trello',
    connected: false,
    desc: 'Sync Trello cards for streamlined project management.'
  },
  {
    name: 'Slack',
    logo: 'logos:slack-icon',
    connected: false,
    desc: 'Integrate Slack for efficient team communication'
  },
  {
    name: 'Zoom',
    logo: 'logos:zoom-icon',
    connected: true,
    desc: 'Host Zoom meetings directly from the dashboard.'
  },
  {
    name: 'Stripe',
    logo: 'logos:stripe',
    connected: false,
    desc: 'Easily manage Stripe transactions and payments.'
  },
  {
    name: 'Gmail',
    logo: 'logos:google-gmail',
    connected: true,
    desc: 'Access and manage Gmail messages effortlessly.'
  },
  {
    name: 'Medium',
    logo: 'logos:medium-icon',
    connected: false,
    desc: 'Explore and share Medium stories on your dashboard.'
  },
  {
    name: 'Skype',
    logo: 'logos:skype',
    connected: false,
    desc: 'Connect with Skype contacts seamlessly.'
  },
  {
    name: 'Docker',
    logo: 'logos:docker-icon',
    connected: false,
    desc: 'Effortlessly manage Docker containers on your dashboard.'
  },
  {
    name: 'GitHub',
    logo: 'logos:github-octocat',
    connected: false,
    desc: 'Streamline code management with GitHub integration.'
  },
  {
    name: 'GitLab',
    logo: 'logos:gitlab',
    connected: false,
    desc: 'Efficiently manage code projects with GitLab integration.'
  },
  {
    name: 'Discord',
    logo: 'logos:discord-icon',
    connected: false,
    desc: 'Connect with Discord for seamless team communication.'
  },
  {
    name: 'WhatsApp',
    logo: 'logos:whatsapp-icon',
    connected: false,
    desc: 'Easily integrate WhatsApp for direct messaging.'
  }
];

export const recentSalesData: App.Biz.SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
