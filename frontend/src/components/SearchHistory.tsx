import { twMerge } from "tailwind-merge";
import { useSearchHistory } from "../hooks/useSearchHistory";

interface SearchHistoryProps {
  className?: string;
  searching?: boolean;
  searchHistory: ReturnType<typeof useSearchHistory>;
  onSearch: (message: string) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  className,
  searching,
  searchHistory,
  onSearch,
}) => {
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <p className="text-gray-500 italic text-center">
        Pick up where you left off!
      </p>

      <div className="flex flex-col gap-3 text-gray-400 w-full">
        {searchHistory.items.map((history, index) => (
          <button
            key={index}
            className="bg-gray-50 rounded-full px-8 py-2 cursor-pointer hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed"
            disabled={searching}
            onClick={() => onSearch(history)}
          >
            {history}
          </button>
        ))}
      </div>
    </div>
  );
};
