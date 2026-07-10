from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename


upload_bp = Blueprint(
    "upload",
    __name__
)


UPLOAD_FOLDER = "uploads"


# create uploads folder automatically
os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@upload_bp.route("/upload", methods=["POST"])
def upload_file():

    try:

        if "file" not in request.files:
            return jsonify({
                "success": False,
                "message": "No file found"
            }), 400


        file = request.files["file"]


        if file.filename == "":
            return jsonify({
                "success": False,
                "message": "Empty filename"
            }), 400


        filename = secure_filename(
            file.filename
        )


        file_path = os.path.join(
            UPLOAD_FOLDER,
            filename
        )


        file.save(file_path)


        return jsonify({

            "success": True,

            "filename": filename,

            "path": file_path

        })


    except Exception as e:

        print("UPLOAD ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500