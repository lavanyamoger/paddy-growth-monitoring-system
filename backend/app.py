from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os

# Initialize Flask app
app = Flask(__name__)

# Load your trained model
MODEL_PATH = "paddy_disease_model.h5"  # Make sure this file is inside backend/
model = tf.keras.models.load_model(MODEL_PATH)

# Function to make prediction
def predict_disease(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)[0][0]
    return "Unhealthy" if prediction > 0.5 else "Healthy"

# API endpoint for prediction
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    # Save file to uploads folder
    uploads_dir = os.path.join(os.getcwd(), "uploads")
    os.makedirs(uploads_dir, exist_ok=True)
    filepath = os.path.join(uploads_dir, file.filename)
    file.save(filepath)

    # Get prediction
    result = predict_disease(filepath)

    return jsonify({"status": result})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
