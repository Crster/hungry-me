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
                "query": query,
                "near": near,
                "min_price": price,
                "open_now": open_now,
                "categories": "4d4b7105d754a06374d81259",  # FourSquare category ID for restaurants
                "fields": "name,location,hours,rating,price,categories",
            }
            
            url = f"{self.base_url}{endpoint}?{urllib.parse.urlencode(query_params)}"
            response = self.session.get(url, headers=self.headers)

            if (not response.ok):
                raise FourSquareApiClientError(f"({response.reason}) Failed to fetch restaurants.")
            
            return response.json()
        except Exception as e:
            print("FourSquareApiClientError:", e)
            raise FourSquareApiClientError("Critical error occurred.")
        
    def search_restaurants_test(self, query, near, price, open_now):
        sample_dir = os.path.dirname(__file__)

        with open(os.path.join(sample_dir, "..", "sample", "place-search.result.json"), "r") as file:
            data = json.load(file)
        return data