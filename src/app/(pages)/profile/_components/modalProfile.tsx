"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { AccountType } from "@/schemaValidations/account.schema";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AccountType | null;
}

export default function ModalProfile({
  isOpen,
  onClose,
  profile,
}: ModalProfileProps) {
  const [name, setName] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [website, setWebsite] = useState(profile?.website || "");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle>
        <DialogContent className="sm:max-w-[600px] p-0  max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="p-4 border-b flex justify-between items-center shrink-0">
            <div className="flex gap-6">
              <div className="flex">
                <h2 className="text-xl font-bold">Chỉnh sửa hồ sơ</h2>
              </div>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 ">
            <div className="relative">
              {/* Cover Image */}
              <div className="relative h-48 bg-gray-300 group">
                <Image
                  priority={true}
                  src={
                    "https://twitter-clone-3.s3.ap-southeast-1.amazonaws.com/images/light-gray-color.png"
                  }
                  alt="Cover"
                  layout="fill"
                  objectFit="cover"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5h-14C3.119 21 2 19.881 2 18.5v-11C2 6.119 3.119 5 4.5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z"
                        ></path>
                      </g>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M17.244 3.804L3.8 17.247l-.85 3.404 3.404-.85L19.798 6.357 17.244 3.804zM21 3.55L19.45 2l-1.41 1.41 2.55 2.55L21 3.55z"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Avatar */}
              <div className="absolute -bottom-16 left-4">
                <div className="relative group">
                  <Image
                    priority={true}
                    src={
                      profile?.avatar ||
                      "https://res.cloudinary.com/dwyvtyasp/image/upload/v1734597632/xgkaepsmtzdf25tqtzsi.png"
                    }
                    alt="Avatar"
                    width={100}
                    height={100}
                    className="w-32 h-32 rounded-full border-4 object-cover border-white"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-12 h-12 text-white"
                      aria-hidden="true"
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5h-14C3.119 21 2 19.881 2 18.5v-11C2 6.119 3.119 5 4.5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="px-4 pt-20 pb-4 space-y-4">
              <div className="space-y-1.5">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên"
                  className="border rounded-md p-2 w-full ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
                />
                <div className="text-xs text-gray-500">
                  {name.length}/50 ký tự
                </div>
              </div>

              <div className="space-y-1.5">
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tiểu sử"
                  className="border rounded-md p-2 w-full ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
                />
                <div className="text-xs text-gray-500">
                  {bio.length}/160 ký tự
                </div>
              </div>

              <div className="space-y-1.5">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Vị trí"
                  className="border rounded-md p-2 w-full ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Trang web"
                  className="border rounded-md p-2 w-full ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
                />
              </div>
              <button className="w-full p-3  bg-black text-white rounded-full font-bold hover:bg-gray-800">
                Lưu
              </button>
            </div>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
