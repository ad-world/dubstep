from flask import Flask, session, make_response, redirect, request
import urllib.parse

app = Flask(__name__)
app.config.from_pyfile("config.py")
app.secret_key = app.config["SECRET_KEY"]


from functions import state_key, get_token, get_user_info
import logging


@app.route("/")
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
    return redirect("/")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")
