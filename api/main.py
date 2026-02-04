from fastapi import FastAPI, Body, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import logging

logging.basicConfig(
    level=logging.ERROR,
    format="%(levelname)s | %(name)s | %(message)s"
)

app = FastAPI()

app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")

#@app.get("/")
#def serve_react_app():
#   return FileResponse("../ui/build/index.html")

@app.get("/")
async def root():
    return {"message": "Hello World"}