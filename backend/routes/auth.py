from flask import Blueprint, request, jsonify
from database.db import db
from database.models import User


auth_bp = Blueprint(
    "auth",
    __name__
)



# Signup
@auth_bp.route("/signup", methods=["POST"])
def signup():

    try:

        data = request.get_json()


        name = data.get("name","").strip()

        email = data.get("email","").strip().lower()

        password = data.get("password","").strip()



        if not name or not email or not password:

            return jsonify({

                "success":False,

                "message":"All fields required"

            }),400




        existing_user = User.query.filter_by(
            email=email
        ).first()



        if existing_user:

            return jsonify({

                "success":False,

                "message":"Email already registered"

            }),400





        new_user = User(

            name=name,

            email=email,

            password=password

        )



        db.session.add(new_user)

        db.session.commit()



        return jsonify({

            "success":True,

            "message":"Account created successfully"

        })



    except Exception as e:

        print("SIGNUP ERROR:",e)

        return jsonify({

            "success":False,

            "message":str(e)

        }),500







# Login
@auth_bp.route("/login", methods=["POST"])
def login():

    try:

        data = request.get_json()



        email = data.get("email","").strip().lower()

        password = data.get("password","").strip()




        user = User.query.filter_by(

            email=email

        ).first()



        if not user:

            return jsonify({

                "success":False,

                "message":"User not found"

            }),401




        if user.password != password:

            return jsonify({

                "success":False,

                "message":"Wrong password"

            }),401





        return jsonify({

            "success":True,

            "user":{

                "id":user.id,

                "name":user.name,

                "email":user.email

            }

        })



    except Exception as e:


        print("LOGIN ERROR:",e)


        return jsonify({

            "success":False,

            "message":str(e)

        }),500