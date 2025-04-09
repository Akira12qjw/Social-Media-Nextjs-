"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "../../../../components/ui/sidebar";
import Link from "next/link";
import IconHome from "../../../../components/icons/icon-Home";
import IconSearch from "../../../../components/icons/icon-Search";
import IconProfile from "../../../../components/icons/icon-Profile";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../../../components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

import AvatarProfile from "../../profile/_components/avatarProfile";
import ModalPost from "./modalPost";
import { usePathname } from "next/navigation";
import IconMessage from "@/components/icons/icon-Message";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="bg-white pt-2">
        <Link href="/home">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="pl-32 h-8">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </g>
          </svg>
        </Link>
        <SidebarGroup>
          <SidebarContent>
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col">
                <NavigationMenuItem className="p-3">
                  <Link href="/home" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        pathname === "/home"
                          ? "font-extrabold text-black"
                          : "text-gray-400"
                      }`}
                    >
                      <IconHome />
                      <span className="pl-6 text-lg">Trang chủ</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="p-3">
                  <Link href="/explore" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        pathname === "/explore"
                          ? "font-extrabold text-black"
                          : "text-gray-400"
                      }`}
                    >
                      <IconSearch />
                      <span className="pl-6 text-lg">Tìm kiếm</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="p-3">
                  <Link href="/chat" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        pathname === "/chat"
                          ? "font-extrabold text-black"
                          : "text-gray-400"
                      }`}
                    >
                      <IconMessage />
                      <span className="pl-6 text-lg">Nhắn tin</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="p-3">
                  <Link href="/profile" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        pathname === "/profile"
                          ? "font-extrabold text-black"
                          : "text-gray-400"
                      }`}
                    >
                      <IconProfile />
                      <span className="ml-5 text-lg">Trang cá nhân</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Modal Post */}
                <NavigationMenuItem className="p-3"></NavigationMenuItem>
                <ModalPost />
                <NavigationMenuItem className="p-3">
                  {/* Logout */}
                  <div className="mt-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none focus:ring-0 focus-visible:ring-0">
                        <AvatarProfile />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link href="/logout">Đăng xuất</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
