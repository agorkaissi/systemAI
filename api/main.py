from fastapi import FastAPI
from pydantic import BaseModel, Field
import logging
import joblib

logging.basicConfig(
    level=logging.ERROR,
    format="%(levelname)s | %(name)s | %(message)s"
)
app = FastAPI()

model = joblib.load("iris_model.joblib") #loaded model

class IrisRequest(BaseModel):
    sepal_length: float = Field(gt=0)
    sepal_width: float = Field(gt=0)
    petal_length: float = Field(gt=0)
    petal_width: float = Field(gt=0)

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}

@app.post("/predict")
def predict(data: IrisRequest):
    features = [[
        data.sepal_length,
        data.sepal_width,
        data.petal_length,
        data.petal_width
    ]]

    # Make prediction
    prediction = int(model.predict(features)[0])

    iris_classes = ["setosa", "versicolor", "virginica"]

    return {
        "class_id": prediction,
        "class_name": iris_classes[prediction]
    }