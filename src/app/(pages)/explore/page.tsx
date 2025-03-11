import SideBar from "@/app/(pages)/home/_components/SideBar";
import AuthWrapper from "@/utils/AuthWrapper";
import React from "react";

export default function page() {
  return (
    <div className="h-screen flex">
      <AuthWrapper>
        <SideBar />
      </AuthWrapper>
    </div>
  );
}
