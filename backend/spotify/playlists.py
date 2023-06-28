from app import app
from spotify_requests import spotify_get_request

def get_playlists(session):
    url = "https://api.spotify.com/v1/me/playlists"
    data = spotify_get_request(session, url)

    return data
