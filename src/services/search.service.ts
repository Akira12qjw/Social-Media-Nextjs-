import { useState, useEffect } from "react";
import { TweetType } from "@/schemaValidations/tweet.schema";
import { ENDPOINTS } from "@/constants/config";
import { useSearchParams } from "next/navigation";

export interface SearchState {
  searchQuery: string;
  searchResults: TweetType[];
  activeTab: string;
  isLoading: boolean;
  debouncedQuery: string;
}

export const useSearchService = (initialTab = "top") => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TweetType[]>([]);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery || query);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, query]);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!debouncedQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `${ENDPOINTS.SEARCH}?content=${debouncedQuery}&limit=20&page=1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        setSearchResults(data.result?.tweets || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, activeTab]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value || query);
  };

  return {
    searchQuery,
    searchResults,
    activeTab,
    isLoading,
    debouncedQuery,
    setSearchQuery,
    setActiveTab,
    handleSearch,
  };
};

// Export additional search utilities if needed
export const searchUtils = {
  // Example: Function to format search results
  formatSearchResults: (results: TweetType[]) => {
    return results.map((tweet) => ({
      ...tweet,
      formattedDate: new Date(tweet.created_at).toLocaleDateString(),
    }));
  },

  // Example: Function to filter search results by type
  filterByType: (results: TweetType[]) => {
    // Implementation would depend on your specific filtering requirements
    return results;
  },
};
