/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { AccountType } from "@/schemaValidations/account.schema";
import { DialogTitle } from "@radix-ui/react-dialog";
import { updateProfile } from "@/services/profile.service";
import { toast } from "sonner";

// Types
interface ValidationError {
  msg: string;
}

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AccountType | null;
  onProfileUpdate?: (updatedProfile: AccountType) => void;
}

interface ProfileFormData {
  username: string;
  bio: string;
  location: string;
  website: string;
}

// Components
const CoverImage = () => (
  <div className="relative h-48 bg-gray-300 group">
    <Image
      priority={true}
      src="https://twitter-clone-3.s3.ap-southeast-1.amazonaws.com/images/light-gray-color.png"
      alt="Cover"
      layout="fill"
      objectFit="cover"
      className="w-full"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
      <ImageButton icon="camera" />
      <ImageButton icon="edit" />
    </div>
  </div>
);

const ImageButton = ({ icon }: { icon: "camera" | "edit" }) => (
  <button className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60">
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden="true">
      <g>
        <path
          fill="currentColor"
          d={
            icon === "camera"
              ? "M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5h-14C3.119 21 2 19.881 2 18.5v-11C2 6.119 3.119 5 4.5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z"
              : "M17.244 3.804L3.8 17.247l-.85 3.404 3.404-.85L19.798 6.357 17.244 3.804zM21 3.55L19.45 2l-1.41 1.41 2.55 2.55L21 3.55z"
          }
        />
      </g>
    </svg>
  </button>
);

const Avatar = ({ avatar }: { avatar?: string }) => (
  <div className="absolute -bottom-16 left-4">
    <div className="relative group">
      <Image
        priority={true}
        src={
          avatar ||
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
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
);

const FormInput = ({
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength?: number;
}) => (
  <div className="space-y-1.5">
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded-md p-2 w-full ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
    />
    {maxLength && (
      <div className="text-xs text-gray-500">
        {value.length}/{maxLength} ký tự
      </div>
    )}
  </div>
);

// Utils
const normalizeUsername = (username: string) =>
  username
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]/g, "");

const validateUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    toast.error("Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới");
    return false;
  }
  return true;
};

const handleValidationError = (errors: Record<string, ValidationError>) => {
  Object.entries(errors).forEach(([field, error]) => {
    let errorMessage = "";
    switch (field) {
      case "username":
        errorMessage = "Tên người dùng đã tồn tại";
        break;
      case "cover_photo":
        errorMessage = "Ảnh bìa phải có độ dài từ 1-400 ký tự";
        break;
      default:
        errorMessage = error.msg;
    }
    toast.error(errorMessage);
  });
};

export default function ModalProfile({
  isOpen,
  onClose,
  profile,
  onProfileUpdate,
}: ModalProfileProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    username: profile?.username || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange =
    (field: keyof ProfileFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (!profile) return;

      const normalizedName = normalizeUsername(formData.username);
      const normalizedCurrentUsername = normalizeUsername(profile.username);

      const changedFields = {
        _id: profile._id,
        ...(normalizedName !== normalizedCurrentUsername && {
          username: formData.username,
        }),
        ...(formData.bio !== profile.bio && { bio: formData.bio }),
        ...(formData.location !== profile.location && {
          location: formData.location,
        }),
        ...(formData.website !== profile.website && {
          website: formData.website,
        }),
      } as AccountType;

      if (normalizedName !== normalizedCurrentUsername) {
        if (!validateUsername(formData.username)) return;
      }

      if (Object.keys(changedFields).length === 0) {
        toast.info("Không có thông tin nào được thay đổi");
        return;
      }

      const response = await updateProfile(changedFields);

      if (response.success && response.data) {
        toast.success("Cập nhật thông tin thành công");
        onProfileUpdate?.(response.data);
        onClose();
        window.location.reload();
      } else {
        if (response.errors) {
          handleValidationError(response.errors);
        } else {
          toast.error(
            response.message || "Có lỗi xảy ra khi cập nhật thông tin"
          );
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle>
        <DialogContent className="sm:max-w-[600px] p-0 max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="p-4 border-b flex justify-between items-center shrink-0">
            <h2 className="text-xl font-bold">Chỉnh sửa hồ sơ</h2>
          </DialogHeader>

          <div className="overflow-y-auto flex-1">
            <div className="relative">
              <CoverImage />
              <Avatar avatar={profile?.avatar} />
            </div>

            <div className="px-4 pt-20 pb-4 space-y-4">
              <FormInput
                value={formData.username}
                onChange={handleInputChange("username")}
                placeholder="Tên"
                maxLength={50}
              />
              <FormInput
                value={formData.bio}
                onChange={handleInputChange("bio")}
                placeholder="Tiểu sử"
                maxLength={160}
              />
              <FormInput
                value={formData.location}
                onChange={handleInputChange("location")}
                placeholder="Vị trí"
              />
              <FormInput
                value={formData.website}
                onChange={handleInputChange("website")}
                placeholder="Trang web"
              />
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full p-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
