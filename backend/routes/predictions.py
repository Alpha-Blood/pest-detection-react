from fastapi import APIRouter, UploadFile, File, HTTPException
from database import predictions_collection
from ai_model.model import predict
import shutil
import os
import uuid
from schemas import PredictionSchema
from datetime import datetime

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the upload folder exists

@router.post("/predict", response_model=PredictionSchema)
async def upload_and_predict(file: UploadFile = File(...)):
    """
    Uploads an image, runs prediction, and stores the result in MongoDB.
    """
    try:
        # Generate a unique filename (to prevent overwrites)
        unique_filename = f"{uuid.uuid4()}_{file.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, unique_filename)

        # Save uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run AI model prediction
        predicted_label, confidence = predict(file_path)

        # Save result to MongoDB
        prediction_entry = {
            "filename": unique_filename,  # Store unique filename
            "prediction": predicted_label,
            "confidence": round(float(confidence), 4),  # Rounded confidence
            "timestamp": datetime.utcnow()
        }
        result = await predictions_collection.insert_one(prediction_entry)
        prediction_entry["_id"] = str(result.inserted_id)  # Convert ObjectId to string

        return prediction_entry

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
