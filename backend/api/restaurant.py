from fastapi import APIRouter, HTTPException, status
from dto.restaurant import FindRestaurantRequest
from model import SearchAction
from service import language, restaurant
from service.error import ServiceError

router = APIRouter(prefix="/api", tags=["language"])


@router.post("/execute")
async def find_restaurant(body: FindRestaurantRequest):
    try:
        command = await language.message_to_command(body.message)

        response = None
        if command.action == SearchAction.RESTAURANT_SEARCH:
            response = await restaurant.find(command.parameters)
        elif command.action == SearchAction.RESTAURANT_RECOMMENDATION:
            response = await restaurant.find(command.parameters)
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unknown action")

        return response
    except ServiceError as se:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=se.message)
    except Exception as e:
        print("RestaurantApiError:", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")