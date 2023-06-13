from os import environ, path
from dotenv import load_dotenv

base_dir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(base_dir, ".env"))

ENVIRONMENT = environ.get("ENVIRONMENT")
FLASK_APP = environ.get("FLASK_APP")
SPOTIFY_CLIENT_ID = environ.get("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = environ.get("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = environ.get("REDIRECT_URI")
SECRET_KEY = environ.get("SECRET_KEY")