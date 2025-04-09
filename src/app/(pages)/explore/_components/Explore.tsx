"use client";
import { Input } from "@/components/ui/input";
import SuggestFollow from "../../home/_components/suggestFollow";
import Trending from "../../home/_components/Trending";
import { useSearchService } from "@/services/search.service";
import SearchResult from "./SearchResult";
import { useSearchParams } from "next/navigation";
export default function Explore() {
  const {
    searchQuery,
    searchResults,
    activeTab,
    isLoading,
    debouncedQuery,
    handleSearch,
  } = useSearchService("top");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  return (
    <div className="flex">
      {/* Left */}
      <div className="p-5  border-r border-gray-200">
        {/* Header */}
        <div className="flex">
          <div className="sticky top-2 mb-3">
            <div className="z-50 relative pr-5">
              <Input
                className="w-[500px] bg-gray-100 rounded-full py-2 pl-12 pr-4 ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
                type="text"
                placeholder="Tìm kiếm"
                value={searchQuery || query}
                onChange={handleSearch}
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
            <div className=" top-0 z-50 bg-white/60 backdrop-blur border-gray-200">
              <div className="flex justify-between items-center h-14 border-b border-gray-200">
                <div>
                  <span className="text-[15px] font-medium text-gray-600">
                    Hàng đầu
                  </span>
                </div>
                <div>
                  <span className="text-[15px] font-medium text-gray-600">
                    Mới nhất
                  </span>
                </div>
                <div>
                  <span className="text-[15px] font-medium text-gray-600">
                    Mọi người
                  </span>
                </div>
                <div>
                  <span className="text-[15px] font-medium text-gray-600">
                    Phương Tiện
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SearchResult
          searchResults={searchResults}
          activeTab={activeTab}
          isLoading={isLoading}
          debouncedQuery={debouncedQuery}
        />
      </div>

      {/* Right */}
      <div className="w-2">
        <div className="fixed w-[350px]">
          <div className="space-y-4 mt-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="bg-gray-100 rounded-xl">
              <Trending />
            </div>
            <div className="bg-gray-100 rounded-xl">
              <SuggestFollow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
