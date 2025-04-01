from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # 👈 Import CORS middleware
import uvicorn
import logging
from database import check_db_connection
from routes import predictions
from ai_model.model import load_model  # Lazy load model

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Pest Disease Prediction API", version="1.0")

# 👇 Add CORS middleware (MUST be before app.include_router!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your Vite frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include API routes
app.include_router(predictions.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Pest Disease Prediction API is running!"}

@app.on_event("startup")
async def startup_event():
    """Runs at API startup to check database and model readiness."""
    logger.info("🚀 Starting Pest Disease Prediction API...")

    # Check MongoDB connection
    await check_db_connection()

    # Load the AI model in the background (optional)
    logger.info("🔄 Warming up AI model...")
    load_model()
    logger.info("✅ AI model is ready!")

    logger.info("✅ API is fully operational!")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)