from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api import restaurant

app = FastAPI()

app.include_router(restaurant.router)
app.mount("/", StaticFiles(directory="app", html=True), name="app")