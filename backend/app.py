from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback

from services.ai_service import generate_response

from routes.upload import upload_bp
from routes.auth import auth_bp

from database.db import db
from database.models import ChatHistory



app = Flask(__name__)


CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)



# ================= DATABASE =================


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///chat_history.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db.init_app(app)



# TEMPORARY FIX FOR OLD DATABASE SCHEMA

with app.app_context():

    db.drop_all()

    db.create_all()

    print("DATABASE RESET DONE")





# ================= ROUTES =================


app.register_blueprint(upload_bp)

app.register_blueprint(auth_bp)





@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "app": "CodeSathi AI",

        "status": "Running"

    })







# ================= CHAT API =================


@app.route("/chat", methods=["POST"])
def chat():

    try:


        data = request.get_json()


        print("REQUEST:", data)



        user_id = data.get("user_id")


        message = data.get(
            "message",
            ""
        ).strip()



        uploaded_file = data.get(
            "file",
            None
        )



        if not user_id:

            return jsonify({

                "success": False,

                "message": "User not logged in"

            }),401





        if not message:

            message = "Please answer normally"





        ai_reply = generate_response(

            message,

            uploaded_file

        )



        print("AI RESPONSE:", ai_reply)





        new_chat = ChatHistory(

            user_id=user_id,

            user_message=message,

            ai_response=ai_reply

        )



        db.session.add(new_chat)

        db.session.commit()





        return jsonify({

            "success": True,

            "reply": ai_reply

        })





    except Exception as e:


        print("========== CHAT ERROR ==========")

        traceback.print_exc()

        print("================================")



        return jsonify({

            "success": False,

            "message": str(e)

        }),500







# ================= HISTORY API =================


@app.route("/history", methods=["GET"])
def history():


    try:


        user_id = request.args.get(
            "user_id"
        )



        if not user_id:

            return jsonify({

                "success":False,

                "message":"User id required"

            }),400






        chats = ChatHistory.query.filter_by(

            user_id=user_id

        ).order_by(

            ChatHistory.created_at.desc()

        ).all()





        result = []



        for chat in chats:


            result.append({

                "id": chat.id,

                "user_message": chat.user_message,

                "ai_response": chat.ai_response,

                "created_at": str(chat.created_at)

            })





        return jsonify({

            "success": True,

            "history": result

        })







    except Exception as e:


        print("========== HISTORY ERROR ==========")

        traceback.print_exc()

        print("===================================")



        return jsonify({

            "success":False,

            "message":str(e)

        }),500







if __name__ == "__main__":


    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )