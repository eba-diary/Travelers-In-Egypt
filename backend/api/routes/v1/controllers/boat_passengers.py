from flask import Blueprint, jsonify
from models import cursor

boat_passengers_blueprint = Blueprint('boat-passengers', __name__)

@boat_passengers_blueprint.route("/boat-passengers")
def getBoatPassengers():
    cursor.execute("SELECT name, shipdate, lists FROM Ships")
    version = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]
    version = [dict(zip(columns, row)) for row in version]

    # cursor.close()

    return jsonify(version)
    
    # if len(version):
    #     columns = [desc[0] for desc in cursor.description]
    #     version = [dict(zip(columns, row)) for row in version]
    #     return jsonify(version)
    # else:
    #     return "No related information"