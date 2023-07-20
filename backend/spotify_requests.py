import requests
import logging
import time
import base64
from app import app


def get_refresh_token(refresh_token: str):
    token_url = "https://accounts.spotify.com/api/token"
    client_id = app.config["SPOTIFY_CLIENT_ID"]
    client_secret = app.config["SPOTIFY_CLIENT_SECRET"]

    creds = f"{client_id}:{client_secret}"
    authorization = base64.b64encode(creds.encode("utf-8")).decode("utf-8")
    headers = {
        "Authorization": f"Basic {authorization}",
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    body = {"refresh_token": refresh_token, "grant_type": "refresh_token"}

    response = requests.post(token_url, headers=headers, data=body)

    if response.status_code == 200:
        res = response.json()
        return res["access_token"], res["expires_in"]
    else:
        logging.error("refresh_token: " + str(response.content))
        logging.error("refresh_token: " + str(response.status_code))


def check_refresh_token(session):
    expires_in, refresh_token = session.get("token_expiration", 0), session.get(
        "refresh_token", ""
    )
    if expires_in == 0 or refresh_token == "":
        logging.error(
            "expires_in is 0 and refresh_token is empty: session variables not saved"
        )
        return False

    if time.time() > expires_in:
        gold = get_refresh_token(refresh_token)

        if gold != None:
            session["access_token"] = gold[0]
            session["token_expiration"] = gold[1]
        else:
            logging.error("check_refresh_token: no new access token")

        return True
    else:
        return False


def spotify_get_request(session, url: str, params={}):
    headers = {"Authorization": "Bearer {}".format(session.get("token"))}

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        return response.json()
    elif response.status_code == 401:
        if check_refresh_token(session):
            spotify_get_request(session, url, params)
        else:
            return None
    else:
        logging.error("spotify_get_request: " + str(response.status_code))
        return None


def spotify_post_request(session, url: str, body):
    headers = {"Authorization": "Bearer {}".format(session.get("token"))}

    response = requests.post(url, headers=headers, data=body)

    if response.status_code == 201 or response.status_code == 200:
        return response.json()
    elif response.status_code == 401:
        if check_refresh_token(session):
            spotify_post_request(session, url, body)
        else:
            return None
    else:
        logging.error("spotify_get_request: " + str(response.status_code))
        return None
