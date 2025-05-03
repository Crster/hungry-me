from fastapi import APIRouter, HTTPException, status
from dto import restaurant
from service import language
from service.error import ServiceError

router = APIRouter(prefix="/api", tags=["language"])


@router.post("/execute")
async def find_restaurant(body: restaurant.FindRestaurantRequest):
    try:
        command = await language.message_to_command(body.message)
        return command
    except ServiceError as se:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=se.message)
    except Exception as e:
        print("RestaurantApiError:", e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")