import requests
import logging
from functions import check_refresh_token


def spotify_get_request(session, url: str, params={}):
    headers = {"Authorization": "Bearer {}".format(session["token"])}

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
