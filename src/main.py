from fastapi import FastAPI
#from .api import register_routes


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

#register_routes(app)