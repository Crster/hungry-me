from .error import RestaurantServiceError
from module.FourSquareApiClient import FourSquareApiClient, FourSquareApiClientError
from model import SearchParameter, SearchResult

client = FourSquareApiClient()

async def find(filter: SearchParameter) -> list[SearchResult]:
    try:
        print("FourSqaure Filter:", vars(filter))

        responses = client.search_restaurants(
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

            photos = []
            for photo in response.get("photos", []):
                if photo.get("prefix") and photo.get("suffix"):
                    photo_url = f"{photo.get('prefix')}800x600{photo.get('suffix')}"
                    photos.append(photo_url)

            result = SearchResult(
                id=response.get("fsq_id"),
                name=response.get("name"),
                address=response.get("location", {}).get("formatted_address"),
                cuisine=cuisine,
                rating=response.get("rating"),
                price_level=response.get("price"),
                operating_hours=response.get("hours", {}).get("display"),
                website=response.get("website"),
                description=response.get("description"),
                photos=photos
            )
            results.append(result)
        
        return results
    except FourSquareApiClientError:
        raise RestaurantServiceError("Invalid server response.")
    except Exception as e:
        print("RestaurantServiceError:", e)
        raise RestaurantServiceError("Unknown error occurred.")
