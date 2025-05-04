import { Search } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface SearchBarProps {
  searching: boolean;
  onSearch: (message: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searching,
  onSearch,
}) => {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="border border-gray-500 bg-white rounded-full flex w-full justify-between p-3 shadow-md shadow-gray-500">
      <input
        type="text"
        placeholder="Your reply..."
        className="w-full p-2 border-none outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className={twMerge(
          "bg-red-800 text-white p-2 rounded-full hover:bg-red-600 transition duration-200 disabled:cursor-not-allowed",
          searching && "scale-125"
        )}
        disabled={searching}
        onClick={() => onSearch(message)}
      >
        <Search
          className={searching ? "animate-vibrate-1" : ""}
          strokeWidth={4}
        />
      </button>
    </div>
  );
};
