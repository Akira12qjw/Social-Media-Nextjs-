"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState, useRef } from "react";
import Avatar from "../../profile/_components/avatarProfile";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface PostProps {
  onPostSuccess?: () => void;
}

export default function Post({ onPostSuccess }: PostProps) {
  const accessToken = localStorage.getItem("accessToken");
  const [content, setContent] = useState("");

  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const closeDialogRef = useRef<HTMLButtonElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (mediaFiles.length + files.length > 4) {
      toast.error("Vượt quá giới hạn");
      return;
    }

    // Kiểm tra từng file
    const validFiles = files.filter((file) => {
      // Kiểm tra nếu là ảnh
      if (file.type.startsWith("image/")) {
        const isValidType = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
        return isValidType && isValidSize;
      }
      // Kiểm tra nếu là video
      else if (file.type.startsWith("video/")) {
        const isValidType = [
          "video/mp4",
          "video/webm",
          "video/quicktime",
        ].includes(file.type);
        const isValidSize = file.size <= 100 * 1024 * 1024; // 100MB
        return isValidType && isValidSize;
      }
      return false;
    });

    if (validFiles.length !== files.length) {
      toast.error(
        "Chỉ chấp nhận ảnh (JPG, PNG, GIF, WEBP < 5MB) hoặc video (MP4, WEBM, MOV < 100MB)"
      );
    }

    const newFiles = [...mediaFiles, ...validFiles].slice(0, 4);
    setMediaFiles(newFiles);
  };

  const uploadMedia = async (files: File[]) => {
    const uploadedMedia = [];
    for (const file of files) {
      const formData = new FormData();
      const isImage = file.type.startsWith("image/");
      const endpoint = isImage ? "upload-image" : "upload-video";

      formData.append(isImage ? "image" : "video", file);

      try {
        const uploadResponse = await fetch(`${baseUrl}/medias/${endpoint}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Upload failed");
        }

        const uploadData = await uploadResponse.json();

        const mediaObject = {
          url: uploadData.result[0].url,
          type: isImage ? 0 : 1, // 0 cho ảnh, 1 cho video
        };

        if (!mediaObject.url) {
          throw new Error("Invalid media URL from upload response");
        }

        uploadedMedia.push(mediaObject);
      } catch (error) {
        console.error("Error uploading media:", error);
        toast.error(`Lỗi upload ${isImage ? "ảnh" : "video"}`);
        throw error;
      }
    }
    return uploadedMedia;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung bài viết!");
      return;
    }

    if (!accessToken) {
      toast.error("Bạn chưa đăng nhập");
      return;
    }

    setIsUploading(true);
    try {
      const mediaUrls =
        mediaFiles.length > 0 ? await uploadMedia(mediaFiles) : [];

      const postData = {
        type: 0,
        audience: 0,
        content: content.trim() || "",
        parent_id: null,
        hashtags: [],
        mentions: [],
        medias: mediaUrls,
        guest_views: 0,
        user_views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const response = await fetch(`${baseUrl}/tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi khi đăng bài viết");
      }

      const data = await response.json();
      console.log("Bài viết đã đăng:", data);

      setContent("");
      setMediaFiles([]);
      toast.success("Đăng bài viết thành công!");

      // Call the callback function if provided
      onPostSuccess?.();
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error((error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      <div className="fixed z-10 w-max bg-white border-b border-gray-200"></div>
      <div className="flex p-4 border-b border-gray-200">
        <SidebarTrigger className="md:hidden" />

        <div className="flex-shrink-0 mr-4">
          <Link href="/profile">
            <Avatar />
          </Link>
        </div>
        <div className="flex-grow">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Chuyện gì đang xảy ra ?!"
            className="border-0 text-xl placeholder:text-gray-500 focus-visible:ring-0 px-0 py-[2px]"
          />
          <div className="flex  gap-2 mt-4">
            {mediaFiles.map((file, index) => (
              <div
                key={index}
                className="w-2/3 h-max border rounded overflow-hidden relative group"
              >
                {file.type.startsWith("image/") ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Content image"
                    className="object-contain w-full h-full"
                    width={500}
                    height={500}
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    className="object-contain w-full h-full"
                    controls
                  />
                )}

                <button
                  onClick={() =>
                    setMediaFiles(mediaFiles.filter((_, i) => i !== index))
                  }
                  className="absolute top-2 right-2 p-1 bg-gray-800/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-4">
            <div className="flex space-x-2 flex-grow">
              <label className="p-2 hover:bg-blue-50 rounded-full cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary">
                  <path
                    fill="currentColor"
                    d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
                  ></path>
                </svg>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isUploading}
              className={`bg-primary text-white px-5 py-3 rounded-full font-bold ${
                isUploading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary/90"
              }`}
            >
              {isUploading ? "Đang tải lên..." : "Đăng"}
            </button>
            <Dialog>
              <DialogClose ref={closeDialogRef} className="hidden" />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
