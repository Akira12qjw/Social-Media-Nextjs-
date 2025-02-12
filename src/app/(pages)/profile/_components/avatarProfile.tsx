"use client";
import React, { useEffect, useState } from "react";
import { getProfile } from "../../../../utils/getProfile";
import { AccountType } from "@/schemaValidations/account.schema";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarProfile() {
  const [profile, setProfile] = useState<AccountType | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
  console.log("Profile: ", profile);
  return (
    <div>
      <Avatar>
        <AvatarImage
          className="w-16 h-16"
          src={profile?.avatar || "https://github.com/shadcn.png"}
          alt="profile"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
