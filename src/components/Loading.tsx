import React from "react";

export default function Loading() {
  return (
    <>
      {/* Outer spinning circle */}
      <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>

      {/* Optional loading text */}
      <p className="ml-4 text-gray-600 text-sm">Đang tải...</p>
    </>
  );
}
