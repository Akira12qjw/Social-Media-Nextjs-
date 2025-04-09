import AuthWrapper from "@/utils/AuthWrapper";
import React from "react";
import SideBar from "../home/_components/SideBar";

import ProfileDetailOther from "../profile/_components/profileDetailOther";

export default function page() {
  return (
    <div className="h-screen flex">
      <AuthWrapper>
        <SideBar />
        <ProfileDetailOther />
      </AuthWrapper>
    </div>
  );
}
