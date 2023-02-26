import MySQLdb
import os
from dotenv import load_dotenv
import mysql.connector
import ssl


load_dotenv()

connection = MySQLdb.connect(
    host=os.getenv("HOST"),
    user=os.getenv("USERNAME"),
    passwd=os.getenv("PASSWORD"),
    db=os.getenv("DATABASE"),
    # ssl_mode="VERIFY_IDENTITY",
    ssl={
        "ca": "/etc/ssl/cert.pem",
        "cert_reqs": ssl.CERT_REQUIRED
    }
)

cursor = connection.cursor()