import { TweetType } from "@/schemaValidations/tweet.schema";
import Image from "next/image";
import React from "react";

export default function SelectedTweet({
  selectedTweet,
  closeModal,
  nextImage,
  previousImage,
  currentImageIndex,
}: {
  selectedTweet: TweetType | null;
  closeModal: () => void;
  nextImage: (e: React.MouseEvent) => void;
  previousImage: (e: React.MouseEvent) => void;
  currentImageIndex: number;
}) {
  return (
    <>
      {selectedTweet && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative w-screen h-screen flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={closeModal}
              className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center cursor-pointer bg-black/50 hover:bg-black/70 rounded-full text-white"
            >
              <span className="text-xl">×</span>
            </div>
            {/* Navigation arrows */}
            {currentImageIndex > 0 && (
              <button
                onClick={previousImage}
                className="absolute left-4 z-50 p-4 text-white bg-black/50 hover:bg-black/70 rounded-full"
              >
                ←
              </button>
            )}{" "}
            {selectedTweet.medias.length > 1 &&
              currentImageIndex < selectedTweet.medias.length - 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 z-50 p-4 text-white bg-black/50 hover:bg-black/70 rounded-full"
                >
                  →
                </button>
              )}
            {/* Current image */}
            <div className="relative max-w-[90vw] max-h-[90vh]">
              <Image
                src={selectedTweet.medias[currentImageIndex].url || ""}
                alt="Modal Image"
                className="object-contain max-h-[90vh]"
                width={1200}
                height={800}
              />
            </div>
            {selectedTweet.medias.length > 1 && (
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full">
                {currentImageIndex + 1} / {selectedTweet.medias.length}
              </div>
            )}
          </div>
          <div
            className="bg-white h-full w-5/6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-3 pl-3">
              <Image
                src={
                  selectedTweet.user.avatar ||
                  "https://res.cloudinary.com/dwyvtyasp/image/upload/v1734597632/xgkaepsmtzdf25tqtzsi.png"
                }
                alt="random"
                className="w-14 h-14 rounded-full min-w-14"
                width={50}
                height={50}
                priority={true}
              />
              <h1 className="text-xl font-bold ml-3 mb-3 cursor-pointer hover:underline">
                {selectedTweet.user.username}
              </h1>
            </div>
            <p className="text-base mb-3 pl-3">{selectedTweet.content}</p>
            <div className=" flex justify-between border-y pl-3 border-gray-200">
              <div className="flex items-center py-3 gap-1 group relative cursor-pointer hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                  />
                </svg>
                <span className="text-base text-inherit">
                  {selectedTweet.comment_count}
                </span>
                <div className="absolute top-8 whitespace-nowrap opacity-0 group-hover:opacity-90 text-sm text-white bg-gray-600 p-1 rounded shadow-md transition-opacity">
                  Trả lời
                </div>
              </div>

              <div className="flex items-center gap-1 group relative cursor-pointer hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                  />
                </svg>
                <span className="text-base text-inherit">
                  {selectedTweet.retweet_count}
                </span>
                <div className="absolute top-8 whitespace-nowrap opacity-0 group-hover:opacity-90 text-sm text-white bg-gray-600 p-1 rounded shadow-md transition-opacity">
                  Đăng lại
                </div>
              </div>

              <div className="flex items-center gap-1 group relative cursor-pointer hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span className="text-base text-inherit">
                  {selectedTweet.likes}
                </span>
                <div className="absolute top-8 whitespace-nowrap opacity-0 group-hover:opacity-90 text-sm text-white bg-gray-600 p-1 rounded shadow-md transition-opacity">
                  Thích
                </div>
              </div>

              <div className="flex items-center gap-1 group relative cursor-pointer hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="text-base text-inherit">
                  {selectedTweet.user_views}
                </span>
                <div className="absolute top-8 whitespace-nowrap opacity-0 group-hover:opacity-90 text-sm text-white bg-gray-600 p-1 rounded shadow-md transition-opacity">
                  Lượt xem
                </div>
              </div>

              <div className="flex items-center gap-1 group relative cursor-pointer hover:text-blue-600 pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
                <div className="absolute top-8 whitespace-nowrap opacity-0 group-hover:opacity-90 text-sm text-white bg-gray-600 p-1 rounded shadow-md transition-opacity">
                  Đánh dấu trang
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
