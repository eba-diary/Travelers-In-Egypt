from flask import Blueprint, jsonify
from models import cursor
from datetime import date
import csv



boat_passengers_blueprint = Blueprint('boat-passengers', __name__)

@boat_passengers_blueprint.route("/boat-passengers")
def getBoatPassengers():
    cursor.execute("SELECT name, shipdate, lists FROM Ships")
    version = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]
    version = [dict(zip(columns, row)) for row in version]

    # for obj in version:
    #     passenger_list = [name.strip() for name in obj['lists'].split(',')]
    #     obj['lists'] = {"passengers": passenger_list}

    sorted_version = sorted(version, key=lambda x: date.fromisoformat(x['shipdate'].strip()))    


    return jsonify(sorted_version)

@boat_passengers_blueprint.route("/boat-passengers/<int:boat_id>")
def boat_passengers(boat_id):
    cursor.execute("SELECT name, shipdate, lists FROM Ships")
    version = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]
    version = [dict(zip(columns, row)) for row in version]

    for obj in version:
        passenger_list = [name.strip() for name in obj['lists'].split(',')]
        obj['lists'] = {"passengers": passenger_list}

    sorted_version = sorted(version, key=lambda x: date.fromisoformat(x['shipdate'].strip()))    


    return jsonify(sorted_version[boat_id - 1]['lists'])

