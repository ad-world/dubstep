from flask import (
    Flask,
    session,
    make_response,
    redirect,
    request,
    Response,
    json,
    jsonify,
)
import urllib.parse
from flask_cors import CORS, cross_origin
from flask_session import Session
from datetime import timedelta
from util.util import DubstepResponse, StatusResponse

app = Flask(__name__)
app.config.from_pyfile("config.py")
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=5)

fe_url = "http://localhost:5173"


app.secret_key = app.config["SECRET_KEY"]
Session(app)
CORS(app, origins=fe_url, supports_credentials=True)
app.config["CORS_HEADERS"] = "Content-Type"


from spotify.playlists import (
    get_playlists,
    get_playlist,
    get_artists,
    get_most_popular_artists,
    get_spotify_recommendations,
    create_playlist_with_tracks,
)
from functions import state_key, get_token, get_user_info
import logging

log = logging.getLogger("werkzeug")
log.setLevel(logging.DEBUG)


@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers["X-Content-Type-Options"] = "*"
        return res


@app.route("/", methods=["GET", "OPTIONS"])
def home():
    if session.get("name"):
        return session.get("name")
    else:
        return "Hello, Flask"


@app.route("/authorize")
def authorize():
    client_id = app.config["SPOTIFY_CLIENT_ID"]
    redirect_uri = app.config["REDIRECT_URI"]
    scope = "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-email user-read-private"
    key = state_key(15)
    session["state_key"] = key

    url = "https://accounts.spotify.com/authorize?"
    params = {
        "response_type": "code",
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "scope": scope,
        "state": key,
    }

    query_params = urllib.parse.urlencode(params)
    response = make_response(redirect(url + query_params))

    return response


@app.route("/auth/spotify/callback")
def callback():
    if request.args.get("state") == session["state_key"]:
        code = request.args.get("code")
        session.pop("state_key", None)

        gold = get_token(code)
        if gold != None:
            session["token"] = gold[0]
            session["refresh_token"] = gold[1]
            session["token_expiration"] = gold[2]

            current_user = get_user_info(session)
            session["user_id"] = current_user["id"]
            session["name"] = current_user["display_name"]

            logging.info("new user: " + session["user_id"] + " " + session["name"])

            res = make_response(
                redirect(fe_url + "/dashboard"),
            )

            return res
    return redirect("/")


@app.route("/me", methods=["GET", "OPTIONS"])
def me():
    me = get_user_info(session)

    return jsonify(me)


@app.route("/playlists", methods=["GET", "OPTIONS"])
def playlists():
    playlists = get_playlists(session)

    return playlists.jsonify()


@app.route("/ping")
def ping():
    token = session.get("token", "")
    return json.dumps({"isLoggedIn": "true" if token != "" else "false"})


@app.route("/recommendations", methods=["POST"])
def recommendation():
    if request.method == "POST":
        request_data = request.get_json()
        if request_data:
            playlist_id: str = request_data["playlist_id"]
            playlist = get_playlist(session, playlist_id)
            artists = get_artists(playlist)
            popular_artists = get_most_popular_artists(artists)
            recs = get_spotify_recommendations(session, popular_artists)

            return recs.jsonify()
        else:
            return DubstepResponse(
                StatusResponse.Failure,
                None,
                "No playlist id was sent with POST request",
            ).jsonify()


@app.route("/createPlaylist", methods=["POST"])
def createPlaylist():
    if request.method == "POST":
        request_data = request.get_json()
        if request_data:
            response = create_playlist_with_tracks(session, request_data)

            return response.jsonify()
        else:
            return DubstepResponse(
                StatusResponse.Failure,
                None,
                "No data was sent with the request.",
            ).jsonify()


@app.route("/logout")
def logout():
    session.clear()
    return "true"
