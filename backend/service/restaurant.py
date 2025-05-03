from .error import RestaurantServiceError
from module.FourSquareApiClient import FourSquareApiClient, FourSquareApiClientError
from model import SearchParameter, SearchResult

client = FourSquareApiClient()

async def find(filter: SearchParameter) -> list[SearchResult]:
    try:
        responses = client.search_restaurants_test(
            query=filter.query,
            near=filter.near,
            price=filter.price,
            open_now=filter.open_now
        )

        results = []
        for response in responses.get("results", []):
            cuisine = []
            for category in response.get("categories", []):
                if category.get("short_name"):
                    cuisine.append(category.get("short_name"))

            result = SearchResult(
                name=response.get("name"),
                address=response.get("location", {}).get("formatted_address"),
                cuisine=cuisine,
                rating=response.get("rating"),
                price_level=response.get("price"),
                operating_hours=response.get("hours", {}).get("display")
            )
            results.append(result)
        
        return results
    except FourSquareApiClientError:
        raise RestaurantServiceError("Invalid server response.")
    except Exception as e:
        print("RestaurantServiceError:", e)
        raise RestaurantServiceError("Unknown error occurred.")
