import os

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import PyMongoError

load_dotenv()
uri = os.getenv("MONGODB_URI")

if not uri or "<db_password>" in uri:
    raise SystemExit("Set MONGODB_URI in .env, replacing the password placeholder.")

client = MongoClient(uri, serverSelectionTimeoutMS=5000)

try:
    client.admin.command("ping")
    print("Connected successfully")
except PyMongoError as error:
    print(f"Connection failed ({type(error).__name__}). Check your URI and Atlas network access.")
finally:
    client.close()