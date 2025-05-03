from pydantic import BaseModel

class FindRestaurantRequest(BaseModel):
    message: str