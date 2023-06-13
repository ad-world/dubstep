import requests
import logging

def spotify_get_request(session, url: str, params={}):
    headers = {
        "Authorization": "Bearer {}".format(session['token'])
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        return response.json()
    elif response.status_code == 401:
        # TODO: check if token expired, retry after fetching new token
        # and check_token != None:
        # return spotify_get_request(session, url, params)
        return None
    else:
        logging.error('spotify_get_request: ' + str(response.status_code))
        return None
