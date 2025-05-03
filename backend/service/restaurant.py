from .error import RestaurantServiceError
from module.FourSquareApiClient import FourSquareApiClient, FourSquareApiClientError
from model import SearchParameter

client = FourSquareApiClient()

async def find(filter: SearchParameter):
    try:
        response = client.search_restaurants(
            query=filter.query,
            near=filter.near,
            price=filter.price,
            open_now=filter.open_now
        )
        
        return response
    except FourSquareApiClientError:
        raise RestaurantServiceError("Invalid server response.")
    except Exception as e:
        print("RestaurantServiceError:", e)
        raise RestaurantServiceError("Unknown error occurred.")
