import { CircleDollarSign, Heart, MapPinned } from "lucide-react";
import { Restaurant } from "../models/restaurant";
import { colorfyPriceLevel, stringyfyPriceLevel } from "../modules/price-level";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router";

interface SearchResultProps {
  searching?: boolean;
  restaurants: Restaurant[];
}

export const SearchResult: React.FC<SearchResultProps> = ({
  restaurants,
  searching,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={twMerge(
          "flex flex-wrap gap-2 justify-center mb-30 md:mx-10",
          !searching && "animate-slide-in-blurred-bottom"
        )}
      >
        {restaurants?.map((restaurant) => (
          <div
            key={restaurant.id}
            className="flex flex-col gap-2 p-4 rounded-2xl shadow-md bg-white w-full lg:w-[40rem] min-h-[15rem] justify-between"
            onClick={() =>
              navigate("/restaurant", { state: { restaurant, restaurants } })
            }
          >
            <div className="relative flex gap-5">
              <img
                className="w-[64px] h-[64px] object-fit"
                width={64}
                height={64}
                src={`https://www.google.com/s2/favicons?sz=64&domain_url=${restaurant.website}`}
                alt="Restaurant"
              />
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-gray-600">
                  {restaurant.cuisine.join(", ")}
                </span>

                <span className="text-xl pacifico-regular">
                  {restaurant.name}
                </span>

                <span className="text-sm text-gray-400">
                  {restaurant.description || "No description available."}
                </span>
              </div>

              <div className="absolute right-5 mt-3 flex items-center justify-center gap-2 text-red-700">
                <Heart size={40} strokeWidth={1} className="absolute" />
                <span className="text-xs font-bold">
                  {restaurant.rating ?? "?"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className={twMerge("text-sm flex items-center", colorfyPriceLevel(restaurant.price_level))}>
                <CircleDollarSign size={16} className="mr-1" />
                {stringyfyPriceLevel(restaurant.price_level)}
              </span>

              <span className="text-xs font-semibold text-pretty">
                {restaurant.operating_hours || "Unknown operating hours."}
              </span>

              <span className="text-xs text-gray-500">
                <MapPinned size={16} className="inline mr-3" />
                {restaurant.address || "No address available."}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-white" />
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white from-5% to-transparent" />
    </>
  );
};
