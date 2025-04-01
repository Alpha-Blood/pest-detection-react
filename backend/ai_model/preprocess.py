import cv2
import numpy as np

def preprocess_image(image_path):
    """
    Load and preprocess the image before passing it to the model.
    """
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))  # Resize to match model input shape
    img = img / 255.0  # Normalize pixel values
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img
