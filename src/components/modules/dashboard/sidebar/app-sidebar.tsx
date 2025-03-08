'use client';

import * as React from 'react';
import {
  Store,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  LayoutDashboard,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import Link from 'next/link';
import Logo from '@/assets/icons/logo.svg';
import Image from 'next/image';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/user/dashboard',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Shop',
      url: '/user/shop/products',
      icon: Store,
      items: [
        {
          title: 'Manage Products',
          url: '/user/shop/products',
        },
        {
          title: 'Manage Categories',
          url: '/user/shop/category',
        },
        {
          title: 'Manage Brands',
          url: '/user/shop/brand',
        },
      ],
    },

    {
      title: 'Settings',
      url: '#',
      icon: Settings,
      items: [
        {
          title: 'Profile',
          url: '/profile',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src={Logo} alt="Logo" width={60} height={60} />
                <h2 className="font-bold text-xl">NextMart</h2>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
