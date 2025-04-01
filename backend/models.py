from bson import ObjectId
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Custom ObjectId conversion for MongoDB
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# MongoDB Model for Storing Predictions
class PredictionModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    filename: str  # Image filename
    prediction: str  # Disease name or "Healthy"
    confidence: float  # Model confidence score
    timestamp: datetime = Field(default_factory=datetime.utcnow)  # Auto timestamp

    class Config:
        json_encoders = {ObjectId: str}
        orm_mode = True
