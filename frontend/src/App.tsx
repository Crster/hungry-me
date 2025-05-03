import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex h-screen justify-center items-center">
      <div
        className={twMerge(
          "flex w-40 h-40 justify-center items-center shadow-lg shadow-gray-500 rounded-full bg-pink-700 text-white transition-[width]",
          isSearchOpen &&
            "relative w-100 h-100 -mt-10 rounded-lg flex-col justify-around p-5"
        )}
      >
        {isSearchOpen && (
          <textarea
            className="border rounded-sm p-3 outline-0 w-full h-full focus:border-2"
            placeholder="Ask me anything!"
          ></textarea>
        )}
        <button
          className={twMerge(
            "hidden",
            isSearchOpen &&
              "absolute -bottom-22 shadow-lg rounded-full w-20 h-20 bg-pink-700 flex justify-center items-center"
          )}
          onClick={() => setIsSearchOpen(false)}
        >
          <Search className="font-bold" size={40} />
        </button>
        <button
          className={twMerge("font-bold text-5xl w-full h-full italic font-serif", isSearchOpen && "hidden")}
          onClick={() => setIsSearchOpen(true)}
        >
          Yum
        </button>
      </div>
    </div>
  );
}

export default App;
