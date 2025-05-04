import { Search } from "lucide-react";
import serverImg from "../assets/server.png";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { restApi } from "../modules/restapi";
import { SearchResult } from "../models/search-result";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchHistories, setSearchHistory] = useState<string[]>([
    "Find me a cheap sushi restaurant in downtown Los Angeles that's open now and has at least a 4-star rating.",
  ]);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const response = await restApi
        .post<SearchResult[]>("api/execute", {
          json: {
            message,
          },
        })
        .json();

      setIsSearching(false);
      setSearchResults(response);
      setIsLoaded(true);

      setSearchHistory((prev) => [...prev, message]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center px-5 py-10 gap-5 md:w-[600px] md:mx-auto">
      <div className={twMerge(isLoaded && "animate-swing-out-top-bck")}>
        <img src={serverImg} width={250} height={250} alt="Server" />
        <h1 className="text-3xl text-center pacifico-regular">
          How may I assist you?
        </h1>
      </div>

      <div className={twMerge("w-full", isLoaded && "animate-to-bottom")}>
        <div className="border border-gray-500 rounded-full flex w-full justify-between p-3 shadow-md shadow-gray-500">
          <input
            type="text"
            placeholder="Your reply..."
            className="w-full p-2 border-none outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className={twMerge(
              "bg-red-800 text-white p-2 rounded-full hover:bg-red-600 transition duration-200",
              isSearching && "scale-125"
            )}
            onClick={handleSearch}
          >
            <Search
              className={isSearching ? "animate-vibrate-1" : ""}
              strokeWidth={4}
            />
          </button>
        </div>

        <div className={twMerge("mt-10", isLoaded && "hidden")}>
          <p className="text-gray-500 italic text-center">
            Pick up where you left off!
          </p>

          <div className="flex flex-col gap-3 text-gray-400 w-full">
            {searchHistories.map((history, index) => (
              <p key={index} className="bg-gray-50 rounded-full px-8 py-2">
                {history}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
