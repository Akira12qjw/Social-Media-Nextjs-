import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ButtonLogout from "./_components/button-logout";

export default function Logoutpage() {
  return (
    <div className="flex items-center justify-center w-screen h-auto bg-black/30">
      <div className="w-1/4 h-1/2 rounded-2xl bg-white">
        <div className="flex items-center justify-center flex-col p-5">
          <div>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-10 h-10">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </g>
            </svg>
          </div>
          <div className="pl-2">
            <h1 className="font-bold text-xl py-3 text-center">Đăng xuất?</h1>
            <p className="text-gray-500">
              Bạn có thể đăng nhập trở lại bất kỳ lúc nào.
            </p>
          </div>
          <div className="flex flex-col w-full">
            <div className="py-4">
              <ButtonLogout />
            </div>
            <div>
              <Button
                asChild
                className="rounded-full bg-white text-black border hover:bg-black/5 border-gray-400 w-full"
              >
                <Link href="/home">Hủy bỏ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
