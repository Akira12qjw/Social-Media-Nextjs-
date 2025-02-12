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
                <NavigationMenuItem className="p-3">
                  <div className="flex justify-center group relative items-center w-14 h-14 bg-gray-950 hover:bg-gray-800 cursor-pointer rounded-full">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-7 w-7 fill-white"
                      style={{ color: "rgb(255, 255, 255)" }}
                    >
                      <g>
                        <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z" />
                      </g>
                    </svg>
                  </div>
                </NavigationMenuItem>

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
