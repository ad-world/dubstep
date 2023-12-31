import random as rand
import string as string
from app import app
import base64
import requests
import logging
from spotify_requests import spotify_get_request


def state_key(size: int) -> str:
    return "".join(
        rand.SystemRandom().choice(string.ascii_uppercase + string.digits)
        for _ in range(size)
    )


def get_token(code: str):
    token_url = "https://accounts.spotify.com/api/token"
    redirect_uri = app.config["REDIRECT_URI"]
    client_id = app.config["SPOTIFY_CLIENT_ID"]
    client_secret = app.config["SPOTIFY_CLIENT_SECRET"]

    creds = f"{client_id}:{client_secret}"
    authorization = base64.b64encode(creds.encode("utf-8")).decode("utf-8")

    headers = {
        "Authorization": f"Basic {authorization}",
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    body = {
        "code": code,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
    }

    res = requests.post(token_url, headers=headers, data=body)

    if res.status_code == 200:
        pr = res.json()
        return pr["access_token"], pr["refresh_token"], pr["expires_in"]
    else:
        logging.error("getToken:" + str(res.status_code) + " " + str(res.json()))
        return None


def get_user_info(session):
    url = "https://api.spotify.com/v1/me"
    data = spotify_get_request(session, url)

    return data
