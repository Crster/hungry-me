from typing import Optional
from pydantic import BaseModel


class SearchResult(BaseModel):
    id: str
    name: str
    address: Optional[str] = None
    cuisine: list[str] = []
    rating: Optional[float] = None
    price_level: Optional[int] = None
    operating_hours: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None
    photos: list[str] = []
