from flask import Flask, request, jsonify
from flask_cors import CORS
from services.ai_service import generate_response

app = Flask(__name__)

# Allow React frontend to access the backend
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "app": "CodeSathi AI",
        "status": "Running",
        "version": "1.0"
    })


@app.route("/chat", methods=["POST"])
def chat():

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No JSON data received."
            }), 400

        user_message = data.get("message", "").strip()

        if not user_message:
            return jsonify({
                "success": False,
                "message": "Message cannot be empty."
            }), 400

        ai_reply = generate_response(user_message)

        return jsonify({
            "success": True,
            "reply": ai_reply
        })

    except Exception as e:
        print("ERROR:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)