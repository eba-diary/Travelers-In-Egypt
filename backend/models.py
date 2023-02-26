import MySQLdb
import os
from dotenv import load_dotenv

load_dotenv()

connection = MySQLdb.connect(
    host=os.getenv("HOST"),
    user=os.getenv("USERNAME"),
    passwd=os.getenv("PASSWORD"),
    db=os.getenv("DATABASE"),
    # ssl_mode="VERIFY_IDENTITY",
    # ssl={
    #     "ca": "/etc/ssl/cert.pem"
    # }
)

cursor = connection.cursor()