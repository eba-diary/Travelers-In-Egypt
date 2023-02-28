from dotenv import load_dotenv
from flask import Flask, jsonify
from api.routes.v1 import db_blueprint
from models import cursor
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(db_blueprint, url_prefix='/database-browser')
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/')
def hello_world():
    return jsonify('Travelers In Egypt Database Browser')


@app.route('/test')
def db_test():
    cursor.execute("Select * From Ships")
    result = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]
    results = [dict(zip(columns, row)) for row in result]

    return jsonify(results)


@app.route('/version')
def test():

    cursor.execute("select @@version")
    version = cursor.fetchone()
    return f'Running version: {version}'



# Welcome page DONE
# @app.route('/database-browser')
# def getStaticPathsForDatabases():
#     return f"emma-b-andrews, nile-travelogues, boat-passengers"


# querying boat passengers data DONE
# @app.route("/database-browser/boat-passengers")
# def getBoatPassengers():
#     cursor.execute("SELECT name, shipdate, lists FROM Ships")
#     version = cursor.fetchall()
    
#     if len(version):
#         columns = [desc[0] for desc in cursor.description]
#         version = [dict(zip(columns, row)) for row in version]
#         return jsonify(version)
#     else:
#         return "No related information"

# querying nile travelogues data
@app.route("/database-browser/nile-travelogues")          
def getNileTravelogues():
    cursor.execute("SELECT * FROM Publications")
    version = cursor.fetchall()
    
    if len(version):
        columns = [desc[0] for desc in cursor.description]
        data = [dict(zip(columns, row)) for row in version]
        return jsonify(data)
    else:
        return "No related information"


# querying emma b andrews data
@app.route("/database-browser/emma-b-andrews")          
def getEmmaBAndrews():
    return {
        'data': 'Database is under construction! Coming soon~'
    }



if __name__ == '__main__':
    app.run(debug=True)
