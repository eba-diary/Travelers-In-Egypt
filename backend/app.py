from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
app.config["DEBUG"] = False

SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="hs0518",
    password="ebawebdata",
    hostname="hs0518.mysql.pythonanywhere-services.com",
    databasename="hs0518$thomas_cook",
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Ships(db.Model):
    __tablename__ = 'Ships'
    shipsID = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column('name', db.Text, nullable=False)
    shipdate = db.Column('shipdate', db.Text, nullable=False)
    lists = db.Column('lists', db.Text)


# test
if __name__ == '__main__':
    shipsID = "1890-01-07"
    ship = Ships.query.filter_by(shipdate=shipsID).all()
    re = ship.__dict__
    for r in re:
        re.pop('_sa_instance_state', None)


@app.route('/')
def hello_world():
    return 'Hello Thomas Cook!'

# select all data from ships table


@app.route('/database_browser')
def getStaticPathsForDatabases():
    return json.dumps(['emma-b-andrews', 'nile-travelogues', 'boat-passengers'])


@app.route("/database_browser/nile-travelogues")
def ShipInfo2():
    data = Ships.query.all()
    result = [d.__dict__ for d in data]
    for r in result:
        r.pop('_sa_instance_state', None)

    if request.args:
        page = int(request.args['page'])
        display = int(request.args['display'])
        page_start = (page - 1) * display
        return json.dumps(result[page_start: min(page_start + display, len(result))])
    else:
        return json.dumps(result[0: 10])


@app.route('/test/api')
def test():
    data = Ships.query.all()
    result = [d.__dict__ for d in data]
    for r in result:
        r.pop('_sa_instance_state', None)

    if request.args:
        display = int(request.args['display'])
        page = int(request.args['page'])
        return "<p>Result: {}</p>".format(json.dumps(result[page - 1: display]))
    else:
        return json.dumps(result)


# Get the information of a ship by its id.
@app.route('/info/<int:id>')
def ShipInfoById(id):

    if id is None:
        return "Missing the required params."
    else:
        try:

            data = Ships.query.filter_by(shipsID=id).all()
            result = data.__dict__
            if len(result):
                result.pop('_sa_instance_state', None)
                return json.dumps(result)
            else:
                return "No related information"
        except:
            return "An error occurred."


# Get the information of a ship by its date. The format of date parameter is YYYY-MM-DD in string
@app.route('/info/date/<string:date>')
def ShipInfoByDate(date):

    if date is None:
        return "Missing the required params."
    else:
        try:
            data = Ships.query.filter_by(shipdate=date).first()
            result = data.__dict__
            if len(result):
                result.pop('_sa_instance_state', None)
                return json.dumps(result)
            else:
                return "No related information"
        except:
            return "An error occurred."


# Get the information of a ship by its name.
@app.route('/info/<string:name>')
def ShipInfoByName(name):

    if name is None:
        return "Missing the required params."
    else:
        try:
            data = Ships.query.filter_by(name=name).all()
            result = data.__dict__
            if len(result):
                result.pop('_sa_instance_state', None)
                return json.dumps(result)
            else:
                return "No related information"
        except:
            return "An error occurred."
