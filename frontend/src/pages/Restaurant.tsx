import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { restApi } from "../modules/restapi";
import { SearchResult } from "../models/search-result";
import Loader from "../components/Loader";

export default function RestaurantPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<SearchResult>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restApi
          .post<Array<SearchResult>>("api/execute", {
            json: location.state,
          })
          .json();

        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {data.length > 0 ? (
            <div className="flex flex-col items-center justify-center my-5 mx-10 animate-fade-up animate-once animate-delay-[5ms]">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="border w-full shadow-lg rounded-lg p-4 m-2 transition-transform transform hover:scale-105"
                >
                  <p>{item.name}</p>
                  <p className="text-gray-500">{item.address}</p>
                  {item.cuisine.map((cuisine, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm mr-2"
                    >
                      {cuisine}
                    </span>
                  ))}
                  <p className="text-gray-500">{item.rating}</p>
                  <p className="text-gray-500">{item.price_level}</p>
                  <p className="text-gray-500">{item.operating_hours}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="flex items-center fixed inset-0 justify-center">
              No data available.
            </p>
          )}
        </div>
      )}
    </>
  );
}
