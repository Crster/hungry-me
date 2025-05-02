from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api import language

app = FastAPI()

app.include_router(language.router)
app.mount("/", StaticFiles(directory="app", html=True), name="app")