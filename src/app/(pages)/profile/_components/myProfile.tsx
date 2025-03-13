"use client";
import ArrowLeft from "@/components/icons/icon-ArrowLeft";
import { Input } from "@/components/ui/input";
import { AccountType } from "@/schemaValidations/account.schema";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalProfile from "./modalProfile";
import Trending from "../../home/_components/Trending";
import SuggestFollow from "../../home/_components/suggestFollow";
import { toast } from "sonner";
import { getProfile } from "@/services/profile.service";

export default function MyProfile() {
  const [profile, setProfile] = useState<AccountType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getProfile();
        if (response.success) {
          setProfile(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to fetch profile"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="flex">
      {/* Left */}
      <div className="p-5 w-full border-r border-gray-200">
        {/* Header */}
        <div className="flex">
          <Link href="/home">
            <ArrowLeft />
          </Link>
          <div className="">
            <div className="ml-5 font-bold text-xl">{profile.username}</div>
          </div>
        </div>
        {/* End Header */}

        {/* Image Profile */}
        <div className="relative">
          <div className="mt-5">
            <Image
              priority={true}
              src={
                "https://twitter-clone-3.s3.ap-southeast-1.amazonaws.com/images/light-gray-color.png"
              }
              width={500}
              height={100}
              alt=""
              className="h-48 w-screen"
            />
          </div>
          <div className="flex justify-between items-start px-5">
            <div className="rounded-full relative -mt-16">
              <Image
                priority={true}
                src={
                  profile.avatar ||
                  "https://res.cloudinary.com/dwyvtyasp/image/upload/v1734597632/xgkaepsmtzdf25tqtzsi.png"
                }
                alt="Avatar"
                width={100}
                height={100}
                className="w-32 h-32 rounded-full border-4 object-cover border-white"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-4 py-2 rounded-full border border-gray-300 font-semibold hover:bg-gray-200"
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
        {/* End Image Profile */}

        {/* Info Profile */}
        <div className="mt-2">
          <div className="flex">
            <div className="flex-1">
              <span className="text-2xl font-bold">{profile.username}</span>
            </div>
          </div>

          <span className="text-gray-500 text-base">
            @{profile.email?.split("@")[0]}
          </span>
          <div className="flex mt-2">
            <span className="flex items-center text-gray-500 text-base mr-3">
              {profile.location && (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="fill-gray-500 h-4 w-4"
                  >
                    <g>
                      <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z" />
                    </g>
                  </svg>
                  {profile.location}
                </>
              )}
            </span>
            <span className="flex items-center text-gray-500 text-base ml-3">
              {profile.created_at && (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="fill-gray-500 h-4 w-4 mr-1"
                  >
                    <g>
                      <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z" />
                    </g>
                  </svg>

                  {(() => {
                    const date = new Date(profile.created_at);
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    return `Tham gia tháng ${month} năm ${year}`;
                  })()}
                </>
              )}
            </span>
          </div>
        </div>
        {/* End Info Profile */}
      </div>

      {/* Right */}
      <div className="w-3/5 ml-7">
        <div className="fixed w-[350px]">
          {/* Search Bar */}
          <div className="sticky top-2 mb-3">
            <div className="relative">
              <Input
                className="w-full bg-gray-100 rounded-full py-2 pl-12 pr-4 ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
                type="text"
                placeholder="Tìm kiếm"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-100 rounded-xl">
              <Trending />
            </div>
            <div className="bg-gray-100 rounded-xl">
              <SuggestFollow />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalProfile
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
      />
    </div>
  );
}
