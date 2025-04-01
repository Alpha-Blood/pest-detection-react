import tensorflow as tf
import os
import pickle
from dotenv import load_dotenv
from ai_model.preprocess import preprocess_image

# Load environment variables
load_dotenv()

MODEL_PATH = os.getenv("MODEL_PATH")
LABEL_MAP_PATH = os.getenv("LABEL_MAP_PATH")

# Initialize global variables
model = None
label_map = None

def load_model():
    global model
    if model is None:
        print("🔄 Loading TensorFlow model...")
        try:
            model = tf.keras.models.load_model(MODEL_PATH)
            print("✅ Model loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading model: {e}")

def load_label_map():
    global label_map
    if label_map is None:
        print("🔄 Loading label map...")
        try:
            with open(LABEL_MAP_PATH, "rb") as f:
                raw_map = pickle.load(f)
            label_map = {v: k for k, v in raw_map.items()}  # Invert keys and values
            print("✅ Label map loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading label map: {e}")

def predict(image_path):
    load_model()  # Ensure model is loaded
    load_label_map()  # Ensure label map is loaded

    processed_img = preprocess_image(image_path)
    prediction = model.predict(processed_img)

    predicted_class_idx = int(prediction.argmax())  # Get predicted class index
    confidence = float(prediction.max())  # Get confidence score

    predicted_label = label_map.get(predicted_class_idx, "Unknown")

    print(f"🔍 Prediction: {predicted_label} (Confidence: {confidence:.4f})")
    
    return predicted_label, confidence
