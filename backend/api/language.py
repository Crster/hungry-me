from fastapi import APIRouter

router = APIRouter(prefix="/api")

@router.get("/execute")
async def execute_restaurant_query():
  return {"message": "Hello from the execute endpoint!"}