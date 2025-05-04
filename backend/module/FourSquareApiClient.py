import requests
import urllib.parse
import os
import json


class FourSquareApiClientError(Exception):
    """Custom exception for FourSquareApiClient."""

    pass


class FourSquareApiClient:
    def __init__(self):
        self.session = requests.Session()
        self.base_url = os.getenv("FOURSQUARE_API_URL")
        self.headers = {
            "Authorization": os.getenv("FOURSQUARE_API_KEY"),
            "Accept": "application/json",
        }

    def search_restaurants(self, query, near, price, open_now):
        try:
            endpoint = "/places/search"

            query_params = {
                "categories": "4d4b7105d754a06374d81259",  # FourSquare category ID for restaurants
                "fields": "fsq_id,name,location,hours,rating,price,categories,photos,website,description",
            }

            # Prevent empty query parameters from being sent
            if query:
                query_params["query"] = query
            else:
                raise FourSquareApiClientError("Query parameter cannot be empty.")
            
            if near:
                query_params["near"] = near
            if price:
                query_params["price"] = price
            if open_now:
                query_params["open_now"] = open_now

            url = f"{self.base_url}{endpoint}?{urllib.parse.urlencode(query_params)}"

            if os.environ.get("DEMO_MODE") == "true":
                sample_dir = os.path.join(os.path.dirname(__file__), "..", "sample", "place-search.result.json")
                with open(sample_dir, "r") as file:
                    return json.load(file)
                
            else:
                response = self.session.get(url, headers=self.headers)
                if not response.ok:
                    raise FourSquareApiClientError(f"({response.reason}) Failed to fetch restaurants.")

                return response.json()
        except Exception as e:
            print("FourSquareApiClientError:", e)
            raise FourSquareApiClientError("Critical error occurred.")
