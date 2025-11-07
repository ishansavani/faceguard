# from flask import Blueprint, jsonify
# import os

# dataset_bp = Blueprint("dataset", __name__)

# @dataset_bp.route("/dataset", methods=["GET"])
# def list_dataset_images():
#     base_path = "dataset/train"  # or whichever dataset you want to show
#     data = {}

#     for category in ["real", "ai"]:
#         path = os.path.join(base_path, category)
#         files = [f"/{path}/{f}" for f in os.listdir(path) if f.lower().endswith((".jpg", ".png"))]
#         data[category] = files

#     return jsonify(data)

from flask import Blueprint, jsonify
import os

dataset_bp = Blueprint("dataset", __name__)

@dataset_bp.route("/dataset", methods=["GET"])
def list_dataset_images():
    base_path = "dataset/train"
    data = {}

    for category in ["real", "ai"]:
        path = os.path.join(base_path, category)
        files = []
        for f in os.listdir(path):
            if f.lower().endswith((".jpg", ".png")):
                # Use /dataset_images/<category>/<filename> route
                files.append(f"/dataset_images/{category}/{f}")
        data[category] = files

    return jsonify(data)
