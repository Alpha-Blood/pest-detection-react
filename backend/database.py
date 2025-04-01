from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

MONGO_URI = os.getenv("MONGO_URI")  # Get MongoDB URI

client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000)  # Timeout 5s
db = client["pest_disease_db"]
predictions_collection = db.predictions  # Collection for storing predictions

async def check_db_connection():
    try:
        await client.admin.command("ping")
        print("✅ MongoDB connected successfully!")
    except Exception as e:
        print("❌ MongoDB connection failed!", e)



