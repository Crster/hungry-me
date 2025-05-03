import requests
import urllib.parse
import os

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
            }
            
            url = f"{self.base_url}{endpoint}?{urllib.parse.urlencode(query_params)}"
            response = self.session.get(url, headers=self.headers)

            if (not response.ok):
                raise FourSquareApiClientError("Failed to fetch restaurants.")
            
            return response.json()
        except Exception:
            raise FourSquareApiClientError("Critical error occurred.")