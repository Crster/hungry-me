import { useLocation, useNavigate } from "react-router";
import { Restaurant } from "../models/restaurant";
import { Globe } from "lucide-react";

export default function RestaurantPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurant = location.state?.restaurant as Restaurant;

  return (
    <div className="relative">
      {restaurant?.photos?.map((url, index) => (
        <div
          key={index}
          className="sticky top-0 h-screen flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${url})`, backgroundSize: "cover" }}
        ></div>
      ))}

      <div className="fixed bottom-5 flex items-center w-full justify-center gap-3">
        <button
          className="bg-red-800 text-white w-1/2 p-2 rounded-full hover:bg-red-600 transition duration-200"
          onClick={() =>
            navigate("/", {
              state: { restaurants: location.state?.restaurants },
            })
          }
        >
          Go Back
        </button>

        {restaurant.website ? (
          <a
            className="bg-red-800 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
            href={restaurant.website}
            target="_blank"
          >
            <Globe />
          </a>
        ) : null}
      </div>
    </div>
  );
}
