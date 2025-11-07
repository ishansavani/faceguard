from flask import Blueprint, request, jsonify
from database.db import get_connection
import json

history_bp = Blueprint("history", __name__)

@history_bp.route("/history", methods=["GET"])
def get_history():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    offset = (page - 1) * limit

    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM predictions ORDER BY created_at DESC LIMIT ? OFFSET ?", (limit, offset)
    ).fetchall()
    conn.close()

    data = []
    for r in rows:
        data.append({
            "id": r["id"],
            "image_name": r["image_name"],
            "prediction": r["prediction"],
            "confidence": r["confidence"],
            "probs": json.loads(r["probs"]),
            "created_at": r["created_at"]
        })

    return jsonify({
        "page": page,
        "limit": limit,
        "results": data
    })
