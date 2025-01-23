import React from "react";
import { Sidebar, SidebarContent, SidebarGroup } from "./ui/sidebar";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import IconHome from "./icons/icon-Home";
import IconSearch from "./icons/icon-Search";
import IconProfile from "./icons/icon-Profile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SideBar() {
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
                      className={navigationMenuTriggerStyle()}
                    >
                      <IconHome />{" "}
                      <span className="pl-6 text-lg">Trang chủ</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="p-3">
                  <Link href="/explore" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <IconSearch />{" "}
                      <span className="pl-6 text-lg">Tìm kiếm</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="p-3">
                  <Link href="/profile" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <IconProfile />{" "}
                      <span className="ml-5 text-lg">Trang cá nhân</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      {/* Logout */}
      <div className="my-20  pl-32">
        <Avatar className="w-14 h-14">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </Sidebar>
  );
}
