import SideBar from "@/app/(pages)/home/_components/SideBar";
import React from "react";
import MyProfile from "./_components/myProfile";
import AuthWrapper from "@/utils/AuthWrapper";

export default function page() {
  return (
    <div className="h-screen flex">
      <AuthWrapper>
        <SideBar />
        <MyProfile />
      </AuthWrapper>
    </div>
  );
}
