import React from "react";
import { Input } from "./ui/input";
import Feeds from "./Feeds";
import { SidebarTrigger } from "./ui/sidebar";

export default function MainContent() {
  return (
    <div className="flex flex-grow flex-shrink p-5">
      <SidebarTrigger />

      <div className="w-full border-r border-gray-200 h-[calc(100vh-40px)]">
        {/* Header Section */}
        <div className="sticky top-[-2px] z-10 flex items-center justify-around p-4 border-b border-gray-200 bg-white/95">
          <div className="text-xl font-bold">Dành cho bạn</div>
          <div className="text-xl font-bold text-gray-500">Theo dõi</div>
        </div>

        {/* Post Creation Section */}
        <div className="flex p-4 border-b border-gray-200">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex-grow">
            <Input
              placeholder="Chuyện gì đang xảy ra ?!"
              className="border-0 text-xl placeholder:text-gray-500 focus-visible:ring-0 px-0 py-[2px] "
            />
            <div className="flex items-center mt-4">
              <div className="flex space-x-2 flex-grow">
                {/* Media */}
                <button className="p-2 hover:bg-blue-50 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary">
                    <path
                      fill="currentColor"
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
                    ></path>
                  </svg>
                </button>
                {/* GIF */}
                <button className="p-2 hover:bg-blue-50 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary">
                    <path
                      fill="currentColor"
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"
                    ></path>
                  </svg>
                </button>
                {/* Poll */}
                <button className="p-2 hover:bg-blue-50 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary">
                    <path
                      fill="currentColor"
                      d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"
                    ></path>
                  </svg>
                </button>
                {/* Emoji */}
                <button className="p-2 hover:bg-blue-50 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary">
                    <path
                      fill="currentColor"
                      d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"
                    ></path>
                  </svg>
                </button>
              </div>
              <button className="bg-primary text-white px-5 py-3 rounded-full font-bold hover:bg-primary/90">
                Đăng
              </button>
            </div>
          </div>
        </div>

        {/* Feed Section */}
        <div className=" divide-y divide-gray-200">
          {/* Feed content will go here */}
          <Feeds />
        </div>
      </div>
      <div className="ml-4 w-[50%]">
        <div className="sticky top-1">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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

          <Input
            className="rounded-full w-full p-5 ps-10"
            type="text"
            placeholder="Tìm kiếm"
          />
        </div>
      </div>
    </div>
  );
}
