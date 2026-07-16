from database.db import db
from datetime import datetime





class User(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )


    name = db.Column(
        db.String(100),
        nullable=False
    )


    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )


    password = db.Column(
        db.String(200),
        nullable=False
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )









class ChatHistory(db.Model):


    id = db.Column(

        db.Integer,

        primary_key=True

    )



    user_id = db.Column(

        db.Integer,

        db.ForeignKey("user.id"),

        nullable=False

    )



    user_message = db.Column(

        db.Text,

        nullable=False

    )



    ai_response = db.Column(

        db.Text,

        nullable=False

    )



    # NEW FIELD

    mode = db.Column(

        db.String(50),

        default="coding"

    )



    created_at = db.Column(

        db.DateTime,

        default=datetime.utcnow

    )





    user = db.relationship(

        "User",

        backref="chats"

    )