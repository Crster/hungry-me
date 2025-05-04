import { useEffect, useState } from "react";

export function useSearchHistory() {
  const [searchHistories, setSearchHistory] = useState<string[]>([
    "Find me a cheap sushi restaurant in downtown Los Angeles that's open now and has at least a 4-star rating.",
  ]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addSearchHistory = (message: string) => {
    setSearchHistory((prev) => {
      if (!message) return prev;

      const exists = prev.some((item) => item === message);
      if (exists) return prev;

      const newHistory = [...prev, message].splice(-5);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));

      return newHistory;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return {
    items: searchHistories,
    add: addSearchHistory,
    clear: clearSearchHistory,
  };
}
