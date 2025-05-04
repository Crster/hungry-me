import serverImg from "../assets/server.png";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { restApi } from "../modules/restapi";
import { Restaurant } from "../models/restaurant";
import { SearchBar } from "../components/SearchBar";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { SearchHistory } from "../components/SearchHistory";
import { SearchResult } from "../components/SearchResult";
import { useLocation } from "react-router";

export default function HomePage() {
  const location = useLocation();
  const searchHistory = useSearchHistory();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<
    Restaurant[] | undefined
  >();
  const isLoaded = useMemo(() => !!searchResults, [searchResults]);

  useEffect(() => {
    if (location.state?.restaurants) {
      setSearchResults(location.state.restaurants);
    }
  }, [location.state]);

  const handleSearch = async (message: string) => {
    try {
      setIsSearching(true);
      const response = await restApi
        .post<Restaurant[]>("api/execute", {
          json: {
            message,
          },
        })
        .json();

      setSearchResults(response);
      searchHistory.add(message);
    } catch (error) {
      setSearchResults(undefined);
      alert("An error occurred while searching. Please try again.");
      console.error("Search Error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-5 py-10 gap-5">
      <div className={twMerge(isLoaded && "animate-swing-out-top-bck")}>
        <img src={serverImg} width={250} height={250} alt="Server" />
        <h1 className="text-3xl text-center pacifico-regular">
          How may I assist you?
        </h1>
      </div>

      {isLoaded && (
        <SearchResult searching={isSearching} restaurants={searchResults!} />
      )}

      <div className={twMerge("w-full", isLoaded && "animate-to-bottom")}>
        <SearchBar searching={isSearching} onSearch={handleSearch} />

        <SearchHistory
          className={twMerge("mt-10", isLoaded && "hidden")}
          searchHistory={searchHistory}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}
