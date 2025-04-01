from app import app, db
from flask import request, jsonify
from models import Friend
from datetime import datetime

# GET

@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)

# POST

@app.route("/api/friends", methods=["POST"])
def post_friends():
    try:
        data = request.json

        required_fields = ["name", "role", "description", "gender", "birthday"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f'Missing required field: {field}'}), 400


        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")
        birthday_str = data.get("birthday")  #"YYYY-MM-DD"

        birthday = datetime.strptime(birthday_str, "%Y-%m-%d").date() if birthday_str else None

        # Generate avatar URL based on gender
        if gender == "male":
            image_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            image_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            image_url = None

        new_friend = Friend(
            name=name, 
            role=role, 
            description=description, 
            gender=gender, 
            birthday=birthday, 
            image_url=image_url
        )

        db.session.add(new_friend)
        db.session.commit()

        return jsonify(new_friend.to_json()), 201
        
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 500

# DELETE

@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friends(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
           return jsonify({"Error":"Not found"}), 404

        db.session.delete(friend)
        db.session.commit()
        return jsonify({"Message":"Friend deleted successfully"}), 200 
    except Exception as error:
        db.session.rollback()
        return jsonify({"Error":str(error)}), 500
    

# PATCH

@app.route("/api/friends/<int:id>", methods=["PATCH"])
def patch_friends(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"Error": "Not found"}), 404

        data = request.json

        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        friend.gender = data.get("gender", friend.gender)

        # Update birthday if provided
        birthday_str = data.get("birthday")
        if birthday_str:
            try:
                friend.birthday = datetime.strptime(birthday_str, "%Y-%m-%d").date()
            except ValueError:
                return jsonify({"Error": "Incorrect birthday format. Expected YYYY-MM-DD"}), 400

        db.session.commit()
        return jsonify(friend.to_json()), 200 
    except Exception as error:
        db.session.rollback()
        return jsonify({"Error": str(error)}), 500
