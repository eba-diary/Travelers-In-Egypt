import MySQLdb
import os
from dotenv import load_dotenv
import mysql.connector


load_dotenv()

connection = mysql.connector.connect(
    host=os.getenv("HOST"),
    user=os.getenv("USERNAME"),
    passwd=os.getenv("PASSWORD"),
    db=os.getenv("DATABASE"),
    ssl_ca="/etc/ssl/cert.pem",
    ssl_verify_cert=True
)

cursor = connection.cursor()