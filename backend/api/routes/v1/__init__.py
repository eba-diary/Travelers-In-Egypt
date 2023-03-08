from flask import Blueprint, jsonify
from models import cursor
from .controllers.boat_passengers import boat_passengers_blueprint


db_blueprint = Blueprint('db', __name__)
db_blueprint.register_blueprint(boat_passengers_blueprint) 
# register nile travelogues blueprint to db_blueprint

@db_blueprint.route("/")
def getStaticPathsForDatabase():
    return jsonify({'routes': ['emma-b-andrews', 'nile-travelogues', 'boat-passengers']})


@db_blueprint.route("/version")
def getApiVersion():
    cursor.execute("select @@version")
    version = cursor.fetchone()
    return f'<h1>Running version: {version}</h1>'
