from flask import Flask, request, jsonify
from flask_cors import CORS

from services.ai_service import (
    generate_response,
    generate_healthcare_response
)

from routes.upload import upload_bp
from routes.auth import auth_bp

from database.db import db
from database.models import ChatHistory


app = Flask(__name__)


CORS(app)



# Database

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///chat_history.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db.init_app(app)



with app.app_context():

    db.create_all()





# Routes

app.register_blueprint(upload_bp)

app.register_blueprint(auth_bp)







@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "app":"CodeSathi AI",

        "status":"Running"

    })









# CHAT API

@app.route("/chat", methods=["POST"])
def chat():

    try:


        data = request.get_json()



        user_id = data.get("user_id")



        message = data.get(
            "message",
            ""
        ).strip()



        mode = data.get(
            "mode",
            "coding"
        )



        uploaded_file = data.get(
            "file",
            None
        )






        if not user_id:


            return jsonify({

                "success":False,

                "message":"User not logged in"

            }),401






        if not message:


            return jsonify({

                "success":False,

                "message":"Message empty"

            }),400







        # AI MODE


        if mode == "healthcare":


            ai_reply = generate_healthcare_response(

                message

            )


        else:


            ai_reply = generate_response(

                message,

                uploaded_file

            )










        # SAVE CHAT


        new_chat = ChatHistory(


            user_id=user_id,


            user_message=message,


            ai_response=ai_reply,


            mode=mode


        )





        db.session.add(new_chat)


        db.session.commit()









        return jsonify({


            "success":True,


            "reply":ai_reply


        })









    except Exception as e:



        print("CHAT ERROR:",e)



        return jsonify({


            "success":False,


            "message":str(e)


        }),500













# HISTORY API

@app.route("/history", methods=["GET"])
def history():


    try:


        user_id = request.args.get(
            "user_id"
        )


        mode = request.args.get(
            "mode"
        )





        if not user_id:


            return jsonify({

                "success":False,

                "message":"User id required"

            }),400







        query = ChatHistory.query.filter_by(

            user_id=user_id

        )




        if mode:


            query = query.filter_by(

                mode=mode

            )





        chats = query.order_by(

            ChatHistory.created_at.desc()

        ).all()







        data=[]





        for chat in chats:


            data.append({


                "id":chat.id,


                "user_message":chat.user_message,


                "ai_response":chat.ai_response,


                "mode":chat.mode,


                "created_at":str(chat.created_at)


            })








        return jsonify({


            "success":True,


            "history":data


        })









    except Exception as e:


        print("HISTORY ERROR:",e)



        return jsonify({


            "success":False,


            "message":str(e)


        }),500










if __name__=="__main__":


    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )