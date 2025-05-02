from pydantic import BaseModel

class ExecuteRestaurantQueryRequest(BaseModel):
    message: str