# app.py
from flask import Flask, request, jsonify , send_from_directory
from flask_cors import CORS
from utils.image_utils import AIDetector
from database.db import get_connection
from routes.dataset_routes import dataset_bp
from routes.history_routes import history_bp
import os, json
from datetime import datetime

# 1️⃣ Create app instance FIRST
app = Flask(__name__)
CORS(app)

# 2️⃣ Initialize model
detector = AIDetector("model/ai_detector_model.pth")

# 3️⃣ Create uploads folder
os.makedirs("uploads", exist_ok=True)

UPLOAD_FOLDER = "uploads"

@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route("/delete-history", methods=["DELETE"])
def delete_history():
    conn = get_connection()
    conn.execute("DELETE FROM predictions")
    conn.execute("DELETE FROM sqlite_sequence WHERE name='predictions'")
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "message": "All history deleted"})
# In app.py
@app.route("/dataset_images/<category>/<filename>")
def serve_dataset_image(category, filename):
    # category = 'real' or 'ai'
    folder = os.path.join("dataset", "train", category)
    return send_from_directory(folder, filename)

# 4️⃣ Define routes
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No file part 'image'"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = file.filename
    temp_path = os.path.join("uploads", filename)
    file.save(temp_path)

    result = detector.predict_path(temp_path)

    # Save record in DB
    conn = get_connection()
    conn.execute(
        "INSERT INTO predictions (image_name, prediction, confidence, probs, created_at) VALUES (?, ?, ?, ?, ?)",
        (
            filename,
            result["prediction"],
            result["confidence"],
            json.dumps(result["probs"]),
            datetime.utcnow().isoformat()
        )
    )
    conn.commit()
    conn.close()

    return jsonify(result)

# 5️⃣ Register blueprints
app.register_blueprint(dataset_bp)
app.register_blueprint(history_bp)

# 6️⃣ Run app
if __name__ == "__main__":
    app.run(debug=True)
