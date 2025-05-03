from typing import Optional
from pydantic import BaseModel


class SearchResult(BaseModel):
    name: str
    address: Optional[str] = None
    cuisine: list[str] = []
    rating: Optional[float] = None
    price_level: Optional[int] = None
    operating_hours: Optional[str] = None
