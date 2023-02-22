import MySQLdb
import os
from dotenv import load_dotenv
from flask import Flask

load_dotenv()

app = Flask(__name__)

connection = MySQLdb.connect(
    host=os.getenv("HOST"),
    user=os.getenv("USERNAME"),
    passwd=os.getenv("PASSWORD"),
    db=os.getenv("DATABASE"),
    ssl_mode="VERIFY_IDENTITY",
    ssl={
        "ca": "/etc/ssl/cert.pem"
    }
)


cursor = connection.cursor()

'''
@app.route('/')
def hello_world():
    return '<h1>Hello World</h1>'


@app.route('/test')
def db_test():
    cursor.execute("Select * From Ships")
    result = cursor.fetchall()
    return f'{result}'


@app.route('/version')
def test():
    # cursor = connection.cursor()
    # result = cursor.execute('SELECT * FROM Publications')

    cursor.execute("select @@version")
    version = cursor.fetchone()

    # if version:
    #     return f'<h2>Running version: {version}</h2>',
    # else:
    #     return f'<h2>Not connected.</h2>'
    return f'<h1>Running version: {version}</h1>'
'''


# Welcome page
@app.route('/database_browser')
def getStaticPathsForDatabases():
    return f"emma-b-andrews', 'nile-travelogues', 'boat-passengers"

# querying boat passengers data
@app.route("/database_browser/boat-passengers")
def getBoatPassengers():
    cursor = connection.cursor()
    #result = cursor.execute('''Select * From )
