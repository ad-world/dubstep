from app import app
from spotify_requests import spotify_get_request
from util.util import DubstepResponse, StatusResponse


def get_playlists(session):
    url = "https://api.spotify.com/v1/me/playlists"
    data = spotify_get_request(session, url)

    response = DubstepResponse()

    if data == None:
        response.status = StatusResponse.Failure
        response.message = "Could not find playlists"
    else:
        response.status = StatusResponse.Success
        response.message = "Found playlists"
        response.data = data

    return response
