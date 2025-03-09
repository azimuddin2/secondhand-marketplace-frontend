'use client';

import * as React from 'react';
import { Store, Settings, LayoutDashboard, Shield } from 'lucide-react';

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
import { useUser } from '@/context/UserContext';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const navMain = [];

  // User-only routes
  if (user?.role === 'user') {
    navMain.push(
      {
        title: 'Dashboard',
        url: '/user/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Products',
        url: '/user/listings',
        icon: Store,
        items: [
          {
            title: 'Manage Listings',
            url: '/user/listings',
          },
        ],
      },
      {
        title: 'Settings',
        url: '/user/profile',
        icon: Settings,
        items: [
          {
            title: 'Profile',
            url: '/user/profile',
          },
        ],
      },
    );
  }

  // Admin-only routes
  if (user?.role === 'admin') {
    navMain.push(
      {
        title: 'Dashboard',
        url: `/admin/dashboard`,
        icon: LayoutDashboard,
      },
      {
        title: 'Admin Panel',
        url: '/admin/dashboard',
        icon: Shield,
        items: [
          {
            title: 'Manage Users',
            url: '/admin/users',
          },
          {
            title: 'Site Settings',
            url: '/admin/settings',
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
    );
  }

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
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
