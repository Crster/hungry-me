from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from api import restaurant
from os import environ
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

if environ.get("APP_URL"):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[environ.get("APP_URL")],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(restaurant.router)
app.mount("/", StaticFiles(directory="app", html=True), name="app")
