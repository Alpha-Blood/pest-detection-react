from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Schema for Image Upload (Client Request)
class ImageUploadSchema(BaseModel):
    filename: str  # Name of the file

# Schema for AI Model Prediction Response
class PredictionResponseSchema(BaseModel):
    prediction: str  # Disease or "Healthy"
    confidence: float  # Model confidence score

# Schema for Storing Prediction Results
class PredictionSchema(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    filename: str
    prediction: str
    confidence: float
    timestamp: datetime

    class Config:
        from_attributes = True
